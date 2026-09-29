import {
  User,
  Store,
  Product,
  Service,
  Ad,
  Banner,
  Category,
  Message,
  Conversation,
  ABMNews,
  ABMDocument,
  NotificationItem,
  StoreMetrics
} from '../types';

import heroAbmImg from '../assets/images/hero_abm_community_1790695743959.jpg';
import bannerGastronomyImg from '../assets/images/banner_gastronomy_1790695756555.jpg';
import bannerServicesImg from '../assets/images/banner_services_1790695767723.jpg';
import bannerWellnessImg from '../assets/images/banner_wellness_1790695778361.jpg';

const STORAGE_KEYS = {
  CURRENT_USER: 'abm_current_user',
  USERS: 'abm_users',
  STORES: 'abm_stores',
  PRODUCTS: 'abm_products',
  SERVICES: 'abm_services',
  ADS: 'abm_ads',
  BANNERS: 'abm_banners',
  CATEGORIES: 'abm_categories',
  CONVERSATIONS: 'abm_conversations',
  MESSAGES: 'abm_messages',
  NEWS: 'abm_news',
  DOCUMENTS: 'abm_documents',
  NOTIFICATIONS: 'abm_notifications',
  FAVORITES: 'abm_favorites',
};

// Initial Seed Users
export const SEED_USERS: User[] = [
  {
    id: 'user_master_admin',
    name: 'Carlos Silveira',
    email: 'admin@abm.org.br',
    phone: '(21) 98123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    role: 'master_admin',
    unit: 'Sede Administrativa ABM',
    status: 'active',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'user_abm_manager',
    name: 'Patrícia Mendes',
    email: 'atendimento@abm.org.br',
    phone: '(21) 98877-6655',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    role: 'abm_manager',
    unit: 'Coordenação Comunitária',
    status: 'active',
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'user_merchant_1',
    name: 'Chef Lucas Amorim',
    email: 'lucas@forneriabarra.com.br',
    phone: '(21) 99345-8899',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=256&q=80',
    role: 'merchant',
    merchantStoreId: 'store_1',
    unit: 'Comércio Local · Bloco Gastronomia',
    status: 'active',
    createdAt: '2025-02-15T11:30:00Z',
  },
  {
    id: 'user_merchant_2',
    name: 'Dra. Camila Nogueira',
    email: 'dra.camila@barrasaude.com.br',
    phone: '(21) 97122-3344',
    avatar: 'https://images.unsplash.com/photo-1594824813583-149021239c04?auto=format&fit=crop&w=256&q=80',
    role: 'merchant',
    merchantStoreId: 'store_2',
    unit: 'Centro Médico ABM · Sala 204',
    status: 'active',
    createdAt: '2025-03-01T14:00:00Z',
  },
  {
    id: 'user_resident_1',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    phone: '(21) 99876-5432',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    role: 'resident',
    unit: 'Ed. Atlântico · Apto 402',
    status: 'active',
    createdAt: '2025-03-10T08:20:00Z',
  },
  {
    id: 'user_resident_2',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@email.com',
    phone: '(21) 98711-2233',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    role: 'resident',
    unit: 'Barra Golden Green · Torre B 1201',
    status: 'active',
    createdAt: '2025-03-12T16:45:00Z',
  }
];

// Initial Seed Categories
export const SEED_CATEGORIES: Category[] = [
  { id: 'cat_alim', name: 'Alimentação', icon: 'UtensilsCrossed', description: 'Restaurantes, pizzarias, padarias e delivery', color: 'from-amber-500 to-orange-600' },
  { id: 'cat_merc', name: 'Mercados', icon: 'ShoppingBag', description: 'Hortifrutis orgânicos, empórios e conveniência', color: 'from-emerald-500 to-green-600' },
  { id: 'cat_belz', name: 'Beleza', icon: 'Sparkles', description: 'Salões de beleza, manicure, barbearias e estética', color: 'from-pink-500 to-rose-600' },
  { id: 'cat_saud', name: 'Saúde', icon: 'HeartPulse', description: 'Clínicas odontológicas, médicos, pilates e terapias', color: 'from-teal-500 to-cyan-600' },
  { id: 'cat_serv', name: 'Serviços', icon: 'Wrench', description: 'Eletricistas, encanadores, ar condicionado e reformas', color: 'from-blue-500 to-indigo-600' },
  { id: 'cat_casa', name: 'Casa', icon: 'Home', description: 'Marcenaria, vidraçaria, cortinas e decoração', color: 'from-violet-500 to-purple-600' },
  { id: 'cat_educ', name: 'Educação', icon: 'GraduationCap', description: 'Aulas particulares, idiomas, reforço e música', color: 'from-amber-600 to-yellow-600' },
  { id: 'cat_moda', name: 'Moda', icon: 'Shirt', description: 'Roupas, acessórios, moda praia e ajustes', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'cat_pet', name: 'Pet', icon: 'PawPrint', description: 'Veterinários, banho & tosa e rações', color: 'from-orange-500 to-amber-600' },
  { id: 'cat_auto', name: 'Automotivo', icon: 'Car', description: 'Lavagem ecológica, estética automotiva e mecânica', color: 'from-slate-600 to-slate-800' },
  { id: 'cat_tec', name: 'Tecnologia', icon: 'Laptop', description: 'Manutenção de celulares, notebooks e redes Wi-Fi', color: 'from-sky-500 to-blue-600' },
  { id: 'cat_out', name: 'Outros', icon: 'Layers', description: 'Papelaria, presentes e serviços gerais', color: 'from-zinc-500 to-stone-600' },
];

