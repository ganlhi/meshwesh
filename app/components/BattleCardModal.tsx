'use client';

import { BattleCard } from '@/lib/battle-cards';
import { useRouter } from 'next/navigation';
import { Modal } from '@/app/components/Modal';

export function BattleCardModal({ battleCard }: { battleCard: BattleCard }) {
  const { back } = useRouter();

  return (
    <Modal open onOpenChange={back} title={battleCard.displayName}>
      {battleCard.mdText}
    </Modal>
  );
}
