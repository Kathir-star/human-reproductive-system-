import { useState, useMemo } from 'react';
import { DISEASES_DATA, SYMPTOMS_DATA, PROCEDURES_DATA } from '../data';
import { Disease, Symptom, Procedure } from '../types';
import { Search, Compass, ShieldAlert, EyeOff, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PathologyGuide() {
  const [activeTab, setActiveTab] = useState<'diseases' | 'symptoms' | 'procedures'>('diseases');
  const [searchQuery, setSearchQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState<'all' | 'female' | 'male'>('all');
  
  // States for interactive diagnostic assistant simulator
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [activePathology, setActivePathology] = useState<Disease | null>(DISEASES_DATA[0]);
  const [activeProcedure, setActiveProcedure] = useState<Procedure | null>(PROCEDURES_DATA[0]);

  // Filter diseases based on client options
  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter(disease => {
      const matchesSystem = systemFilter === 'all' || disease.system === systemFilter || disease.system === 'both';
      const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (disease.alternativeName && disease.alternativeName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSystem && matchesSearch;
    });
  }, [systemFilter, searchQuery]);

  // Filter symptoms based on search
  const filteredSymptoms = useMemo(() => {
    return SYMPTOMS_DATA.filter(symptom => {
      const matchesSearch = symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            symptom.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSystem = systemFilter === 'all' || symptom.genderContext === systemFilter || symptom.genderContext === 'both';
      return matchesSearch && matchesSystem;
    });
  }, [searchQuery, systemFilter]);

  // Filter procedures based on search
  const filteredProcedures = useMemo(() => {
    return PROCEDURES_DATA.filter(proc => {
      const matchesSearch = proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            proc.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (proc.alternativeName && proc.alternativeName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery]);

  // Handler for toggle active symptom in assistant
  const toggleSymptomSelection = (symptomName: string) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter(name => name !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  // Diagnostic mapping based on chosen symptoms
  const calculatedSuggestions = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];
    
    return DISEASES_DATA.filter(disease => {
      const descLower = disease.description.toLowerCase();
      const titleLower = disease.name.toLowerCase();

      // Simple keywords lookup inside database definitions
      return selectedSymptoms.some(symptom => {
        const sympLower = symptom.toLowerCase();
        if (sympLower === 'amenorrhea') {
          return titleLower.includes('pcod') || descLower.includes('ovarian') || titleLower.includes('ectopic') || descLower.includes('missed');
        }
        if (sympLower === 'anejaculation') {
          return titleLower.includes('erectile') || descLower.includes('impotence');
        }
        if (sympLower === 'dysmenorrhea') {
          return titleLower.includes('fibroid') || descLower.includes('uterus') || descLower.includes('bleeding');
        }
        if (sympLower === 'mastalgia') {
          return titleLower.includes('breast') || descLower.includes('ducts') || descLower.includes('fibrocystic');
        }
        if (sympLower === 'polyuria') {
          return titleLower.includes('prostatic') || titleLower.includes('bph') || descLower.includes('bladder') || titleLower.includes('cystitis') || titleLower.includes('urinary');
        }
        if (sympLower === 'nausea' || sympLower === 'vomiting') {
          return titleLower.includes('ectopic') || descLower.includes('pregnancy');
        }
        if (sympLower === 'dyspareunia') {
          return titleLower.includes('cystitis') || descLower.includes('bladder') || titleLower.includes('std') || descLower.includes('vaginal');
        }
        return false;
      });
    });
  }, [selectedSymptoms]);

  return (
    <div className="space-y-8" id="pathology-guide">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2E28] tracking-tight">
            Pathology & Clinical Procedures
          </h3>
          <p className="text-xs text-[#707269] mt-1.5 font-medium uppercase tracking-wider">
            Analyze clinical definitions for reproductive diseases, physical symptoms, and interventions.
          </p>
        </div>

        {/* System Filter pill */}
        {activeTab !== 'procedures' && (
          <div className="flex bg-[#F2F0E9] p-1 rounded-xl self-start md:self-center">
            <button
              onClick={() => setSystemFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                systemFilter === 'all'
                  ? 'bg-[#8C9A7E] text-white shadow-sm'
                  : 'text-[#42443D] hover:text-[#2C2E28]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSystemFilter('female')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                systemFilter === 'female'
                  ? 'bg-[#8C9A7E] text-white shadow-sm'
                  : 'text-[#42443D] hover:text-[#2C2E28]'
              }`}
            >
              Female Only
            </button>
            <button
              onClick={() => setSystemFilter('male')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                systemFilter === 'male'
                  ? 'bg-[#8C9A7E] text-white shadow-sm'
                  : 'text-[#42443D] hover:text-[#2C2E28]'
              }`}
            >
              Male Only
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Directory Explorer vs Interactive Diagnostic Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Directory explorer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Sub Tab Switcher */}
          <div className="flex border-b border-[#E5E2D9] overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => {
                setActiveTab('diseases');
                setSearchQuery('');
              }}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 sm:px-4 cursor-pointer transition ${
                activeTab === 'diseases'
                  ? 'border-[#8C9A7E] text-[#2C2E28]'
                  : 'border-transparent text-[#707269] hover:text-[#2C2E28]'
              }`}
            >
              Diseases Directory ({filteredDiseases.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('symptoms');
                setSearchQuery('');
              }}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 sm:px-4 cursor-pointer transition ${
                activeTab === 'symptoms'
                  ? 'border-[#8C9A7E] text-[#2C2E28]'
                  : 'border-transparent text-[#707269] hover:text-[#2C2E28]'
              }`}
            >
              Signs & Symptoms ({filteredSymptoms.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('procedures');
                setSearchQuery('');
              }}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 px-3 sm:px-4 cursor-pointer transition ${
                activeTab === 'procedures'
                  ? 'border-[#8C9A7E] text-[#2C2E28]'
                  : 'border-transparent text-[#707269] hover:text-[#2C2E28]'
              }`}
            >
              Clinical Procedures ({filteredProcedures.length})
            </button>
          </div>

          {/* Search bar inside Catalog */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A7E]">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              placeholder={`Search ${activeTab === 'diseases' ? 'pathologies, cancers and STDs' : activeTab === 'symptoms' ? 'clinical indicators and pain states' : 'OB ultrasounds, hysterectomy, and C-sections'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#E5E2D9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C9A7E] bg-white text-[#2C2E28]"
            />
          </div>

          {/* Catalog Render Grid */}
          <AnimatePresence mode="wait">
            {activeTab === 'diseases' ? (
              <motion.div
                key="diseases-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredDiseases.map((disease) => (
                  <button
                    key={disease.name}
                    onClick={() => setActivePathology(disease)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer ${
                      activePathology?.name === disease.name
                        ? 'border-[#8C9A7E] ring-2 ring-[#8C9A7E]/10 bg-[#F2F0E9]/35'
                        : 'border-[#E5E2D9] bg-white hover:border-[#8C9A7E]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-[#2C2E28] font-serif text-sm line-clamp-1">
                          {disease.name}
                        </h4>
                        <span className="text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest bg-[#F2F0E9] text-[#8C9A7E]">
                          {disease.system}
                        </span>
                      </div>

                      {disease.alternativeName && (
                        <span className="text-[10px] font-mono text-[#707269]/70 block mt-1 italic">
                          Alias: {disease.alternativeName}
                        </span>
                      )}

                      <p className="text-xs text-[#42443D] leading-relaxed mt-2.5 line-clamp-3">
                        {disease.description}
                      </p>
                    </div>

                    {disease.clinicalNote && (
                      <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#F2F0E9]/60 text-[#8C9A7E] font-mono inline-block mt-2 self-start truncate max-w-full font-semibold uppercase tracking-widest">
                        Note: {disease.clinicalNote}
                      </span>
                    )}
                  </button>
                ))}
                {filteredDiseases.length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-[#F9F8F5] rounded-2xl text-[#707269] text-sm border border-[#E5E2D9]">
                    No clinical pathologies matched your parameters.
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'symptoms' ? (
              // Symptoms catalog
              <motion.div
                key="symptoms-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredSymptoms.map((symptom) => {
                  const isSelectedForAssistant = selectedSymptoms.includes(symptom.name);
                  return (
                    <div
                      key={symptom.name}
                      onClick={() => toggleSymptomSelection(symptom.name)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3 ${
                        isSelectedForAssistant
                          ? 'border-[#8C9A7E] bg-[#F2F0E9]/35 shadow-sm'
                          : 'border-[#E5E2D9] bg-white hover:border-[#8C9A7E]'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isSelectedForAssistant 
                          ? 'bg-[#8C9A7E] border-[#8C9A7E] text-white' 
                          : 'border-[#E5E2D9] bg-[#F9F8F5]'
                      }`}>
                        {isSelectedForAssistant && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <h4 className="font-semibold text-[#2C2E28] text-sm">{symptom.name}</h4>
                          {symptom.genderContext && symptom.genderContext !== 'both' && (
                            <span className="text-[9px] font-mono text-[#8C9A7E] font-bold uppercase tracking-widest bg-[#F2F0E9] px-1.5 py-0.2 rounded">
                              {symptom.genderContext}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#707269] leading-relaxed mt-1.5">
                          {symptom.definition}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {filteredSymptoms.length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-[#F9F8F5] rounded-2xl text-[#707269] text-sm border border-[#E5E2D9]">
                    No clinical signs or symptoms matched your criteria.
                  </div>
                )}
              </motion.div>
            ) : (
              // Procedures catalog
              <motion.div
                key="procedures-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredProcedures.map((proc) => {
                  return (
                    <button
                      key={proc.name}
                      onClick={() => setActiveProcedure(proc)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-40 cursor-pointer ${
                        activeProcedure?.name === proc.name
                          ? 'border-[#8C9A7E] ring-2 ring-[#8C9A7E]/10 bg-[#F2F0E9]/35'
                          : 'border-[#E5E2D9] bg-white hover:border-[#8C9A7E]'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-[#2C2E28] font-serif text-sm line-clamp-1">
                          {proc.name}
                        </h4>
                        {proc.alternativeName && (
                          <span className="text-[10px] font-mono text-[#707269] block mt-1 italic">
                            Synonym: {proc.alternativeName}
                          </span>
                        )}
                        <p className="text-xs text-[#707269] leading-relaxed mt-2 line-clamp-3">
                          {proc.definition}
                        </p>
                      </div>
                    </button>
                  );
                })}
                {filteredProcedures.length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-[#F9F8F5] rounded-2xl text-[#707269] text-sm border border-[#E5E2D9]">
                    No medical procedures matched your query.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PANEL: Dynamic Diagnostic Sandbox Simulator */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section 1: Symptom Assist sandbox */}
          {activeTab !== 'procedures' ? (
            <div className="bg-[#2C2E28] text-white rounded-[32px] p-6 border border-[#2C2E28] shadow-sm animate-[fadeIn_0.3s_ease]" id="complaints-sandbox">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D99A6C] flex items-center gap-1.5 mb-2 font-mono">
                <Compass className="h-4 w-4" /> Symptom Mapping Sandbox
              </h4>
              <p className="text-[11px] text-[#E5E2D9] leading-relaxed mb-4">
                Select key physical indications (left) to simulate clinical correlations and see textbook differentials.
              </p>

              {selectedSymptoms.length === 0 ? (
                <div className="bg-[#FDFCF9]/5 p-4 rounded-2xl border border-dashed border-white/10 text-center text-xs text-white/50 py-6">
                  <EyeOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  Select symptoms from the left tab to activate dynamic clinical correlations.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Chosen list */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C9A7E] font-mono block mb-2">Active Sign Complaints</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSymptoms.map((symp) => (
                        <span
                          key={symp}
                          onClick={() => toggleSymptomSelection(symp)}
                          className="px-2.5 py-1 bg-[#8C9A7E]/20 border border-[#8C9A7E]/30 rounded-md text-[10px] font-bold text-white cursor-pointer hover:bg-black/30 transition-all font-mono"
                        >
                          {symp} &times;
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Differential feedback */}
                  <div className="bg-[#FDFCF9]/5 p-4 rounded-2xl border border-white/10 space-y-3">
                    <span className="text-[10px] uppercase font-bold text-[#8C9A7E] font-mono block">Syllabus Pathologies Correlated</span>
                    {calculatedSuggestions.length === 0 ? (
                      <p className="text-xs text-[#E5E2D9]/70 italic">
                        No explicit slide pathologies mapped directly to this unique combination under textbook symptoms.
                      </p>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {calculatedSuggestions.map((sug) => (
                          <div key={sug.name} className="py-2 first:pt-0 last:pb-0">
                            <span className="font-semibold text-xs text-white block">{sug.name}</span>
                            <p className="text-[10px] text-[#E5E2D9]/70 mt-0.5 line-clamp-2">{sug.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedSymptoms([])}
                    className="w-full py-2 bg-[#8C9A7E] hover:bg-[#728065] rounded-xl text-xs font-semibold tracking-widest uppercase font-mono transition text-white cursor-pointer"
                  >
                    Clear Complaints Dashboard
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Procedure Detail Highlight */
            <div className="bg-[#2C2E28] text-white rounded-[32px] p-6 border border-[#2C2E28] shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#D99A6C] flex items-center gap-1.5 mb-3 font-mono">
                <Heart className="h-4 w-4" /> Clinical Procedure Highlight
              </h4>
              {activeProcedure ? (
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold font-serif text-white text-base">{activeProcedure.name}</h5>
                    {activeProcedure.alternativeName && (
                      <span className="text-[10px] font-mono text-[#E5E2D9]/70 block mt-1">
                        Synonym: {activeProcedure.alternativeName}
                      </span>
                    )}
                  </div>
                  <div className="p-4 bg-[#FFCFC9]/5 border border-white/10 rounded-2xl leading-relaxed text-xs text-[#E5E2D9]">
                    {activeProcedure.definition}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#E5E2D9]/70 italic">Select any procedure on the left index to display detailed study summaries here.</p>
              )}
            </div>
          )}

          {/* Section 2: Full Clinical detailed view of Selected Pathology */}
          <div className="bg-white rounded-[32px] border border-[#E5E2D9] p-5 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C9A7E] flex items-center gap-1.5 font-mono">
              <ShieldAlert className="h-4 w-4 text-[#D99A6C]" /> Focus-Examination Pathology
            </h4>
            
            {activePathology ? (
              <div className="space-y-4 text-xs" id="active-pathology-panel">
                <div>
                  <h3 className="font-serif italic text-[#2C2E28] text-sm sm:text-base">
                    {activePathology.name}
                  </h3>
                  {activePathology.alternativeName && (
                    <span className="text-[10px] text-[#707269] font-mono italic block mt-0.5">
                      Also called: {activePathology.alternativeName}
                    </span>
                  )}
                </div>

                <div className="p-3.5 bg-[#F9F8F5] rounded-xl text-[#42443D] leading-relaxed border border-[#E5E2D9]">
                  {activePathology.description}
                </div>

                {activePathology.clinicalNote && (
                  <div className="p-3 bg-[#D99A6C]/10 border border-[#D99A6C]/35 rounded-xl text-[#2C2E28]">
                    <span className="font-bold uppercase tracking-wide text-[9px] text-[#D99A6C] block mb-1 font-mono">Pathological Note</span>
                    {activePathology.clinicalNote}
                  </div>
                )}

                <div className="bg-[#F2F0E9] py-2.5 px-3 rounded-xl text-[10px] font-mono text-[#8C9A7E] text-center font-bold tracking-widest uppercase">
                  Target Organ: {activePathology.system === 'both' ? 'Both reproductive systems' : `${activePathology.system} reproductive system`}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#707269] italic">Select any card in the left disease listing to highlight localized pathological reports here.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
