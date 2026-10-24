import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'adityaraj_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface OwnerUser {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  name: string;
}

export interface CompanyProfile {
  companyName: string;
  tagline: string;
  phoneDisplay: string;
  phoneLink: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLabel: string;
  proprietorName: string;
  proprietorRole: string;
  proprietorVision: string;
  proprietorExp: string;
  proprietorFocus: string;
  proprietorAchieve: string;
  proprietorPhoto: string;
}

export interface WebsiteContent {
  stats: Array<{ v: number; s: string; l: string }>;
  trust: string[];
  pairs: Array<[string, string, string]>;
  usps: Array<[string, string, string]>;
  spec: Array<[string, string]>;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  type: string;
  category: 'Residential' | 'Commercial';
  status: 'Completed' | 'Active' | 'Upcoming';
  year?: string;
  progress?: number;
  due?: string;
  stage?: 'Foundation' | 'Structure' | 'Brickwork' | 'Finishing' | 'Completed';
  launchWhen?: string;
  description: string;
  coverImage?: string;
  galleryImages?: string[];
  artIndex: number;
  order: number;
  published: boolean;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  budget: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'Replied' | 'Closed';
  replyNotes?: string;
  repliedAt?: string;
  lastReplyMessage?: string;
}

export interface RegistrationItem {
  id: string;
  projectId: string;
  projectName: string;
  phone: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface ReviewItem {
  id: string;
  name: string;
  projectType: string;
  rating: number;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Hidden';
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  artIndex: number;
  order: number;
  published: boolean;
}

export interface DatabaseSchema {
  owner: OwnerUser;
  company: CompanyProfile;
  content: WebsiteContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  enquiries: EnquiryItem[];
  registrations: RegistrationItem[];
  reviews: ReviewItem[];
  gallery: GalleryItem[];
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  return hashPassword(password, salt) === hash;
}

const defaultSalt = 'adityaraj_salt_2026';
const defaultHash = hashPassword('Adityaraj@2026', defaultSalt);

const defaultDb: DatabaseSchema = {
  owner: {
    id: 'owner_1',
    username: 'adityaraj_owner',
    passwordHash: defaultHash,
    salt: defaultSalt,
    name: 'Adityaraj Owner',
  },
  company: {
    companyName: 'Adityaraj Builders & Developers',
    tagline: 'प्रगत बांधकाम तंत्रज्ञान',
    phoneDisplay: '+91 724 245 8899',
    phoneLink: '+917242458899',
    whatsapp: '919822012345',
    email: 'contact@adityarajbuilders.in',
    address: 'Adityaraj House, Near Civil Lines Square, Murtizapur Road, Akola, Maharashtra 444001',
    mapLabel: 'AKOLA · CIVIL LINES HEADQUARTERS',
    proprietorName: 'Er. Rameshwarji Tayade',
    proprietorRole: 'Founder & Proprietor · Civil Engineer',
    proprietorVision: 'Every building carries a family\'s trust. I make sure it is built the way I would build my own: strong, honest and on time.',
    proprietorExp: '15+ years in civil construction',
    proprietorFocus: 'Structural quality, site discipline, transparent costing',
    proprietorAchieve: 'MahaRERA Registered Developer, Over 12,000 residents housed',
    proprietorPhoto: '/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png',
  },
  content: {
    stats: [
      { v: 15, s: '+', l: 'Years of engineering experience' },
      { v: 86, s: '+', l: 'Completed landmark projects' },
      { v: 7, s: '', l: 'Active ongoing projects' },
      { v: 250, s: '+', l: 'Happy customer families' },
    ],
    trust: [
      'Quality work with IS 456 RCC Standards',
      'Transparent pricing with zero hidden charges',
      'Timely delivery with milestone tracking',
    ],
    pairs: [
      ['Projects that slip by months', 'On-time delivery', 'Milestone schedule agreed before work starts.'],
      ['Poor workmanship and cracks that appear early', 'Skilled engineers on every stage', 'Qualified supervision from foundation to finishing.'],
      ['Hidden costs and surprise bills', 'Transparent pricing', 'Itemised estimate with no unexplained additions.'],
      ['Substituted or low-grade materials', 'Quality materials', 'Approved primary Fe-550D TMT and M40 concrete.'],
      ['No news from the site for weeks', 'Regular updates', 'Site visits and progress reports you can rely on.'],
    ],
    usps: [
      ['Premium quality construction', 'Structural strength and clean finishing, checked at every stage.', 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4'],
      ['Experienced engineers and skilled workers', 'A trained team that reads drawings and builds exactly to them.', 'M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 5.2a3 3 0 010 5.6 M18 14.3c1.8.8 3 2.6 3 5.7'],
      ['Transparent cost estimation', 'A detailed estimate up front, and a clear explanation of any change.', 'M6 3h12v18H6z M9 7h6 M9 11h2 M13 11h2 M9 15h2 M13 15h2'],
      ['On-time project delivery', 'Planned timelines, tracked weekly, and honest about schedules.', 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2'],
      ['High-quality materials', 'Cement, steel and finishes from reliable top-grade suppliers.', 'M3 7h18v4H3z M3 13h8v4H3z M13 13h8v4h-8z'],
      ['Personal project monitoring', 'Direct oversight from the proprietor, not just remote site team.', 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z'],
    ],
    spec: [
      ['Specialization', 'Luxury homes, bungalows, residential towers and commercial spaces.'],
      ['Target market', 'Homeowners, plot owners, commercial investors and businesses in Akola.'],
      ['Customization', 'Designs shaped around your requirements, not a fixed rigid catalogue.'],
      ['Quality focus', 'Structural strength, safety, seismic resilience and mirror finishing.'],
      ['Customer engagement', 'Direct WhatsApp updates, site visits and transparent communication.'],
    ],
  },
  services: [
    {
      id: 'srv_1',
      title: 'Residential Construction',
      description: 'Homes, bungalows and apartment buildings built to your design with earthquake-resistant RCC framing.',
      tag: 'Villas · Bungalows · Buildings',
      icon: 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
      order: 1,
      published: true,
    },
    {
      id: 'srv_2',
      title: 'Commercial Construction',
      description: 'Offices, showrooms and retail spaces built for daily heavy use with column-free spans.',
      tag: 'Offices · Retail · Showrooms',
      icon: 'M5 21V4h9v17 M14 9h5v12 M8 8h3 M8 12h3 M8 16h3 M16 13h1 M16 17h1 M3 21h18',
      order: 2,
      published: true,
    },
    {
      id: 'srv_3',
      title: 'Renovation & Remodeling',
      description: 'Structural reinforcement, room extensions, waterproofing and complete modern makeovers.',
      tag: 'Repairs · Extensions · Makeovers',
      icon: 'M14.5 6.5a4 4 0 005 5l-9.5 9.5a2 2 0 01-3-3z M13 4l3 3',
      order: 3,
      published: true,
    },
    {
      id: 'srv_4',
      title: 'Interior Work',
      description: 'Carpentry, modular kitchens, false ceilings, vitrified flooring and architectural lighting.',
      tag: 'Carpentry · Flooring · Ceilings',
      icon: 'M4 12V9a2 2 0 012-2h12a2 2 0 012 2v3 M3 12h18v5H3z M5 17v2 M19 17v2',
      order: 4,
      published: true,
    },
    {
      id: 'srv_5',
      title: 'Turnkey Projects',
      description: 'Design, architectural approvals, soil testing, civil construction and key handover from one team.',
      tag: 'Design to handover',
      icon: 'M8 15a4 4 0 110-8 4 4 0 010 8z M11 12h10 M17 12v3 M20 12v2',
      order: 5,
      published: true,
    },
    {
      id: 'srv_6',
      title: 'Construction Consultancy',
      description: 'Cost estimates, structural CAD audits, site inspection and valuation advice for owners and investors.',
      tag: 'Estimates · Planning · Audits',
      icon: 'M12 3v3 M7 21l5-15 5 15 M9 16h6',
      order: 6,
      published: true,
    },
  ],
  projects: [
    {
      id: 'p_1',
      name: 'The Orchid Residence',
      location: 'Civil Lines, Akola',
      type: 'Luxury Villa',
      category: 'Residential',
      status: 'Completed',
      year: '2024',
      description: 'Ultra-luxury 4 BHK standalone bungalow with private landscaped terrace, Italian marble flooring and deep pile foundation.',
      artIndex: 0,
      order: 1,
      published: true,
    },
    {
      id: 'p_2',
      name: 'Meridian Towers',
      location: 'Murtizapur Road, Akola',
      type: 'Residential Building',
      category: 'Residential',
      status: 'Completed',
      year: '2023',
      description: 'Twin 7-storey residential complex with earthquake-resistant shear wall frame, high-speed lift and solar lighting.',
      artIndex: 1,
      order: 2,
      published: true,
    },
    {
      id: 'p_3',
      name: 'Banyan Court Bungalow',
      location: 'Green Avenue, Akola',
      type: 'Bungalow',
      category: 'Residential',
      status: 'Completed',
      year: '2024',
      description: 'Contemporary Vastu-compliant residence featuring double-height drawing room and rain-water harvesting well.',
      artIndex: 2,
      order: 3,
      published: true,
    },
    {
      id: 'p_4',
      name: 'Crest Business Hub',
      location: 'Station Road, Akola',
      type: 'Commercial Space',
      category: 'Commercial',
      status: 'Completed',
      year: '2022',
      description: 'Modern 5-storey retail and corporate complex with basement stack parking and full glass structural glazing.',
      artIndex: 3,
      order: 4,
      published: true,
    },
    {
      id: 'p_5',
      name: 'Lotus Heights',
      location: 'Kaulkhed, Akola',
      type: 'Residential Building',
      category: 'Residential',
      status: 'Completed',
      year: '2022',
      description: 'Delivered on-time residential building with 2 & 3 BHK spacious apartments and 24x7 security.',
      artIndex: 1,
      order: 5,
      published: true,
    },
    {
      id: 'p_6',
      name: 'Saffron Plaza',
      location: 'Gandhi Road, Akola',
      type: 'Commercial Space',
      category: 'Commercial',
      status: 'Completed',
      year: '2021',
      description: 'High-footfall commercial shopping arcade with fire safety sprinkler system and wide corridors.',
      artIndex: 3,
      order: 6,
      published: true,
    },
    {
      id: 'p_7',
      name: 'Skyline Residency',
      location: 'Civil Lines Extension, Akola',
      type: 'Residential Building',
      category: 'Residential',
      status: 'Active',
      progress: 72,
      due: 'Mar 2027',
      stage: 'Brickwork',
      description: 'Ongoing 10-storey landmark residential tower. Structural frame complete; internal brickwork and plumbing in progress.',
      artIndex: 1,
      order: 7,
      published: true,
    },
    {
      id: 'p_8',
      name: 'Cedar Park Bungalows',
      location: 'Old City Bypass, Akola',
      type: 'Bungalow Cluster',
      category: 'Residential',
      status: 'Active',
      progress: 45,
      due: 'Aug 2027',
      stage: 'Structure',
      description: 'Gated community of 8 private luxury bungalows with personal gardens and clubhouse.',
      artIndex: 2,
      order: 8,
      published: true,
    },
    {
      id: 'p_9',
      name: 'Axis Commercial Plaza',
      location: 'National Highway Corridor, Akola',
      type: 'Commercial Space',
      category: 'Commercial',
      status: 'Active',
      progress: 18,
      due: 'Jan 2028',
      stage: 'Foundation',
      description: 'Heavy bored pile foundation completed for commercial retail showroom and corporate offices.',
      artIndex: 3,
      order: 9,
      published: true,
    },
    {
      id: 'p_10',
      name: 'Aurum Heights',
      location: 'Ring Road, Akola',
      type: 'Luxury Tower',
      category: 'Residential',
      status: 'Upcoming',
      launchWhen: 'Q1 2027',
      description: 'Premium residential towers with landscaped podiums, EV charging bays, and rooftop lounge.',
      artIndex: 0,
      order: 10,
      published: true,
    },
    {
      id: 'p_11',
      name: 'Riverside Villas',
      location: 'Riverview Enclave, Akola',
      type: 'Villa Plots',
      category: 'Residential',
      status: 'Upcoming',
      launchWhen: 'Q3 2027',
      description: 'Exclusive gated villa plots with turnkey civil architectural design options.',
      artIndex: 2,
      order: 11,
      published: true,
    },
    {
      id: 'p_12',
      name: 'Nexus Business Park',
      location: 'Industrial & Trade Hub, Akola',
      type: 'Corporate Hub',
      category: 'Commercial',
      status: 'Upcoming',
      launchWhen: 'Q1 2028',
      description: 'Flexible commercial floors with high-speed elevators and conference facilities.',
      artIndex: 3,
      order: 12,
      published: true,
    },
  ],
  enquiries: [
    {
      id: 'enq_101',
      name: 'Suresh Patil',
      phone: '+91 98230 45678',
      email: 'suresh.patil@gmail.com',
      projectType: 'Residential construction',
      budget: '₹50 lakh – ₹1 crore',
      message: 'Looking to construct a 3 BHK bungalow on a 2,400 sq.ft. plot in Civil Lines. Need a turnkey civil estimate and floor plan.',
      createdAt: '2026-10-18T10:30:00Z',
      status: 'New',
    },
    {
      id: 'enq_102',
      name: 'Pravin Deshmukh',
      phone: '+91 94221 67890',
      email: 'pravin.d@rediffmail.com',
      projectType: 'Commercial construction',
      budget: '₹1 – 3 crore',
      message: 'Need commercial showroom construction on Murtizapur Road. Ground plus two floors.',
      createdAt: '2026-10-17T14:15:00Z',
      status: 'Replied',
      replyNotes: 'Sent WhatsApp proposal and schedule for site inspection on Monday.',
      repliedAt: '2026-10-17T16:00:00Z',
    },
    {
      id: 'enq_103',
      name: 'Anjali Kulkarni',
      phone: '+91 98900 11223',
      email: 'anjali.k@outlook.com',
      projectType: 'Renovation & remodeling',
      budget: 'Under ₹50 lakh',
      message: 'Old ancestral house in Akola Old City. Need structural strengthening and complete interior renovation.',
      createdAt: '2026-10-15T09:20:00Z',
      status: 'Closed',
      replyNotes: 'Site visit completed. Work started.',
      repliedAt: '2026-10-15T11:00:00Z',
    },
  ],
  registrations: [
    {
      id: 'reg_201',
      projectId: 'p_10',
      projectName: 'Aurum Heights',
      phone: '+91 98600 44332',
      createdAt: '2026-10-19T11:45:00Z',
      status: 'New',
    },
    {
      id: 'reg_202',
      projectId: 'p_11',
      projectName: 'Riverside Villas',
      phone: '+91 94234 55667',
      createdAt: '2026-10-16T15:20:00Z',
      status: 'Contacted',
    },
  ],
  reviews: [
    {
      id: 'rev_301',
      name: 'Rohan M.',
      projectType: 'Residential villa',
      rating: 5,
      message: 'The estimate matched the final bill, and we were updated at every stage. The finish quality is better than we expected.',
      createdAt: '2026-09-12T10:00:00Z',
      status: 'Approved',
    },
    {
      id: 'rev_302',
      name: 'Meera S.',
      projectType: 'Home renovation',
      rating: 5,
      message: 'They treated our old house with care. The team was punctual and the site was always clean.',
      createdAt: '2026-09-20T11:30:00Z',
      status: 'Approved',
    },
    {
      id: 'rev_303',
      name: 'Vikram P.',
      projectType: 'Commercial space',
      rating: 4,
      message: 'Delivered the showroom on schedule. Clear communication from the engineers made the whole process easy.',
      createdAt: '2026-10-02T16:45:00Z',
      status: 'Approved',
    },
    {
      id: 'rev_304',
      name: 'Sneha K.',
      projectType: 'Bungalow',
      rating: 5,
      message: 'From plan changes to material choices, every decision was explained clearly. We moved in on the promised date.',
      createdAt: '2026-10-08T14:10:00Z',
      status: 'Approved',
    },
    {
      id: 'rev_305',
      name: 'Amit D.',
      projectType: 'Residential building',
      rating: 5,
      message: 'Regular site visits and honest progress reports. It felt like the engineers cared about the building as much as we did.',
      createdAt: '2026-10-14T12:00:00Z',
      status: 'Approved',
    },
    {
      id: 'rev_306',
      name: 'Kishore Jaiswal',
      projectType: 'Turnkey bungalow construction',
      rating: 5,
      message: 'Best construction experience in Akola. Er. Rameshwarji supervised the concrete slab casting personally. Very satisfied.',
      createdAt: '2026-10-19T18:00:00Z',
      status: 'Pending',
    },
  ],
  gallery: [
    { id: 'gal_1', title: 'Site visit', image: '', artIndex: 1, order: 1, published: true },
    { id: 'gal_2', title: 'Project inspection', image: '', artIndex: 0, order: 2, published: true },
    { id: 'gal_3', title: 'Client meeting', image: '', artIndex: 2, order: 3, published: true },
    { id: 'gal_4', title: 'Team discussion', image: '', artIndex: 3, order: 4, published: true },
    { id: 'gal_5', title: 'Award ceremony', image: '', artIndex: 0, order: 5, published: true },
    { id: 'gal_6', title: 'Construction supervision', image: '', artIndex: 1, order: 6, published: true },
  ],
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error loading DB file, using default data:', e);
    }
    this.save(defaultDb);
    return defaultDb;
  }

  public save(data?: DatabaseSchema) {
    if (data) {
      this.data = data;
    }
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving DB file:', e);
    }
  }

  public get(): DatabaseSchema {
    return this.data;
  }
}

export const db = new Database();
