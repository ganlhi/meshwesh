'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image, { StaticImageData } from 'next/image';
import { PropsWithChildren, useState } from 'react';

export function ImageModal({
  children,
  image,
  altText,
}: PropsWithChildren<{ image: StaticImageData; altText: string }>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} transition className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="rounded border border-primary bg-white p-4 shadow-2xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle>{altText}</DialogTitle>
            <Image src={image} alt={altText} width={800} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
