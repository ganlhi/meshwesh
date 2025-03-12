import Image from 'next/image';
import triumphTitle from '@/app/images/triumph-title.png';
import gameImage from '@/app/images/game-image-800.jpg';
import { NavBlock } from '@/app/components/NavBlock';
import styles from './page.module.css';
import common from './common.module.css';
import cx from 'classnames';

export default function Home() {
  return (
    <div className={cx(styles.page, common.container)}>
      <article>
        <p>
          Meshwesh is the online database for Triumph army lists. You can find armies by looking
          through the thematic categories, searching for army lists by name, or by following the
          links that connect armies with their enemies and related lists.
        </p>
        <p>Meshwesh now includes the battle cards available to many armies.</p>
        <Image src={gameImage} alt="Game illustration" />
      </article>
      <Image src={triumphTitle} alt="Triumph!" />
      <nav>
        <NavBlock href="/categories" number={40} title="Thematic Categories" />
        <NavBlock href="/troop-types" number={26} title="Troop Types" />
        <NavBlock href="/lists" number={655} title="Army Lists" />
        <NavBlock href="/battle-cards" number={24} title="Battle Cards" />
      </nav>
    </div>
  );
}
