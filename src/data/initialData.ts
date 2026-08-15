import { Category, ServiceProvider, ServiceRequest } from '../types';
import { CURATED_TASK_IMAGE_PRESETS } from '../components/TaskImageEditorModal';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-tuition',
    slug: 'home-tuition-tutors',
    name: 'Home Tuition & Expert Tutors',
    nameEn: 'Home Tuition & Expert Tutors',
    iconName: 'GraduationCap',
    description: 'Class 1-12 all subjects, CBSE/ICSE/JAC Board, IIT-JEE/NEET foundation, Commerce, Spoken English & 1-on-1 home visits',
    descriptionEn: 'Class 1-12 all subjects, CBSE/ICSE/JAC Board, IIT-JEE/NEET foundation, Commerce, Spoken English & 1-on-1 home visits',
    color: 'from-blue-600 to-indigo-700',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-tutor-1', name: 'Class 1 to 5 All Subjects (Foundation & Maths)', avgPrice: 1500, unit: 'per month' },
      { id: 'sub-tutor-2', name: 'Class 6 to 10 (Maths, Science & English - CBSE/JAC)', avgPrice: 2500, unit: 'per month' },
      { id: 'sub-tutor-3', name: 'Class 11-12 Physics & Chemistry (JEE Foundation)', avgPrice: 3500, unit: 'per month' },
      { id: 'sub-tutor-4', name: 'Class 11-12 Mathematics & Calculus', avgPrice: 3000, unit: 'per month' },
      { id: 'sub-tutor-5', name: 'Class 11-12 Biology & Medical NEET Prep', avgPrice: 3500, unit: 'per month' },
      { id: 'sub-tutor-6', name: 'Commerce (Accountancy & Economics)', avgPrice: 2800, unit: 'per month' },
      { id: 'sub-tutor-7', name: 'Spoken English & Communication Skills', avgPrice: 1800, unit: 'per month' },
      { id: 'sub-tutor-8', name: 'Navodaya & Sainik School Entrance Prep', avgPrice: 2200, unit: 'per month' },
      { id: 'sub-tutor-9', name: 'Computer Coding for Kids (Python & Web)', avgPrice: 2000, unit: 'per month' },
      { id: 'sub-tutor-10', name: '1-on-1 Personalized Daily Home Tutor Visit', avgPrice: 300, unit: 'per hour' }
    ]
  },
  {
    id: 'cat-electrician',
    slug: 'electrician',
    name: 'Electrician Services',
    nameEn: 'Electrician Services',
    iconName: 'Zap',
    description: 'Wiring, ceiling fans, MCB boxes, inverter setup, short circuit repair & industrial panels',
    descriptionEn: 'Wiring, ceiling fans, MCB boxes, inverter setup, short circuit repair & industrial panels',
    color: 'from-amber-500 to-orange-500',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-elec-1', name: 'Ceiling Fan Installation & Repair', avgPrice: 199, unit: 'per fan' },
      { id: 'sub-elec-2', name: 'Switchboard & Socket Repair', avgPrice: 149, unit: 'per board' },
      { id: 'sub-elec-3', name: 'Full House Concealed Wiring', avgPrice: 4500, unit: 'per room' },
      { id: 'sub-elec-4', name: 'Inverter & Battery Setup', avgPrice: 499, unit: 'per unit' },
      { id: 'sub-elec-5', name: 'MCB & Main Line Fault Fixing', avgPrice: 350, unit: 'per visit' },
      { id: 'sub-elec-6', name: 'Earthing & Surge Protection Fitting', avgPrice: 850, unit: 'per setup' },
      { id: 'sub-elec-7', name: 'Chandelier & LED Strip Profile Light', avgPrice: 399, unit: 'per light' }
    ]
  },
  {
    id: 'cat-plumber',
    slug: 'plumber',
    name: 'Plumbing & Sanitary Services',
    nameEn: 'Plumbing & Sanitary Services',
    iconName: 'Wrench',
    description: 'Pipe leak fixing, tap installation, water tank cleaning, geyser connections & pump repair',
    descriptionEn: 'Pipe leak fixing, tap installation, water tank cleaning, geyser connections & pump repair',
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-plumb-1', name: 'Tap & Shower Replacement', avgPrice: 199, unit: 'per tap' },
      { id: 'sub-plumb-2', name: 'Pipe Leakage & Drain Unclogging', avgPrice: 349, unit: 'per spot' },
      { id: 'sub-plumb-3', name: 'Overhead Water Tank Deep Cleaning', avgPrice: 699, unit: 'per 1000L' },
      { id: 'sub-plumb-4', name: 'Water Motor & Pump Installation', avgPrice: 599, unit: 'per motor' },
      { id: 'sub-plumb-5', name: 'Western Toilet & Basin Fitting', avgPrice: 799, unit: 'per item' },
      { id: 'sub-plumb-6', name: 'Concealed CPVC Diverter Setup', avgPrice: 950, unit: 'per bathroom' }
    ]
  },
  {
    id: 'cat-carpenter',
    slug: 'carpenter',
    name: 'Carpentry & Modular Woodwork',
    nameEn: 'Carpentry & Modular Woodwork',
    iconName: 'Hammer',
    description: 'Custom furniture, modular kitchens, door lock repair, wardrobe fabrication & PU polishing',
    descriptionEn: 'Custom furniture, modular kitchens, door lock repair, wardrobe fabrication & PU polishing',
    color: 'from-amber-700 to-yellow-800',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-carp-1', name: 'Door Hinges & Lock Installation', avgPrice: 249, unit: 'per door' },
      { id: 'sub-carp-2', name: 'Bed, Sofa & Table Repair', avgPrice: 499, unit: 'per item' },
      { id: 'sub-carp-3', name: 'Custom Wardrobe Fabrication', avgPrice: 1200, unit: 'per sq.ft' },
      { id: 'sub-carp-4', name: 'Modular Kitchen Assembly', avgPrice: 1800, unit: 'per running ft' },
      { id: 'sub-carp-5', name: 'Wood Polishing & PU Finish', avgPrice: 45, unit: 'per sq.ft' },
      { id: 'sub-carp-6', name: 'Hydraulic Bed Lift Fitting', avgPrice: 499, unit: 'per bed' }
    ]
  },
  {
    id: 'cat-painter',
    slug: 'painter',
    name: 'Painting & Waterproofing',
    nameEn: 'Painting & Waterproofing',
    iconName: 'Paintbrush',
    description: 'Interior/exterior house painting, wall putty, waterproof coatings, textures & damp proofing',
    descriptionEn: 'Interior/exterior house painting, wall putty, waterproof coatings, textures & damp proofing',
    color: 'from-purple-500 to-pink-500',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-paint-1', name: 'Full Home Interior Painting', avgPrice: 12, unit: 'per sq.ft' },
      { id: 'sub-paint-2', name: 'Exterior Weatherproof Coat', avgPrice: 18, unit: 'per sq.ft' },
      { id: 'sub-paint-3', name: 'Double Wall Putty & Primer', avgPrice: 8, unit: 'per sq.ft' },
      { id: 'sub-paint-4', name: 'Royal Texture Feature Wall', avgPrice: 45, unit: 'per sq.ft' },
      { id: 'sub-paint-5', name: 'Roof & Wall Damp Proofing', avgPrice: 35, unit: 'per sq.ft' }
    ]
  },
  {
    id: 'cat-appliance',
    slug: 'appliance',
    name: 'AC & Appliance Repair',
    nameEn: 'AC & Appliance Repair',
    iconName: 'Refrigerator',
    description: 'AC deep cleaning, gas charging, refrigerator, washing machine & RO water purifier',
    descriptionEn: 'AC deep cleaning, gas charging, refrigerator, washing machine & RO water purifier',
    color: 'from-teal-500 to-emerald-500',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-app-1', name: 'Split/Window AC Foam Jet Service', avgPrice: 499, unit: 'per AC' },
      { id: 'sub-app-2', name: 'AC Full Gas Charging (R32/R410)', avgPrice: 1800, unit: 'per AC' },
      { id: 'sub-app-3', name: 'Washing Machine Repair & Drum Fix', avgPrice: 399, unit: 'per machine' },
      { id: 'sub-app-4', name: 'Refrigerator Cooling Repair', avgPrice: 349, unit: 'per unit' },
      { id: 'sub-app-5', name: 'RO Purifier Filter Change & Service', avgPrice: 299, unit: 'per service' }
    ]
  },
  {
    id: 'cat-cleaning',
    slug: 'cleaning',
    name: 'Deep Cleaning & Pest Control',
    nameEn: 'Deep Cleaning & Pest Control',
    iconName: 'Sparkles',
    description: 'Full house deep cleaning, sofa vacuum shampoo, bathroom sanitization & termite control',
    descriptionEn: 'Full house deep cleaning, sofa vacuum shampoo, bathroom sanitization & termite control',
    color: 'from-emerald-500 to-teal-600',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-cln-1', name: 'Full Home Deep Cleaning (2/3 BHK)', avgPrice: 2499, unit: 'per home' },
      { id: 'sub-cln-2', name: 'Sofa & Mattress Shampoo Cleaning', avgPrice: 699, unit: 'per sofa set' },
      { id: 'sub-cln-3', name: 'Kitchen & Bathroom Acid Free Clean', avgPrice: 899, unit: 'per room' },
      { id: 'sub-cln-4', name: 'Cockroach & Termite Pest Control', avgPrice: 999, unit: 'per flat' }
    ]
  },
  {
    id: 'cat-computer',
    slug: 'computer',
    name: 'Computer, Mobile & CCTV',
    nameEn: 'Computer, Mobile & CCTV',
    iconName: 'Laptop',
    description: 'Laptop repair, Windows/Mac OS, broken screen replacement, CCTV setup & networking',
    descriptionEn: 'Laptop repair, Windows/Mac OS, broken screen replacement, CCTV setup & networking',
    color: 'from-indigo-500 to-blue-600',
    popular: false,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-comp-1', name: 'Laptop Format & OS / SSD Upgrade', avgPrice: 499, unit: 'per system' },
      { id: 'sub-comp-2', name: 'Phone Screen & Battery Replacement', avgPrice: 350, unit: 'visit fee' },
      { id: 'sub-comp-3', name: 'CCTV Camera 4-Channel Setup', avgPrice: 1500, unit: 'per setup' },
      { id: 'sub-comp-4', name: 'Data Recovery & Virus Cleaning', avgPrice: 799, unit: 'per device' }
    ]
  },
  {
    id: 'cat-priest',
    slug: 'priest',
    name: 'Priest & Vedic Rituals',
    nameEn: 'Priest & Vedic Rituals',
    iconName: 'Flame',
    description: 'Satyanarayan Katha, Griha Pravesh Puja, Vastu Shanti, Vedic Wedding & Navgrah Havan',
    descriptionEn: 'Satyanarayan Katha, Griha Pravesh Puja, Vastu Shanti, Vedic Wedding & Navgrah Havan',
    color: 'from-amber-600 to-red-600',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-priest-1', name: 'Griha Pravesh & Vastu Shanti Puja', avgPrice: 2501, unit: 'per ritual' },
      { id: 'sub-priest-2', name: 'Shri Satyanarayan Katha', avgPrice: 1100, unit: 'per puja' },
      { id: 'sub-priest-3', name: 'Mahamrityunjaya & Navgrah Havan', avgPrice: 3100, unit: 'per havan' },
      { id: 'sub-priest-4', name: 'Vedic Wedding Ceremonies & Mantras', avgPrice: 11000, unit: 'per wedding' },
      { id: 'sub-priest-5', name: 'Kundli Horoscope Analysis', avgPrice: 501, unit: 'per horoscope' }
    ]
  },
  {
    id: 'cat-materials',
    slug: 'construction-materials',
    name: 'Building & Construction Materials',
    nameEn: 'Sand, Cement, Rods, Gitti, Bricks',
    iconName: 'Truck',
    description: 'River sand, UltraTech/Ambuja cement, TMT iron rods, red bricks & stone aggregate',
    descriptionEn: 'River sand, UltraTech/Ambuja cement, TMT iron rods, red bricks & stone aggregate',
    color: 'from-stone-600 to-slate-700',
    popular: true,
    isOpen: true,
    isClosedToday: false,
    subServices: [
      { id: 'sub-mat-1', name: 'UltraTech / Ambuja Cement', avgPrice: 390, unit: 'per 50kg bag' },
      { id: 'sub-mat-2', name: 'River Sand & Plaster Sand', avgPrice: 4800, unit: 'per trolley' },
      { id: 'sub-mat-3', name: 'TMT Steel Rods (Fe 550D)', avgPrice: 62, unit: 'per kg' },
      { id: 'sub-mat-4', name: 'Grade 1 Red Clay Bricks', avgPrice: 8, unit: 'per brick (1000 min)' },
      { id: 'sub-mat-5', name: 'Stone Aggregate (10mm / 20mm)', avgPrice: 42, unit: 'per sq.ft' }
    ]
  }
];

export const CITIES_LIST = [
  'Sayal',
  'Saunda',
  'Bhurkunda',
  'Balkudra',
  'Kurse',
  'Cooperative',
  'Saundaa Basti',
  'Patratu',
  'Ramgarh',
  'All Surrounding Areas'
];

// Curated avatar photo URLs from high-quality portraits
const AVATAR_POOL = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534751516642-a171edd2521d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80'
];

// Helper to generate 10 high-quality portfolio images for a task
const generate10Images = (taskCategory: string, providerName: string, area: string) => {
  const matchingPresets = CURATED_TASK_IMAGE_PRESETS.filter(
    p => p.category.toLowerCase().includes(taskCategory.toLowerCase())
  );
  const pool = matchingPresets.length >= 4 ? matchingPresets : CURATED_TASK_IMAGE_PRESETS;

  return Array.from({ length: 10 }).map((_, idx) => {
    const preset = pool[idx % pool.length];
    return {
      id: `port-${providerName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx + 1}`,
      title: `${preset.title} (${idx + 1}/10)`,
      description: `Verified task completed by ${providerName} in ${area}, Ramgarh District.`,
      imageUrl: preset.url
    };
  });
};

