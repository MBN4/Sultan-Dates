'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingIcons from '@/components/ui/FloatingIcons';
import Preloader from '@/components/ui/Preloader';

export default function StoreLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Preloader />
      <FloatingIcons />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
