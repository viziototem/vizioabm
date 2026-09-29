import React, { useState, useEffect } from 'react';
import { Store } from '../../types';
import { dataStore } from '../../services/store';
import { Star, MessageCircle, Heart, Clock, Bike, ChevronRight } from 'lucide-react';

interface FeaturedStoresProps {
  onSelectStore: (storeId: string) => void;
  onSeeAllStores: () => void;
}

export const FeaturedStores: React.FC<FeaturedStoresProps> = ({
  onSelectStore,
  onSeeAllStores,
}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      setStores(dataStore.getStores().filter(s => s.status === 'active'));
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
    const msg = encodeURIComponent(`Olá ${store.name}! Vi seu anúncio no app ABM em Todo Lugar e gostaria de mais informações.`);
    window.open(`https://wa.me/${store.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Lojas em destaque
          </h2>
          <p className="text-xs text-slate-500">
            Parceiros verificados e recomendados pelos moradores
          </p>
        </div>
        <button
          onClick={onSeeAllStores}
          className="flex items-center gap-0.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {stores.slice(0, 6).map((store) => {
          const isFav = favorites.includes(store.id);

          return (
            <div
              key={store.id}
              onClick={() => onSelectStore(store.id)}
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-200 transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Cover & Brand Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={store.coverImage}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Favorite Icon */}
                <button
                  onClick={(e) => handleToggleFav(e, store.id)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-600 hover:text-rose-500 transition-colors shadow-xs active:scale-90"
                  title={isFav ? "Remover dos favoritos" : "Favoritar"}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Status indicator badge */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Aberto agora</span>
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

              {/* Info Body */}
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
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
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

                {/* Actions bottom bar */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                    {store.condoZone || 'Barra da Tijuca'}
                  </span>

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
          );
        })}
      </div>
    </div>
  );
};
