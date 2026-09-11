import productsData from '@/data/products.json';

export const bundles = [
  {
    title: 'The Sultan Royal Duo',
    price: 'Rs 7,200',
    items: ['Sacred Ajwa VIP (1kg)', 'Royal Medjool Jumbo (1kg)', 'Al-Madinah Origin', 'Gold-Embossed Gift Box'],
    image: '/assets/images/products/ghee/desi-ghee-both.png'
  },
  {
    title: 'Ramadan & Eid Deluxe Hamper',
    price: 'Rs 8,900',
    items: ['Ajwa Al-Madinah (500g)', 'Belgian Chocolate Dates', 'Pure Date Molasses', 'Roasted Nut Stuffed Dates'],
    image: '/assets/images/products/pickles/mix-boneless-achaar.png'
  }
];

export const shopHero = {
  title: 'From Ancient Groves\nto Your Table',
  subtitle: 'SACRED • ORGANIC • GRADE A+',
  description: 'Explore our hand-harvested selection of sacred Ajwa Al-Madinah, Royal King Medjool, Amber, Sukkari, and artisanal stuffed delicacies — choose your size and savor royal hospitality.'
};

// Normalize categories whether array of strings or array of objects
export const filters: string[] = (productsData.categories || []).map((c: any) =>
  typeof c === 'string' ? c : c.name || ''
);

// Map products data
export const shopProducts = (productsData.products || []).map((p: any) => {
  const priceStr = typeof p.price === 'number' ? `Rs ${p.price.toLocaleString()}` : (p.price || 'Rs 0');
  
  // Format variants
  let variants = p.variants;
  if (!variants || variants.length === 0) {
    if (p.availableWeights && Array.isArray(p.availableWeights)) {
      const baseNum = typeof p.price === 'number' ? p.price : parseInt(String(p.price).replace(/[^\d]/g, '')) || 4000;
      variants = p.availableWeights.map((w: string) => {
        let factor = 1;
        if (w.includes('500') || w.includes('Half')) factor = 0.55;
        else if (w.includes('250') || w.includes('Quarter')) factor = 0.3;
        return { label: w, price: `Rs ${Math.round(baseNum * factor).toLocaleString()}` };
      });
    }
  }

  return {
    id: p.id,
    name: p.name,
    arabicName: p.arabicName,
    price: priceStr,
    category: p.category,
    image: (p.images && p.images.length > 0 ? p.images[0] : p.image) || '/assets/images/products/honey/honey1.png',
    tag: p.tag || (p.isBestSeller ? 'Royal Best Seller' : (p.isNew ? 'New Harvest' : p.grade || 'Grade A+')),
    inStock: p.inStock !== false,
    featured: Boolean(p.featured || p.isBestSeller),
    variants: variants || [
      { label: '1 kg', price: priceStr },
      { label: '500 gm', price: priceStr },
      { label: '250 gm', price: priceStr }
    ],
    description: p.description,
    longDescription: p.longDescription,
    origin: p.origin,
    grade: p.grade,
    flavorProfile: p.flavorProfile,
    nutritionHighlights: p.nutritionHighlights,
    instructions: p.instructions || p.storageAdvice || 'Store in an airtight container in a cool, shaded oasis environment. Avoid moisture.',
    netWeight: p.netWeight || p.weight || '1000g, 500g, 250g'
  };
});
