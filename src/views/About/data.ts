import siteContent from '@/data/siteContent.json';

export const aboutHero = {
  title: 'Rooted in Ancient Groves,\nBlessed by Tradition',
  subtitle: 'OUR SACRED HERITAGE',
  description: siteContent.story.paragraph1 + ' ' + siteContent.story.paragraph2
};

export const pillars = [
  {
    title: '100% Organic & Pure',
    description: 'Zero artificial glucose baths, zero preservatives, and zero chemical treatments — genuine sun-ripened royal dates as nurtured by nature.',
    image: '/assets/images/products/honey/honey1.png'
  },
  {
    title: 'Holy City Provenance',
    description: 'Our sacred Ajwa dates are harvested exclusively from high-grade estates within the blessed boundaries of Al-Madinah Al-Munawwarah.',
    image: '/assets/images/products/ghee/desi-ghee-1kg.png'
  },
  {
    title: 'Master Calibration',
    description: 'Each harvest is rigorously sorted by caliber, moisture balance, skin integrity, and tenderness to guarantee Grade A+ distinction.',
    image: '/assets/images/products/pickles/mango-boneless-pickle.png'
  }
];

export const team = [
  {
    name: 'Madinah Palm Stewards',
    role: 'Ancestral Orchard Keepers',
    bio: 'Multi-generational farming families cultivating the date palm trees with organic heritage methods and pure desert oasis waters.'
  },
  {
    name: 'Master Date Selectors',
    role: 'Caliber & Quality Grading',
    bio: 'Artisans who hand-inspect and grade each date cluster, ensuring only plump, flawless specimens enter our signature boxes.'
  },
  {
    name: 'Sultan Dates Concierge',
    role: 'Royal Customer Care',
    bio: 'Ensuring airtight protective delivery across Pakistan and international borders, backed by dedicated WhatsApp assistance.'
  }
];

export const practices = [
  { title: 'Al-Madinah Certified', color: '#3E7500' },
  { title: 'Hand-Picked Harvest', color: '#4E9200' },
  { title: 'Zero Added Sugars', color: '#62B500' },
  { title: 'Gold Seal Packaging', color: '#C59B27' }
];

export const faqs = siteContent.faqs.map(f => ({
  question: f.question,
  answer: f.answer
}));
