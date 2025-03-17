import { getBattleCard } from '@/lib/battle-cards';
import { BattleCardModal } from '@/app/components/BattleCardModal';

export default async function BattleCardModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const battleCard = await getBattleCard(id);
  // return <p>BattleCardModalPage {battleCard.displayName}</p>;
  return battleCard ? <BattleCardModal battleCard={battleCard} /> : null;
}
