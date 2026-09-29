import React, { useState, useEffect } from 'react';
import { ABMNews } from '../../types';
import { dataStore } from '../../services/store';
import { AlertCircle, ChevronRight, FileText, Calendar, Building2 } from 'lucide-react';

interface ABMNewsSectionProps {
  onNavigateToABM: (newsId?: string) => void;
}

export const ABMNewsSection: React.FC<ABMNewsSectionProps> = ({ onNavigateToABM }) => {
  const [newsList, setNewsList] = useState<ABMNews[]>([]);

  useEffect(() => {
    const update = () => {
      setNewsList(dataStore.getNews());
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  if (newsList.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Informativos Oficiais da ABM</span>
          </h2>
          <p className="text-xs text-slate-500">
            Fique por dentro das decisões, comunicados e eventos da associação
          </p>
        </div>
        <button
          onClick={() => onNavigateToABM()}
          className="flex items-center gap-0.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>Ver todos</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {newsList.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToABM(item.id)}
            className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 hover:border-emerald-200 hover:shadow-xs transition-all cursor-pointer flex items-start gap-3 group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              item.urgent
                ? 'bg-rose-50 text-rose-600 border border-rose-100'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            }`}>
              {item.urgent ? <AlertCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                {item.urgent && (
                  <span className="ml-auto text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                    Urgente
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
