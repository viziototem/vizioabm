export type UserRole = 'master_admin' | 'resident' | 'merchant' | 'abm_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  unit?: string; // e.g., "Ed. Atlântico · Apto 402" or "Barra Green · Bloco 2"
  merchantStoreId?: string; // If merchant, links to their store
  status: 'active' | 'pending' | 'blocked';
  createdAt: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  coverImage: string;
  primaryColor: string;
  secondaryColor: string;
  phone: string;
  whatsapp: string;
  address: string;
  condoZone?: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  website?: string;
  instagram?: string;
  rating: number;
  reviewCount: number;
  deliveryAvailable: boolean;
  featured: boolean;
  status: 'active' | 'pending' | 'paused';
  createdAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  category?: string;
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  storeId: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  priceType?: 'fixed' | 'starting_at' | 'under_budget';
  duration?: string;
  availability: string;
  featured?: boolean;
  createdAt: string;
}

export interface Ad {
  id: string;
  storeId: string;
  storeName: string;
  storeLogo: string;
  title: string;
  description: string;
  image: string;
  type: 'oferta' | 'produto' | 'serviço' | 'evento' | 'institucional';
  category: string;
  discountPercent?: number;
  price?: number;
  cta: string;
  link: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'draft' | 'expired';
  viewsCount: number;
  clicksCount: number;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  cta: string;
  position: number;
  targetType: 'store' | 'ad' | 'url' | 'abm_news';
  targetId?: string;
  status: 'active' | 'inactive';
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  message: string;
  attachment?: string;
  readAt?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  type: 'resident_abm' | 'resident_merchant';
  participantIds: string[];
  participantNames: Record<string, string>;
  participantRoles: Record<string, UserRole>;
  participantAvatars: Record<string, string>;
  title: string;
  subtitle?: string;
  storeId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCounts: Record<string, number>;
  status?: 'open' | 'in_progress' | 'resolved';
  category?: string;
}

export interface ABMNews {
  id: string;
  title: string;
  category: 'Comunicado Oficial' | 'Segurança' | 'Eventos' | 'Obras & Melhorias' | 'Assembleia';
  summary: string;
  content: string;
  date: string;
  urgent: boolean;
  author: string;
  imageUrl?: string;
  attachments?: { name: string; size: string; type: string }[];
}

export interface ABMDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  size: string;
  fileType: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ad' | 'notice' | 'message' | 'admin';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface StoreMetrics {
  storeViews: number;
  adViews: number;
  whatsappClicks: number;
  phoneClicks: number;
  locationClicks: number;
  favorites: number;
}