// Regional locations with real coordinate offsets
const REGIONAL_LOCATIONS = [
  { city: 'Bhurkunda', area: 'Station Road & Main Market', fullAddress: 'Near Bhurkunda Railway Colony, Bhurkunda, Ramgarh', lat: 23.6420, lng: 85.3520 },
  { city: 'Ramgarh', area: 'Ramgarh Cantt & Main Road', fullAddress: 'Opposite Subhash Chowk, Ramgarh Cantt', lat: 23.6332, lng: 85.5149 },
  { city: 'Sayal', area: 'Sayal Colliery & Central Hospital', fullAddress: 'Near Sayal CCL Office, Sayal, Ramgarh', lat: 23.6550, lng: 85.3400 },
  { city: 'Saunda', area: 'Saunda ' + 'D' + ' Colliery & Market', fullAddress: 'Near Saunda High School, Saunda, Ramgarh', lat: 23.6480, lng: 85.3650 },
  { city: 'Balkudra', area: 'Balkudra Chowk & Village Road', fullAddress: 'Main Road Balkudra, Near Shiv Mandir, Ramgarh', lat: 23.6380, lng: 85.3750 },
  { city: 'Kurse', area: 'Kurse Village & CCL Colony', fullAddress: 'Kurse More, Bhurkunda-Patratu Road, Ramgarh', lat: 23.6300, lng: 85.3400 },
  { city: 'Cooperative', area: 'Cooperative Colony & Housing Complex', fullAddress: 'Sector 2, Cooperative Colony, Bhurkunda, Ramgarh', lat: 23.6450, lng: 85.3580 },
  { city: 'Patratu', area: 'Patratu Thermal & Lake View Road', fullAddress: 'Near PTPS Gate No. 1, Patratu, Ramgarh', lat: 23.6700, lng: 85.2900 },
  { city: 'Saundaa Basti', area: 'Purana Basti & Temple Area', fullAddress: 'Saundaa Gram Panchayat, Saunda, Ramgarh', lat: 23.6510, lng: 85.3700 },
  { city: 'Bhurkunda', area: 'Patel Nagar & Coal Field Colony', fullAddress: 'Patel Nagar Road, Bhurkunda, Ramgarh', lat: 23.6410, lng: 85.3480 },
  { city: 'Ramgarh', area: 'Chhatarpur Colony & Gola Road', fullAddress: 'Near Chhatarpur Shiv Mandir, Ramgarh', lat: 23.6280, lng: 85.5200 },
  { city: 'Sayal', area: 'Sayal Bazar & Workers Colony', fullAddress: 'Shop No. 14, Sayal Market, Ramgarh', lat: 23.6570, lng: 85.3430 },
  { city: 'Saunda', area: 'Saunda B Colony & Gurudwara Road', fullAddress: 'Near Saunda Gurudwara, Saunda, Ramgarh', lat: 23.6460, lng: 85.3620 },
  { city: 'Balkudra', area: 'Balkudra North & Bypass', fullAddress: 'Balkudra Bypass Road, Ramgarh', lat: 23.6395, lng: 85.3780 },
  { city: 'Kurse', area: 'Kurse Panchayat Bhawan Road', fullAddress: 'Behind Panchayat Bhawan, Kurse, Ramgarh', lat: 23.6320, lng: 85.3420 },
  { city: 'Cooperative', area: 'Cooperative Bank Chowk', fullAddress: 'Near Bank of India, Cooperative Colony, Ramgarh', lat: 23.6440, lng: 85.3560 },
  { city: 'Patratu', area: 'Patratu Railway Station Road', fullAddress: 'Station Road, Patratu Thermal, Ramgarh', lat: 23.6740, lng: 85.2950 },
  { city: 'Bhurkunda', area: 'Cinema Road & Janta Market', fullAddress: 'Opposite Janta Market, Bhurkunda, Ramgarh', lat: 23.6435, lng: 85.3540 },
  { city: 'Ramgarh', area: 'Thana Chowk & Bus Stand', fullAddress: 'Near Ramgarh Bus Stand, Ramgarh Cantt', lat: 23.6350, lng: 85.5100 },
  { city: 'Saunda', area: 'Saunda River Side Colony', fullAddress: 'Damodar River View Colony, Saunda, Ramgarh', lat: 23.6495, lng: 85.3680 }
];

// Helper to create exactly 20 specialists for a category
function buildCategorySpecialists(
  catId: string,
  catKeyword: string,
  basePrice: number,
  priceUnit: string,
  specialistData: Array<{
    name: string;
    title: string;
    exp: number;
    rating: number;
    jobs: number;
    reviewsCount: number;
    skills: string[];
    bio: string;
    isClosedToday?: boolean;
    closedReason?: string;
    isActive?: boolean;
  }>
): ServiceProvider[] {
  return specialistData.map((spec, idx) => {
    const loc = REGIONAL_LOCATIONS[idx % REGIONAL_LOCATIONS.length];
    const avatar = AVATAR_POOL[idx % AVATAR_POOL.length];
    const id = `prov-${catId.replace('cat-', '')}-${idx + 1}`;
    const cleanPhone = `+91 80921 95302`;
    const barcode = `VSS-2026-${loc.city.substring(0, 3).toUpperCase()}-${String(1000 + (idx * 37) % 9000)}`;

    return {
      id,
      name: spec.name,
      avatar,
      phone: cleanPhone,
      whatsapp: '+918092195302',
      email: `${spec.name.toLowerCase().replace(/[^a-z]/g, '')}@vickysevasetu.local`,
      categoryId: catId,
      title: spec.title,
      titleEn: spec.title,
      experienceYears: spec.exp,
      rating: spec.rating,
      reviewCount: spec.reviewsCount,
      completedJobs: spec.jobs,
      location: {
        city: loc.city,
        area: loc.area,
        fullAddress: loc.fullAddress,
        lat: loc.lat + (idx % 3 === 0 ? 0.0012 : -0.0011),
        lng: loc.lng + (idx % 2 === 0 ? 0.0015 : -0.0013)
      },
      serviceRadiusKm: 25,
      isVerified: true,
      verificationBadges: ['id_verified', 'skill_certified', 'safety_trained'],
      availability: spec.isClosedToday ? 'flexible' : (idx % 2 === 0 ? 'immediate' : 'today'),
      availableTimings: '7:00 AM - 8:30 PM (Daily)',
      startingPrice: basePrice + ((idx * 30) % 250),
      priceUnit,
      bio: spec.bio,
      skills: spec.skills,
      servicesOffered: [
        { id: `so-${id}-1`, name: `${spec.title} (Primary Service)`, price: basePrice, unit: priceUnit },
        { id: `so-${id}-2`, name: `Emergency On-Site Inspection`, price: Math.max(99, Math.round(basePrice * 0.4)), unit: 'per visit' },
        { id: `so-${id}-3`, name: `Complete Maintenance & Tuning`, price: Math.round(basePrice * 1.5), unit: priceUnit }
      ],
      portfolio: generate10Images(catKeyword, spec.name, loc.city),
      reviews: [
        {
          id: `rev-${id}-1`,
          userName: 'Rameshwar Mahato',
          userCity: loc.city,
          rating: 5,
          date: '2026-08-12',
          comment: `Excellent work by ${spec.name}! Very punctual, trustworthy and highly skilled in ${loc.city}.`,
          serviceDone: spec.title
        },
        {
          id: `rev-${id}-2`,
          userName: 'Sunita Kumari',
          userCity: 'Bhurkunda',
          rating: 5,
          date: '2026-08-10',
          comment: 'Very professional behavior and fair pricing. Highly recommended on Vicky Seva Setu.',
          serviceDone: 'General Service'
        }
      ],
      isFeatured: idx < 4,
      barcode,
      isActive: spec.isActive !== false,
      isOpen: !spec.isClosedToday,
      isClosedToday: !!spec.isClosedToday,
      closedReason: spec.closedReason || (spec.isClosedToday ? 'Closed today for weekly off / scheduled site visit' : undefined)
    };
  });
}

// 1. TUITION (20 Specialists)
const TUITION_PEOPLE = buildCategorySpecialists('cat-tuition', 'Tuition', 2500, 'per month', [
  { name: 'Prof. Alok Mukherjee (M.Sc Physics, B.Ed)', title: 'Senior Physics & Science Faculty (Class 9-12 & JEE)', exp: 14, rating: 4.95, jobs: 480, reviewsCount: 164, skills: ['Physics 11-12', 'CBSE/JAC Board', 'Numerical Solving', '1-on-1 Tuition'], bio: '14+ years experience tutoring Physics & Chemistry for CBSE, ICSE, and JAC board students across Bhurkunda, Sayal, and Saunda.' },
  { name: 'Suman Tiwari (B.Tech, Maths Specialist)', title: 'Expert Mathematics & Vedic Maths Home Tutor', exp: 10, rating: 4.92, jobs: 390, reviewsCount: 128, skills: ['Maths Class 6-12', 'Calculus', 'Vedic Maths', 'NCERT Mastery'], bio: 'Dedicated mathematics tutor specializing in removing math fear for students of Class 5 to 12 in Ramgarh and Patratu.' },
  { name: 'Dr. Vivek Ranjan (M.Sc Chemistry, Ph.D)', title: 'Senior Chemistry & NEET Prep Specialist', exp: 12, rating: 4.89, jobs: 310, reviewsCount: 95, skills: ['Organic Chemistry', 'Physical Chemistry', 'NEET Prep', 'Board Exam'], bio: 'Specialist chemistry tutor for Class 11-12 and medical entrance coaching with daily practice sheets and laboratory concept clearing.' },
  { name: 'Ananya Sengupta (M.A English, B.Ed)', title: 'English Literature & Spoken English Mentor', exp: 8, rating: 4.94, jobs: 260, reviewsCount: 88, skills: ['English Literature', 'Grammar & Writing', 'Spoken English', 'ICSE/CBSE'], bio: 'Experienced English language teacher specializing in creative writing, board grammar, and personality building in Bhurkunda.' },
  { name: 'Rajeshwar Prasad (B.Sc B.Ed)', title: 'Class 1-10 Foundation & Olympiad Guide', exp: 16, rating: 4.88, jobs: 540, reviewsCount: 190, skills: ['Class 1-10 All Subjects', 'Sainik School Prep', 'Mental Ability', 'Daily Homework'], bio: '16+ years teaching elementary and middle school students with dedicated focus on school homework and concept building.' },
  { name: 'Ritu Raj Sharma (M.Sc Zoology)', title: 'Biology & Medical NEET Foundation Mentor', exp: 9, rating: 4.91, jobs: 240, reviewsCount: 76, skills: ['Class 11-12 Biology', 'Botany & Zoology', 'NEET Diagrams', 'NCERT Line-by-Line'], bio: 'Expert biology tutor providing diagrammatic learning and NCERT line-by-line revision for JAC and CBSE medical aspirants.' },
  { name: 'Vikash Kumar Singh (M.Com, UGC-NET)', title: 'Commerce, Accountancy & Economics Faculty', exp: 11, rating: 4.93, jobs: 320, reviewsCount: 112, skills: ['Accountancy 11-12', 'Business Studies', 'Micro Economics', 'CA Foundation'], bio: 'Senior Commerce educator mentoring Class 11-12 commerce students with practical ledger, balance sheet, and accounts problem solving.' },
  { name: 'Meera Kumari (B.Sc Maths)', title: 'Primary School 1-on-1 Personalized Tutor', exp: 7, rating: 4.87, jobs: 195, reviewsCount: 64, skills: ['Class 1-5 All Subjects', 'Maths Foundation', 'Handwriting & Reading', 'Patience'], bio: 'Caring female home tutor offering affectionate 1-on-1 primary tutoring with focus on basic arithmetic, reading, and cursive writing.' },
  { name: 'Er. Deepak Saw (B.Tech Computer Science)', title: 'IIT-JEE Mathematics & Coding for Kids', exp: 6, rating: 4.96, jobs: 180, reviewsCount: 72, skills: ['IIT JEE Maths', 'Python for Kids', 'Trigonometry', 'Algebra'], bio: 'Engineering graduate teaching advanced mathematics shortcuts and computer programming logic for school students.' },
  { name: 'Amit Ghosh (M.A, TEFL Certified)', title: 'Spoken English, Interview & Personality Coach', exp: 13, rating: 4.90, jobs: 410, reviewsCount: 140, skills: ['Fluent English', 'Public Speaking', 'Accent Correction', 'Group Discussion'], bio: 'Communication and English fluency trainer helping students and professionals gain confidence in public speaking and interviews.' },
  { name: 'Sneha Pandey (M.Sc Maths)', title: 'Class 6-10 CBSE Science & Maths Specialist', exp: 8, rating: 4.89, jobs: 210, reviewsCount: 69, skills: ['CBSE Maths', 'Science Physics/Chem', 'Weekly Mock Tests', 'Doubt Sessions'], bio: 'Specialist in Class 6-10 board curriculum with weekly test evaluation and personalized home visits across Saunda and Sayal.', isClosedToday: true, closedReason: 'Closed today for student test batch preparation' },
  { name: 'Arvind Kumar Jha (Acharya, M.A Sanskrit)', title: 'Sanskrit & Hindi Vyakaran Board Specialist', exp: 15, rating: 4.95, jobs: 380, reviewsCount: 124, skills: ['Sanskrit Grammar', 'Hindi Sahitya', 'JAC Board 10-12', 'Shlokas & Essay'], bio: 'Master Sanskrit and Hindi teacher ensuring maximum scoring marks in Class 10 and 12 board examinations.' },
  { name: 'Priya Verma (MCA, B.Sc)', title: 'Computer Science, Python & Informatics Practices', exp: 7, rating: 4.92, jobs: 175, reviewsCount: 58, skills: ['Python 11-12', 'SQL & DBMS', 'HTML Web Design', 'School Projects'], bio: 'Helping Class 11-12 CS & IP students complete their computer coding projects and score 95+ in practicals.' },
  { name: 'Manoj Kumar Gupta (M.A Economics)', title: 'Class 11-12 Macro Economics & Statistics', exp: 10, rating: 4.86, jobs: 230, reviewsCount: 82, skills: ['Macroeconomics', 'Statistics for Economics', 'Graph Analysis', 'Board Revision'], bio: 'Specialist tutor explaining economic concepts, national income accounting, and statistical calculations with ease.' },
  { name: 'Dr. Vandana Roy (Ph.D Botany)', title: 'Senior Botany & Biotechnology Home Tutor', exp: 14, rating: 4.97, jobs: 290, reviewsCount: 104, skills: ['Botany 11-12', 'Plant Physiology', 'Biotech Concepts', 'NEET Past Papers'], bio: 'Highly qualified biology mentor providing crystal clear understanding of botanical diagrams and genetics.' },
  { name: 'Sunil Kumar Bhagat (B.A B.Ed)', title: 'JAC Board Specialist (Class 8-12 Hindi Medium)', exp: 17, rating: 4.85, jobs: 510, reviewsCount: 180, skills: ['JAC Board Syllabus', 'Hindi Medium All Subjects', 'Model Paper Solving', 'Exam Tips'], bio: '17+ years mentoring Jharkhand JAC board students in Bhurkunda, Balkudra, and Sayal colliery areas.' },
  { name: 'Kavita Mishra (Abacus & Vedic Maths Certified)', title: 'Fast Mental Arithmetic & Speed Maths Tutor', exp: 6, rating: 4.91, jobs: 160, reviewsCount: 52, skills: ['Abacus Mental Maths', 'Fast Multiplication', 'Speed Calculation', 'Kids Brain Dev'], bio: 'Interactive trainer boosting children mental arithmetic speed and calculation accuracy without calculator.' },
  { name: 'Pradeep Kumar Soni (B.Sc Physics)', title: 'ICSE & CBSE Class 8-10 Science Home Tutor', exp: 9, rating: 4.90, jobs: 245, reviewsCount: 84, skills: ['ICSE Physics', 'Chemistry Lab Demos', 'Maths Foundation', 'Chapterwise Notes'], bio: 'Dedicated science coach providing structured notes, formula handbooks, and chapterwise numerical practice.' },
  { name: 'Pooja Rani (B.A Early Childhood)', title: 'Pre-Primary & Nursery English Medium Home Tutor', exp: 5, rating: 4.88, jobs: 130, reviewsCount: 41, skills: ['Phonics & Reading', 'Number Magic', 'Storytelling', 'Fun Learning'], bio: 'Gentle and friendly early childhood educator building strong English phonics, vocabulary, and basic math foundation.' },
  { name: 'Santosh Kumar Mahto (B.Sc Maths)', title: 'Navodaya & Sainik School Entrance Prep Coach', exp: 12, rating: 4.94, jobs: 340, reviewsCount: 119, skills: ['Navodaya Entrance', 'Sainik School Class 6/9', 'Reasoning Ability', 'Previous Papers'], bio: 'Proven track record of guiding dozens of local students to clear Jawahar Navodaya and Sainik school entrance tests.' }
]);