// Initial Seed Stores
export const SEED_STORES: Store[] = [
  {
    id: 'store_1',
    ownerId: 'user_merchant_1',
    name: 'Forneria & Empório Barra',
    category: 'Alimentação',
    description: 'Pizzas artesanais de fermentação natural (48h), pães rústicos de sourdough, queijos finos da serra e vinhos selecionados com entrega rápida nos condomínios da ABM.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=256&q=80',
    coverImage: bannerGastronomyImg,
    primaryColor: '#c2410c', // orange-700
    secondaryColor: '#f97316',
    phone: '(21) 3456-7890',
    whatsapp: '5521993458899',
    address: 'Av. Prefeito Dulcídio Cardoso, 2500 - Galeria Comercial ABM',
    condoZone: 'Setor Bosque ABM',
    latitude: -23.0035,
    longitude: -43.3228,
    openingHours: 'Terça a Domingo: 17h00 às 23h30',
    website: 'https://forneriabarra.com.br',
    instagram: '@forneria.barra',
    rating: 4.9,
    reviewCount: 142,
    deliveryAvailable: true,
    featured: true,
    status: 'active',
    createdAt: '2025-02-15T12:00:00Z',
  },
  {
    id: 'store_2',
    ownerId: 'user_merchant_2',
    name: 'Camila Nogueira Odontologia Integrada',
    category: 'Saúde',
    description: 'Atendimento odontológico humanizado e de excelência na ABM: checkup preventivo, clareamento dental a laser, ortodontia estética com alinhadores invisíveis e emergências.',
    logo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=256&q=80',
    coverImage: bannerWellnessImg,
    primaryColor: '#0f766e', // teal-700
    secondaryColor: '#14b8a6',
    phone: '(21) 3211-4455',
    whatsapp: '5521971223344',
    address: 'Edifício Barra Medical ABM, Sala 204',
    condoZone: 'Setor Serviços Médicos',
    latitude: -23.0041,
    longitude: -43.3242,
    openingHours: 'Segunda a Sexta: 08h00 às 19h00 | Sábado: 08h00 às 13h00',
    website: 'https://camilanogueiraodonto.com.br',
    instagram: '@dracamilanogueira',
    rating: 4.95,
    reviewCount: 88,
    deliveryAvailable: false,
    featured: true,
    status: 'active',
    createdAt: '2025-03-01T14:30:00Z',
  },
  {
    id: 'store_3',
    ownerId: 'user_merchant_admin',
    name: 'Barra Prime Climatização & Elétrica 24h',
    category: 'Serviços',
    description: 'Equipe especializada e credenciada em instalação, manutenção preventiva e higienização de ar-condicionado split e VRF, além de serviços elétricos residenciais 24h.',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=256&q=80',
    coverImage: bannerServicesImg,
    primaryColor: '#1d4ed8', // blue-700
    secondaryColor: '#3b82f6',
    phone: '(21) 3998-1122',
    whatsapp: '5521988880011',
    address: 'Atendimento a domicílio em todos os condomínios da ABM',
    condoZone: 'Atendimento Local 24 Horas',
    latitude: -23.0028,
    longitude: -43.3215,
    openingHours: 'Atendimento Comercial: 07h às 19h | Plantão Emergencial: 24h',
    website: 'https://barraprimeclima.com.br',
    instagram: '@barraprimeclima',
    rating: 4.88,
    reviewCount: 96,
    deliveryAvailable: true,
    featured: true,
    status: 'active',
    createdAt: '2025-02-20T10:00:00Z',
  },
  {
    id: 'store_4',
    ownerId: 'user_merchant_admin',
    name: 'Pet Care Tropical & Banho com Taxi Dog',
    category: 'Pet',
    description: 'Cuidado completo para o seu melhor amigo: banho relaxante, tosa higiênica e tesoura, hidratação de pelagem, vacinação e táxi dog com busca e entrega na portaria do condomínio.',
    logo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=80',
    primaryColor: '#ea580c', // orange-600
    secondaryColor: '#f97316',
    phone: '(21) 3325-9900',
    whatsapp: '5521991238877',
    address: 'Rua Jornalista Ricardo Marinho, 300 - Loja B',
    condoZone: 'Setor Parque das Rosas / ABM',
    latitude: -23.0019,
    longitude: -43.326,
    openingHours: 'Segunda a Sábado: 08h00 às 18h30',
    website: 'https://pettropicalbarra.com.br',
    instagram: '@pettropicalbarra',
    rating: 4.92,
    reviewCount: 110,
    deliveryAvailable: true,
    featured: false,
    status: 'active',
    createdAt: '2025-02-28T09:15:00Z',
  },
  {
    id: 'store_5',
    ownerId: 'user_merchant_admin',
    name: 'Studio Bella Vista Salão & Spa',
    category: 'Beleza',
    description: 'Espaço de beleza sofisticado com corte visagista, coloração premium com produtos orgânicos, manicure russa, design de sobrancelhas e massoterapia relaxante.',
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=256&q=80',
    coverImage: bannerWellnessImg,
    primaryColor: '#db2777', // pink-600
    secondaryColor: '#f472b6',
    phone: '(21) 3499-5566',
    whatsapp: '5521976543210',
    address: 'Av. das Américas, 3120 - Shopping Barra Point / Bloco ABM',
    condoZone: 'Entorno ABM',
    latitude: -23.0039,
    longitude: -43.3201,
    openingHours: 'Terça a Sábado: 09h00 às 20h00',
    website: 'https://studiobellavista.com.br',
    instagram: '@studiobellavista.barra',
    rating: 4.85,
    reviewCount: 74,
    deliveryAvailable: false,
    featured: true,
    status: 'active',
    createdAt: '2025-03-04T15:20:00Z',
  },
  {
    id: 'store_6',
    ownerId: 'user_merchant_admin',
    name: 'Green Market Hortifruti & Orgânicos',
    category: 'Mercados',
    description: 'Frutas selecionadas, verduras frescas colhidas no dia, linha completa de produtos orgânicos certificados, queijos artesanais e pães sem glúten entregues na sua porta.',
    logo: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    primaryColor: '#16a34a', // green-600
    secondaryColor: '#22c55e',
    phone: '(21) 3288-7744',
    whatsapp: '5521998877665',
    address: 'Rua Prudente de Morais, anexo Associação ABM',
    condoZone: 'Sede ABM',
    latitude: -23.0022,
    longitude: -43.3245,
    openingHours: 'Segunda a Sábado: 07h30 às 20h00 | Domingo: 08h00 às 14h00',
    website: 'https://greenmarketbarra.com.br',
    instagram: '@greenmarket.barra',
    rating: 4.9,
    reviewCount: 165,
    deliveryAvailable: true,
    featured: false,
    status: 'active',
    createdAt: '2025-01-25T11:00:00Z',
  }
];

