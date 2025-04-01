'use client';

import { PropsWithChildren, ReactNode, useState } from 'react';
import { clsx } from 'clsx';

export function ToggleCard({
  header,
  children,
  alwaysOpen,
}: PropsWithChildren<{ header: ReactNode; alwaysOpen?: boolean }>) {
  const [open, setOpen] = useState(alwaysOpen ?? false);
  return (
    <div className="rounded border border-gray-300">
      <header
        className={clsx('peer border-inherit bg-gray-100 p-3 data-[open=true]:border-b', {
          'cursor-pointer': !alwaysOpen,
        })}
        data-open={open}
        onClick={() => {
          if (!alwaysOpen) setOpen((o) => !o);
        }}
      >
        {header}
      </header>
      <section className="h-0 -translate-y-1 overflow-hidden p-0 opacity-0 transition-all duration-200 ease-in-out peer-data-[open=true]:h-max peer-data-[open=true]:translate-y-0 peer-data-[open=true]:p-3 peer-data-[open=true]:opacity-100">
        {children}
      </section>
    </div>
  );
}
