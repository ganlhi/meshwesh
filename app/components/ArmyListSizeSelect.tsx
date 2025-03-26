'use client';

import { ArmyListSize } from '@/app/army-lists/types';
import { useRouter } from 'next/navigation';

export function ArmyListSizeSelect({ armySize }: { armySize: ArmyListSize }) {
  const { push } = useRouter();
  return (
    <select
      id="army-size"
      value={armySize}
      onChange={(e) => {
        push(`?army-size=${e.target.value}`);
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
