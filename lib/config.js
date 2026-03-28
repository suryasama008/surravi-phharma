export const SITE = {
  name: 'Surravi Phharma',
  tagline: 'Pharma, Nutra & Food Raw Materials',
  url: 'https://surraviphharma.com',
  phone: '+91 8008002576',
  whatsapp: '918008002576',
  email: 'surraviphharma@rediffmail.com',
  address: {
    street: 'Plot 158, Sree Gayathri Nagar, Hayath Nagar',
    city: 'Hyderabad',
    state: 'Telangana',
    pin: '501505',
    country: 'India',
    full: 'Plot 158, Sree Gayathri Nagar, Hayath Nagar, Hyderabad – 501505, Telangana, India',
  },
  // ⚠️ Replace with your real GA4 Measurement ID (looks like G-XXXXXXXXXX)
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
};

export const CATEGORIES = {
  'empty-capsules': { label: 'Empty Capsules',           icon: '💊', order: 1 },
  'excipients':     { label: 'Excipients',               icon: '🧪', order: 2 },
  'vitamins':       { label: 'Vitamins',                 icon: '⚗️',  order: 3 },
  'colours':        { label: 'Colours',                  icon: '🎨', order: 4 },
  'phosphates':     { label: 'Phosphates & Carbonates',  icon: '⚙️',  order: 5 },
  'oils-butters':   { label: 'Oils & Butters',           icon: '🫙', order: 6 },
  'amino-acids':    { label: 'Amino Acids',              icon: '🔬', order: 7 },
  'food-nutra':     { label: 'Food / Nutra Raw Materials', icon: '🌾', order: 8 },
  'flavours':       { label: 'Flavours',                 icon: '🍓', order: 9 },
};