// Initial Seed Products
export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    storeId: 'store_1',
    name: 'Pizza Burrata & Pesto de Manjericão',
    description: 'Massa levain 48h, molho de tomate pelado San Marzano, queijo fior di latte, burrata fresca inteira de 150g, pesto artesanal e tomates confitados.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    price: 89.90,
    originalPrice: 99.00,
    category: 'Pizzas Artesanais',
    inStock: true,
    featured: true,
    createdAt: '2025-02-16T10:00:00Z',
  },
  {
    id: 'prod_2',
    storeId: 'store_1',
    name: 'Pizza Trufada & Cogumelos Paris',
    description: 'Fior di latte, mix de cogumelos frescos salteados no azeite extravirgem, azeite trufado branco italiano e raspas de grana padano 24 meses.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    price: 94.00,
    category: 'Pizzas Especiais',
    inStock: true,
    featured: true,
    createdAt: '2025-02-16T10:30:00Z',
  },
  {
    id: 'prod_3',
    storeId: 'store_1',
    name: 'Pão de Fermentação Natural Tradicional (600g)',
    description: 'Pão rústico crocante por fora e miolo macio e aerado, feito apenas com farinha francesa pura, água, sal marinho e fermento natural.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    price: 26.50,
    category: 'Padaria Artesanal',
    inStock: true,
    featured: false,
    createdAt: '2025-02-17T08:00:00Z',
  },
  {
    id: 'prod_4',
    storeId: 'store_6',
    name: 'Cesta Orgânica Semanal Família (12 itens)',
    description: 'Seleção da semana: alface crespa e americana, rúcula, tomate cereja, cenoura, batata doce, banana prata, morango e maçã orgânicos certificados.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    price: 98.00,
    originalPrice: 115.00,
    category: 'Cestas & Kits',
    inStock: true,
    featured: true,
    createdAt: '2025-02-10T09:00:00Z',
  },
  {
    id: 'prod_5',
    storeId: 'store_4',
    name: 'Kit Cuidados Pet: Shampoo Hipoalergênico & Deo Colônia',
    description: 'Fórmula vegana suave com extrato de camomila e aloe vera, não irrita os olhos e deixa o pelo sedoso e perfumado por dias.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    price: 68.00,
    category: 'Higiene & Cosméticos Pet',
    inStock: true,
    featured: false,
    createdAt: '2025-03-01T10:00:00Z',
  }
];

