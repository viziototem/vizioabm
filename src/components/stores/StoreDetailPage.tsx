import React, { useState, useEffect } from 'react';
import { Store, Product, Service, Ad, User } from '../../types';
import { dataStore } from '../../services/store';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Instagram, 
  Bike, 
  Tag, 
  Plus, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface StoreDetailPageProps {
  storeId: string;
  currentUser: User;
  onBack: () => void;
  onStartChat: (store: Store) => void;
}

export const StoreDetailPage: React.FC<StoreDetailPageProps> = ({
  storeId,
  currentUser,
  onBack,
  onStartChat,
}) => {
  const [store, setStore] = useState<Store | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'produtos' | 'servicos' | 'ofertas' | 'sobre'>('produtos');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const update = () => {
      const s = dataStore.getStoreById(storeId);
      setStore(s);
      if (s) {
        setProducts(dataStore.getProducts(s.id));
        setServices(dataStore.getServices(s.id));
        setAds(dataStore.getAds(s.id));
        setIsFavorite(dataStore.isFavorite(s.id));
      }
    };
    update();
    return dataStore.subscribe(update);
  }, [storeId]);

  if (!store) {
    return (
      <div className="py-16 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-700">Loja não encontrada</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
        >
          Voltar para Lojas
        </button>
      </div>
    );
  }

  const handleToggleFav = () => {
    dataStore.toggleFavorite(store.id);
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsApp = (customMessage?: string) => {
    dataStore.recordAdClick(store.id);
    const msg = encodeURIComponent(
      customMessage || `Olá ${store.name}! Encontrei sua loja no app ABM em Todo Lugar e gostaria de atendimento.`
    );
    window.open(`https://wa.me/${store.whatsapp}?text=${msg}`, '_blank');
  };

  const handleOrderProduct = (prod: Product) => {
    const msg = `Olá! Gostaria de pedir "${prod.name}" (R$ ${prod.price.toFixed(2)}) que vi no app ABM em Todo Lugar. Está disponível para entrega?`;
    handleWhatsApp(msg);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Bar with Back and Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            title="Compartilhar"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleToggleFav}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-rose-500 transition-colors shadow-xs"
            title={isFavorite ? "Remover dos favoritos" : "Favoritar"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Header with Brand Custom Cover & Logo */}
      <div className="relative rounded-3xl overflow-hidden shadow-md bg-slate-900">
        <div className="h-44 sm:h-56 w-full relative">
          <img
            src={store.coverImage}
            alt={store.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div 
            className="absolute inset-0 opacity-40 mix-blend-multiply" 
            style={{ backgroundColor: store.primaryColor || '#059669' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        </div>

        {/* Brand identity floating block */}
        <div className="p-4 sm:p-6 -mt-16 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="flex items-end gap-3.5">
            <img
              src={store.logo}
              alt={store.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white dark:border-slate-800 shadow-lg bg-white shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="pb-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                {store.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                {store.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {store.rating.toFixed(1)} ({store.reviewCount} avaliações)
                </span>
                <span>·</span>
                <span className="text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Aberto agora
                </span>
              </div>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onStartChat(store)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white text-xs font-semibold transition-all border border-white/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Interno</span>
            </button>

            <button
              onClick={() => handleWhatsApp()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-md transition-all active:scale-95"
              style={{ backgroundColor: store.primaryColor || '#10b981' }}
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp Direto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Description & Fast Highlights */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-3">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {store.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{store.address} ({store.condoZone})</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{store.openingHours}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('produtos')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'produtos'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Produtos ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('servicos')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'servicos'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Serviços ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('ofertas')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'ofertas'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Ofertas ({ads.length})
        </button>
        <button
          onClick={() => setActiveTab('sobre')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'sobre'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Sobre & Contato
        </button>
      </div>

      {/* Tab: Produtos */}
      {activeTab === 'produtos' && (
        <div className="space-y-3">
          {products.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100 p-4">
              Nenhum produto cadastrado no catálogo no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs flex gap-3 hover:border-slate-200 transition-all"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {prod.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-1 mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          R$ {prod.price.toFixed(2)}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            R$ {prod.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOrderProduct(prod)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Pedir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Serviços */}
      {activeTab === 'servicos' && (
        <div className="space-y-3">
          {services.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100 p-4">
              Nenhum serviço listado no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs flex gap-3 hover:border-slate-200 transition-all"
                >
                  <img
                    src={serv.image}
                    alt={serv.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                        {serv.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {serv.description}
                      </p>
                      {serv.duration && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Duração média: {serv.duration}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-1 mt-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {serv.price ? `R$ ${serv.price.toFixed(2)}` : 'Sob orçamento'}
                      </span>

                      <button
                        onClick={() => handleWhatsApp(`Olá! Gostaria de agendar o serviço "${serv.name}" que vi no app ABM.`)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Agendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Ofertas & Anúncios */}
      {activeTab === 'ofertas' && (
        <div className="space-y-3">
          {ads.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100 p-4">
              Nenhuma promoção ou anúncio ativo para esta loja hoje.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-2.5"
                >
                  <div className="relative aspect-[16/8] rounded-xl overflow-hidden">
                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {ad.discountPercent && (
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        {ad.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {ad.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {ad.description}
                  </p>
                  <button
                    onClick={() => handleWhatsApp(`Olá! Vi o anúncio promocional "${ad.title}" e gostaria de aproveitar.`)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{ad.cta || 'Aproveitar Desconto no WhatsApp'}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Sobre & Contato */}
      {activeTab === 'sobre' && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Canais Oficiais de Atendimento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${store.phone}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{store.phone}</span>
              </a>

              <a
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-800 font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +{store.whatsapp}</span>
              </a>

              {store.website && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
                >
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span className="truncate">{store.website}</span>
                </a>
              )}

              {store.instagram && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>{store.instagram}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Localização & Horário
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              📍 {store.address} - Setor: {store.condoZone}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              🕒 {store.openingHours}
            </p>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`, '_blank')}
              className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