// 2. ELECTRICIAN (20 Specialists)
const ELECTRICIAN_PEOPLE = buildCategorySpecialists('cat-electrician', 'Electrician', 250, 'per visit', [
  { name: 'Rajesh Sharma (Licensed Electrician)', title: 'Master Electrician & Short Circuit Specialist', exp: 15, rating: 4.95, jobs: 620, reviewsCount: 210, skills: ['House Wiring', 'MCB Tripping', 'Inverter Setup', 'Short Circuit'], bio: '15+ years experience handling residential concealed wiring, main switchboard fitting, and 24x7 emergency short circuits.' },
  { name: 'Manoj Kumar Paswan', title: 'Concealed House Wiring & Fitting Expert', exp: 12, rating: 4.91, jobs: 490, reviewsCount: 165, skills: ['Wall Grooving', 'Modular Switchboards', 'PVC Pipe Concealing', 'Distribution Box'], bio: 'Specialist in full house electrical wiring for new buildings and colliery quarters with safety earthing.' },
  { name: 'Sunil Verma (Solar & Inverter)', title: 'Inverter, Battery & Solar System Specialist', exp: 10, rating: 4.93, jobs: 380, reviewsCount: 130, skills: ['Luminous / Microtek Inverter', 'Tubular Battery Setup', 'Solar Panel Fitting', 'Wiring'], bio: 'Certified inverter and solar battery technician ensuring unbroken power backup in Bhurkunda and Ramgarh.' },
  { name: 'Amit Kumar Gope', title: 'Industrial Panel & Heavy Three-Phase Electrician', exp: 14, rating: 4.89, jobs: 430, reviewsCount: 142, skills: ['3-Phase Star Delta', 'Heavy Motor Starter', 'Panel Board', 'Industrial Earthing'], bio: 'Experienced industrial and commercial electrician servicing workshops, rice mills, and crushing plants in Ramgarh.' },
  { name: 'Vikram Saw', title: 'Ceiling Fan, Exhaust & Motor Rewinding Specialist', exp: 8, rating: 4.88, jobs: 310, reviewsCount: 98, skills: ['Ceiling Fan Installation', 'Copper Coil Rewinding', 'Bearing Replacement', 'Wall Fans'], bio: 'Fast and reliable fan technician solving noisy fans, speed drop, capacitor change, and fresh motor winding.' },
  { name: 'Santosh Kumar Mahto', title: 'Modern Profile Light, Chandelier & False Ceiling LED', exp: 7, rating: 4.96, jobs: 260, reviewsCount: 88, skills: ['COB Lights', 'Profile Strip Light', 'Chandelier Assembly', 'Color Changing RGB'], bio: 'Designer lighting specialist for modern living rooms, modular kitchens, and architectural false ceilings.' },
  { name: 'Sanjay Vishwakarma', title: 'MCB Box, Copper Earthing & Main Line Inspection', exp: 16, rating: 4.92, jobs: 580, reviewsCount: 195, skills: ['Chemical Earthing', 'Surge Protector', 'Phase Changer', 'Main Line Cable'], bio: 'Ensuring 100% shock protection and voltage stabilization for homes and commercial shops in Bhurkunda.' },
  { name: 'Rakesh Gope', title: 'Smart Home Automation & WiFi Switch Electrician', exp: 6, rating: 4.90, jobs: 190, reviewsCount: 65, skills: ['WiFi Touch Switches', 'Alexa/Google Home Setup', 'Sensor Lights', 'Smart Plugs'], bio: 'Modern smart electrical technician converting ordinary switchboards into smartphone and voice-controlled homes.' },
  { name: 'Ajay Kumar (Colliery Specialist)', title: 'Colliery Quarter & Commercial Wiring Contractor', exp: 13, rating: 4.87, jobs: 410, reviewsCount: 135, skills: ['Quarter Rewiring', 'Underground Cable', 'High Voltage Safety', 'Main Cutout'], bio: 'Specialist in CCL colony quarters, overhead lines, and heavy duty commercial switchgear.' },
  { name: 'Deepak Kumar', title: '24x7 Emergency Night Electrician & Fuse Repair', exp: 9, rating: 4.94, jobs: 350, reviewsCount: 118, skills: ['Night Emergency', 'Neutral Loss Repair', 'Burnt Wire Fix', 'Generator Switchover'], bio: 'Prompt 24/7 on-call emergency technician reaching within 20 minutes for sudden blackout or sparking in Sayal and Bhurkunda.' },
  { name: 'Suraj Kumar Nayak', title: 'Switchboard, Socket & Heavy Geyser Line Electrician', exp: 8, rating: 4.88, jobs: 280, reviewsCount: 89, skills: ['16A Power Sockets', 'Geyser Separate Wiring', 'AC Heavy Line', 'Roma Switches'], bio: 'Safe heavy power line installation for AC, geyser, microwave, and induction cooktops.', isClosedToday: true, closedReason: 'Closed today for full-building industrial contract execution' },
  { name: 'Prakash Pandit', title: 'Three-Phase Submersible Starter & Agricultural Line', exp: 11, rating: 4.91, jobs: 360, reviewsCount: 115, skills: ['Submersible Starter', 'Auto Switch', 'Single Phasing Preventer', 'Capacitor Bank'], bio: 'Expert in agricultural water pump starters, submersible motor connection, and lightning protection.' },
  { name: 'Anil Kumar Yadav', title: 'Inverter Line Split & Battery Health Maintenance', exp: 9, rating: 4.86, jobs: 295, reviewsCount: 92, skills: ['Inverter Line Separation', 'Distilled Water Topup', 'Terminal Cleaning', 'Backup Check'], bio: 'Dedicated inverter line load balancer preventing overload tripping and extending battery life.' },
  { name: 'Dharmendra Kumar', title: 'Decorative String Lights, Focus Lamps & Event Lighting', exp: 10, rating: 4.95, jobs: 340, reviewsCount: 110, skills: ['Festive Lighting', 'Halogen & LED Focus', 'Garden Tree Lights', 'Temporary Genset'], bio: 'Specialist in wedding, festival, and shop inauguration decorative lighting with safe insulated cabling.' },
  { name: 'Rohit Verma', title: 'Borewell Pump Controller & Water Level Sensor Setup', exp: 7, rating: 4.90, jobs: 210, reviewsCount: 70, skills: ['Automatic Water Controller', 'Float Switch', 'Dry Run Protection', 'Overhead Tank Sensor'], bio: 'Fitting automatic pump controllers so your water motor turns off automatically when tank is full.' },
  { name: 'Chandan Kumar', title: 'Home Theater, Soundbar & Hidden Cable Concealing', exp: 8, rating: 4.89, jobs: 235, reviewsCount: 78, skills: ['Hidden TV Cables', 'Speaker Wire Routing', 'Surround Sound', 'HDMI Wall Plates'], bio: 'Clean aesthetic wiring for wall-mounted Smart TVs, soundbars, and gaming consoles without visible messy wires.' },
  { name: 'Vicky Soni (Certified Technician)', title: 'Digital Meter, Submeter & Heavy Line Inspection', exp: 12, rating: 4.98, jobs: 460, reviewsCount: 175, skills: ['Submeter Installation', 'Electricity Bill Optimization', 'Leakage Current Test', 'Earthing Test'], bio: 'Specialist in submeter installation for rental rooms, shops, and locating hidden power leakages.' },
  { name: 'Pawan Kumar Saw', title: 'Silent Generator Changeover & Manual/Auto Switch', exp: 10, rating: 4.88, jobs: 310, reviewsCount: 96, skills: ['Changeover Switch', 'Rotary Switch', 'Generator Wiring', 'Heavy Cable Lugs'], bio: 'Fitting robust manual and automatic changeover switches for seamless generator to main grid switching.' },
  { name: 'Vijay Mahto', title: 'Wall Chasing, Concealed Pipe & Distribution Box Master', exp: 14, rating: 4.91, jobs: 490, reviewsCount: 160, skills: ['Wall Chaser Machine', 'Junction Box Setup', 'Modular Boxes', 'Floor Grooving'], bio: 'Fast, dust-free wall grooving with machine for flawless concealed electrical conduit pipes in new constructions.' },
  { name: 'Pankaj Sharma', title: 'Transformer Drop, Heavy Cutout & Pole Wire Specialist', exp: 15, rating: 4.93, jobs: 520, reviewsCount: 180, skills: ['Service Wire Pulling', 'Heavy Cutout Fuse', 'Aluminum to Copper Joint', 'Main Isolator'], bio: 'Handling main incoming electricity service wires, heavy duty main cutouts, and weather-proof outdoor cables.' }
]);