// Initial Seed Services
export const SEED_SERVICES: Service[] = [
  {
    id: 'serv_1',
    storeId: 'store_2',
    name: 'Clareamento Dental a Laser em Consultório',
    description: 'Sessão com tecnologia LED/Laser que clareia de 3 a 5 tons com máxima segurança para o esmalte e proteção contra sensibilidade.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    price: 650.00,
    priceType: 'fixed',
    duration: '60 min',
    availability: 'De segunda a sábado com agendamento',
    featured: true,
    createdAt: '2025-03-02T10:00:00Z',
  },
  {
    id: 'serv_2',
    storeId: 'store_2',
    name: 'Profilaxia Completa & Limpeza com Ultrassom',
    description: 'Remoção de tártaro com ultrassom, polimento coronário com jato de bicarbonato e aplicação tópica de flúor protetor.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    price: 240.00,
    priceType: 'fixed',
    duration: '45 min',
    availability: 'Horários flexíveis para moradores',
    featured: true,
    createdAt: '2025-03-02T10:30:00Z',
  },
  {
    id: 'serv_3',
    storeId: 'store_3',
    name: 'Higienização Profunda & Limpeza de Ar-Condicionado Split',
    description: 'Desmontagem técnica, lavagem química antibacteriana da evaporadora com bactericida autorizado pela Anvisa, limpeza da turbina e condensadora externa.',
    image: bannerServicesImg,
    price: 180.00,
    priceType: 'fixed',
    duration: '50 min por aparelho',
    availability: 'Atendimento prioritário no mesmo dia para ABM',
    featured: true,
    createdAt: '2025-02-21T09:00:00Z',
  },
  {
    id: 'serv_4',
    storeId: 'store_3',
    name: 'Instalação Padrão de Ar Split (9.000 a 18.000 BTUs)',
    description: 'Instalação completa com tubulação de cobre isolada, dreno e fiação inclusos até 3 metros, teste de estanqueidade e vácuo no sistema.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    price: 520.00,
    priceType: 'starting_at',
    duration: '2h30',
    availability: 'Segunda a sábado',
    featured: true,
    createdAt: '2025-02-21T09:30:00Z',
  },
  {
    id: 'serv_5',
    storeId: 'store_4',
    name: 'Banho Terapêutico & Tosa com Taxi Dog Incluso',
    description: 'Banho com água morna regulada, secagem silenciosa para reduzir estresse, corte de unhas, limpeza de ouvidos e transporte seguro em caixa climatizada.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
    price: 95.00,
    priceType: 'starting_at',
    duration: '1h30',
    availability: 'Segunda a Sábado com agendamento prévio',
    featured: true,
    createdAt: '2025-03-01T11:00:00Z',
  },
  {
    id: 'serv_6',
    storeId: 'store_5',
    name: 'Massagem Relaxante com Óleos Essenciais Botânicos',
    description: 'Sessão revigorante para alívio de tensões musculares, estresse e dores nas costas com aromaterapia de lavanda francesa e óleo de semente de uva.',
    image: bannerWellnessImg,
    price: 190.00,
    priceType: 'fixed',
    duration: '60 min',
    availability: 'Terça a sábado das 09h às 19h',
    featured: true,
    createdAt: '2025-03-05T14:00:00Z',
  }
];

// Initial Seed Ads
export const SEED_ADS: Ad[] = [
  {
    id: 'ad_1',
    storeId: 'store_1',
    storeName: 'Forneria & Empório Barra',
    storeLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=256&q=80',
    title: 'Noite da Pizza ABM: 20% OFF na Primeira Encomenda',
    description: 'Moradores da ABM ganham 20% de desconto em qualquer pizza grande de fermentação natural. Peça pelo WhatsApp e receba quentinha!',
    image: bannerGastronomyImg,
    type: 'oferta',
    category: 'Alimentação',
    discountPercent: 20,
    cta: 'Pedir no WhatsApp',
    link: 'store_1',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    status: 'active',
    viewsCount: 384,
    clicksCount: 112,
    createdAt: '2025-03-01T12:00:00Z',
  },
  {
    id: 'ad_2',
    storeId: 'store_3',
    storeName: 'Barra Prime Climatização & Elétrica',
    storeLogo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=256&q=80',
    title: 'Combo Higienização 2 ou mais Aparelhos por R$ 149 cada',
    description: 'Respire um ar puro e livre de fungos no seu condomínio. Ganhe laudo antibacteriano e checagem de carga de gás gratuita.',
    image: bannerServicesImg,
    type: 'serviço',
    category: 'Serviços',
    price: 149.00,
    cta: 'Agendar Visita',
    link: 'store_3',
    startDate: '2025-03-05',
    endDate: '2025-04-15',
    status: 'active',
    viewsCount: 290,
    clicksCount: 84,
    createdAt: '2025-03-05T09:00:00Z',
  },
  {
    id: 'ad_3',
    storeId: 'store_2',
    storeName: 'Camila Nogueira Odontologia',
    storeLogo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=256&q=80',
    title: 'Semana do Sorriso ABM: Consulta Preventiva & Limpeza',
    description: 'Condição exclusiva para associados da ABM e seus dependentes. Agende seu checkup digital e profilaxia com 25% de benefício.',
    image: bannerWellnessImg,
    type: 'oferta',
    category: 'Saúde',
    discountPercent: 25,
    cta: 'Falar com a Clínica',
    link: 'store_2',
    startDate: '2025-03-10',
    endDate: '2025-03-31',
    status: 'active',
    viewsCount: 245,
    clicksCount: 68,
    createdAt: '2025-03-10T11:00:00Z',
  }
];

// Initial Seed Banners
export const SEED_BANNERS: Banner[] = [
  {
    id: 'banner_1',
    title: 'Bem-vindo ao ABM em Todo Lugar!',
    subtitle: 'O marketplace comunitário exclusivo dos moradores da Barra da Tijuca',
    image: heroAbmImg,
    link: 'abm_hub',
    cta: 'Conhecer a ABM',
    position: 1,
    targetType: 'abm_news',
    status: 'active',
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'banner_2',
    title: 'Sabores Artesanais ao Seu Lado',
    subtitle: 'Pizzas com massa levain e pães rústicos com entrega prioritária nos condomínios',
    image: bannerGastronomyImg,
    link: 'store_1',
    cta: 'Ver Cardápio & Pedir',
    position: 2,
    targetType: 'store',
    targetId: 'store_1',
    status: 'active',
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'banner_3',
    title: 'Serviços Residenciais de Confiança',
    subtitle: 'Técnicos credenciados, eletricistas 24h e instalação de ar condicionado para o seu lar',
    image: bannerServicesImg,
    link: 'store_3',
    cta: 'Solicitar Atendimento',
    position: 3,
    targetType: 'store',
    targetId: 'store_3',
    status: 'active',
    createdAt: '2025-02-10T10:00:00Z',
  },
  {
    id: 'banner_4',
    title: 'Saúde & Bem-Estar no Nosso Bairro',
    subtitle: 'Consultórios médicos, odontologia e estética com atendimento no centro da ABM',
    image: bannerWellnessImg,
    link: 'store_2',
    cta: 'Agendar Consulta',
    position: 4,
    targetType: 'store',
    targetId: 'store_2',
    status: 'active',
    createdAt: '2025-02-15T11:00:00Z',
  }
];

