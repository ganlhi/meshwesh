import styles from './NavBlock.module.css';
import Link from 'next/link';

type NavBlockProps = {
  href: string;
  number: number;
  title: string;
};

export function NavBlock({ href, number, title }: NavBlockProps) {
  return (
    <Link href={href} className={styles.navblock}>
      <span>{number}</span>
      <span>{title}</span>
    </Link>
  );
}