// 3. PLUMBER (20 Specialists)
const PLUMBER_PEOPLE = buildCategorySpecialists('cat-plumber', 'Plumbing', 299, 'per visit', [
  { name: 'Suresh Paswan', title: 'Sanitary Master & Tank Fitting Specialist', exp: 16, rating: 4.94, jobs: 610, reviewsCount: 205, skills: ['Pipe Leakage', 'Overhead Tank', 'CPVC Fittings', 'Water Motor'], bio: '16+ years experience in bathroom sanitary fitting, water tank pipe connection, and CPVC concealed lines in Bhurkunda.' },
  { name: 'Vijay Kumar Mahto', title: 'Concealed Bathroom Diverter & Shower Valve Master', exp: 12, rating: 4.92, jobs: 460, reviewsCount: 154, skills: ['Wall Mixer', 'Thermostatic Diverter', 'Rain Shower', 'Jaguar Fittings'], bio: 'Expert in luxury bathroom diverters, concealed wall mixers, and zero-leak pressure testing across Ramgarh.' },
  { name: 'Dilip Kumar', title: 'Water Motor, Submersible & Jet Pump Fitting Specialist', exp: 14, rating: 4.90, jobs: 510, reviewsCount: 170, skills: ['Submersible Pump', 'Centrifugal Motor', 'Foot Valve', 'Non-Return Valve'], bio: 'Specialist in 0.5HP to 3HP domestic and commercial water pump installation, priming, and pressure troubleshooting.' },
  { name: 'Arvind Vishwakarma', title: 'Western Toilet, Wall Hung Commode & Basin Installer', exp: 11, rating: 4.93, jobs: 380, reviewsCount: 125, skills: ['Wall Hung Commode', 'Concealed Cistern', 'Wash Basin', 'Pedestal Basin'], bio: 'Precision installation of modern wall-hung commodes, concealed flush tanks, and designer vanity wash basins.' },
  { name: 'Binod Saw', title: 'Overhead Water Tank High-Pressure Jet Cleaner', exp: 9, rating: 4.96, jobs: 390, reviewsCount: 140, skills: ['Tank Deep Clean', 'Algae Removal', 'UV Sanitization', 'Sludge Vacuum'], bio: '6-stage chemical-free deep cleaning of overhead Sintex and RCC underground water sumps with high pressure jet.' },
  { name: 'Pappu Kumar', title: 'CPVC, UPVC & SWR Concealed Pipe Line Plumber', exp: 10, rating: 4.88, jobs: 340, reviewsCount: 110, skills: ['Astral CPVC Pipes', 'SWR Drainage', 'Solvent Jointing', 'Pressure Test'], bio: 'Master pipe fitter for new homes, multi-story buildings, and colliery quarter sanitary plumbing.' },
  { name: 'Ashok Kumar', title: 'Emergency Drain Unclogging & Sewer Line Specialist', exp: 15, rating: 4.91, jobs: 530, reviewsCount: 180, skills: ['Choked Drain Unblocking', 'Spring Machine', 'Kitchen Trap Clear', 'Sewer Clean'], bio: 'Prompt clearing of blocked kitchen sinks, bathroom floor drains, and main sewer pipes with modern electric snake tools.' },
  { name: 'Mukesh Kumar', title: 'Geyser & Solar Water Heater Connection Plumber', exp: 8, rating: 4.89, jobs: 270, reviewsCount: 88, skills: ['Geyser In/Out Pipes', 'Pressure Relief Valve', 'Solar Line', 'Hot Water CPVC'], bio: 'Fitting instant and storage geysers with heat-resistant CPVC pipes and safety non-return valves.' },
  { name: 'Naresh Ram', title: 'Water Pressure Booster Pump & Automatic System', exp: 13, rating: 4.95, jobs: 420, reviewsCount: 145, skills: ['Pressure Booster', 'Hydro-pneumatic Tank', 'Uniform Flow', 'Penthouse Pressure'], bio: 'Installing automated booster pumps to give hotel-like high water pressure in multi-floor bathrooms.' },
  { name: 'Govind Mahto', title: 'Kitchen Sink, RO Water & Dishwasher Plumbing Plumber', exp: 7, rating: 4.87, jobs: 220, reviewsCount: 72, skills: ['Kitchen Sink Fitting', 'Waste Coupling', 'RO Tap Connection', 'Flexible Waste Pipe'], bio: 'Quick replacement of leaky kitchen sink taps, sink couplings, bottleneck traps, and pure water tap lines.' },
  { name: 'Ravi Kumar Paswan', title: 'Bathroom Renovation & Modern Sanitary Remodeling', exp: 11, rating: 4.90, jobs: 360, reviewsCount: 118, skills: ['Old Pipe Replacement', 'Tile-Friendly Grooving', 'Floor Drain Grating', 'Anti-Odor Trap'], bio: 'Upgrading old GI rusted pipes into modern leak-free CPVC systems with anti-cockroach floor traps.', isClosedToday: true, closedReason: 'Closed today for full-day commercial plumbing project' },
  { name: 'Kanhaiya Lal', title: 'Borewell Casing, Column Pipe & Submersible Pulling', exp: 17, rating: 4.97, jobs: 580, reviewsCount: 210, skills: ['Borewell Pipe Fitting', 'Submersible Extraction', 'GI Column Pipes', 'HDPE Pipes'], bio: 'Expert team for borewell pipe lowering, pulling stuck submersible pumps, and column pipe maintenance.' },
  { name: 'Sunil Kumar Saw', title: 'Brass Taps, Angle Valves & Health Faucet Specialist', exp: 6, rating: 4.86, jobs: 190, reviewsCount: 60, skills: ['Angle Valve Repair', 'Health Faucet Hose', 'Teflon Sealing', 'Spindle Replacement'], bio: 'Fast 15-minute home visits to fix dripping taps, broken health faucet sprays, and stuck angle cocks.' },
  { name: 'Rajesh Yadav', title: 'Rainwater Harvesting & Stormwater Drainage System', exp: 12, rating: 4.92, jobs: 310, reviewsCount: 98, skills: ['Rooftop Rain Catchment', 'Recharge Pit Pipe', 'Stormwater Grate', 'Leaf Filter'], bio: 'Designing economical rooftop rainwater harvesting pipes and ground recharge systems for homes.' },
  { name: 'Manoj Kumar Ram', title: 'Overhead Tank Overflow Alarm & Float Ball Valve Setup', exp: 8, rating: 4.89, jobs: 260, reviewsCount: 82, skills: ['Brass Ball Valve', 'Heavy Duty Float', 'Tank Overflow Pipe', 'Level Sensor'], bio: 'Stopping water wastage with heavy-duty brass float valves and audible overflow alarms in Bhurkunda.' },
  { name: 'Shyam Sundar', title: 'Commercial Building & Hotel Sanitary Line Maintenance', exp: 14, rating: 4.91, jobs: 440, reviewsCount: 150, skills: ['Multi-Urinal Sensor Flush', 'Grease Trap', 'Main Manhole Inspection', 'Heavy Pumps'], bio: 'Commercial plumbing contracts for marriage halls, restaurants, schools, and hospitals in Ramgarh.' },
  { name: 'Sanjay Prasad', title: 'Garden Sprinkler, Drip Pipe & Outdoor Water Line', exp: 9, rating: 4.88, jobs: 240, reviewsCount: 75, skills: ['Drip Irrigation Line', 'Lawn Sprinkler', 'Outdoor Bib Cock', 'Hose Reel Fitting'], bio: 'Setting up clean outdoor taps, lawn sprinkler nozzles, and car wash pressure line connections.' },
  { name: 'Munna Kumar', title: 'Underground Sump Motor & Suction Line Plumber', exp: 10, rating: 4.90, jobs: 320, reviewsCount: 102, skills: ['Suction Pipe Priming', 'Check Valve', 'Zero Air Lock', 'Heavy Monoblock Pump'], bio: 'Eliminating frequent pump air locks and ensuring maximum water suction from underground municipal sumps.' },
  { name: 'Anand Kumar', title: 'Bathtub, Jacuzzi & Glass Shower Cubicle Fitting', exp: 8, rating: 4.94, jobs: 180, reviewsCount: 64, skills: ['Acrylic Bathtub', 'Pop-up Waste', 'Glass Enclosure Drain', 'Silicone Sealing'], bio: 'Precision installation of premium bathtubs, whirlpool jets, and waterproof glass shower enclosure cubicles.' },
  { name: 'Vinod Kumar', title: 'Colliery Quarter Plumbing Maintenance & Emergency Leak Fix', exp: 15, rating: 4.93, jobs: 490, reviewsCount: 165, skills: ['Quarter Line Repair', 'Main Valve Replacement', 'GI Thread Cutting', 'Joint Clamping'], bio: 'Trusted plumber for CCL quarters and township bungalows across Sayal, Saunda, and Bhurkunda.' }
]);

// 4. CARPENTER (20 Specialists)
const CARPENTER_PEOPLE = buildCategorySpecialists('cat-carpenter', 'Carpenter', 399, 'per visit', [
  { name: 'Rameshwar Vishwakarma', title: 'Master Modular Kitchen & Custom Wardrobe Craftsman', exp: 18, rating: 4.96, jobs: 540, reviewsCount: 190, skills: ['Modular Kitchen', 'Sliding Wardrobe', 'Acrylic Laminate', 'Hettich Channels'], bio: '18+ years crafting bespoke modular kitchens, soft-close hydraulic wardrobes, and modern TV consoles.' },
  { name: 'Dinesh Mistry', title: 'Solid Teakwood & Sheesham Double Bed Master', exp: 15, rating: 4.92, jobs: 460, reviewsCount: 155, skills: ['Teakwood Bed', 'Hydraulic Storage Bed', 'Dressing Table', 'Dining Table 6-Seater'], bio: 'Handcrafted durable wooden furniture built to last decades with premium joinery and wood selection in Ramgarh.' },
  { name: 'Pramod Kumar', title: 'Main Door Frame, Digital Lock & Hinges Specialist', exp: 11, rating: 4.90, jobs: 380, reviewsCount: 125, skills: ['Godrej Door Lock', 'Fingerprint Smart Lock', 'Door Planing', 'Heavy Hinges'], bio: 'Fixing jammed doors, installing high-security Godrej / Yale digital door locks, and tower bolts.' },
  { name: 'Arjun Vishwakarma', title: 'PU High Gloss Polish, Melamine & Deco Finish Specialist', exp: 13, rating: 4.97, jobs: 410, reviewsCount: 145, skills: ['PU Polish', 'Melamine Finish', 'Italian Deco', 'Wood Grain Texture'], bio: 'Transforming old and new wooden furniture with mirror-finish PU polish and weather-resistant wood stains.' },
  { name: 'Gopal Mistry', title: 'Custom Sofa Frame, Recliner & Cushion Reupholstery', exp: 14, rating: 4.89, jobs: 430, reviewsCount: 138, skills: ['L-Shape Sofa', 'Sleepwell Foam 40-Density', 'Fabric / Leatherette', 'Spring Webbing'], bio: 'Custom sofa manufacturing and complete foam/fabric refurbishing for drawing rooms in Bhurkunda.' },
  { name: 'Sanjay Sharma', title: 'Aluminium Glass Partition & Office Cabin Fabricator', exp: 10, rating: 4.91, jobs: 320, reviewsCount: 105, skills: ['Aluminium Section', 'Toughened Glass Cabin', 'False Ceiling Frame', 'Sliding Window'], bio: 'Fabricating sleek office cabins, shop display counters, and aluminium sliding mosquito net windows.' },
  { name: 'Raju Kumar', title: 'Office Computer Table, Executive Desk & Bookcase Master', exp: 9, rating: 4.88, jobs: 280, reviewsCount: 88, skills: ['Ergonomic Desk', 'Cable Grommets', 'Drawer Lock System', 'Library Shelves'], bio: 'Modern workspace furniture, student study tables with bookshelves, and commercial reception counters.' },
  { name: 'Manoj Vishwakarma', title: 'Hydraulic Bed Lift Channel & Modular Cabinet Fitter', exp: 12, rating: 4.93, jobs: 390, reviewsCount: 130, skills: ['Hydraulic Gas Spring', 'Telescopic Channels', 'Corner Carousels', 'Tandem Box'], bio: 'Expert in fixing broken bed hydraulic pumps, stiff wardrobe sliding rollers, and kitchen drawer channels.' },
  { name: 'Shambhu Mistry', title: 'Antique Wood Restoration & Royal Carving Craftsman', exp: 20, rating: 4.98, jobs: 580, reviewsCount: 220, skills: ['Hand Carving', 'Temple Mandir Woodwork', 'Antique Restoration', 'Rosewood Joinery'], bio: 'Master craftsman for ornate wooden home temples (Mandir), vintage wooden chairs, and traditional motifs.' },
  { name: 'Krishna Kumar', title: 'Wooden Window Frame, Glass Panes & Louver Specialist', exp: 8, rating: 4.87, jobs: 230, reviewsCount: 75, skills: ['Sal Wood Windows', 'Window Latches', 'Ventilators', 'Mesh Frames'], bio: 'Crafting moisture-resistant window sashes, wooden shutters, and insect-proof wire mesh screens.' },
  { name: 'Jitendra Vishwakarma', title: 'Wooden Wall Fluted Panelling & Floating TV Unit Master', exp: 9, rating: 4.94, jobs: 290, reviewsCount: 96, skills: ['Fluted Charcoal Panels', 'LED Profile Backlit', 'Floating TV Unit', 'Louvered Walls'], bio: 'Contemporary living room interior wall panelling with hidden wiring and LED cove lighting.', isClosedToday: true, closedReason: 'Closed today for factory wood cutting & processing' },
  { name: 'Anil Mistry', title: 'Carved Main Entrance Doors & Waterproof Flush Doors', exp: 14, rating: 4.91, jobs: 440, reviewsCount: 152, skills: ['Solid Wood Main Door', 'Laminate Pasting', 'Door Stopper & Eye Piece', 'Beading'], bio: 'Manufacturing heavy carved solid wood entrance doors and waterproofing bathroom flush doors.' },
  { name: 'Chandreshwar Saw', title: 'Plywood False Ceiling Framing & Gypsum Grid Carpenter', exp: 11, rating: 4.89, jobs: 330, reviewsCount: 108, skills: ['Plywood Ceiling Grid', 'Cove Light Frame', 'Rafter Ceiling', 'Soundproof Battens'], bio: 'Creating beautiful wooden rafter ceilings and sturdy wooden framing for commercial and residential homes.' },
  { name: 'Bablu Kumar', title: 'Shoe Rack, Crockery Unit & Bar Cabinet Specialist', exp: 7, rating: 4.90, jobs: 210, reviewsCount: 68, skills: ['Ventilated Shoe Rack', 'Glass Crockery Display', 'Bar Cabinet', 'Wall Shelves'], bio: 'Space-saving compact shoe cabinets, glass crockery cupboards, and modern illuminated bar units.' },
  { name: 'Rajendra Mistry', title: 'Full Length Dressing Mirror & Vanity Drawer Craftsman', exp: 13, rating: 4.92, jobs: 370, reviewsCount: 122, skills: ['Hidden Jewellery Mirror', 'Vanity Light Frame', 'Bangle Drawers', 'Soft-Close Slides'], bio: 'Custom dressing units with secret storage compartments and Hollywood-style illuminated mirror frames.' },
  { name: 'Sonu Vishwakarma', title: 'Heavy Duty Sliding Wardrobe Track & Door Straightener', exp: 8, rating: 4.88, jobs: 250, reviewsCount: 80, skills: ['Top-Hung Sliding Door', 'Door Straightener Bar', 'Brush Seal', 'Floor Track'], bio: 'Smooth sliding door repairs, eliminating screeching noises, and fixing bent or jumping sliding doors.' },
  { name: 'Mohan Lal', title: 'Commercial Shop Showroom Racks & Display Counters', exp: 15, rating: 4.93, jobs: 480, reviewsCount: 160, skills: ['Glass Display Counter', 'Garment Wall Racks', 'Cash Counter with Drawer', 'Slotted Channel'], bio: 'Complete retail shop interior woodwork for clothing boutiques, grocery marts, and electronics stores.' },
  { name: 'Dharmendra Mistry', title: 'Wooden Staircase Railing, Handrail & Newel Post Master', exp: 16, rating: 4.95, jobs: 490, reviewsCount: 172, skills: ['Teakwood Handrail', 'Turned Balusters', 'Staircase Steps', 'Curved Railing'], bio: 'Classic wooden staircase railings with decorative turned spindles and polished wooden steps.' },
  { name: 'Pradeep Kumar', title: 'Kitchen Telescopic Channel & Hinge Replacement Express', exp: 6, rating: 4.86, jobs: 190, reviewsCount: 58, skills: ['Auto-Hinges', 'Rust-Free Stainless Steel', 'Drawer Realignment', 'Knob Fitting'], bio: 'Quick on-the-spot replacement of rusty kitchen cabinet hinges and jammed cutlery drawer slides.' },
  { name: 'Mahesh Vishwakarma', title: 'General Home Wood Repair & Emergency Carpenter', exp: 17, rating: 4.92, jobs: 530, reviewsCount: 185, skills: ['Broken Chair Repair', 'Loose Table Legs', 'Door Trimming', 'Quick Hardware Fix'], bio: 'Reliable all-around carpenter for daily small fixes, lock repairs, and furniture assembly in Bhurkunda.' }
]);