// Initial Seed ABM News
export const SEED_NEWS: ABMNews[] = [
  {
    id: 'news_1',
    title: 'Assembleia Geral Ordinária de Moradores: Convocação Oficial',
    category: 'Assembleia',
    summary: 'Apresentação da prestação de contas do exercício 2024, eleição da nova diretoria executiva e votação do plano de segurança perimetral com câmeras inteligentes.',
    content: 'Prezados moradores associados da ABM,\n\nConvocamos todos para a Assembleia Geral Ordinária que será realizada no Auditório da Sede ABM (com transmissão online simultânea via plataforma):\n\n📅 Data: 12 de Abril de 2025\n⏰ Horário: 19h00 (1ª convocação) e 19h30 (2ª convocação)\n📍 Local: Auditório Principal da Sede ABM\n\nPauta:\n1. Prestação de contas do exercício anterior;\n2. Aprovação da previsão orçamentária 2025/2026;\n3. Modernização da rede de segurança e reconhecimento facial;\n4. Assuntos gerais de interesse dos condomínios.',
    date: '28 de Março de 2025',
    urgent: true,
    author: 'Diretoria Executiva ABM',
    attachments: [
      { name: 'Edital_Convocacao_AGO_2025.pdf', size: '1.2 MB', type: 'application/pdf' },
      { name: 'Balanco_Patrimonial_Exercicio.pdf', size: '2.8 MB', type: 'application/pdf' }
    ]
  },
  {
    id: 'news_2',
    title: 'Atualização do Sistema de Cancelas e Reconhecimento Facial nas Portarias',
    category: 'Segurança',
    summary: 'A partir da próxima segunda-feira, as novas cancelas com leitura facial e tag veicular estarão ativas para agilizar o fluxo dos moradores em horários de pico.',
    content: 'Informamos que a etapa final da implantação das novas cancelas inteligentes foi concluída com sucesso. Moradores cadastrados no app ABM já contam com reconhecimento facial integrado na faixa de moradores.',
    date: '24 de Março de 2025',
    urgent: false,
    author: 'Comissão de Segurança ABM'
  },
  {
    id: 'news_3',
    title: 'Feira Gastronômica & Cultural de Artesanato no Bosque ABM',
    category: 'Eventos',
    summary: 'Neste sábado das 10h às 18h: food trucks locais, música ao vivo no coreto, feira de produtores rústicos e espaço kids seguro.',
    content: 'Venha curtir com a família mais uma edição da nossa tradicional Feira no Bosque! Contaremos com estandes dos nossos lojistas parceiros, oficina de pintura infantil e degustação de queijos e vinhos artesanais.',
    date: '20 de Março de 2025',
    urgent: false,
    author: 'Coordenação de Eventos & Lazer'
  }
];

// Initial Seed Documents
export const SEED_DOCUMENTS: ABMDocument[] = [
  { id: 'doc_1', title: 'Estatuto Social Consolidado da ABM', category: 'Institucional', description: 'Regulamentação completa dos direitos e deveres dos associados.', date: 'Atualizado em 2024', size: '1.4 MB', fileType: 'PDF' },
  { id: 'doc_2', title: 'Regulamento de Uso do Salão de Festas & Churrasqueiras', category: 'Espaços Comuns', description: 'Normas de reserva, horários de silêncio e taxas de limpeza.', date: 'Fev/2025', size: '850 KB', fileType: 'PDF' },
  { id: 'doc_3', title: 'Formulário de Autorização para Mudanças & Obras', category: 'Formulários', description: 'Requerimento prévio para circulação de caminhões e prestadores.', date: 'Jan/2025', size: '420 KB', fileType: 'PDF' },
  { id: 'doc_4', title: 'Cartilha de Segurança e Prevenção Condominial', category: 'Segurança', description: 'Boas práticas para portarias, moradores e funcionários.', date: 'Mar/2025', size: '3.1 MB', fileType: 'PDF' }
];

// Initial Seed Conversations
export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_abm_mariana',
    type: 'resident_abm',
    participantIds: ['user_resident_1', 'user_abm_manager'],
    participantNames: {
      'user_resident_1': 'Mariana Costa',
      'user_abm_manager': 'Atendimento ABM (Patrícia)',
    },
    participantRoles: {
      'user_resident_1': 'resident',
      'user_abm_manager': 'abm_manager',
    },
    participantAvatars: {
      'user_resident_1': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      'user_abm_manager': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    title: 'Atendimento ABM · Protocolo #2025-412',
    subtitle: 'Assunto: Reserva do Salão Social para Maio',
    lastMessage: 'Perfeito, Mariana! Sua solicitação para o dia 17/05 já foi pré-aprovada.',
    lastMessageAt: 'Hoje às 10:14',
    unreadCounts: {
      'user_resident_1': 0,
      'user_abm_manager': 0,
      'user_master_admin': 0,
    },
    status: 'resolved',
    category: 'Reserva de Espaço',
  },
  {
    id: 'conv_mariana_forneria',
    type: 'resident_merchant',
    storeId: 'store_1',
    participantIds: ['user_resident_1', 'user_merchant_1'],
    participantNames: {
      'user_resident_1': 'Mariana Costa',
      'user_merchant_1': 'Forneria & Empório Barra (Chef Lucas)',
    },
    participantRoles: {
      'user_resident_1': 'resident',
      'user_merchant_1': 'merchant',
    },
    participantAvatars: {
      'user_resident_1': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      'user_merchant_1': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=256&q=80',
    },
    title: 'Forneria & Empório Barra',
    subtitle: 'Pedido & Dúvidas sobre o cardápio',
    lastMessage: 'A pizza com burrata e manjericão já foi para o forno a lenha!',
    lastMessageAt: 'Ontem às 20:30',
    unreadCounts: {
      'user_resident_1': 0,
      'user_merchant_1': 0,
      'user_master_admin': 0,
    },
    status: 'in_progress',
  }
];

