import styles from './LayoutHeader.module.css';
import Image from 'next/image';
import banner from '@/app/images/meshwesh-banner.png';
import Link from 'next/link';

export function LayoutHeader() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={banner} alt="Meshwesh" />
      </Link>
    </header>
  );
}
