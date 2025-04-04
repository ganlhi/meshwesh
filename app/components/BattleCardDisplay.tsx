'use client';

import { ReactNode, use, useState } from 'react';
import { Modal } from '@/app/components/Modal';

export function BattleCardDisplay({
  battleCardPromise,
}: {
  battleCardPromise: Promise<{ displayName: string; content: ReactNode }>;
}) {
  const battleCard = use(battleCardPromise);
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="cursor-pointer"
      >
        {battleCard.displayName}
      </a>
      <Modal open={open} onOpenChange={setOpen} title={battleCard.displayName}>
        {battleCard.content}
      </Modal>
    </>
  );
}
