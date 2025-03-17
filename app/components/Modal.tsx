'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren, ReactNode } from 'react';

export function Modal({
  children,
  title,
  open,
  onOpenChange,
}: PropsWithChildren<Pick<Dialog.DialogProps, 'open' | 'onOpenChange'> & { title?: ReactNode }>) {
  return (
    <Dialog.Root open={open} modal onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 flex max-h-[85vh] w-[90vw] max-w-xl -translate-1/2 flex-col rounded border border-primary bg-white p-4 shadow-2xl">
          {title && <Dialog.Title>{title}</Dialog.Title>}
          <Dialog.Description className="flex-1 overflow-y-auto">{children}</Dialog.Description>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-4 cursor-pointer" aria-label="Close">
              ╳
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
