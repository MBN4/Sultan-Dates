import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/index.css';
import { CartProvider } from '@/context/CartContext';
import { ModalProvider } from '@/context/ModalContext';
import StoreLayoutWrapper from '@/components/layout/StoreLayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://sultandates.com'),
  title: {
    default: "Sultan Dates (سلطان) | Sacred Ajwa & Royal Medjool Harvest",
    template: "%s | Sultan Dates"
  },
  description: 'Sultan Dates delivers 100% organic, handpicked dates directly from the blessed palm groves of Al-Madinah Al-Munawwarah and Al-Qassim. Sacred Ajwa, Royal Medjool, Mabroom, Amber, and luxury stuffed dates.',
  keywords: [
    'Sultan Dates',
    'Ajwa Dates',
    'Ajwa Al-Madinah',
    'Royal Medjool Dates',
    'Mabroom Dates',
    'Amber Dates',
    'Sukkari Dates',
    'Safawi Dates',
    'Stuffed Dates Pakistan',
    'Chocolate Covered Dates',
    'Organic Dates',
    'Date Syrup Molasses',
    'Ramadan Date Gift Box',
    'Eid Dates Hamper',
    'Saudi Dates Online'
  ],
  authors: [{ name: 'Sultan Dates' }],
  creator: 'Sultan Dates',
  publisher: 'Sultan Dates',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/assets/images/sultan-logo.png',
        href: '/assets/images/sultan-logo.png',
      },
    ],
    shortcut: '/assets/images/sultan-logo.png',
    apple: '/assets/images/sultan-logo.png',
  },
  openGraph: {
    title: 'Sultan Dates (سلطان) | Sacred Ajwa & Royal Medjool Harvest',
    description: 'Curating the world’s finest sacred Ajwa Al-Madinah, Royal Medjool, Sukkari, and artisanal stuffed dates straight from ancient palm groves.',
    url: 'https://sultandates.com',
    siteName: 'Sultan Dates',
    images: [
      {
        url: '/assets/images/sultan-logo.png',
        width: 800,
        height: 800,
        alt: 'Sultan Dates - Blessed Harvest Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sultan Dates | Sacred Ajwa & Royal Medjool Dates',
    description: '100% pure organic dates from Al-Madinah & Al-Qassim palm groves. Grade A+ Ajwa, Medjool, and luxury gift boxes.',
    images: ['/assets/images/sultan-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Sultan Dates',
  alternateName: 'سلطان للتمور',
  url: 'https://sultandates.com',
  logo: 'https://sultandates.com/assets/images/sultan-logo.png',
  image: 'https://sultandates.com/assets/images/sultan-logo.png',
  description: 'Premium organic date storefront featuring sacred Ajwa Al-Madinah, Royal Medjool, Amber, Sukkari, and artisan stuffed dates.',
  telephone: '+923283283282',
  email: 'support@sultandates.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK'
  },
  priceRange: 'PKR',
  currenciesAccepted: 'PKR',
  paymentAccepted: 'Cash on Delivery, Bank Transfer, EasyPaisa, JazzCash'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#EDF3E8] text-stone-900 antialiased font-sans">
        <CartProvider>
          <ModalProvider>
            <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
          </ModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}