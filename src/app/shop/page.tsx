import Shop from '@/views/Shop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Royal Dates Collection | Sacred Ajwa, Medjool & Stuffed Delights',
  description: 'Explore Grade A+ date collections: Sacred Ajwa Al-Madinah, Royal Jumbo Medjool, Mabroom, Amber, Sukkari, and Belgian chocolate-stuffed dates.',
  alternates: {
    canonical: 'https://sultandates.com/shop',
  },
};

export default function Page() {
  return <Shop />;
}

