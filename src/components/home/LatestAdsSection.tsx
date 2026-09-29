import React, { useState, useEffect } from 'react';
import { Ad } from '../../types';
import { dataStore } from '../../services/store';
import { Tag, MessageCircle, Clock, ExternalLink } from 'lucide-react';

interface LatestAdsSectionProps {
  onSelectStore: (storeId: string) => void;
}

export const LatestAdsSection: React.FC<LatestAdsSectionProps> = ({ onSelectStore }) => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const update = () => {
      setAds(dataStore.getAds().filter((a) => a.status === 'active'));
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  const handleWhatsAppAd = (e: React.MouseEvent, ad: Ad) => {
    e.stopPropagation();
    dataStore.recordAdClick(ad.id);
    const store = dataStore.getStoreById(ad.storeId);
    const phone = store ? store.whatsapp : '5521993458899';
    const text = encodeURIComponent(`Olá! Vi o anúncio "${ad.title}" no app ABM em Todo Lugar e tenho interesse!`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  if (ads.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Ofertas e novidades da comunidade
          </h2>
          <p className="text-xs text-slate-500">
            Descontos e condições exclusivas negociadas para associados ABM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ads.map((ad) => (
          <div
            key={ad.id}
            onClick={() => onSelectStore(ad.storeId)}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/8] overflow-hidden bg-slate-100">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Discount / Type badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                {ad.discountPercent && (
                  <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{ad.discountPercent}% OFF</span>
                  </span>
                )}
                <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {ad.type.toUpperCase()}
                </span>
              </div>

              {/* Store attribution chip */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg text-white">
                <img
                  src={ad.storeLogo}
                  alt={ad.storeName}
                  className="w-4 h-4 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] font-semibold truncate max-w-[150px]">
                  {ad.storeName}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition-colors">
                  {ad.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {ad.description}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Válido até {new Date(ad.endDate).toLocaleDateString('pt-BR')}</span>
                </div>

                <button
                  onClick={(e) => handleWhatsAppAd(e, ad)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{ad.cta || 'Aproveitar'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