// 5. PAINTER (20 Specialists)
const PAINTER_PEOPLE = buildCategorySpecialists('cat-painter', 'Painting', 15, 'per sq.ft', [
  { name: 'Anand Kumar', title: 'Master Royal Texture, Stencil & Luxury Wall Artist', exp: 14, rating: 4.96, jobs: 480, reviewsCount: 165, skills: ['Asian Royale Play', 'Metallic Texture', '3D Wall Stencil', 'Velvet Touch'], bio: '14+ years crafting stunning luxury accent walls, Italian textures, and bespoke decorative finishes in Ramgarh.' },
  { name: 'Birendra Saw', title: 'Exterior Weatherproof & Apex Ultima Dust-Proof Coating', exp: 16, rating: 4.93, jobs: 540, reviewsCount: 188, skills: ['Apex Ultima', 'Silicon Water Repellent', 'Fungus Proofing', 'Double Coat Primer'], bio: 'Protecting home exteriors against heavy Jharkhand monsoons and UV rays with 10-year warranty paints.' },
  { name: 'Subhash Paswan', title: 'Double Wall Putty, Primer & Mirror POP Surface Master', exp: 12, rating: 4.91, jobs: 420, reviewsCount: 140, skills: ['Birla White Putty', 'Machine Sanding', 'POP Punning', 'Zero Undulation'], bio: 'Flawless smooth mirror wall preparation with electric dust-free sanding machines before painting.' },
  { name: 'Chandan Kumar', title: 'Dr. Fixit Certified Roof & Wall Waterproofing Specialist', exp: 11, rating: 4.95, jobs: 370, reviewsCount: 130, skills: ['Roof Leakage Coating', 'Raincoat Waterproof', 'Cracks Filling', 'Damp Proof'], bio: 'Permanent solutions for roof ceiling seepage, peeling paint, and damp salty wall efflorescence.' },
  { name: 'Mithilesh Yadav', title: 'Tractor Emulsion & Budget-Friendly Interior Painting', exp: 9, rating: 4.88, jobs: 310, reviewsCount: 96, skills: ['Tractor Emulsion', 'Distemper', 'Two-Coat Finish', 'Budget Package'], bio: 'Clean, cost-effective full home interior painting for rental properties and family homes in Bhurkunda.' },
  { name: 'Rajan Kumar', title: 'Wood & Iron Enamel Paint & Anti-Rust Coating Specialist', exp: 10, rating: 4.90, jobs: 340, reviewsCount: 112, skills: ['Anti-Rust Red Oxide', 'PU Enamel Gloss', 'Spray Paint on Grills', 'Wood Stain'], bio: 'Specialist in safety iron grill spray painting, main entrance gates, and wooden window shutters.' },
  { name: 'Pawan Saw', title: 'Designer Kids Room Theme Art & Wall Decals Painter', exp: 7, rating: 4.94, jobs: 220, reviewsCount: 78, skills: ['Kids Cartoon Theme', 'Galaxy Night Sky', 'Geometric Murals', 'Glow in Dark'], bio: 'Creative custom wall murals, geometric pastel shapes, and vibrant themed bedrooms for children.' },
  { name: 'Sonu Kumar', title: 'Full Home Deep Distemper & Plastic Paint Contractor', exp: 13, rating: 4.89, jobs: 440, reviewsCount: 150, skills: ['Plastic Emulsion', 'Ceiling Snow White', 'Color Matching', 'Furniture Masking'], bio: 'Complete house painting with full furniture plastic covering, clean floor masking, and post-paint cleaning.' },
  { name: 'Vijay Gope', title: 'Terrace Heat Reflective Cool Roof Coating Specialist', exp: 8, rating: 4.92, jobs: 260, reviewsCount: 86, skills: ['Cool Roof Coating', 'Solar Heat Reduction', 'Elastomeric Membrane', 'Roof Sealing'], bio: 'Applying high-SRI heat-reflective coatings to reduce top-floor summer temperatures by up to 6°C.' },
  { name: 'Shashi Kumar', title: 'Airless Spray Painting & Commercial Hall Contractor', exp: 12, rating: 4.95, jobs: 390, reviewsCount: 135, skills: ['Airless Spray Rig', 'Large Hall Painting', 'Uniform Coat', 'Fast Turnaround'], bio: 'Equipped with heavy airless spray guns to paint large marriage halls, factories, and schools in 48 hours.' },
  { name: 'Rakesh Kumar Saw', title: 'Exterior Stone & Brick Finish Protective Polish', exp: 10, rating: 4.89, jobs: 290, reviewsCount: 94, skills: ['Stone Clear Varnish', 'Brick Cladding Seal', 'Anti-Moss Coating', 'Wet Look'], bio: 'Enhancing exterior natural stone tiles and red brick facades with UV-resistant glossy clear sealers.', isClosedToday: true, closedReason: 'Closed today for exterior multi-story scaffolding setup' },
  { name: 'Mukesh Pandit', title: 'Vastu Color Consultation & Traditional Interior Painter', exp: 15, rating: 4.92, jobs: 490, reviewsCount: 168, skills: ['Vastu Color Harmony', 'Pooja Room Gold Leaf', 'Serene Palettes', 'Odourless Paint'], bio: 'Guiding homeowners with soothing Vastu-compliant color combinations for prosperity and peace.' },
  { name: 'Vinay Kumar', title: 'Wall Seepage PU Injection & Structural Grouting Expert', exp: 11, rating: 4.96, jobs: 330, reviewsCount: 118, skills: ['PU Injection Foam', 'Crack Bridging', 'Basement Waterproofing', 'Pressure Grouting'], bio: 'High-tech polyurethane chemical injection to permanently stop active water gushing in walls and basements.' },
  { name: 'Ajit Kumar', title: 'Epoxy Floor Coating & Industrial Anti-Slip Painter', exp: 9, rating: 4.90, jobs: 250, reviewsCount: 82, skills: ['Epoxy Self-Levelling', 'Garage Floor Coating', 'Anti-Slip Texture', 'Chemical Resistant'], bio: 'Durable seamless epoxy flooring for car garages, workshops, commercial kitchens, and clinic floors.' },
  { name: 'Dharmendra Saw', title: 'Gypsum Board False Ceiling & Joint Tape Seamless Painter', exp: 8, rating: 4.88, jobs: 240, reviewsCount: 76, skills: ['Joint Fiber Tape', 'Compound Filling', 'Flawless Cove Paint', 'Shadow Line'], bio: 'Specialist in filling false ceiling board joints without hairline cracks and delivering uniform matte finishes.' },
  { name: 'Sunil Kumar', title: 'Shop & Commercial Showroom Fast Repainting Express', exp: 10, rating: 4.91, jobs: 310, reviewsCount: 104, skills: ['Overnight Painting', 'Quick Dry Paint', 'Bright White Lighting', 'Branding Color'], bio: 'Overnight commercial repainting so your retail shop does not lose a single day of customer business.' },
  { name: 'Manoj Paswan', title: 'Wood Grain Metal Gate Coating & Vintage Door Finish', exp: 13, rating: 4.93, jobs: 380, reviewsCount: 126, skills: ['Faux Wood Grain', 'Metallic Gate Paint', 'Hammer Finish', 'Clear Topcoat'], bio: 'Painting ordinary iron gates with realistic faux wood-grain texture and high-durability metallic sheen.' },
  { name: 'Bablu Saw', title: 'Boundary Wall & Exterior Weather Protective Painter', exp: 7, rating: 4.87, jobs: 210, reviewsCount: 65, skills: ['Boundary Coating', 'Anti-Algae Paint', 'Primer Double Coat', 'High Coverage'], bio: 'Cost-effective high-coverage exterior painting for large boundary walls and compound perimeters.' },
  { name: 'Sanjay Kumar', title: 'Colliery Colony Quarters Painting Specialist', exp: 14, rating: 4.90, jobs: 460, reviewsCount: 156, skills: ['Quarter Repaint', 'Lime Wash Removal', 'Fresh Putty', 'Fast Budget Finish'], bio: 'Experienced contractor for CCL township quarters across Bhurkunda, Sayal, and Saunda.' },
  { name: 'Deepak Yadav', title: 'Eco-Friendly Low VOC & Odorless Paint Specialist', exp: 6, rating: 4.89, jobs: 180, reviewsCount: 59, skills: ['Low-VOC Paints', 'Zero Odor', 'Safe for Infants & Pets', 'Anti-Bacterial'], bio: 'Using 100% certified child-safe, non-toxic, and odorless paints for homes with infants and elders.' }
]);

// 6. APPLIANCE REPAIR (20 Specialists)
const APPLIANCE_PEOPLE = buildCategorySpecialists('cat-appliance', 'Appliance', 349, 'per service', [
  { name: 'Rakesh Kumar', title: 'Master AC Jet Service, Gas Charging & Inverter PCB Specialist', exp: 14, rating: 4.96, jobs: 590, reviewsCount: 204, skills: ['AC Foam Jet Clean', 'R32/R410 Gas Refill', 'PCB Chip Repair', 'Leak Test'], bio: '14+ years in high-pressure foam jet AC deep cleaning, refrigerant leak fixing, and PCB micro-soldering in Ramgarh.' },
  { name: 'Sandeep Kumar', title: 'Double Door & Inverter Refrigerator Specialist', exp: 12, rating: 4.92, jobs: 470, reviewsCount: 158, skills: ['No-Frost Fridge', 'Compressor Change', 'Thermostat Fix', 'Gas Charging'], bio: 'Prompt repair for LG, Samsung, Whirlpool double door and side-by-side refrigerators with genuine parts.' },
  { name: 'Vikas Singh', title: 'Front Load & Top Load Washing Machine Master', exp: 11, rating: 4.94, jobs: 430, reviewsCount: 146, skills: ['Drum Bearing Repair', 'Drain Motor Fix', 'Inlet Valve', 'Error Code Troubleshooting'], bio: 'Expert technician for IFB, Bosch, LG front load machines solving heavy vibration, water leakage, and cycle errors.' },
  { name: 'Mohammad Imran', title: 'Microwave Oven, OTG & Induction Cooktop Specialist', exp: 10, rating: 4.90, jobs: 360, reviewsCount: 120, skills: ['Magnetron Change', 'Touch Keypad Fix', 'High Voltage Diode', 'Induction IGBT'], bio: 'Fast component-level repairs for microwave ovens not heating, sparking, or displaying dead touch panels.' },
  { name: 'Satish Verma', title: 'RO Water Purifier, Alkaline & UV Filter Specialist', exp: 9, rating: 4.95, jobs: 410, reviewsCount: 138, skills: ['Membrane Replacement', 'TDS Balancing', 'Alkaline Mineral Cartridge', 'Booster Pump'], bio: 'Kent, Aquaguard, Pureit complete servicing with genuine 100 GPD membranes and free water TDS testing.' },
  { name: 'Manish Kumar', title: 'Instant & Storage Geyser Heating Element Specialist', exp: 8, rating: 4.89, jobs: 310, reviewsCount: 99, skills: ['Geyser Heating Coil', 'Thermostat Safety', 'Tank Descaling', 'Power Cord Fix'], bio: 'Fixing geysers not heating water, water temperature overheating, or electric shock tripping MCBs.' },
  { name: 'Sanjay Saw', title: 'Split & Window AC Complete Installation Master', exp: 13, rating: 4.93, jobs: 510, reviewsCount: 172, skills: ['Copper Pipe Flaring', 'Nitrogen Pressure Test', 'Vacuuming', 'Core Hole Drill'], bio: 'Professional AC installation with proper copper pipe vacuuming to ensure maximum cooling and compressor life.' },
  { name: 'Deepak Gope', title: 'Heavy Inverter, Battery & Commercial UPS Repairer', exp: 11, rating: 4.91, jobs: 370, reviewsCount: 124, skills: ['MOSFET Replacement', 'Charging Transformer', 'Battery Desulphation', 'Sine Wave Tuning'], bio: 'Chip level motherboard repairs for Microtek, Luminous, and Exide inverters not charging or giving low backup.' },
  { name: 'Pankaj Kumar', title: 'Commercial Deep Freezer & Visicooler Display Counter', exp: 12, rating: 4.90, jobs: 340, reviewsCount: 114, skills: ['Deep Freezer Coil', 'Commercial Gas Charge', 'Fan Motor', 'Thermostat'], bio: 'Emergency service for ice cream deep freezers, cold drink coolers, and sweet shop display counters in Bhurkunda.' },
  { name: 'Abhishek Kumar', title: 'Heavy Air Cooler Motor Rewinding & Water Pump Service', exp: 7, rating: 4.88, jobs: 260, reviewsCount: 82, skills: ['Cooler Motor Coil', 'Submersible Pump', 'Honeycomb Pad Change', 'Body Rust Treat'], bio: 'Summertime cooler service, replacing dried honeycomb pads, high-flow submersible pump, and motor speed fix.' },
  { name: 'Sonu Sharma', title: 'Washing Machine Suspension Rods & Spider Drum Fix', exp: 9, rating: 4.91, jobs: 320, reviewsCount: 104, skills: ['Suspension Spring', 'Spider Arm Replacement', 'Belt Tightening', 'Clutch Assembly'], bio: 'Eliminating violent machine shaking during spin cycle and replacing broken drum spider arms.', isClosedToday: true, closedReason: 'Closed today for outstation compressor warranty replacement' },
  { name: 'Md. Rizwan', title: 'Inverter AC Dual Inverter PCB Chip Level Specialist', exp: 10, rating: 4.97, jobs: 390, reviewsCount: 135, skills: ['Outdoor PCB Repair', 'IPM Module Soldering', 'Sensor Error Check', 'Communication Wire'], bio: 'Fixing expensive inverter AC motherboards at half the price of company replacement with 6-month warranty.' },
  { name: 'Ashish Kumar', title: 'Commercial RO Plant (50-250 LPH) Technician', exp: 11, rating: 4.93, jobs: 330, reviewsCount: 110, skills: ['Commercial RO Plants', 'Sand/Carbon Filter', 'Dosing Pump', 'Membrane Housing'], bio: 'Installation and monthly AMC maintenance for schools, hostels, restaurants, and office drinking water plants.' },
  { name: 'Rohit Kumar', title: 'Kitchen Auto-Clean Chimney & Blower Degreasing Master', exp: 8, rating: 4.92, jobs: 280, reviewsCount: 92, skills: ['Blower Motor Clean', 'Touch Panel Repair', 'LED Light Fix', 'Flexible Duct Pipe'], bio: 'Deep cleaning heavy oil and grease inside chimney blowers and fixing malfunctioning motion sensor touch controls.' },
  { name: 'Dinesh Verma', title: 'Automatic Voltage Stabilizer & Line Choke Repairer', exp: 15, rating: 4.89, jobs: 460, reviewsCount: 155, skills: ['Relay Replacement', 'Transformer Winding', 'High/Low Cutoff', 'Digital Display'], bio: 'Repairing AC, refrigerator, and main-line voltage stabilizers suffering from continuous clicking relays.' },
  { name: 'Vijay Kumar', title: 'Water Dispenser & Soda Machine Compressor Technician', exp: 9, rating: 4.87, jobs: 240, reviewsCount: 78, skills: ['Hot/Cold Tank Repair', 'Dispenser Faucets', 'Compressor Relay', 'Sanitization'], bio: 'Servicing commercial office water dispensers, heating elements, and cold water compressor chilling lines.' },
  { name: 'Rajesh Saw', title: 'Industrial Cold Room & Dairy Chiller Specialist', exp: 16, rating: 4.95, jobs: 420, reviewsCount: 148, skills: ['Cold Storage Plant', 'Expansion Valve', 'Defrost Timer', 'Evaporator Fan'], bio: 'Heavy refrigeration repair for milk chillers, cold storages, and pharmaceutical vaccine storage units in Ramgarh.' },
  { name: 'Kundan Kumar', title: 'Cassette AC & Ductable AC Specialist for Showrooms', exp: 10, rating: 4.94, jobs: 310, reviewsCount: 102, skills: ['4-Way Cassette Clean', 'Drain Pump Fix', 'Wired Remote Setup', 'Duct Inspection'], bio: 'Servicing ceiling cassette ACs in banks, jewelry showrooms, and restaurants with zero ceiling damage.' },
  { name: 'Amit Kumar', title: 'Instant Gas Geyser & LPG Burner Safety Technician', exp: 8, rating: 4.90, jobs: 250, reviewsCount: 80, skills: ['Gas Geyser Diaphragm', 'Ignition Spark Sensor', 'Magnetic Valve', 'Flame Adjust'], bio: 'Safe servicing for gas water heaters, ensuring complete combustion without hazardous gas leaks.' },
  { name: 'Suraj Sharma', title: 'Mixer Grinder, Juicer & Food Processor Repairer', exp: 12, rating: 4.88, jobs: 380, reviewsCount: 124, skills: ['750W Motor Winding', 'Coupler Replacement', 'Jar Blade Sharpening', 'Overload Switch'], bio: 'Quick doorstep and workshop repairs for heavy duty Sujata, Philips, and Preethi mixer grinders.' }
]);

