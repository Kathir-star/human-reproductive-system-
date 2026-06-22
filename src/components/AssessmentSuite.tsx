import { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw, AlertTriangle, Medal, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AssessmentSuite() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ question: QuizQuestion; chosen: number }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Active question
  const currentQuestion = useMemo(() => QUIZ_QUESTIONS[currentIdx], [currentIdx]);

  // Handle option clicking
  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
  };

  // Handle quiz validation
  const handleSubmit = () => {
    if (selectedOption === null || hasAnswered) return;
    
    setHasAnswered(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, { question: currentQuestion, chosen: selectedOption }]);
    }
  };

  // Handle progressing
  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Restart quiz
  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setWrongAnswers([]);
    setIsFinished(false);
  };

  // Calculate categorization weakness profile
  const weaknessStats = useMemo(() => {
    const categories: Record<string, { total: number; missed: number }> = {
      anatomy: { total: 0, missed: 0 },
      physiology: { total: 0, missed: 0 },
      pathology: { total: 0, missed: 0 },
      terminology: { total: 0, missed: 0 },
      abbreviations: { total: 0, missed: 0 }
    };

    QUIZ_QUESTIONS.forEach(q => {
      if (categories[q.category]) {
        categories[q.category].total += 1;
      }
    });

    wrongAnswers.forEach(w => {
      if (categories[w.question.category]) {
        categories[w.question.category].missed += 1;
      }
    });

    return Object.entries(categories).map(([cat, val]) => {
      const correct = val.total - val.missed;
      const rate = val.total > 0 ? (correct / val.total) * 100 : 100;
      return { category: cat, ...val, rate, correct };
    });
  }, [wrongAnswers]);

  return (
    <div className="max-w-2xl mx-auto space-y-6" id="assessment-suite">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2E28] tracking-tight">
          Reproductive System Assessment
        </h3>
        <p className="text-xs text-[#707269] mt-1.5 font-medium uppercase tracking-wider">
          Evaluate medical expertise. Perfect for nursing, midwifery, and board prep.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          /* ACTIVE QUESTIONS VIEW */
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-[32px] border border-[#E5E2D9] p-6 sm:p-8 space-y-6 shadow-sm"
          >
            {/* Header / Tracker */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#707269] border-[#E5E2D9] pb-3 border-b">
              <span className="font-mono tracking-widest text-[#8C9A7E]">
                QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}
              </span>
              <span className="uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#F2F0E9] font-bold block text-[10px] text-[#8C9A7E]">
                {currentQuestion.category}
              </span>
            </div>

            {/* Question description */}
            <h4 className="text-base sm:text-lg font-serif italic text-[#2C2E28] leading-relaxed">
              {currentQuestion.question}
            </h4>

            {/* Answers List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswer === idx;
                
                let optionStyle = 'border-[#E5E2D9] hover:border-[#8C9A7E] bg-white text-[#42443D]';
                if (isSelected && !hasAnswered) {
                  optionStyle = 'border-[#8C9A7E] bg-[#F2F0E9] ring-2 ring-[#8C9A7E]/20 text-[#2C2E28] font-semibold';
                } else if (hasAnswered) {
                  if (isCorrect) {
                    optionStyle = 'border-[#8C9A7E] bg-[#8C9A7E]/5 text-[#2C2E28] font-bold';
                  } else if (isSelected) {
                    optionStyle = 'border-[#D99A6C] bg-[#D99A6C]/5 text-[#2C2E28]';
                  } else {
                    optionStyle = 'border-[#E5E2D9] bg-white text-[#707269]/40 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    <div className="shrink-0 ml-2">
                      {hasAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-[#8C9A7E]" />}
                      {hasAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-[#D99A6C]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* FEEDBACK EXPLANATION ACCORDION */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-xs space-y-2 leading-relaxed border ${
                  selectedOption === currentQuestion.correctAnswer 
                    ? 'bg-[#8C9A7E]/5 border-[#8C9A7E]/30 text-[#2C2E28]' 
                    : 'bg-[#D99A6C]/5 border-[#D99A6C]/30 text-[#2C2E28]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[10px] text-[#8C9A7E] font-mono">
                  <HelpCircle className="h-4 w-4" /> CLINICAL RATIONALE
                </div>
                <p className="text-[#42443D] leading-relaxed">{currentQuestion.explanation}</p>
              </motion.div>
            )}

            {/* BUTTON CONTROLS */}
            <div className="flex justify-end pt-3 border-t border-[#E5E2D9]">
              {!hasAnswered ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmit}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition ${
                    selectedOption !== null
                      ? 'bg-[#8C9A7E] text-white hover:bg-[#728065] cursor-pointer shadow-sm'
                      : 'bg-[#F2F0E9] text-[#707269] cursor-not-allowed'
                  }`}
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#8C9A7E] hover:bg-[#728065] text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-sm cursor-pointer"
                >
                  {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'See Exam Results' : 'Next Question \u2192'}
                </button>
              )}
            </div>

          </motion.div>
        ) : (
          /* COMPREHENSIVE FINISHED RESULTS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] border border-[#E5E2D9] p-8 space-y-8 shadow-sm"
          >
            {/* Score circle */}
            <div className="text-center space-y-4">
              <div className="mx-auto inline-flex items-center justify-center p-4 bg-[#F2F0E9] rounded-full mb-2">
                <Medal className="h-10 w-10 text-[#8C9A7E]" />
              </div>
              <h4 className="text-2xl font-serif text-[#2C2E28]">
                Linguistic & Biology Assessment Completed
              </h4>
              <div className="flex flex-col items-center">
                <span className="text-6xl font-extrabold font-serif italic text-[#8C9A7E]">
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                </span>
                <span className="text-xs font-mono text-[#707269] tracking-widest uppercase mt-1">
                  Grade Score: {score} Correct out of {QUIZ_QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Module performance summary grids */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#707269] block pb-1 border-b border-[#E5E2D9]">
                Syllabus Category Competency Analysis
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {weaknessStats.map((stat) => {
                  let badgeColor = 'bg-[#D99A6C]/10 text-[#D99A6C]';
                  if (stat.rate >= 80) badgeColor = 'bg-[#8C9A7E]/10 text-[#8C9A7E]';
                  else if (stat.rate >= 50) badgeColor = 'bg-[#D99A6C]/10 text-[#2C2E28]';

                  return (
                    <div key={stat.category} className="p-4 bg-[#F9F8F5] rounded-2xl border border-[#E5E2D9] flex flex-col justify-between space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="capitalize font-serif text-sm text-[#2C2E28]">
                          {stat.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${badgeColor}`}>
                          {Math.round(stat.rate)}% Pass
                        </span>
                      </div>
                      
                      <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            stat.rate >= 80 ? 'bg-[#8C9A7E]' : 'bg-[#D99A6C]'
                          }`}
                          style={{ width: `${stat.rate}%` }}
                        ></div>
                      </div>

                      <span className="text-[10px] text-[#707269] font-medium font-mono">
                        Answered {stat.correct} of {stat.total} correctly.
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic wrapup advice */}
            <div className="p-4 rounded-2xl bg-[#2C2E28] text-white text-xs space-y-1.5">
              <span className="font-bold uppercase text-[9px] text-[#D99A6C] tracking-widest font-mono flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Dean's Study Recommendation
              </span>
              <p className="text-[#E5E2D9] leading-relaxed">
                {score === QUIZ_QUESTIONS.length 
                  ? "Flawless score! You have completely mastered the human reproductive system anatomy, hormonal feedback mechanisms, pathological states, and linguistic prefix-suffix structures." 
                  : "Excellent effort. Analyze your categories above. For categories displaying lower than 80%, we recommend revisiting the study directories (Anatomy Explorer, Endocrine pathway, Pathology deck) to brush up before your next board exam."}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#8C9A7E] hover:bg-[#728065] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <RotateCcw className="h-4 w-4" /> Reset Assessment Exam
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
