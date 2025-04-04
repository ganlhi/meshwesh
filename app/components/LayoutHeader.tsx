import Image from 'next/image';
import Link from 'next/link';
import banner from '@/app/images/meshwesh-banner.png';
import { SearchInput } from '@/app/components/SearchInput';
import { getArmyListsSummaries } from '@/lib/army-lists';

export async function LayoutHeader() {
  const armyLists = await getArmyListsSummaries();

  return (
    <header className="w-full">
      <div className="bg-primary py-5 text-white">
        <div className="container">
          <Link href="/">
            <Image src={banner} alt="Meshwesh" />
          </Link>
        </div>
      </div>
      <div className="bg-secondary py-2.5">
        <div className="container">
          <SearchInput armyLists={armyLists} />
        </div>
      </div>
    </header>
  );
}
