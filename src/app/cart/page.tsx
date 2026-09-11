import Cart from '@/views/Cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Box | Sultan Dates Checkout',
  description: 'Review your selected royal dates and gift boxes before secure checkout with Sultan Dates.',
  alternates: {
    canonical: 'https://sultandates.com/cart',
  },
};

export default function Page() {
  return <Cart />;
}