// Initial Seed Messages
export const SEED_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    conversationId: 'conv_abm_mariana',
    senderId: 'user_resident_1',
    senderName: 'Mariana Costa',
    senderRole: 'resident',
    receiverId: 'user_abm_manager',
    message: 'Olá Patrícia, bom dia! Gostaria de verificar a disponibilidade do Salão Social no sábado, dia 17 de Maio, para o aniversário da minha filha.',
    createdAt: '2025-03-28T09:40:00Z',
    readAt: '2025-03-28T09:45:00Z',
  },
  {
    id: 'msg_2',
    conversationId: 'conv_abm_mariana',
    senderId: 'user_abm_manager',
    senderName: 'Patrícia Mendes (Atendimento ABM)',
    senderRole: 'abm_manager',
    receiverId: 'user_resident_1',
    message: 'Bom dia, Mariana! Verifiquei no nosso calendário e a data está livre! O salão comporta até 120 convidados com ar-condicionado central e churrasqueira de apoio.',
    createdAt: '2025-03-28T09:50:00Z',
    readAt: '2025-03-28T09:55:00Z',
  },
  {
    id: 'msg_3',
    conversationId: 'conv_abm_mariana',
    senderId: 'user_resident_1',
    senderName: 'Mariana Costa',
    senderRole: 'resident',
    receiverId: 'user_abm_manager',
    message: 'Excelente! Como faço para confirmar a caução e assinar o termo de vistoria?',
    createdAt: '2025-03-28T10:02:00Z',
    readAt: '2025-03-28T10:05:00Z',
  },
  {
    id: 'msg_4',
    conversationId: 'conv_abm_mariana',
    senderId: 'user_abm_manager',
    senderName: 'Patrícia Mendes (Atendimento ABM)',
    senderRole: 'abm_manager',
    receiverId: 'user_resident_1',
    message: 'Perfeito, Mariana! Sua solicitação para o dia 17/05 já foi pré-aprovada. Você pode assinar digitalmente pelo app na aba ABM > Documentos ou presencialmente na secretaria até quarta-feira.',
    createdAt: '2025-03-28T10:14:00Z',
    readAt: '2025-03-28T10:15:00Z',
  },
  {
    id: 'msg_5',
    conversationId: 'conv_mariana_forneria',
    senderId: 'user_resident_1',
    senderName: 'Mariana Costa',
    senderRole: 'resident',
    receiverId: 'user_merchant_1',
    message: 'Boa noite Chef Lucas! O cupom de 20% para moradores da ABM é válido para a pizza de Burrata e Pesto?',
    createdAt: '2025-03-27T20:15:00Z',
    readAt: '2025-03-27T20:18:00Z',
  },
  {
    id: 'msg_6',
    conversationId: 'conv_mariana_forneria',
    senderId: 'user_merchant_1',
    senderName: 'Chef Lucas Amorim',
    senderRole: 'merchant',
    receiverId: 'user_resident_1',
    message: 'Boa noite Mariana! Sim, é super válido! A burrata chegou fresca hoje de manhã do produtor da serra. Deseja pedir para entrega no Ed. Atlântico?',
    createdAt: '2025-03-27T20:20:00Z',
    readAt: '2025-03-27T20:21:00Z',
  },
  {
    id: 'msg_7',
    conversationId: 'conv_mariana_forneria',
    senderId: 'user_merchant_1',
    senderName: 'Chef Lucas Amorim',
    senderRole: 'merchant',
    receiverId: 'user_resident_1',
    message: 'A pizza com burrata e manjericão já foi para o forno a lenha!',
    createdAt: '2025-03-27T20:30:00Z',
    readAt: '2025-03-27T20:31:00Z',
  }
];

// Initial Seed Notifications
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_resident_1',
    title: 'Convocação: Assembleia Geral ABM',
    message: 'Edital publicado com votação de segurança e prestação de contas. Participe no dia 12/04.',
    type: 'notice',
    read: false,
    createdAt: '2025-03-28T08:00:00Z',
    actionUrl: 'news_1',
  },
  {
    id: 'notif_2',
    userId: 'user_resident_1',
    title: 'Nova oferta: Forneria & Empório Barra',
    message: '20% de desconto exclusivo para moradores na sua próxima pizza levain.',
    type: 'ad',
    read: true,
    createdAt: '2025-03-27T18:00:00Z',
    actionUrl: 'ad_1',
  },
  {
    id: 'notif_3',
    userId: 'user_resident_1',
    title: 'Mensagem da Administração ABM',
    message: 'Patrícia respondeu sua solicitação sobre o Salão Social.',
    type: 'message',
    read: true,
    createdAt: '2025-03-28T10:14:00Z',
    actionUrl: 'conv_abm_mariana',
  }
];

