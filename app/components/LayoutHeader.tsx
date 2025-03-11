import Image from 'next/image';
import Link from 'next/link';
import banner from '@/app/images/meshwesh-banner.png';
import { SearchInput } from '@/app/components/SearchInput';
import styles from './LayoutHeader.module.css';

export function LayoutHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <Link href="/">
          <Image src={banner} alt="Meshwesh" />
        </Link>
      </div>
      <div className={styles.searchbar}>
        <SearchInput />
      </div>
    </header>
  );
}
