import { useState, useEffect, useMemo } from 'react';
import { 
  OBJECTIVES, 
  ANATOMY_DATA, 
  MENSTRUAL_PHASES, 
  DISEASES_DATA, 
  SYMPTOMS_DATA, 
  PROCEDURES_DATA, 
  PREFIX_DATA, 
  SUFFIX_DATA, 
  ABBREVIATIONS_DATA 
} from './data';
import AnatomyExplorer from './components/AnatomyExplorer';
import PhysiologyView from './components/PhysiologyView';
import PathologyGuide from './components/PathologyGuide';
import TerminologyLibrary from './components/TerminologyLibrary';
import AssessmentSuite from './components/AssessmentSuite';
import { 
  BookOpen, 
  Layers, 
  Heart, 
  CheckSquare, 
  FileText, 
  Search, 
  GraduationCap, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ModuleTab = 'overview' | 'anatomy' | 'physiology' | 'pathology' | 'terminology' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Progress tracker state
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('reproductive_system_progress');
    if (saved) {
      try {
        setCompletedMilestones(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const toggleMilestone = (id: string) => {
    const updated = completedMilestones.includes(id)
      ? completedMilestones.filter(x => x !== id)
      : [...completedMilestones, id];
    setCompletedMilestones(updated);
    localStorage.setItem('reproductive_system_progress', JSON.stringify(updated));
  };

  const menuItems = [
    { id: 'overview' as const, label: 'Syllabus Overview', icon: BookOpen, accent: 'border-slate-800' },
    { id: 'anatomy' as const, label: 'Anatomy Explorer', icon: Layers, accent: 'border-rose-455' },
    { id: 'physiology' as const, label: 'Physiology Labs', icon: Heart, accent: 'border-orange-500' },
    { id: 'pathology' as const, label: 'Pathology & Procedures', icon: ClipboardList, accent: 'border-emerald-500' },
    { id: 'terminology' as const, label: 'Linguistic Library', icon: FileText, accent: 'border-blue-600' },
    { id: 'quiz' as const, label: 'Board Assessment', icon: GraduationCap, accent: 'border-purple-600' }
  ];

  // Calculate overall study completion percentage
  const totalMilestones = 8;
  const progressPercent = Math.round((completedMilestones.length / totalMilestones) * 100);

  // Simple global search matches across all slide data
  const searchResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const query = globalSearch.toLowerCase().trim();
    const results: { name: string; type: string; tab: ModuleTab; description: string }[] = [];

    // Search anatomy
    ANATOMY_DATA.forEach(a => {
      if (a.name.toLowerCase().includes(query) || a.definition.toLowerCase().includes(query)) {
        results.push({ name: a.name, type: `${a.system} anatomy`, tab: 'anatomy', description: a.definition });
      }
    });

    // Search phases
    MENSTRUAL_PHASES.forEach(p => {
      if (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) {
        results.push({ name: p.name, type: 'menstrual phase', tab: 'physiology', description: p.description });
      }
    });

    // Search diseases
    DISEASES_DATA.forEach(d => {
      if (d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query)) {
        results.push({ name: d.name, type: `reproduction disease (${d.system})`, tab: 'pathology', description: d.description });
      }
    });

    // Search symptoms
    SYMPTOMS_DATA.forEach(s => {
      if (s.name.toLowerCase().includes(query) || s.definition.toLowerCase().includes(query)) {
        results.push({ name: s.name, type: 'clinical sign / symptom', tab: 'pathology', description: s.definition });
      }
    });

    // Search procedures
    PROCEDURES_DATA.forEach(p => {
      if (p.name.toLowerCase().includes(query) || p.definition.toLowerCase().includes(query)) {
        results.push({ name: p.name, type: 'clinical procedure', tab: 'pathology', description: p.definition });
      }
    });

    // Search affixes
    PREFIX_DATA.forEach(pf => {
      if (pf.affix.toLowerCase().includes(query) || pf.meaning.toLowerCase().includes(query)) {
        results.push({ name: pf.affix, type: 'medical term prefix', tab: 'terminology', description: `Means: ${pf.meaning}. Example: ${pf.example}` });
      }
    });
    SUFFIX_DATA.forEach(sf => {
      if (sf.affix.toLowerCase().includes(query) || sf.meaning.toLowerCase().includes(query)) {
        results.push({ name: sf.affix, type: 'medical term suffix', tab: 'terminology', description: `Means: ${sf.meaning}. Example: ${sf.example}` });
      }
    });

    // Search abbreviations
    ABBREVIATIONS_DATA.forEach(ab => {
      if (ab.abbrev.toLowerCase().includes(query) || ab.expansion.toLowerCase().includes(query)) {
        results.push({ name: ab.abbrev, type: 'clinical abbreviation', tab: 'terminology', description: ab.expansion });
      }
    });

    return results.slice(0, 6);
  }, [globalSearch]);

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#42443D] flex flex-col font-sans" id="study-suite-root">
      {/* GLOBAL BANNER HEADER */}
      <header className="bg-white border-b border-[#E5E2D9] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#8C9A7E] text-white rounded-xl flex items-center justify-center font-serif font-bold text-lg shadow">
              H
            </div>
            <div>
              <h1 className="font-serif italic font-semibold tracking-tight text-[#2C2E28] text-sm sm:text-base leading-none">
                Human Reproductive System
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9A7E] font-mono">
                Training & Assessment Portal
              </span>
            </div>
          </div>

          {/* SEARCH INTERFACE */}
          <div className="hidden md:block relative max-w-md w-full">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C9A7E]">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search definitions (e.g., uterus, BPH, LMP)..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-[#E5E2D9] rounded-full text-xs bg-[#F2F0E9] focus:outline-none focus:ring-2 focus:ring-[#8C9A7E] focus:bg-white transition text-[#42443D]"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#707269] hover:text-[#2C2E28] text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Quick search popup results */}
            <AnimatePresence>
              {globalSearch && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 top-11 bg-white border border-[#E5E2D9] rounded-xl shadow-xl overflow-hidden divide-y divide-[#E5E2D9] max-h-96 overflow-y-auto z-50"
                >
                  {searchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveTab(res.tab);
                        setGlobalSearch('');
                      }}
                      className="w-full text-left p-3.5 hover:bg-[#F2F0E9] transition block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2C2E28] text-xs font-serif italic">{res.name}</span>
                        <span className="text-[9px] font-mono text-[#8C9A7E] capitalize bg-[#F2F0E9] px-1.5 py-0.5 rounded">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#707269] truncate mt-1">{res.description}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick study progress counter on top */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#8C9A7E] block">Syllabus Completion</span>
              <span className="text-xs font-mono font-bold text-[#42443D]">{progressPercent}% complete</span>
            </div>
            <div className="w-16 bg-[#F2F0E9] h-2 rounded-full overflow-hidden border border-[#E5E2D9]">
              <div className="bg-[#8C9A7E] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Hamburger Menu on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#42443D] hover:bg-[#F2F0E9] hover:text-[#2C2E28]"
            id="mobile-menu-hamburger"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE EXPANDED MENU & COMPANION SEARCH */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#E5E2D9]"
          >
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C9A7E]">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search syllabus terminology..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#E5E2D9] rounded-lg text-xs bg-[#F2F0E9]"
                />
              </div>

              {/* Mobile Nav links */}
              <nav className="grid grid-cols-1 gap-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition ${
                      activeTab === item.id
                        ? 'bg-[#8C9A7E] text-white'
                        : 'text-[#42443D] hover:bg-[#F2F0E9] hover:text-[#2C2E28]'
                    }`}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIMARY GRID LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDE BAR NAVIGATION */}
        <nav className="hidden md:block md:col-span-3 bg-[#F2F0E9] p-5 rounded-2xl border border-[#E5E2D9] space-y-1.5 shadow-sm sticky top-24">
          <div className="pb-3 border-b border-[#E5E2D9] mb-3 px-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9A7E] font-mono">
              CURRICULUM MODULES
            </span>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setGlobalSearch('');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-[#8C9A7E] text-white shadow'
                  : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white'
              }`}
            >
              <item.icon className={`h-4.5 w-4.5 shrink-0`} />
              <span>{item.label}</span>
              {activeTab === item.id && <ArrowRight className="h-3 w-3 ml-auto animate-pulse" />}
            </button>
          ))}

          {/* Checklist indicator */}
          <div className="pt-4 border-t border-[#E5E2D9] mt-6 px-2 space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8C9A7E] block font-mono">
              Milestone Checklist ({completedMilestones.length}/{totalMilestones})
            </span>
            <div className="space-y-1 text-[11px] text-[#42443D]">
              {[
                { id: 'm1', label: 'Female Anatomy' },
                { id: 'm2', label: 'Male Anatomy' },
                { id: 'm3', label: 'Menstrual Phases' },
                { id: 'm4', label: 'Hormonal pathways' },
                { id: 'm5', label: 'Reproductive Diseases' },
                { id: 'm6', label: 'Symptoms & Procedures' },
                { id: 'm7', label: 'Linguistic Roots' },
                { id: 'm8', label: 'Board Certification' },
              ].map(milestone => (
                <label key={milestone.id} className="flex items-center gap-2 cursor-pointer py-0.5 hover:text-[#2C2E28]">
                  <input
                    type="checkbox"
                    checked={completedMilestones.includes(milestone.id)}
                    onChange={() => toggleMilestone(milestone.id)}
                    className="rounded border-[#E5E2D9] text-[#8C9A7E] focus:ring-[#8C9A7E] cursor-pointer"
                  />
                  <span className={completedMilestones.includes(milestone.id) ? 'line-through text-[#8C9A7E]/50' : ''}>
                    {milestone.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </nav>

        {/* STUDY SUITE ACTIVE CONTENT */}
        <section className="col-span-1 md:col-span-9" id="active-study-pane">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="bg-transparent"
            >
              
              {/* Tab 1: Syllabus Overview / Slides Introduction */}
              {activeTab === 'overview' && (
                <div className="space-y-8" id="overview-suite">
                  {/* HERO HEADER */}
                  <div className="relative overflow-hidden bg-[#2C2E28] text-white rounded-[32px] p-6 sm:p-10 shadow-lg border border-[#E5E2D9]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C9A7E] rounded-full filter blur-3xl opacity-20 transform translate-x-12 -translate-y-6"></div>
                    <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-[#D99A6C] rounded-full filter blur-3xl opacity-20"></div>

                    <div className="relative space-y-4 max-w-2xl">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8C9A7E]/20 rounded-full text-xs font-semibold text-[#8C9A7E] tracking-wide border border-[#8C9A7E]/30">
                        <Sparkles className="h-3.5 w-3.5 text-[#8C9A7E]" /> Interactive Curriculum
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-serif italic tracking-tight text-white">
                        The Reproductive System
                      </h2>
                      <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                        An elaborate biological study portal on gendered anatomical structures, physiological endocrine signals, gestational prep, common pathologies, medical terminologies, and diagnostic clinical procedures.
                      </p>
                    </div>
                  </div>

                  {/* DOUBLE COLUMN: ESSENTIAL STATEMENTS & LABELS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-[32px] border border-[#E5E2D9] p-6 sm:p-8 space-y-4 shadow-sm">
                      <h4 className="font-serif italic text-lg text-[#2C2E28] border-b border-[#E5E2D9] pb-2 flex items-center gap-2">
                        ♀ Female System Function
                      </h4>
                      <p className="text-[#42443D] text-xs sm:text-sm leading-relaxed">
                        Functions to produce fertile egg cells (ova), synthesize primary sex hormones, facilitate gamete transport paths, and provide a secure, protected, and fully nourished uterine womb environments to foster a developing fetus from fertilization until childbirth.
                      </p>
                    </div>

                    <div className="bg-white rounded-[32px] border border-[#E5E2D9] p-6 sm:p-8 space-y-4 shadow-sm">
                      <h4 className="font-serif italic text-lg text-[#2C2E28] border-b border-[#E5E2D9] pb-2 flex items-center gap-2">
                        ♂ Male System Function
                      </h4>
                      <p className="text-[#42443D] text-xs sm:text-sm leading-relaxed">
                        Functions to produce and mature swimming haploid spermatozoa (sperm) and deliver them (via ejaculation fluids) directly into the female reproductive birth canal to promote genetic fusion and conception.
                      </p>
                    </div>
                  </div>

                  {/* CURRICULUM OBJECTIVES */}
                  <div className="bg-white rounded-[32px] border border-[#E5E2D9] p-6 sm:p-8 space-y-4 shadow-sm">
                    <h3 className="text-[#2C2E28] font-serif italic text-xl flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-[#8C9A7E]" /> Key Curriculum Objectives
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {OBJECTIVES.map((obj, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm text-[#42443D] leading-relaxed">
                          <span className="w-5 h-5 bg-[#F2F0E9] text-[#2C2E28] font-serif italic font-bold items-center justify-center rounded-full flex text-xs shrink-0 select-none">
                            {i + 1}
                          </span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* QUICK STATS/SUITE HIGHLIGHTS SUMMARY */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 bg-white border border-[#E5E2D9] rounded-[24px] text-center shadow-sm">
                      <span className="text-2xl font-bold font-serif text-[#2C2E28]">{ANATOMY_DATA.length}</span>
                      <span className="text-[10px] text-[#8C9A7E] block uppercase font-bold tracking-widest mt-1">Anatomy Structures</span>
                    </div>
                    <div className="p-5 bg-white border border-[#E5E2D9] rounded-[24px] text-center shadow-sm">
                      <span className="text-2xl font-bold font-serif text-[#2C2E28]">{DISEASES_DATA.length}</span>
                      <span className="text-[10px] text-[#8C9A7E] block uppercase font-bold tracking-widest mt-1">Syllabus Pathologies</span>
                    </div>
                    <div className="p-5 bg-white border border-[#E5E2D9] rounded-[24px] text-center shadow-sm">
                      <span className="text-2xl font-bold font-serif text-[#2C2E28]">{PREFIX_DATA.length + SUFFIX_DATA.length}</span>
                      <span className="text-[10px] text-[#8C9A7E] block uppercase font-bold tracking-widest mt-1">Linguistic Roots</span>
                    </div>
                    <div className="p-5 bg-white border border-[#E5E2D9] rounded-[24px] text-center shadow-sm">
                      <span className="text-2xl font-bold font-serif text-[#2C2E28]">{ABBREVIATIONS_DATA.length}</span>
                      <span className="text-[10px] text-[#8C9A7E] block uppercase font-bold tracking-widest mt-1">Shorthand Codes</span>
                    </div>
                  </div>

                  {/* MAIN CALL TO ACTION */}
                  <div className="bg-[#F2F0E9] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#E5E2D9]">
                    <div>
                      <h4 className="font-semibold text-[#2C2E28] text-xs sm:text-sm">Ready to begin study simulations?</h4>
                      <p className="text-xs text-[#707269] mt-1">Choose any tab or milestone on the left directory to run interactive visual workflows.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('anatomy')}
                      className="px-5 py-2 bg-[#8C9A7E] hover:bg-[#718063] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer transition text-center"
                    >
                      Enter Anatomy Explorer <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Anatomy Explorer Component */}
              {activeTab === 'anatomy' && <AnatomyExplorer />}

              {/* Tab 3: Physiology & Cycle Simulator */}
              {activeTab === 'physiology' && <PhysiologyView />}

              {/* Tab 4: Pathology & Clinical Procedures Registry */}
              {activeTab === 'pathology' && <PathologyGuide />}

              {/* Tab 5: Terminology Library & Compiler */}
              {activeTab === 'terminology' && <TerminologyLibrary />}

              {/* Tab 6: Interactive Quiz assessments */}
              {activeTab === 'quiz' && <AssessmentSuite />}

            </motion.div>
          </AnimatePresence>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E5E2D9] py-6 mt-12 text-center text-xs text-[#707269]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Human Reproductive System Study Guide. Generated strictly from slide textbook syllabi.</p>
          <p className="text-[10px] text-[#8C9A7E] mt-1 leading-relaxed">
            Provided strictly as a medical educational resource. All diagnostic algorithms and terminology compiles directly with standardized gynecological & andrological curriculum.
          </p>
        </div>
      </footer>
    </div>
  );
}
