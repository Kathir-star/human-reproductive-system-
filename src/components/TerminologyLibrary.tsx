import { useState, useMemo } from 'react';
import { PREFIX_DATA, SUFFIX_DATA, ABBREVIATIONS_DATA } from '../data';
import { Affix, Abbreviation } from '../types';
import { Search, Split, Zap, Columns, RotateCcw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TerminologyLibrary() {
  const [activeSegment, setActiveSegment] = useState<'affixes' | 'abbreviations' | 'builder'>('builder');
  const [searchQuery, setSearchQuery] = useState('');
  const [affixTypeFilter, setAffixTypeFilter] = useState<'all' | 'prefix' | 'suffix'>('all');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Term Builder choices
  const [selectedBuilderPrefix, setSelectedBuilderPrefix] = useState<Affix | null>(
    PREFIX_DATA.find(p => p.affix.startsWith('Hyster')) || null
  );
  const [selectedBuilderSuffix, setSelectedBuilderSuffix] = useState<Affix | null>(
    SUFFIX_DATA.find(s => s.affix === '-otomy') || null
  );

  // Filter affixes
  const filteredAffixes = useMemo(() => {
    const list = [...PREFIX_DATA, ...SUFFIX_DATA];
    return list.filter(item => {
      const matchesType = affixTypeFilter === 'all' || item.type === affixTypeFilter;
      const matchesSearch = item.affix.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.example.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [affixTypeFilter, searchQuery]);

  // Filter abbreviations
  const filteredAbbreviations = useMemo(() => {
    return ABBREVIATIONS_DATA.filter(item => {
      const matchesSearch = item.abbrev.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.expansion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  // Calculated compound word meaning
  const compiledWordInfo = useMemo(() => {
    if (!selectedBuilderPrefix || !selectedBuilderSuffix) return null;
    
    // Clean prefix root (remove trailing /o, /o-, -)
    const cleanPrefix = selectedBuilderPrefix.affix.split('/')[0].replace('-', '');
    // Clean suffix (remove leading -)
    const cleanSuffix = selectedBuilderSuffix.affix.replace('-', '');
    
    // Joint vowel handling (typically 'o' acts as the connecting vowel)
    let compoundWord = '';
    if (selectedBuilderPrefix.affix.includes('/o')) {
      // If the suffix starts with a vowel (e.g., -arche, -ase, -ia, -oma, -optosis, -orrhaphy, -orrhea, -otomy, -pareunia, -partum, -rrhagia), we drop the combining vowel 'o'
      const suffixStartsVowel = /^[aeiou]/i.test(cleanSuffix);
      if (suffixStartsVowel) {
        compoundWord = cleanPrefix + cleanSuffix;
      } else {
        compoundWord = cleanPrefix + 'o' + cleanSuffix;
      }
    } else {
      compoundWord = cleanPrefix + cleanSuffix;
    }

    // Capitalize first letter
    compoundWord = compoundWord.charAt(0).toUpperCase() + compoundWord.slice(1);

    // Provide real clinical definitions for accurate combos, otherwise general assembly
    let clinicalMeaning = `Combining medical root '${selectedBuilderPrefix.meaning}' + suffix '${selectedBuilderSuffix.meaning}'.`;
    let isRealCombo = false;
    let clinicalExample = '';

    const comboUpper = compoundWord.toLowerCase();
    if (comboUpper === 'hysterectomy') {
      clinicalMeaning = "The surgical removal of a woman's uterus, either partially, totally, or radically.";
      isRealCombo = true;
      clinicalExample = "Hysterectomy (Hyster/o + -ectomy/otomy)";
    } else if (comboUpper === 'episiotomy') {
      clinicalMeaning = "A surgical incision of the perineum and vaginal wall during childbirth to prevent tearing.";
      isRealCombo = true;
      clinicalExample = "Episiotomy (Episi/o + -otomy)";
    } else if (comboUpper === 'amniocentesis') {
      clinicalMeaning = "A prenatal diagnostic screening involving puncturing the amniotic sac to test fluid.";
      isRealCombo = true;
    } else if (comboUpper === 'dyspareunia') {
      clinicalMeaning = "Difficult or highly painful sexual intercourse.";
      isRealCombo = true;
    } else if (comboUpper === 'menopause') {
      clinicalMeaning = "Permanent cessation of menstruation, marking the end of childbearing capabilities.";
      isRealCombo = true;
    } else if (comboUpper === 'menorrhagia') {
      clinicalMeaning = "Abnormally heavy, prolonged excessive flow of blood during menstruation.";
      isRealCombo = true;
    } else if (comboUpper === 'amenorrhea') {
      clinicalMeaning = "Complete absence or suppression of menstrual discharge.";
      isRealCombo = true;
    } else if (comboUpper === 'salpingitis') {
      clinicalMeaning = "Severe inflammation inside one or both Fallopian tubes.";
      isRealCombo = true;
    } else if (comboUpper === 'primigravida') {
      clinicalMeaning = "A female patient who is pregnant for the very first time.";
      isRealCombo = true;
    } else if (comboUpper === 'nulligravida') {
      clinicalMeaning = "A female patient who has never been pregnant before.";
      isRealCombo = true;
    } else if (comboUpper === 'perineotomy') {
      clinicalMeaning = "An incision into the perineal floor (the same procedure as an Episiotomy).";
      isRealCombo = true;
    }

    return {
      word: compoundWord,
      meaning: clinicalMeaning,
      isRealCombo,
      etymology: `Derived from [${selectedBuilderPrefix.affix.replace('-', '')}] (${selectedBuilderPrefix.meaning.toLowerCase()}) + [${selectedBuilderSuffix.affix}] (${selectedBuilderSuffix.meaning.toLowerCase()})`,
      example: clinicalExample
    };
  }, [selectedBuilderPrefix, selectedBuilderSuffix]);

  return (
    <div className="space-y-8" id="terminology-library">
      {/* Sub tabs of terminology */}
      <div className="flex justify-center">
        <div className="bg-[#F2F0E9] p-1.5 rounded-xl flex border border-[#E5E2D9]">
          <button
            onClick={() => {
              setActiveSegment('builder');
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSegment === 'builder'
                ? 'bg-[#8C9A7E] text-white shadow-sm'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/40'
            }`}
          >
            <Split className="h-4 w-4" />
            Interactive Term Builder
          </button>
          <button
            onClick={() => {
              setActiveSegment('affixes');
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSegment === 'affixes'
                ? 'bg-[#8C9A7E] text-white shadow-sm'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/40'
            }`}
          >
            <Columns className="h-4 w-4" />
            Prefix/Suffix Directory
          </button>
          <button
            onClick={() => {
              setActiveSegment('abbreviations');
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSegment === 'abbreviations'
                ? 'bg-[#8C9A7E] text-white shadow-sm'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/40'
            }`}
          >
            <Zap className="h-4 w-4" />
            Clinical Shorthands
          </button>
        </div>
      </div>

      {activeSegment === 'builder' ? (
        /* INTERACTIVE TERM BUILDER GAME */
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2E28] tracking-tight">
              Medical Terminology Compiler
            </h3>
            <p className="text-xs text-[#707269] mt-1.5 font-medium uppercase tracking-wider">
              Select or cross-match Latin word roots (Left) and Suffix outcomes (Right) to construct and inspect real-life anatomical vocabulary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLUMN 1: PREFIXES LIST */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E5E2D9] overflow-hidden h-[420px] flex flex-col shadow-sm">
              <div className="p-3.5 bg-[#F9F8F5] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-widest text-[#8C9A7E] font-mono">
                1. Select Prefix Root
              </div>
              <div className="overflow-y-auto divide-y divide-[#E5E2D9] flex-1">
                {PREFIX_DATA.map((p) => (
                  <button
                    key={p.affix}
                    onClick={() => setSelectedBuilderPrefix(p)}
                    className={`w-full text-left p-3.5 text-xs transition cursor-pointer ${
                      selectedBuilderPrefix?.affix === p.affix
                        ? 'bg-[#F2F0E9] text-[#2C2E28] font-bold border-r-4 border-[#8C9A7E]'
                        : 'text-[#42443D] hover:bg-[#F9F8F5]'
                    }`}
                  >
                    <span className="font-mono text-sm block text-[#2C2E28] font-bold">{p.affix}</span>
                    <span className="text-[#707269] block mt-1 font-medium">{p.meaning}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* COLUMN 2: RESULT BOX */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {compiledWordInfo ? (
                  <motion.div
                    key={compiledWordInfo.word}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-[#2C2E28] text-white rounded-[32px] p-6 border border-[#2C2E28] text-center space-y-6 shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D99A6C] uppercase tracking-widest block">Assembled Medical Term</span>
                      <h4 className="text-2xl font-serif italic text-white mt-1 break-words">
                        {compiledWordInfo.word}
                      </h4>
                      <span className="text-[10px] font-mono text-[#E5E2D9]/70 block mt-2">
                        {compiledWordInfo.etymology}
                      </span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl text-xs space-y-2 text-left border border-white/5">
                      <span className="font-bold text-[#8C9A7E] uppercase tracking-wider text-[9px] block font-mono">Computed Definition</span>
                      <p className="text-[#E5E2D9] leading-relaxed font-sans font-medium">
                        {compiledWordInfo.meaning}
                      </p>
                    </div>

                    {compiledWordInfo.isRealCombo ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8C9A7E]/20 border border-[#8C9A7E]/30 rounded-full text-[10px] font-bold text-[#8C9A7E] font-mono uppercase tracking-widest">
                        <Zap className="h-3.5 w-3.5 animate-pulse" /> Established Clinical Term
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-[#E5E2D9]/70 font-mono">
                        <HelpCircle className="h-3.5 w-3.5 text-white/30" /> Synthetic Etymological Compound
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-[#707269] text-center py-10 bg-[#F9F8F5] border border-[#E5E2D9] rounded-2xl">
                    Choose a prefix and a suffix to assemble.
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* COLUMN 3: SUFFIXES LIST */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E5E2D9] overflow-hidden h-[420px] flex flex-col shadow-sm">
              <div className="p-3.5 bg-[#F9F8F5] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-widest text-[#8C9A7E] font-mono">
                2. Select Suffix outcome
              </div>
              <div className="overflow-y-auto divide-y divide-[#E5E2D9] flex-1">
                {SUFFIX_DATA.map((s) => (
                  <button
                    key={s.affix}
                    onClick={() => setSelectedBuilderSuffix(s)}
                    className={`w-full text-left p-3.5 text-xs transition cursor-pointer ${
                      selectedBuilderSuffix?.affix === s.affix
                        ? 'bg-[#F2F0E9] text-[#2C2E28] font-bold border-r-4 border-[#8C9A7E]'
                        : 'text-[#42443D] hover:bg-[#F9F8F5]'
                    }`}
                  >
                    <span className="font-mono text-sm block text-[#2C2E28] font-bold">{s.affix}</span>
                    <span className="text-[#707269] block mt-1 font-medium">{s.meaning}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : activeSegment === 'affixes' ? (
        /* STANDARD PREFIX & SUFFIX DIRECTORY WITH TABLE VIEWS */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A7E]">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                placeholder="Search word root prefix/suffix meanings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E2D9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C9A7E] bg-white text-[#2C2E28]"
              />
            </div>

            <div className="flex bg-[#F2F0E9] p-1 rounded-xl shrink-0 self-start sm:self-center">
              <button
                onClick={() => setAffixTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  affixTypeFilter === 'all' ? 'bg-[#8C9A7E] text-white shadow-sm' : 'text-[#42443D] hover:text-[#2C2E28]'
                }`}
              >
                All Roots
              </button>
              <button
                onClick={() => setAffixTypeFilter('prefix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  affixTypeFilter === 'prefix' ? 'bg-[#8C9A7E] text-white shadow-sm' : 'text-[#42443D] hover:text-[#2C2E28]'
                }`}
              >
                Prefixes Only
              </button>
              <button
                onClick={() => setAffixTypeFilter('suffix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  affixTypeFilter === 'suffix' ? 'bg-[#8C9A7E] text-white shadow-sm' : 'text-[#42443D] hover:text-[#2C2E28]'
                }`}
              >
                Suffixes Only
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E2D9] overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#F9F8F5] text-[#8C9A7E] border-b border-[#E5E2D9]">
                <tr>
                  <th className="px-6 py-4 font-mono font-bold text-xs uppercase tracking-widest text-[#8C9A7E]">Word Element</th>
                  <th className="px-6 py-4 font-mono font-bold text-xs uppercase tracking-widest text-[#8C9A7E]">Type</th>
                  <th className="px-6 py-4 font-mono font-bold text-xs uppercase tracking-widest text-[#8C9A7E]">Theoretical Meanings</th>
                  <th className="px-6 py-4 font-mono font-bold text-xs uppercase tracking-widest text-[#8C9A7E]">Clinical Context Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9]">
                {filteredAffixes.map((item) => (
                  <tr key={item.affix} className="hover:bg-[#F9F8F5]/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-[#2C2E28] font-bold text-sm">
                      {item.affix}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest font-mono ${
                        item.type === 'prefix' 
                          ? 'bg-[#F2F0E9] text-[#8C9A7E]' 
                          : 'bg-[#F2F0E9] text-[#707269]'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#42443D] font-semibold">{item.meaning}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-[#707269] px-2 py-1 bg-[#F9F8F5] rounded border border-[#E5E2D9] font-medium shadow-sm">
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredAffixes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-[#707269] bg-[#F9F8F5] text-sm">
                      No matching medical roots or affixes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CLINICAL SHORTHANDS / ABBREVIATIONS & FLASHCARDS */
        <div className="space-y-8">
          
          {/* Section A: Shorthands interactive Flashcard review */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#2C2E28] p-6 sm:p-8 rounded-[32px] text-white">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-[#D99A6C] uppercase tracking-widest block font-bold">Active Review Deck</span>
              <h4 className="text-xl sm:text-2xl font-serif italic text-white">Shorthand Terminal Flashcards</h4>
              <p className="text-xs text-[#E5E2D9] leading-relaxed">
                Test your medical abbreviation recall. Review the clinical acronym on the card face and click to flip the answer revealing its full expansion.
              </p>
              <div className="flex gap-2 text-xs pt-2">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : ABBREVIATIONS_DATA.length - 1));
                  }}
                  className="px-3 py-1.5 bg-[#8C9A7E] hover:bg-[#728065] text-white rounded-xl text-xs font-semibold tracking-wider font-mono cursor-pointer transition-all animate-[fadeIn_0.1s_ease]"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex((prev) => (prev < ABBREVIATIONS_DATA.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-3.5 py-1.5 bg-[#8C9A7E] hover:bg-[#728065] text-white rounded-xl text-xs font-semibold tracking-wider font-mono cursor-pointer transition-all animate-[fadeIn_0.1s_ease]"
                >
                  Next &rarr;
                </button>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setFlashcardIndex(Math.floor(Math.random() * ABBREVIATIONS_DATA.length));
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold tracking-wider font-mono cursor-pointer transition-all"
                >
                  <RotateCcw className="h-3 w-3 inline mr-1" /> Shuffle
                </button>
              </div>
            </div>

            {/* Flashcard Render */}
            <div className="flex justify-center h-48 w-full max-w-sm mx-auto">
              <div
                className="w-full h-full cursor-pointer relative"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: 1000 }}
              >
                <div
                  className="w-full h-full rounded-2xl transition-all duration-500 shadow-sm transform text-center flex flex-col justify-center items-center border p-6"
                  style={{
                    backgroundColor: isFlipped ? '#F2F0E9' : '#FDFCF9',
                    borderColor: isFlipped ? '#E5E2D9' : '#8C9A7E',
                    color: '#2C2E28',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* CARD FACE */}
                  {!isFlipped ? (
                    <div style={{ backfaceVisibility: 'hidden' }} className="space-y-2">
                      <span className="text-[10px] text-[#8C9A7E] font-mono font-bold uppercase tracking-widest block font-bold">Medical Shorthand</span>
                      <span className="text-4xl font-mono font-bold tracking-tight text-[#2C2E28] block">
                        {ABBREVIATIONS_DATA[flashcardIndex].abbrev}
                      </span>
                      <span className="text-[10px] text-[#707269] block mt-4 font-medium uppercase tracking-wider">Click card to reveal definition</span>
                    </div>
                  ) : (
                    /* CARD BACK */
                    <div 
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      className="space-y-4"
                    >
                      <span className="text-[10px] text-[#D99A6C] font-mono font-bold uppercase tracking-widest block">Clinical Expansion</span>
                      <span className="text-lg font-serif italic text-[#2C2E28] block leading-relaxed max-w-xs font-bold animate-[fadeIn_0.1s_ease]">
                        {ABBREVIATIONS_DATA[flashcardIndex].expansion}
                      </span>
                      <span className="text-[10px] text-[#707269] block mt-2 font-medium uppercase tracking-wider animate-[fadeIn_0.1s_ease]">Click again to flip back</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Shorthand quick lookups index */}
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A7E]">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                placeholder="Search clinical abbreviations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E2D9] rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8C9A7E] text-[#2C2E28]"
              />
            </div>

            <div className="bg-white rounded-[32px] border border-[#E5E2D9] overflow-hidden shadow-sm">
              <div className="p-4 bg-[#F9F8F5] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-widest text-[#8C9A7E] font-mono">
                All Abbreviations Index ({filteredAbbreviations.length})
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-[#E5E2D9] divide-x divide-[#E5E2D9] max-h-[300px] overflow-y-auto bg-white">
                {filteredAbbreviations.map((item) => (
                  <div key={item.abbrev} className="p-4 flex items-center justify-between hover:bg-[#F9F8F5]/30">
                    <span className="font-mono text-sm font-bold text-[#2C2E28]">{item.abbrev}</span>
                    <span className="text-xs text-[#707269] font-semibold text-right max-w-[200px] sm:max-w-xs truncate">
                      {item.expansion}
                    </span>
                  </div>
                ))}
                {filteredAbbreviations.length === 0 && (
                  <div className="col-span-2 py-8 text-center text-[#707269] bg-[#F9F8F5] text-sm">
                    No clinical abbreviations match your parameters.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
