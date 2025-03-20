import { getBattleCard } from '@/lib/battle-cards';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { NavModal } from '@/app/components/NavModal';
import { redirect } from 'next/navigation';

type BattleCarModalPageParams = { id: string };

export default async function BattleCardModalPage({
  params,
}: {
  params: Promise<BattleCarModalPageParams>;
}) {
  const { id } = await params;
  const battleCard = await getBattleCard(id);
  return battleCard ? (
    <NavModal title={battleCard.displayName} backUrl="/battle-cards">
      <div className="text-sm">
        <MDXRemote source={battleCard.mdText} />
      </div>
    </NavModal>
  ) : (
    redirect('/battle-cards')
  );
}
