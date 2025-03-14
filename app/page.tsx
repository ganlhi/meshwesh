import Image from 'next/image';
import triumphTitle from '@/app/images/triumph-title.png';
import gameImage from '@/app/images/game-image-800.jpg';
import { NavBlock } from '@/app/components/NavBlock';
import prisma from '@/lib/prisma';

export default async function HomePage() {
  const nbThematicCategories = await prisma.thematiccategories.count();
  const nbTroopTypes = await prisma.trooptypes.count();
  const nbArmyLists = await prisma.armylists.count();
  const nbBattleCards = await prisma.battlecards.count();

  return (
    <div className="container flex flex-col gap-11 py-4">
      <article className="grid grid-cols-1 gap-8 md:grid-cols-[4fr_8fr]">
        <section className="space-y-3">
          <p>
            Meshwesh is the online database for Triumph army lists. You can find armies by looking
            through the thematic categories, searching for army lists by name, or by following the
            links that connect armies with their enemies and related lists.
          </p>
          <p>Meshwesh now includes the battle cards available to many armies.</p>
        </section>
        <Image src={gameImage} alt="Game illustration" className="block h-auto max-w-full" />
      </article>
      <Image src={triumphTitle} alt="Triumph!" className="block h-auto w-full md:w-lg" />
      <nav className="flex flex-col gap-4 md:flex-row [&>*]:flex-1">
        <NavBlock href="/categories" number={nbThematicCategories} title="Thematic Categories" />
        <NavBlock href="/troop-types" number={nbTroopTypes} title="Troop Types" />
        <NavBlock href="/lists" number={nbArmyLists} title="Army Lists" />
        <NavBlock href="/battle-cards" number={nbBattleCards} title="Battle Cards" />
      </nav>
    </div>
  );
}
