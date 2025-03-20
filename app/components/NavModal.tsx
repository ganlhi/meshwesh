'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@/app/components/Modal';
import { PropsWithChildren } from 'react';

export function NavModal({
  title,
  backUrl,
  children,
}: PropsWithChildren<{ title: string; backUrl: string }>) {
  const { push } = useRouter();

  return (
    <Modal open onOpenChange={() => push(backUrl)} title={title}>
      {children}
    </Modal>
  );
}
