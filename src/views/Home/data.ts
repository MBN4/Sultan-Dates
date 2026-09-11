export const heroData = {
  title: 'Blessed Harvest\nRoyal Madinah Dates',
  subtitle: '100% PURE • HANDPICKED • ORGANIC',
  description: 'Curating the world’s finest sacred Ajwa Al-Madinah, Royal Medjool, Sukkari, and artisanal stuffed dates straight from ancient palm groves to your home.',
  cta: 'Explore Dates Collection',
  stats: [
    { label: 'Organic Grade A+', value: '100%' },
    { label: 'Harvest Origin', value: 'Al-Madinah' },
    { label: 'Added Sugars', value: '0%' }
  ]
};

export const heroSlides = [
  {
    id: 1,
    name: 'Sacred Ajwa Al-Madinah (1kg)',
    price: 'Rs 4,500',
    image: '/assets/images/products/honey/honey1.png',
    category: 'Ajwa'
  },
  {
    id: 2,
    name: 'Royal Medjool Jumbo (1kg)',
    price: 'Rs 3,800',
    image: '/assets/images/products/ghee/desi-ghee-1kg.png',
    category: 'Medjool'
  },
  {
    id: 'sultan-royal-duo',
    name: 'Sultan Royal Dates Duo Box',
    price: 'Rs 7,200',
    image: '/assets/images/products/ghee/desi-ghee-both.png',
    category: 'Gift Box'
  }
];

export const marqueeTopItems = [
  { text: 'عجوة المدينة المنورة', subtitle: 'Sacred Ajwa Al-Madinah', highlight: true },
  { text: '100% Organic Blessed Harvest', subtitle: 'Grade A+ Jumbo Pick', highlight: false },
  { text: 'مجدول ملكي فاخر', subtitle: 'King Jumbo Medjool', highlight: true },
  { text: 'Sunnah Heritage & Purity', subtitle: 'Zero Added Sugars', highlight: false },
  { text: 'سكري القصيم الذهبي', subtitle: 'Golden Sukkari Rutab', highlight: true },
  { text: 'Direct Oasis Cold-Chain', subtitle: 'Fresh From Saudi Groves', highlight: false },
  { text: 'مبروم ملكي ممتاز', subtitle: 'Mabroom Royal Reserve', highlight: true },
  { text: 'Gold Seal Presentation', subtitle: 'Bespoke Arabian Gifting', highlight: false },
  { text: 'صفاوي أسود فاخر', subtitle: 'Safawi Midnight Elite', highlight: true },
  { text: 'Artisanal Stuffed Delicacies', subtitle: 'Belgian Cocoa & Roasted Nuts', highlight: false }
];

export const marqueeBottomItems = [
  { name: 'Ajwa Al-Madinah VIP', price: 'Rs 4,500', arabic: 'عجوة', origin: 'Medina Origin', tag: 'Holy City' },
  { name: 'Royal King Medjool', price: 'Rs 3,800', arabic: 'مجدول', origin: 'Succulent Jumbo', tag: 'Bestseller' },
  { name: 'Golden Sukkari Rutab', price: 'Rs 2,900', arabic: 'سكري', origin: 'Al-Qassim', tag: 'Creamy Sweet' },
  { name: 'Mabroom Royal Reserve', price: 'Rs 3,400', arabic: 'مبروم', origin: 'Ancient Groves', tag: 'Toffee Notes' },
  { name: 'Belgian Chocolate Dates', price: 'Rs 4,200', arabic: 'شوكولاتة', origin: 'Handcrafted', tag: 'Gourmet' },
  { name: 'Safawi Midnight Harvest', price: 'Rs 3,200', arabic: 'صفاوي', origin: 'Medina', tag: 'Mineral Rich' },
  { name: 'Roasted Nut Stuffed Dates', price: 'Rs 3,950', arabic: 'محشي', origin: 'Artisanal', tag: 'Pistachio & Almond' },
  { name: 'Cold Extracted Date Syrup', price: 'Rs 1,950', arabic: 'دبس تمر', origin: '100% Pure', tag: 'Natural Nectar' }
];

