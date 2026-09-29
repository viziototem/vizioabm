import React, { useState, useEffect } from 'react';
import { Store, Category } from '../../types';
import { dataStore } from '../../services/store';
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  MessageCircle, 
  Bike, 
  SlidersHorizontal,
  MapPin,
  ChevronDown
} from 'lucide-react';

interface StoreDirectoryProps {
  onSelectStore: (storeId: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const StoreDirectory: React.FC<StoreDirectoryProps> = ({
  onSelectStore,
  initialCategory,
  initialSearch,
}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todas');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  useEffect(() => {
    const update = () => {
      setStores(dataStore.getStores().filter(s => s.status === 'active'));
      setCategories(dataStore.getCategories());
      setFavorites(dataStore.getFavorites());
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  const handleToggleFav = (e: React.MouseEvent, storeId: string) => {
    e.stopPropagation();
    dataStore.toggleFavorite(storeId);
  };

  const handleWhatsApp = (e: React.MouseEvent, store: Store) => {
    e.stopPropagation();
    dataStore.recordAdClick(store.id);
    const msg = encodeURIComponent(`Olá ${store.name}! Encontrei sua loja no app ABM em Todo Lugar e gostaria de atendimento.`);
    window.open(`https://wa.me/${store.whatsapp}?text=${msg}`, '_blank');
  };

  // Filter & sort logic
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todas' || store.category === selectedCategory;

    const matchesFavorite = !onlyFavorites || favorites.includes(store.id);
    const matchesDelivery = !onlyDelivery || store.deliveryAvailable;

    return matchesSearch && matchesCategory && matchesFavorite && matchesDelivery;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {/* Title & Search Header */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Lojas e Serviços da Comunidade
        </h1>
        <p className="text-xs text-slate-500">
          Comércio local, prestadores de serviço e conveniências exclusivas da ABM
        </p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome da loja, produto ou serviço..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedCategory('Todas')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'Todas'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          Todas as Categorias
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Quick Filters & Sorting Controls */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              onlyFavorites
                ? 'bg-rose-50 text-rose-600 border border-rose-200 font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Favoritos ({favorites.length})</span>
          </button>

          <button
            onClick={() => setOnlyDelivery(!onlyDelivery)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              onlyDelivery
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Entrega na ABM</span>
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-transparent text-slate-600 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="rating">Melhor Avaliados</option>
            <option value="reviews">Mais Populares</option>
            <option value="name">Ordem Alfabética</option>
          </select>
        </div>
      </div>

      {/* Store Grid */}
      {filteredStores.length === 0 ? (
        <div className="py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Nenhuma loja encontrada com os filtros selecionados
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Tente buscar com outros termos ou limpar os filtros de categoria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todas');
              setOnlyFavorites(false);
              setOnlyDelivery(false);
            }}
            className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStores.map((store) => {
            const isFav = favorites.includes(store.id);

            return (
              <div
                key={store.id}
                onClick={() => onSelectStore(store.id)}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-200 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={store.coverImage}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={(e) => handleToggleFav(e, store.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-500 transition-colors shadow-xs active:scale-90"
                    title={isFav ? "Remover dos favoritos" : "Favoritar"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Aberto</span>
                    {store.deliveryAvailable && (
                      <>
                        <span className="text-slate-400">·</span>
                        <span className="flex items-center gap-0.5 text-emerald-300">
                          <Bike className="w-2.5 h-2.5" /> Entrega
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-2.5">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0 shadow-xs mt-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            {store.category}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{store.rating.toFixed(1)}</span>
                            <span className="text-slate-400 font-normal">({store.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors mt-0.5">
                          {store.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {store.description}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{store.condoZone || store.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleWhatsApp(e, store)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