class DataStore {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      // Default to Resident Mariana Costa for mobile-first resident experience
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(SEED_USERS[4]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STORES)) {
      localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(SEED_STORES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SEED_SERVICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADS)) {
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(SEED_ADS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BANNERS)) {
      localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(SEED_BANNERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(SEED_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)) {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(SEED_CONVERSATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(SEED_MESSAGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(SEED_NEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(SEED_DOCUMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['store_1', 'ad_1']));
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- Auth & Users ---
  public getCurrentUser(): User {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return SEED_USERS[4]; // Mariana Costa
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_USERS[4];
    }
  }

  public setCurrentUser(user: User) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this.notify();
  }

  public getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : SEED_USERS;
  }

  public addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.notify();
    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // If updating current user, sync current session
    const current = this.getCurrentUser();
    if (current && current.id === id) {
      this.setCurrentUser(users[index]);
    } else {
      this.notify();
    }
    return users[index];
  }

  // --- Stores ---
  public getStores(): Store[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STORES);
    return raw ? JSON.parse(raw) : SEED_STORES;
  }

  public getStoreById(id: string): Store | undefined {
    return this.getStores().find((s) => s.id === id);
  }

  public addStore(store: Omit<Store, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Store {
    const stores = this.getStores();
    const newStore: Store = {
      ...store,
      id: `store_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };
    stores.push(newStore);
    localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(stores));
    this.notify();
    return newStore;
  }

  public updateStore(id: string, updates: Partial<Store>): Store | null {
    const stores = this.getStores();
    const index = stores.findIndex((s) => s.id === id);
    if (index === -1) return null;
    stores[index] = { ...stores[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(stores));
    this.notify();
    return stores[index];
  }

  public deleteStore(id: string): boolean {
    let stores = this.getStores();
    stores = stores.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(stores));
    this.notify();
    return true;
  }

  // --- Products & Services ---
  public getProducts(storeId?: string): Product[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const list: Product[] = raw ? JSON.parse(raw) : SEED_PRODUCTS;
    return storeId ? list.filter((p) => p.storeId === storeId) : list;
  }

  public addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return products[index];
  }

  public deleteProduct(id: string): boolean {
    let products = this.getProducts();
    products = products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return true;
  }

  public getServices(storeId?: string): Service[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const list: Service[] = raw ? JSON.parse(raw) : SEED_SERVICES;
    return storeId ? list.filter((s) => s.storeId === storeId) : list;
  }

  public addService(service: Omit<Service, 'id' | 'createdAt'>): Service {
    const services = this.getServices();
    const newService: Service = {
      ...service,
      id: `serv_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    services.push(newService);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    this.notify();
    return newService;
  }

  public updateService(id: string, updates: Partial<Service>): Service | null {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    services[index] = { ...services[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    this.notify();
    return services[index];
  }

  public deleteService(id: string): boolean {
    let services = this.getServices();
    services = services.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    this.notify();
    return true;
  }

  // --- Ads ---
  public getAds(storeId?: string): Ad[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ADS);
    const list: Ad[] = raw ? JSON.parse(raw) : SEED_ADS;
    return storeId ? list.filter((a) => a.storeId === storeId) : list;
  }

  public addAd(ad: Omit<Ad, 'id' | 'createdAt' | 'viewsCount' | 'clicksCount'>): Ad {
    const ads = this.getAds();
    const newAd: Ad = {
      ...ad,
      id: `ad_${Date.now()}`,
      viewsCount: 1,
      clicksCount: 0,
      createdAt: new Date().toISOString(),
    };
    ads.push(newAd);
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
    this.notify();
    return newAd;
  }

  public updateAd(id: string, updates: Partial<Ad>): Ad | null {
    const ads = this.getAds();
    const index = ads.findIndex((a) => a.id === id);
    if (index === -1) return null;
    ads[index] = { ...ads[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
    this.notify();
    return ads[index];
  }

  public deleteAd(id: string): boolean {
    let ads = this.getAds();
    ads = ads.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
    this.notify();
    return true;
  }

  public recordAdClick(id: string) {
    const ads = this.getAds();
    const ad = ads.find((a) => a.id === id);
    if (ad) {
      ad.clicksCount += 1;
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(ads));
      this.notify();
    }
  }

  // --- Banners ---
  public getBanners(): Banner[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BANNERS);
    return raw ? JSON.parse(raw) : SEED_BANNERS;
  }

  public addBanner(banner: Omit<Banner, 'id' | 'createdAt'>): Banner {
    const banners = this.getBanners();
    const newBanner: Banner = {
      ...banner,
      id: `banner_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    banners.push(newBanner);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    this.notify();
    return newBanner;
  }

  public updateBanner(id: string, updates: Partial<Banner>): Banner | null {
    const banners = this.getBanners();
    const index = banners.findIndex((b) => b.id === id);
    if (index === -1) return null;
    banners[index] = { ...banners[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    this.notify();
    return banners[index];
  }

  public deleteBanner(id: string): boolean {
    let banners = this.getBanners();
    banners = banners.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    this.notify();
    return true;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return raw ? JSON.parse(raw) : SEED_CATEGORIES;
  }

  // --- News & Documents ---
  public getNews(): ABMNews[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    return raw ? JSON.parse(raw) : SEED_NEWS;
  }

  public addNews(news: Omit<ABMNews, 'id'>): ABMNews {
    const list = this.getNews();
    const item: ABMNews = {
      ...news,
      id: `news_${Date.now()}`,
    };
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    this.notify();
    return item;
  }

  public getDocuments(): ABMDocument[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return raw ? JSON.parse(raw) : SEED_DOCUMENTS;
  }

  // --- Conversations & Messages ---
  public getConversations(userId?: string): Conversation[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const list: Conversation[] = raw ? JSON.parse(raw) : SEED_CONVERSATIONS;
    if (!userId) return list;
    return list.filter((c) => c.participantIds.includes(userId));
  }

  public getConversationById(id: string): Conversation | undefined {
    return this.getConversations().find((c) => c.id === id);
  }

  public getMessages(conversationId: string): Message[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const list: Message[] = raw ? JSON.parse(raw) : SEED_MESSAGES;
    return list.filter((m) => m.conversationId === conversationId);
  }

  public sendMessage(conversationId: string, senderId: string, senderName: string, senderRole: User['role'], receiverId: string, text: string, attachment?: string): Message {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const list: Message[] = raw ? JSON.parse(raw) : SEED_MESSAGES;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      senderRole,
      receiverId,
      message: text,
      attachment,
      createdAt: new Date().toISOString(),
    };
    list.push(newMsg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));

    // Update conversation last message
    const convs = this.getConversations();
    const convIndex = convs.findIndex((c) => c.id === conversationId);
    if (convIndex !== -1) {
      convs[convIndex].lastMessage = text;
      convs[convIndex].lastMessageAt = 'Agora';
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));
    }

    this.notify();
    return newMsg;
  }

  public createConversation(
    type: 'resident_abm' | 'resident_merchant',
    resident: User,
    otherParty: { id: string; name: string; avatar: string; role: User['role']; storeId?: string },
    initialMessage?: string,
    title?: string,
    subtitle?: string
  ): Conversation {
    const convs = this.getConversations();
    const existing = convs.find(
      (c) => c.type === type && c.participantIds.includes(resident.id) && c.participantIds.includes(otherParty.id)
    );
    if (existing) {
      if (initialMessage) {
        this.sendMessage(existing.id, resident.id, resident.name, resident.role, otherParty.id, initialMessage);
      }
      return existing;
    }

    const newConv: Conversation = {
      id: `conv_${Date.now()}`,
      type,
      participantIds: [resident.id, otherParty.id],
      participantNames: {
        [resident.id]: resident.name,
        [otherParty.id]: otherParty.name,
      },
      participantRoles: {
        [resident.id]: resident.role,
        [otherParty.id]: otherParty.role,
      },
      participantAvatars: {
        [resident.id]: resident.avatar,
        [otherParty.id]: otherParty.avatar,
      },
      storeId: otherParty.storeId,
      title: title || (type === 'resident_abm' ? 'Atendimento ABM' : otherParty.name),
      subtitle: subtitle || (type === 'resident_abm' ? 'Canal Oficial do Morador' : 'Conversa Direta'),
      lastMessage: initialMessage || 'Conversa iniciada',
      lastMessageAt: 'Agora',
      unreadCounts: {
        [resident.id]: 0,
        [otherParty.id]: 1,
        user_master_admin: 0,
      },
      status: 'open',
    };

    convs.unshift(newConv);
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(convs));

    if (initialMessage) {
      this.sendMessage(newConv.id, resident.id, resident.name, resident.role, otherParty.id, initialMessage);
    }

    this.notify();
    return newConv;
  }

  // --- Favorites ---
  public getFavorites(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  }

  public toggleFavorite(id: string): boolean {
    let favs = this.getFavorites();
    const exists = favs.includes(id);
    if (exists) {
      favs = favs.filter((item) => item !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    this.notify();
    return !exists;
  }

  public isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  // --- Notifications ---
  public getNotifications(userId?: string): NotificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const list: NotificationItem[] = raw ? JSON.parse(raw) : SEED_NOTIFICATIONS;
    return userId ? list.filter((n) => n.userId === userId) : list;
  }

  public markNotificationAsRead(id: string) {
    const list = this.getNotifications();
    const item = list.find((n) => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      this.notify();
    }
  }

  // --- Merchant & Admin Metrics ---
  public getStoreMetrics(storeId: string): StoreMetrics {
    const ads = this.getAds(storeId);
    const totalAdViews = ads.reduce((acc, curr) => acc + curr.viewsCount, 0);
    const totalAdClicks = ads.reduce((acc, curr) => acc + curr.clicksCount, 0);

    return {
      storeViews: 520 + totalAdViews,
      adViews: totalAdViews || 384,
      whatsappClicks: 140 + totalAdClicks,
      phoneClicks: 42,
      locationClicks: 65,
      favorites: 48,
    };
  }

  public getAdminMetrics() {
    const stores = this.getStores();
    const users = this.getUsers();
    const ads = this.getAds();
    const convs = this.getConversations();

    const residentsCount = users.filter((u) => u.role === 'resident').length;
    const merchantsCount = users.filter((u) => u.role === 'merchant').length;
    const activeStores = stores.filter((s) => s.status === 'active').length;
    const activeAds = ads.filter((a) => a.status === 'active').length;

    return {
      residentsCount,
      merchantsCount,
      activeStores,
      activeAds,
      totalViews: 14890,
      openConversations: convs.filter((c) => c.status !== 'resolved').length,
      newRegistrationsMonth: 34,
      whatsappLeads: 620,
    };
  }

  // Reset to default seed
  public resetToDefault() {
    localStorage.clear();
    this.initialize();
    this.notify();
  }
}

export const dataStore = new DataStore();
