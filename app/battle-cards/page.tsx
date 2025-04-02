import SampleBattleCard from '@/app/images/sample-battle-card.png';
import Image from 'next/image';
import { getBattleCards } from '@/lib/battle-cards';
import Link from 'next/link';
import { getSingleStringFromSearchParams, SearchParams, updateQueryString } from '@/lib/routing';
import { NavModal } from '@/app/components/NavModal';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BattleCardsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const battleCards = await getBattleCards();

  const displayedBattleCard = await getSingleStringFromSearchParams(searchParams, 'battle-card');
  const battleCard = displayedBattleCard
    ? battleCards.find((b) => b.id === displayedBattleCard)
    : undefined;

  return (
    <>
      <article className="container mx-auto mt-4 max-w-3xl py-4">
        <h1>Battle Cards</h1>
        <div className="grid grid-cols-12 gap-8">
          <section className="col-span-12 space-y-3 md:col-span-7 lg:col-span-8">
            <p>
              Battle cards provide special rules that can be used when playing with designated
              armies. They capture some of the unique characteristics of these armies without
              burdening the main rules with lots of exceptions and special cases.
            </p>
            <p>The army lists designate which armies and troops can use battle cards.</p>
            <ul className="space-y-2.5">
              {battleCards.map(async (battleCard) => (
                <li key={battleCard.id} className="text-2xl">
                  <Link
                    href={`?${await updateQueryString(searchParams, {
                      'battle-card': battleCard.id,
                    })}`}
                  >
                    {battleCard.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <Image
            src={SampleBattleCard}
            alt="Sample battle card"
            className="hidden md:col-span-5 md:block lg:col-span-4"
            priority
          />
        </div>
      </article>
      {battleCard && (
        <NavModal
          title={battleCard.displayName}
          backUrl={`?${await updateQueryString(searchParams, { 'battle-card': undefined })}`}
        >
          <div className="text-sm">
            <MDXRemote source={battleCard.mdText} />
          </div>
        </NavModal>
      )}
    </>
  );
}
