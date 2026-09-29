import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface SmartSearchSectionProps {
  onSearch: (query: string, openAssistant?: boolean) => void;
}

export const SmartSearchSection: React.FC<SmartSearchSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const quickTags = [
    { label: '🍕 Pizza Artesanal', query: 'pizza' },
    { label: '❄️ Ar Condicionado', query: 'ar condicionado' },
    { label: '🦷 Dentista ABM', query: 'dentista' },
    { label: '🐾 Banho Pet & Taxi Dog', query: 'pet' },
    { label: '🥦 Orgânicos', query: 'orgânico' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), false);
    }
  };

  const handleOpenAssistant = (initialQuery?: string) => {
    onSearch(initialQuery || query || 'O que tem de bom na ABM?', true);
  };

  return (
    <div className="space-y-2.5">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O que você procura? Ex: manicure, pizza, eletricista..."
          className="w-full pl-11 pr-24 py-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xs transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1 active:scale-95"
        >
          <span>Buscar</span>
        </button>
      </form>

      {/* Quick Pills & AI Assistant Callout */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 shrink-0">
          {quickTags.map((tag) => (
            <button
              key={tag.query}
              onClick={() => onSearch(tag.query, false)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors whitespace-nowrap"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant Banner Dock */}
      <div 
        onClick={() => handleOpenAssistant()}
        className="cursor-pointer bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-xl p-3 text-white shadow-xs flex items-center justify-between gap-3 hover:opacity-95 transition-opacity"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold tracking-tight">ABM Assistente</span>
              <span className="text-[10px] bg-white/20 text-emerald-100 px-1.5 py-0.5 rounded font-medium">IA Local</span>
            </div>
            <p className="text-[11px] text-emerald-100 font-normal line-clamp-1">
              "Preciso de alguém para instalar meu ar condicionado..."
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-xs font-bold text-white shrink-0 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition-colors">
          <span>Conversar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
