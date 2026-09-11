import About from '@/views/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Sacred Heritage | Al-Madinah Palm Groves Sourcing',
  description: 'Learn the story of Sultan Dates (سلطان) — preserving centuries of date palm cultivation in Al-Madinah Al-Munawwarah and delivering pure organic superfoods.',
  alternates: {
    canonical: 'https://sultandates.com/about',
  },
};

export default function Page() {
  return <About />;
}

