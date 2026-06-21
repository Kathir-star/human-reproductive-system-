import { useState, useMemo } from 'react';
import { ANATOMY_DATA, DISEASES_DATA } from '../data';
import { AnatomicalStructure } from '../types';
import { Search, Eye, Filter, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AnatomyExplorer() {
  const [selectedSystem, setSelectedSystem] = useState<'female' | 'male'>('female');
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'internal' | 'external'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStructure, setActiveStructure] = useState<AnatomicalStructure | null>(
    ANATOMY_DATA.find(t => t.system === 'female') || null
  );

  // Filter anatomy based on filters and search
  const filteredStructures = useMemo(() => {
    return ANATOMY_DATA.filter(item => {
      const matchesSystem = item.system === selectedSystem;
      const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSystem && matchesLocation && matchesSearch;
    });
  }, [selectedSystem, selectedLocation, searchQuery]);

  // Cross link selected anatomy to diseases
  const associatedDiseases = useMemo(() => {
    if (!activeStructure) return [];
    const nameLower = activeStructure.name.toLowerCase();
    
    return DISEASES_DATA.filter(disease => {
      const descLower = disease.description.toLowerCase();
      const titleLower = disease.name.toLowerCase();
      
      // Heuristics for cross-referencing
      if (nameLower.includes('ovaries') || nameLower.includes('ovary')) {
        return titleLower.includes('ovarian') || descLower.includes('ovaries') || descLower.includes('ovary');
      }
      if (nameLower.includes('uterus') || nameLower.includes('endometrium') || nameLower.includes('cervix')) {
        return titleLower.includes('uterine') || titleLower.includes('endometrial') || titleLower.includes('cervix') || descLower.includes('uterus') || descLower.includes('cervix');
      }
      if (nameLower.includes('breast')) {
        return titleLower.includes('breast') || descLower.includes('breast');
      }
      if (nameLower.includes('prostate')) {
        return titleLower.includes('prostate') || descLower.includes('prostate');
      }
      if (nameLower.includes('testicles') || nameLower.includes('testes')) {
        return titleLower.includes('testicular') || descLower.includes('testicle');
      }
      if (nameLower.includes('vagina') || nameLower.includes('urethra') || nameLower.includes('bladder')) {
        return titleLower.includes('cystitis') || descLower.includes('vagina') || descLower.includes('urethra') || descLower.includes('bladder') || titleLower.includes('urinary tract');
      }
      return false;
    });
  }, [activeStructure]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="anatomy-explorer">
      {/* LEFT PANEL: Filters and Directory list */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        {/* Toggle between Male & Female Systems */}
        <div className="bg-[#F2F0E9] p-1 rounded-xl flex">
          <button
            id="anatomy-female-toggle"
            onClick={() => {
              setSelectedSystem('female');
              setSearchQuery('');
              const firstFemale = ANATOMY_DATA.find(t => t.system === 'female');
              if (firstFemale) setActiveStructure(firstFemale);
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              selectedSystem === 'female'
                ? 'bg-[#8C9A7E] text-white shadow-md'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/50'
            }`}
          >
            ♀ Female Anatomy
          </button>
          <button
            id="anatomy-male-toggle"
            onClick={() => {
              setSelectedSystem('male');
              setSearchQuery('');
              const firstMale = ANATOMY_DATA.find(t => t.system === 'male');
              if (firstMale) setActiveStructure(firstMale);
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              selectedSystem === 'male'
                ? 'bg-[#8C9A7E] text-white shadow-md'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/50'
            }`}
          >
            ♂ Male Anatomy
          </button>
        </div>

        {/* Search & Location Filter */}
        <div className="bg-white rounded-xl border border-[#E5E2D9] p-4 space-y-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C9A7E]">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder={`Search ${selectedSystem} anatomy...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E2D9] rounded-lg text-sm bg-white text-[#2C2E28] focus:outline-none focus:ring-2 focus:ring-[#8C9A7E]"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E5E2D9]">
            <span className="text-[#42443D] font-medium flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter by:
            </span>
            <div className="flex gap-1">
              {(['all', 'external', 'internal'] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer capitalize transition ${
                    selectedLocation === loc
                      ? 'bg-[#8C9A7E] text-white'
                      : 'bg-[#F2F0E9] text-[#42443D] hover:bg-[#E5E2D9]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Structure List */}
        <div className="bg-white rounded-xl border border-[#E5E2D9] overflow-hidden flex-1 max-h-[460px] overflow-y-auto">
          <div className="p-3 bg-[#F2F0E9] border-b border-[#E5E2D9] text-xs font-bold uppercase tracking-wider text-[#707269]">
            {selectedSystem} {selectedLocation !== 'all' ? selectedLocation : ''} Structures ({filteredStructures.length})
          </div>
          {filteredStructures.length === 0 ? (
            <div className="p-8 text-center text-[#707269] text-sm">
              No matching anatomical structures found.
            </div>
          ) : (
            <div className="divide-y divide-[#E5E2D9]">
              {filteredStructures.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveStructure(item)}
                  className={`w-full text-left p-4 hover:bg-[#F9F8F5] transition-all flex items-center justify-between cursor-pointer ${
                    activeStructure?.name === item.name 
                      ? 'border-l-4 border-[#8C9A7E] bg-[#F2F0E9]/30' 
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-[#2C2E28] text-sm">{item.name}</h4>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F2F0E9] text-[#8C9A7E]">
                      {item.location}
                    </span>
                  </div>
                  <Eye className={`h-4 w-4 ${activeStructure?.name === item.name ? 'text-[#8C9A7E]' : 'text-[#E5E2D9]'}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Anatomy detailed visual readout card */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {activeStructure ? (
            <motion.div
              key={activeStructure.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[32px] border border-[#E5E2D9] p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm"
            >
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F0E9] rounded-full text-xs font-bold uppercase tracking-widest text-[#8C9A7E]`}>
                    <Sparkles className="h-3.5 w-3.5" />
                    {activeStructure.system === 'female' ? 'Female reproductive' : 'Male reproductive'}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#707269] capitalize">
                    {activeStructure.location} Anatomy
                  </span>
                </div>

                {/* Structure Name */}
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#2C2E28] tracking-tight mb-4 animate-[fadeIn_0.3s_ease]">
                  {activeStructure.name}
                </h3>

                {/* Anatomical diagram representation */}
                <div className="relative h-44 w-full rounded-2xl bg-[#F9F8F5] border border-dashed border-[#E5E2D9] mb-6 flex items-center justify-center overflow-hidden">
                  {activeStructure.system === 'female' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#8C9A7E]/10 absolute blur-xl opacity-40 animate-pulse"></div>
                      <svg className="w-32 h-32 text-[#8C9A7E] opacity-70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M50 20 C25 20, 20 40, 50 40 C80 40, 75 20, 50 20 Z" fill="rgba(140, 154, 126, 0.05)" />
                        <path d="M15 25 C15 25, 30 25, 35 30" strokeLinecap="round" />
                        <path d="M85 25 C85 25, 70 25, 65 30" strokeLinecap="round" />
                        <circle cx="12" cy="25" r="5" fill="rgba(217, 154, 108, 0.2)" stroke="#D99A6C" />
                        <circle cx="88" cy="25" r="5" fill="rgba(217, 154, 108, 0.2)" stroke="#D99A6C" />
                        <path d="M50 40 L50 80" strokeDasharray="3 3" />
                        <line x1="42" y1="55" x2="58" y2="55" />
                        <line x1="40" y1="70" x2="60" y2="70" />
                        <circle cx="50" cy="83" r="3" fill="currentColor" />
                      </svg>
                      <div className="absolute bottom-2 text-[10px] font-mono text-[#707269] bg-white px-2.5 py-0.5 rounded border border-[#E5E2D9]">
                        Gyn-Anatomic cross section simulation
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#8C9A7E]/10 absolute blur-xl opacity-40 animate-pulse"></div>
                      <svg className="w-32 h-32 text-[#8C9A7E] opacity-70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="40" cy="70" r="12" fill="rgba(140, 154, 126, 0.05)" />
                        <circle cx="60" cy="70" r="12" fill="rgba(140, 154, 126, 0.05)" />
                        <path d="M40 58 C40 40, 50 30, 50 15" strokeLinecap="round" />
                        <path d="M60 58 C60 40, 50 30, 50 15" strokeLinecap="round" />
                        <line x1="50" y1="15" x2="50" y2="75" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="50" cy="15" r="6" fill="rgba(217, 154, 108, 0.1)" stroke="#D99A6C" />
                      </svg>
                      <div className="absolute bottom-2 text-[10px] font-mono text-[#707269] bg-white px-2.5 py-0.5 rounded border border-[#E5E2D9]">
                        Andro-Anatomic cross section simulation
                      </div>
                    </div>
                  )}
                </div>

                {/* Definition */}
                <h5 className="text-xs font-bold uppercase tracking-widest text-[#8C9A7E] mb-2 font-mono">Functional Definition</h5>
                <p className="text-[#42443D] leading-relaxed text-sm sm:text-base border-l-2 border-[#8C9A7E] pl-4 mb-6">
                  {activeStructure.definition}
                </p>
              </div>

              {/* Pathology link section */}
              {associatedDiseases.length > 0 && (
                <div className="mt-auto pt-6 border-t border-[#E5E2D9]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D99A6C] flex items-center gap-1.5 mb-2.5 font-mono">
                    <ShieldAlert className="h-4 w-4" /> Associated Pathological Conditions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {associatedDiseases.map((disease) => (
                      <div key={disease.name} className="p-3 bg-[#F9F8F5] rounded-xl text-xs border border-[#E5E2D9]">
                        <span className="font-semibold text-[#2C2E28] block mb-0.5">{disease.name}</span>
                        <span className="text-[#707269] block truncate">{disease.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="h-full bg-[#F9F8F5] rounded-[32px] flex flex-col items-center justify-center p-8 text-center text-[#707269] border border-[#E5E2D9]">
              <Eye className="h-10 w-10 mb-2 opacity-50 text-[#8C9A7E]" />
              <p className="text-sm font-medium">Select an anatomical structure from the left directory to examine its functional definition.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
