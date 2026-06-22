import { MENSTRUAL_PHASES, HORMONE_DATA } from '../data';
import { useState } from 'react';

export default function PhysiologyView() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic text-[#2C2E28]">Physiology Labs</h2>
      
      <div className="space-y-4">
        <h3 className="font-serif italic text-xl text-[#2C2E28]">Menstrual Cycle Phases</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {MENSTRUAL_PHASES.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`p-4 rounded-lg border transition ${
                activePhase === i
                  ? 'bg-[#8C9A7E] text-white border-[#8C9A7E]'
                  : 'bg-white text-[#42443D] border-[#E5E2D9]'
              }`}
            >
              <div className="font-bold text-sm">{phase.name}</div>
              <div className="text-xs mt-1 opacity-75">{phase.timing}</div>
            </button>
          ))}
        </div>
      </div>

      {MENSTRUAL_PHASES[activePhase] && (
        <div className="bg-white p-6 rounded-xl border border-[#E5E2D9]">
          <h4 className="font-serif italic text-lg text-[#2C2E28] mb-3">{MENSTRUAL_PHASES[activePhase].name}</h4>
          <p className="text-sm text-[#42443D] mb-3">{MENSTRUAL_PHASES[activePhase].description}</p>
          <p className="text-sm text-[#707269]">{MENSTRUAL_PHASES[activePhase].details}</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-serif italic text-xl text-[#2C2E28]">Key Hormones</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {HORMONE_DATA.map((hormone, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-bold text-[#2C2E28] mb-2">{hormone.name}</h4>
              <p className="text-xs text-[#42443D] mb-2"><span className="font-bold">Origin:</span> {hormone.origin}</p>
              <p className="text-xs text-[#42443D]">{hormone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}