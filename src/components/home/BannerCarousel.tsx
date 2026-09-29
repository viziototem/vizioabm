import React, { useState, useEffect } from 'react';
import { Banner } from '../../types';
import { dataStore } from '../../services/store';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface BannerCarouselProps {
  onNavigateToStore: (storeId: string) => void;
  onNavigateToAd: (adId: string) => void;
  onNavigateToABM: () => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  onNavigateToStore,
  onNavigateToAd,
  onNavigateToABM,
}) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const activeBanners = dataStore.getBanners().filter((b) => b.status === 'active');
      setBanners(activeBanners);
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const handleBannerClick = () => {
    if (!currentBanner) return;
    if (currentBanner.targetType === 'store' && currentBanner.targetId) {
      onNavigateToStore(currentBanner.targetId);
    } else if (currentBanner.targetType === 'ad' && currentBanner.targetId) {
      onNavigateToAd(currentBanner.targetId);
    } else if (currentBanner.targetType === 'abm_news') {
      onNavigateToABM();
    } else if (currentBanner.link) {
      if (currentBanner.link.startsWith('http')) {
        window.open(currentBanner.link, '_blank');
      } else if (currentBanner.link.startsWith('store_')) {
        onNavigateToStore(currentBanner.link);
      } else {
        onNavigateToABM();
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md group cursor-pointer aspect-[16/8] sm:aspect-[21/9] max-h-[300px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleBannerClick}
    >
      {/* Background Image with Scrim */}
      <img
        src={currentBanner.image}
        alt={currentBanner.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      
      {/* Editorial Gradient Scrim for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
        <div className="max-w-xl">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
            Destaque ABM
          </span>
          <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight line-clamp-1 drop-shadow-sm">
            {currentBanner.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 font-normal leading-snug">
            {currentBanner.subtitle}
          </p>
          
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm">
              <span>{currentBanner.cta || 'Saber mais'}</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            title="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/50 hover:bg-white'
                }`}
                title={`Banner ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
