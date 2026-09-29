import React, { useState, useEffect } from 'react';
import { User, NotificationItem } from '../../types';
import { dataStore } from '../../services/store';
import { 
  Bell, 
  MapPin, 
  ShieldCheck, 
  Store as StoreIcon, 
  User as UserIcon, 
  X, 
  Check, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onNavigate: (tab: string, entityId?: string) => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onNavigate, onOpenAuth }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const update = () => {
      setNotifications(dataStore.getNotifications(currentUser.id));
    };
    update();
    return dataStore.subscribe(update);
  }, [currentUser.id]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (item: NotificationItem) => {
    dataStore.markNotificationAsRead(item.id);
    setShowNotifications(false);
    if (item.actionUrl?.startsWith('conv_')) {
      onNavigate('abm', item.actionUrl);
    } else if (item.actionUrl?.startsWith('ad_') || item.actionUrl?.startsWith('store_')) {
      onNavigate('lojas', item.actionUrl);
    } else if (item.actionUrl?.startsWith('news_')) {
      onNavigate('abm', item.actionUrl);
    }
  };

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'master_admin':
        return { label: 'Admin ABM', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: ShieldCheck };
      case 'abm_manager':
        return { label: 'Gestor ABM', color: 'bg-teal-50 text-teal-700 border-teal-200', icon: ShieldCheck };
      case 'merchant':
        return { label: 'Lojista', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: StoreIcon };
      default:
        return { label: 'Morador', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: UserIcon };
    }
  };

  const roleBadge = getRoleBadge(currentUser.role);
  const BadgeIcon = roleBadge.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Location */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('inicio')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-emerald-500/20">
            <span>A</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 leading-tight">
                ABM <span className="text-emerald-600 font-semibold text-xs tracking-normal">em Todo Lugar</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                {currentUser.unit || 'Barra da Tijuca · RJ'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Role indicator, Notifications & User Avatar */}
        <div className="flex items-center gap-2">
          {/* Role badge */}
          <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${roleBadge.color}`}>
            <BadgeIcon className="w-3 h-3" />
            <span>{roleBadge.label}</span>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all focus:outline-none"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer / Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">Notificações</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                        {unreadCount} nova(s)
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Nenhuma notificação no momento
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${
                          !item.read ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!item.read ? 'bg-emerald-500' : 'bg-transparent'}`} />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900 leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                            {item.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Navigation to Profile */}
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-all focus:outline-none"
            title="Meu Perfil"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 line-clamp-1">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-500">
                {roleBadge.label}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
