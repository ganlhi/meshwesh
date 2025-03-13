import Image from 'next/image';
import triumphTitle from '@/app/images/triumph-title.png';
import gameImage from '@/app/images/game-image-800.jpg';
import { NavBlock } from '@/app/components/NavBlock';

export default function Home() {
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
        <NavBlock href="/categories" number={40} title="Thematic Categories" />
        <NavBlock href="/troop-types" number={26} title="Troop Types" />
        <NavBlock href="/lists" number={655} title="Army Lists" />
        <NavBlock href="/battle-cards" number={24} title="Battle Cards" />
      </nav>
    </div>
  );
}
