import { useState, useMemo } from 'react';
import { MENSTRUAL_PHASES, HORMONE_DATA } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Flame, Calendar, BookOpen, Layers, Shield } from 'lucide-react';

export default function PhysiologyView() {
  const [activeTab, setActiveTab] = useState<'menstrual' | 'hormones'>('menstrual');
  
  // Menstrual cycle day simulation (1 - 28)
  const [cycleDay, setCycleDay] = useState<number>(14);

  // Determine current active phase based on simulated cycle day
  const determinedPhaseIndex = useMemo(() => {
    if (cycleDay >= 1 && cycleDay < 14) return 0; // Follicular
    if (cycleDay === 14) return 1; // Ovulatory
    return 2; // Luteal
  }, [cycleDay]);

  const activePhase = MENSTRUAL_PHASES[determinedPhaseIndex];

  // Simulated hormone concentrations based on cycle day (out of 100)
  const simulatedHormones = useMemo(() => {
    let fsh = 20;
    let lh = 15;
    let estrogen = 10;
    let progesterone = 5;

    if (cycleDay < 14) {
      // Follicular phase
      // FSH starts higher, dips slightly, then rises near ovulation
      fsh = Math.round(25 - (cycleDay * 0.8) + (cycleDay === 13 ? 20 : 0));
      // Estrogen rises steadily to trigger LH surge
      estrogen = Math.round(10 + (cycleDay * 5.5));
      // LH stays low then spikes right at end
      lh = Math.round(15 + (cycleDay === 13 ? 35 : cycleDay * 1.5));
      progesterone = 5;
    } else if (cycleDay === 14) {
      // Ovulation Peak
      fsh = 65;
      lh = 95; // LH Surge !
      estrogen = 90;
      progesterone = 15;
    } else {
      // Luteal phase (15 - 28)
      const lutealDay = cycleDay - 14; // 1 to 14
      fsh = Math.round(12 - (lutealDay * 0.4));
      lh = Math.round(10 - (lutealDay * 0.3));
      // Estrogen rises to secondary mountain and dips
      estrogen = Math.round(35 + Math.sin((lutealDay / 14) * Math.PI) * 25);
      // Progesterone rockets high (produced by corpus luteum) and dips if no fertilization
      progesterone = Math.round(15 + Math.sin((lutealDay / 14) * Math.PI) * 70);
    }

    return { fsh, lh, estrogen, progesterone };
  }, [cycleDay]);

  return (
    <div className="space-y-8" id="physiology-view">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex bg-[#F2F0E9] p-1.5 rounded-xl border border-[#E5E2D9]">
          <button
            onClick={() => setActiveTab('menstrual')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'menstrual'
                ? 'bg-[#8C9A7E] text-white shadow-sm'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/50'
            }`}
          >
            <Calendar className="h-4 w-4" />
            28-Day Menstrual Cycle Labs
          </button>
          <button
            onClick={() => setActiveTab('hormones')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'hormones'
                ? 'bg-[#8C9A7E] text-white shadow-sm'
                : 'text-[#42443D] hover:text-[#2C2E28] hover:bg-white/50'
            }`}
          >
            <Layers className="h-4 w-4" />
            Endocrine Hormone Registry
          </button>
        </div>
      </div>

      {activeTab === 'menstrual' ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2E28] tracking-tight">
              Menstrual Cycle & Hormone Fluctuations
            </h3>
            <p className="text-xs text-[#707269] mt-1.5 font-medium uppercase tracking-wider">
              Slide the day cycle to simulate how FSH, LH, Estrogen, and Progesterone respond dynamically during the cycle.
            </p>
          </div>

          {/* Interactive Lab Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Interactive Simulated Slider & Levels */}
            <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E5E2D9] p-6 space-y-6 shadow-sm">
              
              {/* Day Indicator */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C9A7E] font-mono">Menstrual Timeline</span>
                  <h4 className="text-2xl font-serif italic text-[#2C2E28]">
                    Day {cycleDay} of 28
                  </h4>
                </div>
                <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-mono ${
                  determinedPhaseIndex === 0 ? 'bg-[#8C9A7E]/10 text-[#8C9A7E]' :
                  determinedPhaseIndex === 1 ? 'bg-[#D99A6C]/10 text-[#D99A6C] animate-pulse' :
                  'bg-[#8C9A7E]/5 text-[#707269]'
                }`}>
                  {determinedPhaseIndex === 0 ? 'Follicular Phase' :
                   determinedPhaseIndex === 1 ? 'Ovulatory Surge' :
                   'Luteal Phase'}
                </div>
              </div>

              {/* Slider */}
              <div className="relative pt-4 pb-2">
                <input
                  type="range"
                  min="1"
                  max="28"
                  value={cycleDay}
                  onChange={(e) => setCycleDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#F2F0E9] rounded-lg appearance-none cursor-pointer accent-[#8C9A7E]"
                  id="cycle-day-slider"
                />
                <div className="flex justify-between text-[10px] font-mono font-semibold tracking-widest text-[#707269] mt-2 px-1">
                  <span>Day 1 (Menses)</span>
                  <span className="text-[#D99A6C]">Day 14 (Ovulation)</span>
                  <span>Day 28 (Cycle End)</span>
                </div>
              </div>

              {/* Dynamic Hormone Level Graphs */}
              <div className="space-y-4 pt-3 border-t border-[#E5E2D9]">
                <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8C9A7E]">Simulated Hormone Concentrations</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Estrogen */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-[#F9F8F5] border border-[#E5E2D9]">
                    <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest text-[#2C2E28]">
                      <span>Estrogen</span>
                      <span className="font-mono text-[#8C9A7E]">{simulatedHormones.estrogen}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#8C9A7E] h-full transition-all duration-300" style={{ width: `${simulatedHormones.estrogen}%` }}></div>
                    </div>
                    <span className="text-[10px] text-[#707269] font-medium leading-relaxed block">Aids endometrial regrowth before ovulation.</span>
                  </div>

                  {/* Progesterone */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-[#F9F8F5] border border-[#E5E2D9]">
                    <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest text-[#2C2E28]">
                      <span>Progesterone</span>
                      <span className="font-mono text-[#8C9A7E]">{simulatedHormones.progesterone}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#8C9A7E] h-full transition-all duration-300" style={{ width: `${simulatedHormones.progesterone}%` }}></div>
                    </div>
                    <span className="text-[10px] text-[#707269] font-medium leading-relaxed block">Corpus luteum product; sustains endometrial linings.</span>
                  </div>

                  {/* FSH */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-[#F9F8F5] border border-[#E5E2D9]">
                    <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest text-[#2C2E28]">
                      <span>FSH (Follicle)</span>
                      <span className="font-mono text-[#8C9A7E]">{simulatedHormones.fsh}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#8C9A7E] h-full transition-all duration-300" style={{ width: `${simulatedHormones.fsh}%` }}></div>
                    </div>
                    <span className="text-[10px] text-[#707269] font-medium leading-relaxed block">Pituitary signal triggering follicular maturation.</span>
                  </div>

                  {/* LH */}
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-[#F9F8F5] border border-[#E5E2D9]">
                    <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest text-[#2C2E28]">
                      <span>LH (Luteinizing)</span>
                      <span className="font-mono text-[#8C9A7E]">{simulatedHormones.lh}%</span>
                    </div>
                    <div className="w-full bg-[#E5E2D9] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#8C9A7E] h-full transition-all duration-300" style={{ width: `${simulatedHormones.lh}%` }}></div>
                    </div>
                    <span className="text-[10px] text-[#707269] font-medium leading-relaxed block">Acute surge on Day 14 triggers follicle rupture.</span>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Selected Phase Information */}
            <div className="lg:col-span-5 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.name}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#2C2E28] text-white rounded-[32px] p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm border border-[#2C2E28]"
                >
                  <div>
                    <div className="inline-flex p-2.5 bg-[#8C9A7E]/10 rounded-xl mb-4 text-[#8C9A7E]">
                      <Activity className="h-5 w-5" />
                    </div>
                    
                    <span className="text-[#D99A6C] font-mono text-xs font-semibold uppercase tracking-widest block mb-1">
                      {activePhase.timing}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif italic mb-3 text-white">
                      {activePhase.name}
                    </h4>

                    <p className="text-xs text-[#E5E2D9] leading-relaxed mb-4">
                      {activePhase.description}
                    </p>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <h5 className="text-[10px] font-bold tracking-widest text-[#8C9A7E] uppercase font-mono mb-2">Physiological Pathway Details</h5>
                      <p className="text-xs text-[#E5E2D9] leading-relaxed">
                        {activePhase.details}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-[10px] uppercase font-bold tracking-widest text-[#8C9A7E] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#8C9A7E] animate-ping inline-block"></span>
                    Continuous real-time endocrine simulation
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      ) : (
        /* Endocrine Hormone Registry Tab */
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2E28] tracking-tight">
              Hormone Regulation Registry
            </h3>
            <p className="text-xs text-[#707269] mt-1.5 font-medium uppercase tracking-wider">
              Select any primary hormone to view its synthesis origin, receptor target organs, and exact regulatory actions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HORMONE_DATA.map((hormone) => (
              <div 
                key={hormone.name} 
                className="bg-white rounded-3xl border border-[#E5E2D9] p-5 hover:border-[#8C9A7E] transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif italic font-bold text-[#2C2E28] text-base">{hormone.name}</h4>
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest bg-[#F2F0E9] text-[#8C9A7E]">
                      {hormone.system}
                    </span>
                  </div>

                  <dl className="mt-3 space-y-2 text-xs">
                    <div>
                      <dt className="text-[#8C9A7E] font-bold uppercase tracking-widest text-[9px] font-mono">Gland of Origin</dt>
                      <dd className="text-[#42443D] font-semibold mt-0.5">{hormone.origin}</dd>
                    </div>
                    {hormone.targetOrgan && (
                      <div>
                        <dt className="text-[#8C9A7E] font-bold uppercase tracking-widest text-[9px] font-mono">Target Organ</dt>
                        <dd className="text-[#42443D] font-semibold mt-0.5">{hormone.targetOrgan}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="pt-3 border-t border-[#E5E2D9]">
                  <p className="text-[#707269] text-xs leading-relaxed">
                    {hormone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Special Male Regulation Box directly reflecting slide notes */}
          <div className="bg-[#F2F0E9] border border-[#E5E2D9] rounded-[32px] p-6 md:p-8 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2C2E28] flex items-center gap-2 mb-4 font-mono">
              <Flame className="h-4 w-4 text-[#8C9A7E]" /> Male Hormonal Spermatogenesis Coordination
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
                <span className="font-serif italic font-bold text-[#2C2E28] block text-sm mb-1.5">1. LH Signal</span>
                <p className="text-[#707269] leading-relaxed">
                  LH targets Leydig interstitial cells located between seminiferous tubules of the testes, commanding them to manufacture testosterone.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
                <span className="font-serif italic font-bold text-[#2C2E28] block text-sm mb-1.5">2. FSH Maturation</span>
                <p className="text-[#707269] leading-relaxed">
                  FSH targets testis Sertoli cells, instructing them to differentiate and mature immature germ cells into swimming spermatozoa.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E5E2D9]">
                <span className="font-serif italic font-bold text-[#2C2E28] block text-sm mb-1.5">3. Testosterone Synergy</span>
                <p className="text-[#707269] leading-relaxed">
                  Testosterone works hand-in-hand alongside FSH to drive optimal sperm maturation speeds and maintain general male secondary physical features.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