export const marqueeItems = marqueeTopItems.map(m => m.subtitle);

export const products = [
  {
    id: 1,
    name: 'Sacred Ajwa Al-Madinah (VIP Grade)',
    price: 'Rs 4,500',
    image: '/assets/images/products/honey/honey1.png',
    tag: 'Holy City Origin'
  },
  {
    id: 2,
    name: 'Royal Medjool King Jumbo',
    price: 'Rs 3,800',
    image: '/assets/images/products/ghee/desi-ghee-1kg.png',
    tag: 'Bestseller'
  },
  {
    id: 3,
    name: 'Mabroom Premium Al-Madinah',
    price: 'Rs 2,900',
    image: '/assets/images/products/spices/turmeric-powder.png',
    tag: 'Chewy & Rich'
  },
  {
    id: 4,
    name: 'Artisanal Almond & Pistachio Stuffed Dates',
    price: 'Rs 3,400',
    image: '/assets/images/products/pickles/mango-boneless-pickle.png',
    tag: 'Luxury Delight'
  }
];

export const testimonials = [
  {
    quote: "The Ajwa Al-Madinah dates from Sultan Dates are remarkably soft, fresh, and deeply authentic. You can immediately taste the difference of a genuine Madinah harvest.",
    author: "Sheikh Tariq Mansoor",
    role: "Verified Connoisseur"
  },
  {
    quote: "We ordered the Royal Sultan Gift Box for Ramadan and corporate gifting. The presentation with the gold-engraved seal and rich date selection exceeded every expectation.",
    author: "Dr. Fatima Al-Zahra",
    role: "Corporate Executive"
  }
];

export const benefits = [
  {
    title: "100% Organic & Pure",
    description: "Harvested directly from certified palm groves in Al-Madinah Al-Munawwarah and Al-Qassim without chemical pesticides or artificial preservatives."
  },
  {
    title: "Sunnah & Superfood Nutrition",
    description: "Rich in natural potassium, dietary fiber, antioxidants, and trace minerals for sustained vitality, cognitive wellness, and digestive health."
  },
  {
    title: "Hand-Graded & Fresh Packaged",
    description: "Each date is individually inspected for moisture, caliber, and skin integrity before being sealed in airtight, food-grade luxury presentation boxes."
  }
];

export const farmLogos = [
  'Madinah Palm Groves', 'Al-Qassim Oasis', 'Yanbu Valley', 'Hejaz Estate', 'Al-Ula Heritage'
];

