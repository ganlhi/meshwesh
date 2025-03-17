import SampleBattleCard from '@/app/images/sample-battle-card.png';
import Image from 'next/image';
import { getBattleCards } from '@/lib/battle-cards';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function BattleCardsPage() {
  const battleCards = await getBattleCards();

  return (
    <article className="container mx-auto mt-4 max-w-3xl py-4">
      <h1>Battle Cards</h1>
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 space-y-3 md:col-span-7 lg:col-span-8">
          <p>
            Battle cards provide special rules that can be used when playing with designated armies.
            They capture some of the unique characteristics of these armies without burdening the
            main rules with lots of exceptions and special cases.
          </p>
          <p>The army lists designate which armies and troops can use battle cards.</p>
          <ul className="space-y-2.5">
            {battleCards.map((battleCard) => (
              <li key={battleCard.id} className="text-2xl">
                <Link href={`/battle-cards/${battleCard.id}`}>{battleCard.displayName}</Link>
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
  );
}
