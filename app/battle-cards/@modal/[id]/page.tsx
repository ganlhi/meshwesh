import { getBattleCard } from '@/lib/battle-cards';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { NavModal } from '@/app/components/NavModal';

export default async function BattleCardModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const battleCard = await getBattleCard(id);
  return battleCard ? (
    <NavModal title={battleCard.displayName}>
      <div className="text-sm">
        <MDXRemote source={battleCard.mdText} />
      </div>
    </NavModal>
  ) : null;
}
