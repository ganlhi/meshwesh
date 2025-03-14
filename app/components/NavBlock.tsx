import Link from 'next/link';

type NavBlockProps = {
  href: string;
  number: number;
  title: string;
};

export function NavBlock({ href, number, title }: NavBlockProps) {
  return (
    <Link href={href} className="flex w-3xs flex-col gap-1 hover:text-secondary hover:no-underline">
      <span className="text-[5rem] leading-[1] font-[500]">{number}</span>
      <span className="">{title}</span>
    </Link>
  );
}
