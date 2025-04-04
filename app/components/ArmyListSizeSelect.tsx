'use client';

import { ArmyListSize, getArmySizeFromSearchParams } from '@/lib/army-lists';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ArmyListSizeSelect() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const armySizeParam = getArmySizeFromSearchParams(searchParams);
  const [armySize, setArmySize] = useState(armySizeParam);

  return (
    <select
      id="army-size"
      value={armySize}
      onChange={(e) => {
        setArmySize(e.target.value as ArmyListSize);
        push(`?army-size=${e.target.value}`, { scroll: false });
      }}
      className="rounded-sm border border-gray-300 p-2"
    >
      <option value="standard">Standard Triumph</option>
      <option value="grand-three">Grand Triumph (3 Main Army Commands)</option>
      <option value="grand-two">Grand Triumph (2 Main Army Commands)</option>
      <option value="grand-one">Grand Triumph (1 Main Army Command)</option>
      <option value="grand-ally">Grand Triumph (Ally Command)</option>
    </select>
  );
}
