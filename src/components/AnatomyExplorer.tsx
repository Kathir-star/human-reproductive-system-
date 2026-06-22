import { ANATOMY_DATA } from '../data';
import { useState } from 'react';

export default function AnatomyExplorer() {
  const [selectedSystem, setSelectedSystem] = useState<'female' | 'male'>('female');
  const [selectedLocation, setSelectedLocation] = useState<'internal' | 'external'>('internal');

  const filtered = ANATOMY_DATA.filter(
    (item) => item.system === selectedSystem && item.location === selectedLocation
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif italic text-[#2C2E28]">Anatomy Explorer</h2>
      
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedSystem}
          onChange={(e) => setSelectedSystem(e.target.value as 'female' | 'male')}
          className="px-4 py-2 border border-[#E5E2D9] rounded-lg bg-white"
        >
          <option value="female">Female System</option>
          <option value="male">Male System</option>
        </select>
        
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value as 'internal' | 'external')}
          className="px-4 py-2 border border-[#E5E2D9] rounded-lg bg-white"
        >
          <option value="internal">Internal Structures</option>
          <option value="external">External Structures</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((structure, i) => (
          <div key={i} className="p-6 bg-white border border-[#E5E2D9] rounded-xl">
            <h3 className="font-serif italic text-lg text-[#2C2E28] mb-2">{structure.name}</h3>
            <p className="text-sm text-[#42443D] leading-relaxed">{structure.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}