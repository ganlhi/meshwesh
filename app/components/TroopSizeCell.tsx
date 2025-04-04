'use client';

import { useSearchParams } from 'next/navigation';
import { getArmySizeFromSearchParams } from '@/lib/army-lists';

export function TroopSizeCell({ size }: { size: number }) {
  const searchParams = useSearchParams();
  const armySize = getArmySizeFromSearchParams(searchParams);

  let sizeMult = 1;
  if (armySize === 'grand-two') sizeMult = 2;
  if (armySize === 'grand-three') sizeMult = 3;

  return <>{size * sizeMult}</>;
}