export const productCategories = [
  {
    id: 1,
    title: 'Ajwa Al-Madinah',
    image: '/assets/images/products/honey/honey1.png',
    description: 'The blessed dates of Madinah, celebrated for spiritual tradition and health.',
    items: [
      { name: 'Ajwa Al-Madinah VIP (1kg)', price: 'Rs 4,500', image: '/assets/images/products/honey/honey1.png' },
      { name: 'Ajwa Al-Madinah Jumbo (500g)', price: 'Rs 2,400', image: '/assets/images/products/honey/honey2.png' },
      { name: 'Ajwa Seven-Day Sunnah Box', price: 'Rs 1,800', image: '/assets/images/products/honey/honey3.png' }
    ]
  },
  {
    id: 2,
    title: 'Royal Medjool',
    image: '/assets/images/products/ghee/desi-ghee-1kg.png',
    description: 'The King of Dates — plump, succulent, and rich with natural caramel notes.',
    items: [
      { name: 'Royal Medjool King Jumbo (1kg)', price: 'Rs 3,800', image: '/assets/images/products/ghee/desi-ghee-1kg.png' },
      { name: 'Royal Medjool Select (500g)', price: 'Rs 1,950', image: '/assets/images/products/ghee/desi-ghee-half-kg.png' },
      { name: 'Medjool & Ajwa Harmony Duo', price: 'Rs 7,200', image: '/assets/images/products/ghee/desi-ghee-both.png' }
    ]
  },
  {
    id: 3,
    title: 'Mabroom & Amber',
    image: '/assets/images/products/spices/turmeric-powder.png',
    description: 'Slender, elongated dates with rich chewy texture and warm honeyed flavor.',
    items: [
      { name: 'Mabroom Al-Madinah (1kg)', price: 'Rs 2,900', image: '/assets/images/products/spices/turmeric-powder.png' },
      { name: 'Amber Royal Large (1kg)', price: 'Rs 3,600', image: '/assets/images/products/spices/garam-masala-powder.png' },
      { name: 'Safawi Dark Dates (1kg)', price: 'Rs 2,400', image: '/assets/images/products/spices/black-pepper-powder.png' }
    ]
  },
  {
    id: 4,
    title: 'Stuffed & Chocolate Dates',
    image: '/assets/images/products/pickles/mango-boneless-pickle.png',
    description: 'Handcrafted confectioneries filled with roasted pistachios, almonds, and Belgian chocolate.',
    items: [
      { name: 'Roasted Almond & Pistachio Dates', price: 'Rs 3,400', image: '/assets/images/products/pickles/mango-boneless-pickle.png' },
      { name: 'Belgian Dark Chocolate Dates', price: 'Rs 3,600', image: '/assets/images/products/pickles/mix-boneless-achaar.png' },
      { name: 'Walnut & Cardamom Stuffed Dates', price: 'Rs 3,200', image: '/assets/images/products/pickles/garlic-pickle.png' }
    ]
  },
  {
    id: 5,
    title: 'Date Syrups & Delights',
    image: '/assets/images/products/pickles/imli-sauce.png',
    description: '100% pure cold-pressed date molasses (dibs) and natural energy pastes.',
    items: [
      { name: 'Pure Organic Date Molasses (500g)', price: 'Rs 1,200', image: '/assets/images/products/pickles/imli-sauce.png' },
      { name: 'Artisan Date Energy Paste (1kg)', price: 'Rs 1,800', image: '/assets/images/products/pickles/green-chutney.png' }
    ]
  }
];

export const dateVarietiesGuide = [
  {
    id: 'ajwa',
    name: 'Sacred Ajwa Al-Madinah',
    arabicName: 'عجوة المدينة المنورة',
    tagline: 'The Blessed Crown Jewel of Sunnah Heritage',
    origin: 'Al-Madinah Al-Munawwarah Palm Orchards',
    texture: 'Soft, tender & chewy with fine micro-crevices',
    sweetness: 3, // out of 5
    softness: 4,  // out of 5
    caliber: 'VIP Jumbo Grade A+',
    flavorNotes: ['Subtle Prune', 'Dark Honey', 'Malt'],
    bestFor: 'Daily Sunnah Morning Ritual & Heart Wellness',
    highlight: 'Celebrated in Prophetic traditions for healing & vitality',
    image: '/assets/images/products/honey/honey1.png',
    price: 'Rs 4,500 / kg'
  },
  {
    id: 'medjool',
    name: 'Royal King Medjool',
    arabicName: 'المجدول الملكي الفاخر',
    tagline: 'The Undisputed "King of Dates"',
    origin: 'Jordan Valley & Arabian Desert Oases',
    texture: 'Plump, luscious with velvety melt-in-the-mouth flesh',
    sweetness: 5,
    softness: 5,
    caliber: 'Super Jumbo (22g+ per fruit)',
    flavorNotes: ['Rich Caramel', 'Brown Butter', 'Wild Maple'],
    bestFor: 'Luxury Gifting, Arabic Coffee Pairing & Entertaining',
    highlight: 'Naturally high in potassium & quick sustained energy',
    image: '/assets/images/products/ghee/desi-ghee-1kg.png',
    price: 'Rs 3,800 / kg'
  },
  {
    id: 'mabroom',
    name: 'Mabroom & Amber Dates',
    arabicName: 'مبروم وعنبر عالي الجودة',
    tagline: 'Slender Elegance with Long-Lasting Energy',
    origin: 'Al-Madinah Highlands',
    texture: 'Firm, pleasant chew with non-sticky dry skin',
    sweetness: 3,
    softness: 2,
    caliber: 'Elongated Large Caliber',
    flavorNotes: ['Toffee Crunch', 'Nutty', 'Light Molasses'],
    bestFor: 'High-Energy Workouts, Travel & Coffee Dipping',
    highlight: 'High dietary fiber content with low glycemic index',
    image: '/assets/images/products/spices/turmeric-powder.png',
    price: 'Rs 2,900 / kg'
  },
  {
    id: 'sukkari',
    name: 'Golden Sukkari Rutab',
    arabicName: 'سكري رطب ملكي القصيم',
    tagline: 'Nature’s Golden Caramel Confection',
    origin: 'Al-Qassim Historic Palm Groves',
    texture: 'Crisp crystal cap melting into creamy honey nectar',
    sweetness: 4,
    softness: 5,
    caliber: 'Golden Cone Shape Caliber',
    flavorNotes: ['Golden Honey', 'Caramelized Sugar', 'Condensed Milk'],
    bestFor: 'Traditional Qahwa, Children & Dessert Sweetener',
    highlight: 'Pure unrefined natural fructose & zero processed sugars',
    image: '/assets/images/products/honey/honey2.png',
    price: 'Rs 2,600 / kg'
  }
];