// 7. CLEANING & PEST CONTROL (20 Specialists)
const CLEANING_PEOPLE = buildCategorySpecialists('cat-cleaning', 'Cleaning', 699, 'per service', [
  { name: 'Rohit Kumar', title: 'Full Home Deep Cleaning & Hospital-Grade Sanitization Master', exp: 12, rating: 4.95, jobs: 510, reviewsCount: 178, skills: ['Single-Disc Machine', 'Acid-Free Tile Cleaner', 'Window Channel Vacuum', 'Kitchen Degrease'], bio: '12+ years experience in 360-degree deep cleaning of 1/2/3 BHK homes, bungalows, and colliery quarters.' },
  { name: 'Soni Devi', title: 'Modular Kitchen Deep Degreasing & Chimney Cleaner', exp: 9, rating: 4.92, jobs: 390, reviewsCount: 135, skills: ['Oil Grease Removal', 'Cabinet Interior Clean', 'Tile Grout Scrubbing', 'Sink Descaling'], bio: 'Removing tough sticky cooking oil stains from kitchen tiles, wire baskets, exhaust fans, and modular cabinets.' },
  { name: 'Manjeet Singh', title: 'Sofa, Carpet & Mattress Foam Vacuum Shampoo Master', exp: 10, rating: 4.96, jobs: 440, reviewsCount: 154, skills: ['Injection-Extraction Machine', 'Karcher Foam Shampoo', 'Dust Mite Removal', 'Fabric Drying'], bio: 'Restoring fabric and leatherette sofas to showroom condition with imported Karcher foam extraction machines.' },
  { name: 'Rakesh Paswan', title: 'Certified Termite, Cockroach & Bedbug Pest Control Expert', exp: 14, rating: 4.94, jobs: 560, reviewsCount: 195, skills: ['Bayer Gel Treatment', 'Drill-Fill-Seal Termite', 'Odorless Spray', '1-Year Warranty'], bio: 'Government-approved odorless pest control eliminating white ants (termite), german cockroaches, and bedbugs.' },
  { name: 'Anita Kumari', title: 'Bathroom Acid-Free Deep Tile & Glass Limescale Removal', exp: 8, rating: 4.90, jobs: 320, reviewsCount: 108, skills: ['Hard Water Stain Remove', 'Taps Chrome Polish', 'Glass Partition Clean', 'Grout Whitening'], bio: 'Removing stubborn hard-water white crust from bathroom tiles, taps, and shower glass without corrosive acid.' },
  { name: 'Ajay Kumar', title: 'Overhead & Underground Water Tank High-Pressure Jet Cleaner', exp: 11, rating: 4.93, jobs: 460, reviewsCount: 160, skills: ['Rotary Jet Wash', 'Sludge Extraction', 'Potassium Permanganate', 'UV Sterilization'], bio: 'Scientific multi-stage cleaning of drinking water tanks ensuring 100% germ and algae free water for families.' },
  { name: 'Sunita Devi', title: 'Office, Bank & Commercial Space Deep Cleaning Supervisor', exp: 13, rating: 4.91, jobs: 420, reviewsCount: 142, skills: ['Floor Buffing', 'Workstation Sanitization', 'Glass Facade', 'Carpet Vacuum'], bio: 'Weekend and evening deep cleaning contracts for corporate offices, clinics, and retail stores in Ramgarh.' },
  { name: 'Vicky Mahto', title: 'Window Glass, Balcony Grills & High Facade Cleaner', exp: 7, rating: 4.89, jobs: 260, reviewsCount: 84, skills: ['Telescopic Squeegee', 'Balcony Floor Scrub', 'Bird Dropping Clean', 'Mesh Washing'], bio: 'Specialist in washing hard-to-reach exterior window glasses, sliding tracks, and pigeon-soiled balconies.' },
  { name: 'Rekha Devi', title: 'Move-in & Post-Construction Deep Cleaning Specialist', exp: 10, rating: 4.94, jobs: 380, reviewsCount: 128, skills: ['Paint Splatter Scrape', 'Cement Dust Removal', 'Door Frame Wash', 'Cabinet Vacuum'], bio: 'Making newly constructed or recently painted homes sparkling clean and ready for instant move-in.' },
  { name: 'Sunil Kumar', title: 'Mosquito Fogging, Garden Pest & Rodent Baiting Specialist', exp: 11, rating: 4.88, jobs: 340, reviewsCount: 112, skills: ['Thermal Fogging', 'Rat Bait Stations', 'Garden Spray', 'Drain Disinfection'], bio: 'Outdoor thermal fogging for society premises, open lawns, and factory warehouses to eliminate mosquitoes and rats.' },
  { name: 'Pooja Devi', title: 'Kitchen Modular Cabinet Interior Sanitization & Liner Fitting', exp: 6, rating: 4.90, jobs: 210, reviewsCount: 68, skills: ['Cabinet Wiping', 'Anti-Slip Mats', 'Spice Jar Wash', 'Odor Neutralizer'], bio: 'Organized and methodical deep cleaning of grocery cabinets, crockery drawers, and under-sink areas.', isClosedToday: true, closedReason: 'Closed today for full-day bank premises sanitization' },
  { name: 'Karan Kumar', title: 'Italian Marble, Granite & Mosaic Floor Scrubbing & Polishing', exp: 15, rating: 4.97, jobs: 490, reviewsCount: 170, skills: ['Single Disc Scrubber', 'Diamond Pad Buffing', 'Crystallization Polish', 'Wax Finish'], bio: 'Bringing back high gloss mirror reflection to old dull marble, granite, and mosaic floors.' },
  { name: 'Meena Kumari', title: 'Curtain, Blinds & Upholstery Steam Sanitization Specialist', exp: 8, rating: 4.89, jobs: 250, reviewsCount: 82, skills: ['High Temp Steam Wand', 'Zero Shrinkage', 'Odor Elimination', 'Vertical Blinds'], bio: 'On-rail curtain steaming without taking down heavy draperies, killing 99.9% dust allergens and bacteria.' },
  { name: 'Chandan Paswan', title: 'Drain, Manhole & Garbage Chute Disinfection Specialist', exp: 12, rating: 4.87, jobs: 370, reviewsCount: 120, skills: ['Bleaching Wash', 'Deodorizing Chemical', 'Fly Control', 'Grease Digester'], bio: 'Eliminating foul drain smells and cockroach breeding grounds in kitchen drains and outdoor sumps.' },
  { name: 'Rupa Devi', title: 'Apartment Balcony, Terrace & Garden Deep Cleaning', exp: 7, rating: 4.91, jobs: 230, reviewsCount: 75, skills: ['High Pressure Floor Wash', 'Pot Plant Arrangement', 'Drain Clear', 'Moss Removal'], bio: 'Transforming dusty terraces and plant-stained balconies into clean relaxing outdoor family spaces.' },
  { name: 'Deepak Kumar', title: 'Restaurant Commercial Kitchen Deep Degreasing Team Lead', exp: 11, rating: 4.93, jobs: 310, reviewsCount: 104, skills: ['Industrial Degreaser', 'Tandoor Area Wash', 'Grease Trap Emptying', 'FSSAI Hygiene'], bio: 'Commercial kitchen hygiene compliance cleaning for dhabas, hotels, and cloud kitchens in Ramgarh district.' },
  { name: 'Sarita Kumari', title: 'School, Coaching & Hospital Wards Sanitization Specialist', exp: 9, rating: 4.92, jobs: 280, reviewsCount: 94, skills: ['Desk Sanitization', 'Restroom Disinfection', 'Child-Safe Products', 'Toy Wash'], bio: 'Safe and certified sanitization protocols for preschools, tuition coaching centers, and medical clinics.' },
  { name: 'Santosh Mahto', title: 'Underground Sump & Borewell Water Pit Deep Cleaner', exp: 13, rating: 4.90, jobs: 410, reviewsCount: 138, skills: ['Slurry Pump Sump', 'Scrubbing Sump Walls', 'Chlorine Treatment', 'Confined Space Safety'], bio: 'Draining and cleaning large concrete underground water sumps with submersible slurry pumps.' },
  { name: 'Geeta Devi', title: 'Event, Wedding & Post-Party Cleaning Crew Supervisor', exp: 10, rating: 4.88, jobs: 340, reviewsCount: 115, skills: ['Rapid Waste Disposal', 'Floor Mopping', 'Table Cleaning', 'Restroom Refresh'], bio: 'Fast post-event cleanup crew restoring marriage halls, party lawns, and community centers overnight.' },
  { name: 'Raju Paswan', title: 'General Odor Removal & Formaldehyde Neutralization Tech', exp: 8, rating: 4.86, jobs: 220, reviewsCount: 70, skills: ['Ozone Air Purifier', 'Smoke Smell Removal', 'Pet Odor Neutralize', 'Fresh Scent Spray'], bio: 'Eliminating stubborn dampness, paint fumes, pet smells, and stale air using professional ozone machines.' }
]);

