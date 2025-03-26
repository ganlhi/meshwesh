'use client';

import { PropsWithChildren, useState } from 'react';

export function ToggleTitle({ title, children }: PropsWithChildren<{ title: string }>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h3
        className="peer cursor-pointer text-primary"
        data-open={open}
        onClick={() => {
          setOpen((o) => !o);
        }}
      >
        {title}
      </h3>
      <p className="h-0 -translate-y-1 rounded border border-gray-300 p-0 opacity-0 transition-all duration-200 ease-in-out peer-data-[open=false]:mb-0 peer-data-[open=true]:h-max peer-data-[open=true]:translate-y-0 peer-data-[open=true]:p-2 peer-data-[open=true]:opacity-100">
        {children}
      </p>
    </>
  );
}
