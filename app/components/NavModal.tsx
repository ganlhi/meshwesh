'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@/app/components/Modal';
import { PropsWithChildren } from 'react';

export function NavModal({ title, children }: PropsWithChildren<{ title: string }>) {
  const { back } = useRouter();

  return (
    <Modal open onOpenChange={back} title={title}>
      {children}
    </Modal>
  );
}
