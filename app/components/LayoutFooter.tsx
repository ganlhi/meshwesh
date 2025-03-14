import wgcLogo from '@/app/images/wgc-logo.png';
import Image from 'next/image';
import Link from 'next/link';

export function LayoutFooter() {
  return (
    <footer className="h-28 w-full bg-secondary py-5">
      <div className="container flex h-full gap-4">
        <Image src={wgcLogo} alt="WGC logo" className="block h-auto max-h-full w-auto" />
        <Link href="http://www.wgcwar.com/" className="text-xs leading-4 text-white">
          Copyright 2016-2025 Washington Grand Company
        </Link>
      </div>
    </footer>
  );
}