// 8. COMPUTER & CCTV (20 Specialists)
const COMPUTER_PEOPLE = buildCategorySpecialists('cat-computer', 'Computer', 399, 'per system', [
  { name: 'Vicky Kumar (Hardware & Chip Level)', title: 'Master Laptop Chip Level, SSD & OS Specialist', exp: 13, rating: 4.96, jobs: 580, reviewsCount: 205, skills: ['SSD Upgrade', 'Motherboard BGA Repair', 'Windows/Mac OS', 'Hinge Repair'], bio: '13+ years fixing dead laptops, slow hanging computers, liquid spill damage, and speed optimization in Bhurkunda.' },
  { name: 'Rahul Kumar (Mobile Tech)', title: 'Mobile Screen, Battery & Charging Port Specialist', exp: 9, rating: 4.92, jobs: 490, reviewsCount: 168, skills: ['Original Display Fitting', 'Battery Replacement', 'Type-C Port Fix', 'Mic & Speaker'], bio: 'Quick 30-minute doorstep and lab repair for broken smartphone screens, weak batteries, and charging ports.' },
  { name: 'Sanjeev Kumar (Security Systems)', title: 'Hikvision & CP Plus 4/8/16 Channel CCTV Setup Master', exp: 12, rating: 4.95, jobs: 450, reviewsCount: 160, skills: ['CCTV Camera Setup', 'Night Vision ColorVu', 'Mobile App Live View', 'DVR/NVR Config'], bio: 'Complete security surveillance for homes, shops, and warehouses with crisp night-vision recording on mobile.' },
  { name: 'Ankit Soni', title: 'Data Recovery, Virus Cleaning & Windows/Office Activation', exp: 8, rating: 4.90, jobs: 330, reviewsCount: 112, skills: ['Hard Disk Recovery', 'Ransomware Removal', 'Fresh Windows 11', 'Tally Data Backup'], bio: 'Recovering accidentally deleted photos, office spreadsheets from formatted hard disks and pen drives.' },
  { name: 'Md. Tariq', title: 'Custom Desktop PC Assembly & High-Performance Rigs', exp: 11, rating: 4.94, jobs: 380, reviewsCount: 132, skills: ['Gaming PC Build', 'Graphic Card Fitting', 'Liquid Cooler Setup', 'SMPS Wiring'], bio: 'Assembling custom computers for video editing, engineering AutoCAD, gaming, and commercial office use.' },
  { name: 'Prince Kumar', title: 'WiFi Router, Fiber Net & LAN Cabling Specialist', exp: 7, rating: 4.88, jobs: 270, reviewsCount: 90, skills: ['WiFi Range Extender', 'Mesh WiFi Setup', 'Cat6 RJ45 Crimping', 'Broadband Routing'], bio: 'Eliminating WiFi dead zones in multi-floor homes and laying structured Cat6 LAN cables for offices.' },
  { name: 'Suraj Kumar', title: 'Printer Repair, Laser Toner Cartridge Refill & Ink-Tank Service', exp: 10, rating: 4.91, jobs: 410, reviewsCount: 140, skills: ['HP / Canon Printer Fix', 'Laser Cartridge Refill', 'Epson Ink Head Clean', 'Paper Jam Fix'], bio: 'Doorstep laser printer maintenance, ink head unclogging, and sharp high-yield toner powder refilling.' },
  { name: 'Amit Sharma', title: 'MacBook Screen, Keyboard & Logic Board Specialist', exp: 11, rating: 4.97, jobs: 320, reviewsCount: 118, skills: ['MacBook Air / Pro Repair', 'Keyboard Replacement', 'Trackpad Fix', 'macOS Upgrade'], bio: 'Certified Apple specialist providing cost-effective logic board chip repairs and genuine screen replacements.' },
  { name: 'Rajesh Kumar', title: 'Smart TV Screen, Backlight LED Strip & Motherboard Repairer', exp: 12, rating: 4.89, jobs: 390, reviewsCount: 130, skills: ['LED TV No Display Fix', 'Backlight Replacement', 'Android TV Board', 'HDMI Port Repair'], bio: 'Fixing Smart LED TVs with sound but no picture, flickering screens, and restarting Android TV motherboards.' },
  { name: 'Neeraj Kumar', title: 'IP Camera, Biometric Attendance & Access Control Setup', exp: 10, rating: 4.93, jobs: 310, reviewsCount: 105, skills: ['Biometric Fingerprint Machine', 'Face Attendance', 'Magnetic Door Lock', 'PoE Switch Setup'], bio: 'Staff attendance biometric machines and security door access control for schools, offices, and gyms.' },
  { name: 'Ashish Verma', title: 'Broken Laptop Body Fabrication & Brass Hinge Rebuilding', exp: 8, rating: 4.92, jobs: 280, reviewsCount: 95, skills: ['Broken Hinge Repair', 'Screen Bezel Plastic Fix', 'Keyboard Base Fabrication', 'Heat Sink Clean'], bio: 'Repairing broken laptop corners and stiff hinges with durable industrial brass embedding without body replacement.', isClosedToday: true, closedReason: 'Closed today for outstation server installation contract' },
  { name: 'Saurabh Kumar', title: 'Speed Optimization & NVMe SSD / RAM Expansion Specialist', exp: 6, rating: 4.90, jobs: 240, reviewsCount: 78, skills: ['NVMe M.2 SSD', '16GB/32GB RAM Upgrade', 'Thermal Paste Re-apply', '10x Speed Boot'], bio: 'Upgrading slow 5-year-old laptops into superfast machines that boot Windows in just 7 seconds.' },
  { name: 'Md. Zeeshan', title: 'iPhone Display, FaceID & TrueTone Programmer Specialist', exp: 9, rating: 4.95, jobs: 360, reviewsCount: 125, skills: ['iPhone OLED Screen', 'Battery Health 100%', 'FaceID Sensor Repair', 'Housing Replacement'], bio: 'Specialist in iPhone 11 to 15 screen replacement with TrueTone data transfer and battery health calibration.' },
  { name: 'Roshan Kumar', title: 'Commercial Office Networking, Server Rack & Patch Panel Master', exp: 13, rating: 4.94, jobs: 340, reviewsCount: 116, skills: ['Server Rack Dressing', '24-Port Switch Config', 'Firewall Setup', 'VLAN Config'], bio: 'Structured cabling, server rack cable management, and high-speed network switches for institutions.' },
  { name: 'Abhishek Pandey', title: 'CCTV Mobile Live View, Cloud Storage & DVR Password Reset', exp: 7, rating: 4.89, jobs: 250, reviewsCount: 82, skills: ['Hik-Connect App Setup', 'Forgot DVR Password', 'Port Forwarding', 'Hard Disk Error Fix'], bio: 'Connecting your existing CCTV cameras to your smartphone so you can watch live video from anywhere in India.' },
  { name: 'Deepak Kumar', title: 'Point of Sale (POS) Billing Machine & Thermal Printer Technician', exp: 8, rating: 4.88, jobs: 220, reviewsCount: 74, skills: ['Thermal Receipt Printer', 'Barcode Scanner USB', 'Cash Drawer Trigger', 'Billing Software Setup'], bio: 'Setting up retail shop billing printers, barcode handheld guns, and troubleshooting cash drawers.' },
  { name: 'Mukesh Sharma', title: 'Computer Power Supply (SMPS) & Voltage Fluctuation Repairer', exp: 14, rating: 4.87, jobs: 410, reviewsCount: 138, skills: ['SMPS Capacitor Fix', 'Short Circuit Protection', 'Silent Fan Replacement', 'ATX 24-Pin Wire'], bio: 'Solving sudden computer shutdown, power supply burning smells, and motherboard power failure.' },
  { name: 'Sonu Kumar', title: 'Tally Prime, GST Accounting & MS Office Software Support', exp: 8, rating: 4.91, jobs: 290, reviewsCount: 98, skills: ['Tally Prime Multi-User', 'GST Invoice Formats', 'Data Auto Backup', 'Office 365 Support'], bio: 'Helping business accountants configure Tally Prime multi-user data sharing, print formats, and cloud backups.' },
  { name: 'Chandan Kumar', title: 'Smart Home Video Doorbell & Digital Eye Camera Setup', exp: 6, rating: 4.93, jobs: 190, reviewsCount: 66, skills: ['Video Doorbell', 'Two-Way Audio Intercom', 'Motion Motion Siren', 'MicroSD Cloud'], bio: 'Fitting wireless video doorbells on main entrance doors with instant two-way mobile voice talk.' },
  { name: 'Vikash Saw', title: 'Old PC / Laptop Exchange, Refurbishing & Certified Sales', exp: 11, rating: 4.90, jobs: 370, reviewsCount: 128, skills: ['Refurbished Dell/HP/Lenovo', 'Quality Stress Testing', '6-Month Warranty', 'Fair Exchange Value'], bio: 'Buying and selling top-grade corporate refurbished laptops with warranty and testing certificates.' }
]);

// 9. PRIEST & VEDIC RITUALS (20 Specialists)
const PRIEST_PEOPLE = buildCategorySpecialists('cat-priest', 'Priest', 1100, 'per ritual', [
  { name: 'Pt. Suryanarayan Shastri', title: 'Senior Vedic Scholar (Griha Pravesh & Vastu Shanti)', exp: 22, rating: 4.98, jobs: 640, reviewsCount: 235, skills: ['Griha Pravesh Puja', 'Vastu Dosh Shanti', 'Navgrah Havan', 'Kalyan Mantras'], bio: '22+ years performing auspicious Griha Pravesh, Vastu Shanti, and Navgrah Havan with pure Vedic Sanskrit mantras across Ramgarh & Bhurkunda.' },
  { name: 'Pt. Ramanand Pandey', title: 'Shri Satyanarayan Vrat Katha & Sundarkand Path Specialist', exp: 18, rating: 4.95, jobs: 580, reviewsCount: 210, skills: ['Satyanarayan Katha', 'Sundarkand Samuhik Path', 'Aarti & Bhajans', 'Panchamrit Vidhi'], bio: 'Melodious recitation of Shri Satyanarayan Katha and heartfelt Sundarkand Ramayan path for family wellbeing.' },
  { name: 'Acharya Devendra Jha (Vedic Vivah)', title: 'Vedic Vivah, Saptapadi & Vivah Sanskar Master Acharya', exp: 20, rating: 4.97, jobs: 510, reviewsCount: 190, skills: ['Vedic Wedding Rituals', 'Kanyadan & Saptapadi', 'Laja Havan', 'Vivah Lagna Muhurat'], bio: 'Conducting solemn and culturally rich Hindu wedding ceremonies with clear explanation of Vedic marriage vows.' },
  { name: 'Pt. Radheshyam Dwivedi', title: 'Mahamrityunjaya Jaap & Navgrah Shanti Havan Specialist', exp: 16, rating: 4.94, jobs: 430, reviewsCount: 155, skills: ['Mahamrityunjaya 1.25 Lakh Jaap', 'Navgrah Havan', 'Health & Ayushya Puja', 'Samidha Fire'], bio: 'Performing intense Vedic chanting and Rudraksha Mala Jaap for overcoming severe health difficulties.' },
  { name: 'Pt. Bipin Bihari Mishra (Jyotishacharya)', title: 'Kundli Matchmaking & Janampatri Astrological Consultant', exp: 19, rating: 4.96, jobs: 590, reviewsCount: 220, skills: ['Kundli Milan 36 Guna', 'Manglik Dosh Analysis', 'Career Astrology', 'Gemstone Guidance'], bio: 'Accurate horoscope reading, marriage compatibility matching, and natural gemstone recommendations in Ramgarh.' },
  { name: 'Pt. Omkar Nath Tiwari', title: 'Rudrabhishek, Shiv Aradhana & Shravan Somwar Puja Specialist', exp: 15, rating: 4.93, jobs: 440, reviewsCount: 160, skills: ['Panchamrit Rudrabhishek', 'Laghurudra Vidhi', 'Maha Shivratri Puja', 'Bilva Patra Arpan'], bio: 'Traditional authentic Rudrabhishek chanting with milk, honey, sugarcane juice, and Ganga jal for divine blessings.' },
  { name: 'Pt. Ramakant Jha', title: 'Namkaran, Mundan & Janeu (Yajnopavita) Sanskar Pandit', exp: 17, rating: 4.91, jobs: 460, reviewsCount: 168, skills: ['Baby Naming Ceremony', 'Mundan Hair Offering', 'Upanayana Janeu', 'Gayatri Diksha'], bio: 'Guiding Hindu traditional 16 Sanskaras with auspicious astrological timing and sacred thread rituals.' },
  { name: 'Pt. Janardan Upadhyay', title: 'Shrimad Bhagwat Saptah & Ramcharitmanas Gyan Yagya Acharya', exp: 21, rating: 4.97, jobs: 380, reviewsCount: 145, skills: ['7-Day Bhagwat Saptah', 'Akhand Ramayan 24-Hr', 'Bhajan Sandhya', 'Pravachan'], bio: 'Renowned spiritual orator narrating inspiring 7-day Shrimad Bhagwat Katha and 24-hour Akhand Ramayan path.' },
  { name: 'Pt. Kaushal Kishore Sharma', title: 'Durgasaptashati Chandi Havan & Navratri Puja Specialist', exp: 14, rating: 4.92, jobs: 390, reviewsCount: 138, skills: ['Chandi Path 700 Shlokas', 'Kanya Pujan', 'Navratri Ghatsthapana', 'Havan Samagri'], bio: 'Consecrating powerful Navratri Chandi Havan and Durga Saptashati recitation for family prosperity and protection.' },
  { name: 'Pt. Harishchandra Pathak', title: 'Vastu Dosh Nivaran & Commercial Shop Opening Puja Specialist', exp: 16, rating: 4.95, jobs: 470, reviewsCount: 172, skills: ['Shop Opening Muhurat', 'Laxmi Kuber Puja', 'Vastu Yantra Sthapana', 'Bhoomi Pujan'], bio: 'Bhoomi Pujan for new land construction and auspicious opening rituals for commercial shops and factories.' },
  { name: 'Pt. Shivesh Mishra', title: 'Diwali Mahalakshmi Puja & Kuber Dhana Prapti Rituals', exp: 12, rating: 4.90, jobs: 360, reviewsCount: 125, skills: ['Shree Suktam Path', 'Kanakdhara Stotram', 'Diwali Chopda Pujan', 'Coin Anointment'], bio: 'Specialist in Diwali account book blessing, Shree Suktam recitation, and year-round business prosperity pujas.', isClosedToday: true, closedReason: 'Closed today for full-day temple yajna ceremonies' },
  { name: 'Pt. Tribhuvan Nath Shukla', title: 'Hanuman Chalisa 108 Path & Bajrang Baan Anushthan', exp: 15, rating: 4.94, jobs: 410, reviewsCount: 150, skills: ['108 Hanuman Chalisa', 'Sindoor Arpan', 'Sankatmochan Puja', 'Negative Energy Clear'], bio: 'Conducting energizing community and household Hanuman Chalisa chanting to dispel fear and obstacles.' },
  { name: 'Pt. Kamlesh Pandey', title: 'Kalsarp Dosh, Pitra Dosh & Mangal Shanti Specialist', exp: 17, rating: 4.93, jobs: 450, reviewsCount: 164, skills: ['Kalsarp Shanti', 'Narayan Nagbali', 'Rahu-Ketu Shanti', 'Ujjain Vidhi'], bio: 'Dedicated astrological remedial rituals to neutralize planetary afflictions and achieve mental peace.' },
  { name: 'Pt. Umesh Chandra Shastri', title: 'Ganesh Chaturthi, Saraswati Puja & Public Pandal Acharya', exp: 13, rating: 4.91, jobs: 370, reviewsCount: 130, skills: ['Murti Pran Pratishtha', 'Atharvashirsha 21-Avartan', 'Durva Arpan', 'Visarjan Vidhi'], bio: 'Grand community pandal idol consecration and daily Vedic aarti for Ganesh Utsav and Saraswati Puja.' },
  { name: 'Pt. Raghvendra Jha', title: 'Vidyarambh Sanskar & Aksharabhyasa for Children', exp: 11, rating: 4.89, jobs: 280, reviewsCount: 96, skills: ['First Writing Puja', 'Saraswati Yantra', 'Medha Suktam', 'Memory Concentration'], bio: 'Blessing young children on Vasant Panchami and Vijayadashami before they begin their formal school education.' },
  { name: 'Pt. Vishwanath Dwivedi', title: 'Shraddha, Pitru Paksha Tarpan & Pind Daan Rituals', exp: 23, rating: 4.96, jobs: 520, reviewsCount: 195, skills: ['Pitra Tarpan', 'Pind Daan at Damodar River', 'Gaya Ji Vidhi', 'Brahmin Bhojan'], bio: 'Honoring ancestors with sacred water tarpan on the banks of holy rivers with full Vedic dignity and peace.' },
  { name: 'Pt. Shambhu Nath Tiwari', title: 'Santoshi Mata 16 Friday Vrat & Vaibhav Laxmi Udyapan', exp: 14, rating: 4.88, jobs: 340, reviewsCount: 118, skills: ['Vrat Udyapan Puja', 'Kanya Bhojan', 'Katha Vachan', 'Prasad Distribution'], bio: 'Performing sacred conclusion (Udyapan) rituals for women fulfilling traditional fasting vows.' },
  { name: 'Pt. Govind Prasad Shastri', title: 'Astrology Gemstone Energization & Pran Pratishtha', exp: 16, rating: 4.92, jobs: 430, reviewsCount: 154, skills: ['Ring Energization', 'Planet Mantra Chanting', 'Auspicious Finger Guide', 'Purity Test'], bio: 'Purifying and energizing natural Yellow Sapphire, Blue Sapphire, Emerald, and Ruby with planetary mantras.' },
  { name: 'Acharya Mukund Jha', title: 'Annaprashan (First Food) & Shashtipurti 60th Birthday Puja', exp: 18, rating: 4.95, jobs: 480, reviewsCount: 176, skills: ['First Rice Feeding', 'Ayushya Havan', '60th/75th Birthday Puja', 'Elder Blessings'], bio: 'Celebrating family life milestones from infant first grain feeding to honoring senior parents on their 60th and 75th birthdays.' },
  { name: 'Pt. Satyanand Mishra', title: 'Vishwakarma Puja & Factory Machine Blessing Specialist', exp: 15, rating: 4.93, jobs: 460, reviewsCount: 165, skills: ['Machine Aarti & Tilak', 'Factory Safety Havan', 'Vehicle Puja (Car/Bike)', 'Prasad Setup'], bio: 'Performing traditional machine worship and vehicle blessings across Ramgarh industrial and mining areas.' }
]);

