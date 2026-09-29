import React, { useState, useEffect } from 'react';
import { User, Store, Ad } from '../../types';
import { dataStore, SEED_USERS } from '../../services/store';
import { 
  User as UserIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  Store as StoreIcon, 
  ShieldCheck, 
  Edit3, 
  Save, 
  LogOut, 
  Check, 
  ChevronRight, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User;
  onOpenMerchantDashboard: () => void;
  onOpenAdminDashboard: () => void;
  onSelectStore: (storeId: string) => void;
  onOpenChat: (convId: string) => void;
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onOpenMerchantDashboard,
  onOpenAdminDashboard,
  onSelectStore,
  onOpenChat,
  onOpenAuth,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [unit, setUnit] = useState(currentUser.unit || '');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const stores = dataStore.getStores();
  const favoriteStores = stores.filter((s) => favorites.includes(s.id));
  const myConversations = dataStore.getConversations(currentUser.id);

  useEffect(() => {
    setName(currentUser.name);
    setPhone(currentUser.phone);
    setUnit(currentUser.unit || '');
    setFavorites(dataStore.getFavorites());
  }, [currentUser]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateUser(currentUser.id, {
      name,
      phone,
      unit,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleLogout = () => {
    // Switch back to resident 1 as default demo session
    dataStore.setCurrentUser(SEED_USERS[4]);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Profile Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {currentUser.role === 'master_admin' ? 'Administrador Principal' : currentUser.role === 'merchant' ? 'Lojista Credenciado' : currentUser.role === 'abm_manager' ? 'Gestor ABM' : 'Morador Associado'}
                </span>
              </div>
              <h1 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                {currentUser.name}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{currentUser.unit || 'Barra da Tijuca · RJ'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Editar informações"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Perfil atualizado com sucesso!</span>
          </div>
        )}

        {/* Edit Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Unidade Habitacional / Condomínio</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Ex: Ed. Atlântico · Apto 402"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Telefone celular / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{currentUser.phone}</span>
            </div>
          </div>
        )}
      </div>

      {/* Role specific portals */}
      {(currentUser.role === 'merchant' || currentUser.role === 'master_admin') && (
        <div 
          onClick={onOpenMerchantDashboard}
          className="p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-xs cursor-pointer hover:opacity-95 transition-opacity flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <StoreIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Painel Exclusivo do Lojista</h3>
              <p className="text-xs text-amber-100">Gerencie cardápio, serviços, ofertas e métricas da sua loja</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      )}

      {(currentUser.role === 'master_admin' || currentUser.role === 'abm_manager') && (
        <div 
          onClick={onOpenAdminDashboard}
          className="p-4 bg-gradient-to-r from-indigo-700 to-slate-900 text-white rounded-2xl shadow-xs cursor-pointer hover:opacity-95 transition-opacity flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Dashboard Administrativo ABM</h3>
              <p className="text-xs text-indigo-200">Gerenciar moradores, criar lojistas, banners e comunicados</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Favoritos Section */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Lojas & Serviços Favoritos ({favoriteStores.length})</span>
          </h3>
        </div>

        {favoriteStores.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            Você ainda não favoritou nenhuma loja. Clique no coração em qualquer loja para salvá-la aqui!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {favoriteStores.map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectStore(s.id)}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <img src={s.logo} alt={s.name} className="w-9 h-9 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">{s.name}</p>
                    <span className="text-[10px] text-slate-400">{s.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Minhas Conversas Recentes */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Minhas Conversas no App ({myConversations.length})</span>
        </h3>

        <div className="space-y-2">
          {myConversations.map((c) => (
            <div
              key={c.id}
              onClick={() => onOpenChat(c.id)}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 cursor-pointer transition-colors flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-bold text-xs text-slate-900">{c.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{c.lastMessage}</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{c.lastMessageAt}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Authentication & Demo Account Switch */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Gerenciar Sessão</h4>
            <p className="text-[11px] text-slate-500">Alternar conta ou fazer login com outro usuário</p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Trocar Usuário / Entrar
          </button>
        </div>
      </div>
    </div>
  );
};
