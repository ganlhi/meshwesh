'use client';

import Image, { StaticImageData } from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { Modal } from '@/app/components/Modal';

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
        className="cursor-pointer"
      >
        {children}
      </button>

      <Modal open={open} onOpenChange={setOpen} title={altText}>
        <Image src={image} alt={altText} width={800} />
      </Modal>
    </>
  );
}