// 10. MATERIALS (20 Suppliers)
const MATERIALS_PEOPLE = buildCategorySpecialists('cat-materials', 'Materials', 390, 'per unit', [
  { name: 'Vicky Traders & Building Materials', title: 'UltraTech, ACC & Ambuja Cement Wholesale Depot', exp: 16, rating: 4.97, jobs: 720, reviewsCount: 260, skills: ['UltraTech Weather Plus', 'Ambuja Kawach', 'Fresh Factory Stock', 'Trolley Delivery'], bio: '16+ years supplying genuine factory-fresh Grade 43/53 Portland Pozzolana Cement (PPC) and Ordinary Portland Cement (OPC) across Ramgarh.' },
  { name: 'Mahato River Sand & Plaster Sand Depot', title: 'Damodar White River Sand & Fine Plaster Sand Supply', exp: 14, rating: 4.94, jobs: 610, reviewsCount: 215, skills: ['Damodar River Sand', 'Screened Plaster Sand', 'Tractor Trolley Supply', 'Dumper Load'], bio: 'Direct clean river sand without clay impurities, ideal for RCC pillar casting, slab roofing, and smooth wall plastering.' },
  { name: 'Singhania Steel & TMT Iron Rods', title: 'Tata Tiscon, Jindal Panther & Kamdhenu Fe 550D TMT', exp: 18, rating: 4.98, jobs: 680, reviewsCount: 245, skills: ['Tata Tiscon 550D', 'Jindal TMT 8mm-32mm', 'Certified Test Report', 'Binding Wire Free'], bio: 'Authorized distributor of earthquake-resistant Fe 550D TMT reinforcement steel bars with precise electronic weighbridge billing.' },
  { name: 'Jharkhand Red Clay Brick Kiln (Bhatta)', title: 'Grade 1 Red Clay Bricks & Solid Flyash Blocks', exp: 20, rating: 4.93, jobs: 750, reviewsCount: 270, skills: ['Kiln-Baked Red Bricks', 'Zero Broken Guarantee', 'Flyash Eco Bricks', 'Bulk 5000+ Delivery'], bio: 'Heavy kiln-burnt ringing red clay bricks with sharp edges and supreme compressive strength for building foundations.' },
  { name: 'Bhurkunda Stone Metal & Aggregate Crushing', title: '10mm & 20mm Stone Gitti & Black Stone Dust Supplier', exp: 15, rating: 4.95, jobs: 590, reviewsCount: 210, skills: ['20mm Concrete Aggregate', '10mm Gitti', 'Black Stone Dust for Plaster', 'Dumper Supply'], bio: 'High-density crushed basalt black stone aggregate washed and graded for RCC slab casting and road paving in Bhurkunda.' },
  { name: 'Maa Bhavani Hardware & Paints Depot', title: 'Asian Paints, Berger & Dr. Fixit Waterproofing Hub', exp: 12, rating: 4.91, jobs: 480, reviewsCount: 165, skills: ['Waterproofing Chemicals', 'Royale Emulsion Stock', 'Putty & Primers', 'Painting Tools'], bio: 'Complete retail and wholesale supply of building primers, Dr. Fixit 101/Raincoat, Birla wall putty, and rollers.' },
  { name: 'Ramgarh Cement & Building Supply Corporation', title: 'ACC Suraksha & Nuvoco Duraguard Cement Hub', exp: 17, rating: 4.94, jobs: 630, reviewsCount: 228, skills: ['Nuvoco Concreto', 'ACC Gold Water Shield', 'Direct Site Unloading', 'Contractor Rates'], bio: 'Wholesale building contractor partner providing on-time cement deliveries with unloading labor across Ramgarh Cantt.' },
  { name: 'Sayal River Sand & Morrum Center', title: 'Coarse Damodar Sand & Foundation Red Morrum', exp: 11, rating: 4.89, jobs: 420, reviewsCount: 148, skills: ['Filling Morrum', 'Damodar Coarse Sand', 'Tractor Delivery', 'Site Dumping'], bio: 'Fast delivery of coarse concrete sand and foundation soil morrum for site leveling in Sayal and Saunda colliery areas.' },
  { name: 'Shree Ganesh Iron, Wire & Structural Angles', title: 'GI Binding Wire, MS Angles, Channels & Square Pipes', exp: 13, rating: 4.92, jobs: 470, reviewsCount: 162, skills: ['Annealed Binding Wire', 'MS Angle 25x3 to 50x6', 'Square Hollow Pipes', 'Roofing Sheets'], bio: 'Structural steel angles, Tata GI binding wires, and roofing sheets for shed construction and safety gate fabrication.' },
  { name: 'Saunda Clay Bricks & Paver Blocks Depot', title: 'Heavy Clay Bricks & Interlocking Paver Blocks', exp: 14, rating: 4.90, jobs: 490, reviewsCount: 170, skills: ['Zigzag Paver Blocks', 'Alley Bricks', 'Color Pavers 60mm/80mm', 'Kerb Stones'], bio: 'Manufacturing durable interlocking paver blocks for house driveways, petrol pumps, and parking lots in Saunda.' },
  { name: 'Baba Baidyanath Stone Crushing Plant', title: 'Stone Dust (M-Sand) & Crushed Blue Metal Aggregate', exp: 16, rating: 4.96, jobs: 580, reviewsCount: 202, skills: ['Manufactured Sand M-Sand', '10mm/20mm Blue Metal', 'Weighbridge Slip', 'Fast Dumper Dispatch'], bio: 'Eco-friendly manufactured sand (M-Sand) giving superior compressive strength and saving river ecosystems.', isClosedToday: true, closedReason: 'Closed today for quarry blasting & maintenance' },
  { name: 'Patratu Hardware, Pipe & Sanitary Mart', title: 'Supreme / Astral CPVC, SWR Pipes & Sintex Tanks', exp: 15, rating: 4.93, jobs: 510, reviewsCount: 180, skills: ['Sintex 500L-2000L Tanks', 'Astral CPVC Pipes', 'SWR Drainage Pipes', 'Brass Valves'], bio: 'Multi-layer anti-bacterial overhead water storage tanks, Astral plumbing pipes, and heavy brass sanitary fittings in Patratu.' },
  { name: 'Gupta Floor Tiles, Granite & Marble Mart', title: 'Kajaria Vitrified Floor Tiles & Wall Cladding Tiles', exp: 14, rating: 4.95, jobs: 520, reviewsCount: 185, skills: ['2x4 Vitrified Tiles', 'Anti-Skid Bathroom Tiles', 'Kitchen Digital Tiles', 'Tile Adhesive'], bio: 'Huge showroom collection of Kajaria vitrified glossy tiles, wooden floor planks, and Roff tile adhesives.' },
  { name: 'Maa Tara Granites & Kota Stone Depot', title: 'Black Galaxy Granite, Rajasthan Kota Stone & Marble', exp: 13, rating: 4.92, jobs: 460, reviewsCount: 158, skills: ['Jet Black Kitchen Granite', 'Natural Kota Stone', 'Marble Slabs', 'Step Risers'], bio: 'Durable jet black granite for modular kitchen countertops, polished Kota stone for stairs, and marble flooring.' },
  { name: 'Soni Iron Works & Fabricator Supply Mart', title: 'Designer Safety Grills, Main Gates & Railing Materials', exp: 12, rating: 4.90, jobs: 410, reviewsCount: 142, skills: ['Cast Iron Grills', 'Stainless Steel 304 Pipes', 'Laser Cut Sheet Gates', 'Welding Rods'], bio: 'Supplying raw fabrication steel, SS 304 staircase pipes, laser cut designer gate panels, and welding consumables.' },
  { name: 'Royal Plywood, Flush Doors & Hardware Center', title: 'Waterproof Marine Plywood, Laminates & Flush Doors', exp: 15, rating: 4.94, jobs: 530, reviewsCount: 188, skills: ['Century / Green Marine Ply', 'Mica Laminates 1mm', 'Solid Flush Doors', 'Fevicol SH'], bio: 'Termite-proof IS:710 Marine grade plywood, decorative laminates, and sturdy ready-to-fit flush doors.' },
  { name: 'Balkudra Construction Material Depot', title: 'Tractor Sand, River Gitti & Flyash Bricks Center', exp: 9, rating: 4.88, jobs: 320, reviewsCount: 106, skills: ['Flyash Bricks', 'Fine Sand Trolley', '20mm Gitti Load', 'Immediate Dispatch'], bio: 'Convenient one-stop delivery of sand, gitti, and bricks for local homebuilders in Balkudra village area.' },
  { name: 'Cooperative Colony Building Depot', title: 'Stone Dust, Red Morrum & Building Sand Center', exp: 10, rating: 4.91, jobs: 360, reviewsCount: 124, skills: ['Morrum Soil', 'Stone Dust for Plaster', 'TMT Rods 10mm/12mm', 'Cement Bags'], bio: 'Fast neighborhood supply for small home extensions, boundary repairs, and room plastering in Cooperative colony.' },
  { name: 'Kurse TMT Rods, Cement & Hardware Hub', title: 'Wholesale TMT Rods, UltraTech Cement & Binding Wire', exp: 11, rating: 4.90, jobs: 380, reviewsCount: 130, skills: ['Shree TMT Bars', 'UltraTech Super', 'GI Wire Bundles', 'Door Frames'], bio: 'Direct supply depot situated conveniently on the Bhurkunda-Patratu Highway for prompt construction drop-offs.' },
  { name: 'Jai Maa Chhinnamasta Transport & Heavy Supply', title: 'Tractor Trolley & 10-Wheeler Dumper Material Delivery Fleet', exp: 17, rating: 4.96, jobs: 640, reviewsCount: 220, skills: ['Dedicated Fleet of 8 Vehicles', 'GPS Tracked Delivery', 'Night Pour Delivery', 'Bulk Sand & Gitti'], bio: 'Reliable transport logistics delivering heavy truckloads of sand, stone aggregate, and bricks right to your construction gate.' }
]);

export const INITIAL_PROVIDERS: ServiceProvider[] = [
  ...TUITION_PEOPLE,
  ...ELECTRICIAN_PEOPLE,
  ...PLUMBER_PEOPLE,
  ...CARPENTER_PEOPLE,
  ...PAINTER_PEOPLE,
  ...APPLIANCE_PEOPLE,
  ...PRIEST_PEOPLE,
  ...MATERIALS_PEOPLE,
  ...COMPUTER_PEOPLE,
  ...CLEANING_PEOPLE
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-101',
    providerId: 'prov-tuition-1',
    providerName: 'Prof. Alok Mukherjee (M.Sc Physics, B.Ed)',
    providerPhone: '+91 80921 95302',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    categoryId: 'cat-tuition',
    serviceName: 'Class 10 Science & Maths Home Tuition',
    customerName: 'Sanjay Gupta',
    customerPhone: '8092195302',
    customerEmail: 'sanjay.gupta@gmail.com',
    address: 'Near Station Road, Bhurkunda',
    city: 'Bhurkunda',
    area: 'Bhurkunda',
    preferredDate: '2026-08-16',
    preferredTimeSlot: 'Evening (4 PM - 8 PM)',
    urgency: 'urgent',
    problemDescription: 'Need personal home tutor for Class 10 CBSE Board preparations in Bhurkunda.',
    estimatedBudget: 2500,
    status: 'in_progress',
    createdAt: '2026-08-14T18:30:00.000Z',
    adminNotes: 'Demo class confirmed for Monday evening.'
  },
  {
    id: 'req-102',
    providerId: 'prov-electrician-1',
    providerName: 'Rajesh Sharma (Licensed Electrician)',
    providerPhone: '+91 80921 95302',
    providerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80',
    categoryId: 'cat-electrician',
    serviceName: 'Main Line Fault & MCB Trip Repair',
    customerName: 'Vikas Singhania',
    customerPhone: '8092195302',
    customerEmail: 'vikas.singhania@gmail.com',
    address: 'Near Colliery Road, Bhurkunda',
    city: 'Bhurkunda',
    area: 'Bhurkunda',
    preferredDate: '2026-08-15',
    preferredTimeSlot: 'Morning (8 AM - 12 PM)',
    urgency: 'urgent',
    problemDescription: 'Main MCB is repeatedly tripping and the cooler is not turning on. Please inspect immediately.',
    estimatedBudget: 350,
    status: 'in_progress',
    createdAt: '2026-08-14T18:30:00.000Z',
    adminNotes: 'Provider dispatched to location in Bhurkunda.'
  },
  {
    id: 'req-103',
    providerId: 'prov-priest-1',
    providerName: 'Pt. Suryanarayan Shastri',
    providerPhone: '+91 80921 95302',
    providerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80',
    categoryId: 'cat-priest',
    serviceName: 'Griha Pravesh & Vastu Shanti Puja',
    customerName: 'Anshuman Sinha',
    customerPhone: '8092195302',
    customerEmail: 'anshuman.sinha@outlook.com',
    address: 'Chhatarpur Colony, Ramgarh Cantt',
    city: 'Ramgarh',
    area: 'Ramgarh',
    preferredDate: '2026-08-20',
    preferredTimeSlot: 'Morning (8 AM - 12 PM)',
    urgency: 'flexible',
    problemDescription: 'Need to perform house warming and Vastu Shanti puja for our new residence in Ramgarh.',
    estimatedBudget: 2501,
    status: 'accepted',
    createdAt: '2026-08-14T14:15:00.000Z',
    adminNotes: 'Auspicious timing confirmed for 9:15 AM.'
  }
];
