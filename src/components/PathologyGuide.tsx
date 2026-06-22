import { DISEASES_DATA, SYMPTOMS_DATA, PROCEDURES_DATA } from '../data';
import { useState } from 'react';

export default function PathologyGuide() {
  const [tab, setTab] = useState<'diseases' | 'symptoms' | 'procedures'>('diseases');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic text-[#2C2E28]">Pathology & Procedures</h2>
      
      <div className="flex gap-2 border-b border-[#E5E2D9]">
        {(['diseases', 'symptoms', 'procedures'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition ${
              tab === t ? 'border-[#8C9A7E] text-[#8C9A7E]' : 'border-transparent text-[#707269]'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tab === 'diseases' &&
          DISEASES_DATA.map((disease, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-bold text-[#2C2E28] mb-2">{disease.name}</h4>
              <p className="text-xs text-[#42443D] mb-2">{disease.description}</p>
              {disease.clinicalNote && <p className="text-xs text-[#8C9A7E] italic">{disease.clinicalNote}</p>}
            </div>
          ))}
        {tab === 'symptoms' &&
          SYMPTOMS_DATA.map((symptom, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-bold text-[#2C2E28] mb-2">{symptom.name}</h4>
              <p className="text-xs text-[#42443D]">{symptom.definition}</p>
            </div>
          ))}
        {tab === 'procedures' &&
          PROCEDURES_DATA.map((procedure, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-bold text-[#2C2E28] mb-2">{procedure.name}</h4>
              <p className="text-xs text-[#42443D]">{procedure.definition}</p>
            </div>
          ))}
      </div>
    </div>
  );
}