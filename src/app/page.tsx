import Home from '@/views/Home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sultan Dates (سلطان) | Sacred Ajwa & Royal Medjool Harvest',
  description: 'Buy premium organic dates in Pakistan. Authentic Ajwa Al-Madinah, Royal King Medjool, Amber, Sukkari, and luxury chocolate-stuffed dates delivered fresh to your doorstep.',
  alternates: {
    canonical: 'https://sultandates.com',
  },
};

export default function Page() {
  return <Home />;
}

