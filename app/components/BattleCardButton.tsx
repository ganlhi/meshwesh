import { getBattleCardByCode } from '@/lib/battle-cards';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import { BattleCardDisplay } from '@/app/components/BattleCardDisplay';

export function BattleCardButton({ code, note }: { code: string; note: string | null }) {
  const battleCard = getBattleCardByCode(code).then((bc) =>
    bc
      ? { displayName: bc.displayName, content: <MDXRemote source={bc.mdText} /> }
      : { displayName: code, content: <p className="text-red-500">Error loading battle card</p> },
  );

  return (
    <Suspense>
      <BattleCardDisplay battleCardPromise={battleCard} />
      {note && (
        <>
          {' '}
          <span>{note}</span>
        </>
      )}
    </Suspense>
  );
}
