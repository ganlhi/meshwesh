import { getBattleCardByCode } from '@/lib/battle-cards';
import Link from 'next/link';
import { SearchParams, updateQueryString } from '@/lib/routing';

export async function BattleCardLink({
  code,
  note,
  currentSearchParams,
}: {
  code: string;
  note: string | null;
  currentSearchParams: Promise<SearchParams>;
}) {
  const battleCard = await getBattleCardByCode(code);
  if (!battleCard) return <>{code}</>;

  return (
    <>
      <Link
        href={`?${await updateQueryString(currentSearchParams, {
          'battle-card': battleCard.id,
        })}`}
        scroll={false}
      >
        {battleCard.displayName}
      </Link>
      {note && (
        <>
          {' '}
          <span>{note}</span>
        </>
      )}
    </>
  );
}
