import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { LayoutHeader } from '@/app/components/LayoutHeader';
import { LayoutFooter } from '@/app/components/LayoutFooter';

export const metadata: Metadata = {
  title: 'Meshwesh',
  description: 'Army List Explorer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutHeader />
        <main>{children}</main>
        <LayoutFooter />
      </body>
    </html>
  );
}
