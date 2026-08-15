export type Language = 'en';

export interface SubService {
  id: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  avgPrice?: number;
  unit?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  iconName: string;
  description: string;
  descriptionEn?: string;
  descriptionHi?: string;
  color: string;
  popular: boolean;
  isClosed?: boolean;
  isOpen?: boolean;
  isActive?: boolean;
  isClosedToday?: boolean;
  closedMessage?: string;
  subServices: SubService[];
}

export interface ServiceOffer {
  id: string;
  name: string;
  nameEn?: string;
  nameHi?: string;
  price?: number;
  unit?: string;
  description?: string;
  descriptionEn?: string;
  descriptionHi?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn?: string;
  titleHi?: string;
  imageUrl: string;
  description?: string;
  descriptionEn?: string;
  descriptionHi?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  serviceDone: string;
  serviceDoneEn?: string;
  serviceDoneHi?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  whatsapp: string;
  email: string;
  categoryId: string;
  title: string;
  titleEn?: string;
  titleHi?: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  location: {
    city: string;
    area: string;
    fullAddress: string;
    lat?: number;
    lng?: number;
  };
  distanceKm?: number;
  serviceRadiusKm: number;
  isVerified: boolean;
  verificationBadges: ('id_verified' | 'police_cleared' | 'skill_certified' | 'safety_trained')[];
  availability: 'immediate' | 'today' | 'flexible';
  availableTimings: string;
  startingPrice?: number;
  priceUnit?: string;
  bio: string;
  bioEn?: string;
  bioHi?: string;
  skills: string[];
  servicesOffered: ServiceOffer[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  isFeatured?: boolean;
  barcode?: string;
  isActive?: boolean;
  isOpen?: boolean;
  isClosedToday?: boolean;
  closedReason?: string;
  isAvailableNow?: boolean;
}

export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type UrgencyLevel = 'urgent' | 'today' | 'flexible';

export interface ServiceRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  providerAvatar: string;
  categoryId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  area: string;
  preferredDate: string;
  preferredTimeSlot: string;
  urgency: UrgencyLevel;
  problemDescription: string;
  estimatedBudget?: number;
  status: RequestStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface FilterOptions {
  searchQuery: string;
  categoryId: string;
  city: string;
  minRating: number;
  maxPrice?: number;
  minExperience: number;
  availability: string;
  verifiedOnly: boolean;
  maxDistanceKm: number;
  sortBy: 'featured' | 'rating' | 'experience' | 'jobs' | 'distance';
  statusFilter?: 'all' | 'open_only' | 'closed_today' | 'active_only' | 'available_now' | 'not_available';
}
