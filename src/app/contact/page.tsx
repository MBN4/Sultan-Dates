import Contact from '@/views/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Royal Concierge & Corporate Gifting | Contact Sultan Dates',
  description: 'Connect with Sultan Dates for orders, corporate Eid hampers, custom gift boxes, and wholesale inquiries via WhatsApp and direct desk.',
  alternates: {
    canonical: 'https://sultandates.com/contact',
  },
};

export default function Page() {
  return <Contact />;
}