export const qualityJourney = [
  {
    step: '01',
    title: 'Certified Oasis Sourcing',
    tagline: '100% Tree-Ripened Harvest',
    desc: 'Harvested exclusively at peak maturity from ancestral groves in Al-Madinah and Al-Qassim without artificial ripening agents.'
  },
  {
    step: '02',
    title: 'Precision Caliber Grading',
    tagline: 'Individual Hand Inspection',
    desc: 'Each cluster undergoes strict calibration for size, moisture level, flesh firmness, and skin integrity to ensure Grade A+ distinction.'
  },
  {
    step: '03',
    title: 'Hermetic Cold-Sealing',
    tagline: 'Airtight Nutrient Protection',
    desc: 'Zero chemical fumigation, zero glucose coatings, and zero sulfites. Packed in airtight food-safe containers preserving natural moisture.'
  },
  {
    step: '04',
    title: 'Royal Gifting Presentation',
    tagline: 'Gold-Embossed Luxury Box',
    desc: 'Presented in rigid gold-detailed gift boxes, creating a memorable unboxing experience for family health, Ramadan, and corporate gifting.'
  }
];

export const superfoodMetrics = [
  {
    metric: '696 mg',
    label: 'Potassium per 100g',
    comparison: '2x higher than fresh bananas',
    desc: 'Supports healthy blood pressure, muscle recovery, and nervous system balance.'
  },
  {
    metric: '7.0 g',
    label: 'Pure Dietary Fiber',
    comparison: '100% natural prebiotic fiber',
    desc: 'Promotes smooth digestion, satiety, and gentle sustained gut wellness.'
  },
  {
    metric: 'Low GI',
    label: 'Glycemic Balance',
    comparison: 'Slow-release natural carbohydrates',
    desc: 'Delivers steady, long-lasting mental and physical stamina without sugar spikes.'
  },
  {
    metric: '0%',
    label: 'Chemical Additives',
    comparison: 'Zero syrup dips or preservatives',
    desc: '100% raw, sun-cured whole fruit directly from certified organic palm trees.'
  }
];

export const storyData = {
  title: 'From Ancient Groves to Royal Tables',
  subtitle: 'OUR SACRED HERITAGE',
  description: 'In the sun-blessed oases of Al-Madinah and the Arabian Peninsula, date palm trees have flourished for centuries. Sultan Dates was founded to honor this sacred harvest, delivering unadulterated, farm-fresh royal dates with unmatched purity, natural sweetness, and authentic hospitality.',
  image: '/assets/images/products/ghee/desi-ghee-both.png'
};