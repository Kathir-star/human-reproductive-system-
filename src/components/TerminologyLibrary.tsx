import { PREFIX_DATA, SUFFIX_DATA, ABBREVIATIONS_DATA } from '../data';
import { useState } from 'react';

export default function TerminologyLibrary() {
  const [tab, setTab] = useState<'prefix' | 'suffix' | 'abbrev'>('prefix');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic text-[#2C2E28]">Linguistic Library</h2>
      
      <div className="flex gap-2 border-b border-[#E5E2D9]">
        {(['prefix', 'suffix', 'abbrev'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition ${
              tab === t ? 'border-[#8C9A7E] text-[#8C9A7E]' : 'border-transparent text-[#707269]'
            }`}
          >
            {t === 'abbrev' ? 'Abbreviations' : t.charAt(0).toUpperCase() + t.slice(1) + 'es'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tab === 'prefix' &&
          PREFIX_DATA.map((item, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-mono font-bold text-[#8C9A7E] mb-2">{item.affix}</h4>
              <p className="text-xs text-[#42443D] mb-2"><span className="font-bold">Meaning:</span> {item.meaning}</p>
              <p className="text-xs text-[#707269]"><span className="font-bold">Example:</span> {item.example}</p>
            </div>
          ))}
        {tab === 'suffix' &&
          SUFFIX_DATA.map((item, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-mono font-bold text-[#8C9A7E] mb-2">{item.affix}</h4>
              <p className="text-xs text-[#42443D] mb-2"><span className="font-bold">Meaning:</span> {item.meaning}</p>
              <p className="text-xs text-[#707269]"><span className="font-bold">Example:</span> {item.example}</p>
            </div>
          ))}
        {tab === 'abbrev' &&
          ABBREVIATIONS_DATA.map((item, i) => (
            <div key={i} className="p-4 bg-white border border-[#E5E2D9] rounded-lg">
              <h4 className="font-mono font-bold text-[#8C9A7E] mb-2">{item.abbrev}</h4>
              <p className="text-xs text-[#42443D]">{item.expansion}</p>
            </div>
          ))}
      </div>
    </div>
  );
}