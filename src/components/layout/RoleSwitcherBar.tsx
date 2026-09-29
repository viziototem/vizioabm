import React, { useState } from 'react';
import { User } from '../../types';
import { SEED_USERS, dataStore } from '../../services/store';
import { UserCheck, Store, ShieldCheck, UserCircle, ChevronDown, ChevronUp, LogIn } from 'lucide-react';

interface RoleSwitcherBarProps {
  currentUser: User;
  onOpenAuth: () => void;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({ currentUser, onOpenAuth }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleSelectUser = (seedUser: User) => {
    dataStore.setCurrentUser(seedUser);
  };

  const getRoleConfig = (user: User) => {
    switch (user.role) {
      case 'master_admin':
        return { label: 'Admin ABM', sub: 'Acesso total', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
      case 'abm_manager':
        return { label: 'Gestor ABM', sub: 'Atendimento', icon: ShieldCheck, color: 'text-teal-600 bg-teal-50 border-teal-200' };
      case 'merchant':
        return { label: 'Lojista', sub: 'Forneria Barra', icon: Store, color: 'text-amber-700 bg-amber-50 border-amber-200' };
      default:
        return { label: 'Morador', sub: 'Ed. Atlântico', icon: UserCheck, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
  };

  return (
    <aside aria-label="Seletor de perfis para teste" className="bg-slate-900 text-white text-xs border-b border-slate-800 transition-all">
      <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-medium text-slate-300">
            Ambiente de Demonstração Interativo · <span className="text-white font-bold">{currentUser.name}</span> ({getRoleConfig(currentUser).label})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
          >
            <LogIn className="w-3 h-3" />
            <span>Entrar / Cadastrar</span>
          </button>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expandir seletor de perfis" : "Recolher"}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="max-w-5xl mx-auto px-4 pb-2 pt-0.5 border-t border-slate-800/60">
          <div className="text-[10px] text-slate-400 mb-1.5 font-medium">
            Alterne entre os 4 perfis de teste com 1 clique para experimentar todas as funções e permissões:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {SEED_USERS.filter(u => ['user_resident_1', 'user_merchant_1', 'user_master_admin', 'user_abm_manager'].includes(u.id)).map((u) => {
              const config = getRoleConfig(u);
              const Icon = config.icon;
              const isActive = currentUser.id === u.id;

              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                    isActive
                      ? 'bg-slate-800 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-semibold truncate leading-tight flex items-center gap-1">
                      <span>{u.name.split(' ')[0]}</span>
                      {isActive && <span className="text-[9px] text-emerald-400 font-bold">● Ativo</span>}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      {config.label} · {config.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
