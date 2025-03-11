import wgcLogo from '@/app/images/wgc-logo.png';
import style from './LayoutFooter.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function LayoutFooter() {
  return (
    <footer className={style.footer}>
      <Image src={wgcLogo} alt="WGC logo" />
      <Link href="http://www.wgcwar.com/">Copyright 2016-2025 Washington Grand Company</Link>
    </footer>
  );
}
