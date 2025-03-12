import Image from 'next/image';
import Link from 'next/link';
import banner from '@/app/images/meshwesh-banner.png';
import { SearchInput } from '@/app/components/SearchInput';
import styles from './LayoutHeader.module.css';
import common from '../common.module.css';
import cx from 'classnames';

export function LayoutHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <div className={cx(styles.container, common.container)}>
          <Link href="/">
            <Image src={banner} alt="Meshwesh" />
          </Link>
        </div>
      </div>
      <div className={styles.searchbar}>
        <div className={common.container}>
          <SearchInput />
        </div>
      </div>
    </header>
  );
}
