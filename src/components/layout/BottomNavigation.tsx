import React from 'react';
import { Home, Store, Search, Building2, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 0,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'lojas', label: 'Lojas', icon: Store },
    { id: 'buscar', label: 'Buscar', icon: Search },
    { id: 'abm', label: 'ABM', icon: Building2 },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-safe shadow-lg shadow-slate-900/5">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center py-1 group min-h-[44px] focus:outline-none transition-transform active:scale-95"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 stroke-[2.4px] scale-110'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 stroke-[1.8px]'
                  }`}
                />
                {item.id === 'abm' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
