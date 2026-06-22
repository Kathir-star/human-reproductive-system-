import { QUIZ_QUESTIONS } from '../data';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function AssessmentSuite() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];

  const handleAnswer = (index: number) => {
    setAnswered(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(null);
      setShowResult(false);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(null);
    setShowResult(false);
  };

  if (currentQuestion === QUIZ_QUESTIONS.length) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-serif italic text-[#2C2E28]">Board Assessment</h2>
        <div className="bg-white p-8 rounded-xl border border-[#E5E2D9] text-center">
          <h3 className="text-3xl font-bold text-[#8C9A7E] mb-4">Quiz Complete!</h3>
          <p className="text-xl text-[#42443D] mb-6">
            Your Score: <span className="font-bold">{score}</span> / {QUIZ_QUESTIONS.length}
          </p>
          <p className="text-lg text-[#707269] mb-8">
            {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Correct
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#8C9A7E] text-white rounded-lg font-bold hover:bg-[#718063]"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic text-[#2C2E28]">Board Assessment</h2>
      
      <div className="bg-white p-6 rounded-xl border border-[#E5E2D9]">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm font-bold text-[#8C9A7E]">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="text-sm font-bold text-[#42443D]">Score: {score}</span>
        </div>
        
        <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#8C9A7E] h-full transition-all"
            style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl border border-[#E5E2D9]"
      >
        <h3 className="text-lg font-bold text-[#2C2E28] mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => !showResult && handleAnswer(i)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition ${
                answered === i
                  ? i === question.correctAnswer
                    ? 'bg-green-50 border-green-500 text-green-900'
                    : 'bg-red-50 border-red-500 text-red-900'
                  : showResult && i === question.correctAnswer
                  ? 'bg-green-50 border-green-500 text-green-900'
                  : 'bg-white border-[#E5E2D9] text-[#42443D] hover:border-[#8C9A7E]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="text-sm text-blue-900"><span className="font-bold">Explanation:</span> {question.explanation}</p>
          </motion.div>
        )}
      </motion.div>

      {showResult && (
        <button
          onClick={nextQuestion}
          className="w-full px-6 py-3 bg-[#8C9A7E] text-white rounded-lg font-bold hover:bg-[#718063]"
        >
          {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
}