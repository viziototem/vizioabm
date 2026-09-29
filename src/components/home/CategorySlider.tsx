import React from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Sparkles, 
  HeartPulse, 
  Wrench, 
  Home, 
  GraduationCap, 
  Shirt, 
  PawPrint, 
  Car, 
  Laptop, 
  Layers 
} from 'lucide-react';
import { dataStore } from '../../services/store';

interface CategorySliderProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({ onSelectCategory }) => {
  const categories = dataStore.getCategories();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'ShoppingBag': return ShoppingBag;
      case 'Sparkles': return Sparkles;
      case 'HeartPulse': return HeartPulse;
      case 'Wrench': return Wrench;
      case 'Home': return Home;
      case 'GraduationCap': return GraduationCap;
      case 'Shirt': return Shirt;
      case 'PawPrint': return PawPrint;
      case 'Car': return Car;
      case 'Laptop': return Laptop;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Encontre por categoria
        </h2>
        <button
          onClick={() => onSelectCategory('Todas')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
        {categories.map((cat) => {
          const Icon = getIcon(cat.icon);
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group flex flex-col items-center p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 hover:border-emerald-200 hover:shadow-xs transition-all active:scale-95 text-center min-h-[72px] justify-center"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5 stroke-[2.2px]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1.5 group-hover:text-emerald-600 transition-colors line-clamp-1 w-full">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
