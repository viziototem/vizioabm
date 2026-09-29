import React, { useState, useEffect } from 'react';
import { User, Store, Ad, Banner, ABMNews, Conversation } from '../../types';
import { dataStore } from '../../services/store';
import { 
  ShieldCheck, 
  Users, 
  Store as StoreIcon, 
  Tag, 
  Image as ImageIcon, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  AlertCircle,
  Eye,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  onViewStore: (storeId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onViewStore,
}) => {
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'moradores' | 'lojistas' | 'anuncios' | 'banners' | 'comunicados' | 'conversas'>('visao_geral');
  const [metrics, setMetrics] = useState(dataStore.getAdminMetrics());
  
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [newsList, setNewsList] = useState<ABMNews[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Modal create merchant state
  const [showCreateMerchantModal, setShowCreateMerchantModal] = useState(false);
  const [merchantName, setMerchantName] = useState('');
  const [merchantEmail, setMerchantEmail] = useState('');
  const [merchantPhone, setMerchantPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('Alimentação');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeWhatsapp, setStoreWhatsapp] = useState('');

  // Modal create banner state
  const [showCreateBannerModal, setShowCreateBannerModal] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImg, setBannerImg] = useState('');
  const [bannerCta, setBannerCta] = useState('');
  const [bannerTarget, setBannerTarget] = useState<'store' | 'abm_news' | 'url'>('store');
  const [bannerTargetId, setBannerTargetId] = useState('');

  // Modal publish news
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Comunicado Oficial' | 'Segurança' | 'Eventos' | 'Obras & Melhorias' | 'Assembleia'>('Comunicado Oficial');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsUrgent, setNewsUrgent] = useState(false);

  useEffect(() => {
    const update = () => {
      setMetrics(dataStore.getAdminMetrics());
      setUsers(dataStore.getUsers());
      setStores(dataStore.getStores());
      setAds(dataStore.getAds());
      setBanners(dataStore.getBanners());
      setNewsList(dataStore.getNews());
      setConversations(dataStore.getConversations());
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  const handleToggleUserStatus = (user: User) => {
    const nextStatus = user.status === 'active' ? 'blocked' : 'active';
    dataStore.updateUser(user.id, { status: nextStatus });
  };

  const handleCreateMerchantAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !merchantEmail || !storeName) return;

    // 1. Create Merchant user account
    const newMerchantUser = dataStore.addUser({
      name: merchantName,
      email: merchantEmail,
      phone: merchantPhone || '(21) 99999-0000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      role: 'merchant',
      unit: 'Comércio Local Credenciado ABM',
      status: 'active',
    });

    // 2. Create Store linked to this merchant
    const newStore = dataStore.addStore({
      ownerId: newMerchantUser.id,
      name: storeName,
      category: storeCategory,
      description: `Loja oficial credenciada ${storeName} na Associação de Moradores ABM. Atendimento especial aos moradores.`,
      logo: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=256&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      primaryColor: '#059669',
      secondaryColor: '#10b981',
      phone: merchantPhone || '(21) 3456-7890',
      whatsapp: storeWhatsapp.replace(/\D/g, '') || '5521999990000',
      address: storeAddress || 'Galeria Comercial ABM',
      condoZone: 'Setor Comercial ABM',
      latitude: -23.0035,
      longitude: -43.3228,
      openingHours: 'Segunda a Sábado: 09h às 19h',
      deliveryAvailable: true,
      featured: true,
      status: 'active',
    });

    dataStore.updateUser(newMerchantUser.id, { merchantStoreId: newStore.id });

    // Reset form
    setMerchantName('');
    setMerchantEmail('');
    setMerchantPhone('');
    setStoreName('');
    setStoreAddress('');
    setStoreWhatsapp('');
    setShowCreateMerchantModal(false);
  };

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle) return;
    dataStore.addBanner({
      title: bannerTitle,
      subtitle: bannerSubtitle,
      image: bannerImg || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      cta: bannerCta || 'Ver Destaque',
      link: bannerTarget === 'store' ? bannerTargetId : 'abm_hub',
      position: banners.length + 1,
      targetType: bannerTarget,
      targetId: bannerTargetId,
      status: 'active',
    });
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImg('');
    setBannerCta('');
    setShowCreateBannerModal(false);
  };

  const handlePublishNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) return;
    dataStore.addNews({
      title: newsTitle,
      category: newsCategory,
      summary: newsSummary || newsContent.slice(0, 100),
      content: newsContent,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      urgent: newsUrgent,
      author: currentUser.name,
    });
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsUrgent(false);
    setShowNewsModal(false);
  };

  const isMasterAdmin = currentUser.role === 'master_admin';

  return (
    <div className="space-y-4 pb-12">
      {/* Admin Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-indigo-950 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Central de Gestão ABM</span>
            </span>
            <span className="text-xs text-indigo-200">· {currentUser.name}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
            Controle Administrativo da Comunidade
          </h1>
        </div>

        {isMasterAdmin && (
          <button
            onClick={() => setShowCreateMerchantModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Nova Conta de Lojista</span>
          </button>
        )}
      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('visao_geral')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'visao_geral' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('moradores')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'moradores' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Moradores ({metrics.residentsCount})
        </button>
        <button
          onClick={() => setActiveTab('lojistas')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'lojistas' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Lojistas & Lojas ({metrics.activeStores})
        </button>
        <button
          onClick={() => setActiveTab('anuncios')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'anuncios' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Anúncios ({metrics.activeAds})
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'banners' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Banners da Home ({banners.length})
        </button>
        <button
          onClick={() => setActiveTab('comunicados')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'comunicados' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Comunicados ABM ({newsList.length})
        </button>
        <button
          onClick={() => setActiveTab('conversas')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'conversas' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Central de Conversas ({conversations.length})
        </button>
      </div>

      {/* Tab: Visão Geral */}
      {activeTab === 'visao_geral' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Moradores
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.residentsCount}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                +34 cadastrados no mês
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <StoreIcon className="w-3.5 h-3.5 text-amber-600" />
                Lojas Ativas
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.activeStores}
              </p>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                {metrics.merchantsCount} lojistas aprovados
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Anúncios no Ar
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.activeAds}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                100% verificados
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                Interações WhatsApp
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.whatsappLeads}
              </p>
              <span className="text-[10px] text-teal-600 font-bold block mt-0.5">
                Leads para lojistas
              </span>
            </div>
          </div>

          {/* Quick status report box */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Plataforma ABM Operando Normalmente:</strong> Todos os serviços de comunicados, moderação de ofertas e chat com a administração estão ativos.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Moradores */}
      {activeTab === 'moradores' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Lista de Moradores Associados</h3>
              <p className="text-xs text-slate-400">Gerenciamento de acessos e verificação de unidades habitacionais.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {users.filter(u => u.role === 'resident').map((resident) => (
              <div key={resident.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={resident.avatar} alt={resident.name} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{resident.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{resident.unit || 'Endereço em validação'}</span>
                    <span className="text-[10px] text-slate-400">{resident.email} · {resident.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    resident.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {resident.status === 'active' ? 'Ativo' : 'Bloqueado'}
                  </span>

                  {isMasterAdmin && (
                    <button
                      onClick={() => handleToggleUserStatus(resident)}
                      className="px-2.5 py-1 text-[11px] font-semibold border rounded-lg hover:bg-slate-100 text-slate-600"
                    >
                      {resident.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Lojistas & Lojas */}
      {activeTab === 'lojistas' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Conforme as diretrizes da ABM, contas de lojistas só podem ser criadas pela Administração Principal.
            </p>
            {isMasterAdmin && (
              <button
                onClick={() => setShowCreateMerchantModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Lojista</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stores.map((s) => (
              <div key={s.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex justify-between items-start gap-3">
                <div className="flex items-start gap-3">
                  <img src={s.logo} alt={s.name} className="w-12 h-12 rounded-xl object-cover border shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {s.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1">{s.name}</h4>
                    <p className="text-[11px] text-slate-500">{s.condoZone || s.address}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">WhatsApp: {s.whatsapp}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <button
                    onClick={() => onViewStore(s.id)}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
                    title="Visualizar Loja"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver</span>
                  </button>
                  {isMasterAdmin && (
                    <button
                      onClick={() => dataStore.deleteStore(s.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg text-xs"
                      title="Excluir Loja"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Create Merchant Account */}
          {showCreateMerchantModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handleCreateMerchantAccount} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <StoreIcon className="w-4 h-4 text-emerald-600" />
                    <span>Cadastrar Novo Lojista Credenciado</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowCreateMerchantModal(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Nome do Responsável / Lojista</label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Eduardo"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">E-mail de Login do Lojista</label>
                    <input
                      type="email"
                      placeholder="lojista@empresa.com.br"
                      value={merchantEmail}
                      onChange={(e) => setMerchantEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Nome da Loja Comercial</label>
                    <input
                      type="text"
                      placeholder="Ex: Padaria & Bistrô Barra"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Categoria da Loja</label>
                    <select
                      value={storeCategory}
                      onChange={(e) => setStoreCategory(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <option value="Alimentação">Alimentação</option>
                      <option value="Mercados">Mercados</option>
                      <option value="Beleza">Beleza</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Serviços">Serviços</option>
                      <option value="Casa">Casa</option>
                      <option value="Pet">Pet</option>
                      <option value="Automotivo">Automotivo</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">WhatsApp de Atendimento</label>
                    <input
                      type="text"
                      placeholder="5521999998888"
                      value={storeWhatsapp}
                      onChange={(e) => setStoreWhatsapp(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Endereço / Setor na ABM</label>
                    <input
                      type="text"
                      placeholder="Ex: Galeria Comercial ABM Loja 12"
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 text-amber-900 rounded-xl text-[11px] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>A senha de acesso padrão será gerada e o lojista poderá personalizar sua página após o login.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateMerchantModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Criar Conta de Lojista
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab: Anúncios */}
      {activeTab === 'anuncios' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ads.map((ad) => (
              <div key={ad.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    {ad.type} {ad.discountPercent ? `· ${ad.discountPercent}% OFF` : ''}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{ad.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{ad.description}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">Loja: {ad.storeName}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => dataStore.deleteAd(ad.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg text-xs"
                    title="Remover anúncio"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Banners da Home */}
      {activeTab === 'banners' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Gerencie a ordem e os destaques do carrossel principal exibido na Home.
            </p>
            <button
              onClick={() => setShowCreateBannerModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {banners.map((b) => (
              <div key={b.id} className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex gap-3">
                <img src={b.image} alt={b.title} className="w-20 h-14 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{b.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{b.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-emerald-600">Posição {b.position}</span>
                    <button
                      onClick={() => dataStore.deleteBanner(b.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Create Banner */}
          {showCreateBannerModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handleCreateBanner} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-md space-y-3 shadow-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Criar Novo Banner Principal</h3>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Título principal do banner"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Subtítulo descritivo"
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Texto do botão CTA (Ex: Ver Cardápio)"
                    value={bannerCta}
                    onChange={(e) => setBannerCta(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <select
                    value={bannerTarget}
                    onChange={(e) => setBannerTarget(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="store">Vincular a uma Loja</option>
                    <option value="abm_news">Vincular a Comunicados ABM</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateBannerModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Publicar Banner
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab: Comunicados ABM */}
      {activeTab === 'comunicados' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Publique comunicados oficiais para todos os moradores no aplicativo.
            </p>
            <button
              onClick={() => setShowNewsModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Comunicado Oficial</span>
            </button>
          </div>

          <div className="space-y-2">
            {newsList.map((item) => (
              <div key={item.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                    {item.urgent && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        Urgente
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Publish News */}
          {showNewsModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handlePublishNews} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-3 shadow-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Publicar Comunicado Oficial ABM</h3>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Título do comunicado ou edital"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="Comunicado Oficial">Comunicado Oficial</option>
                    <option value="Assembleia">Assembleia</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Obras & Melhorias">Obras & Melhorias</option>
                    <option value="Eventos">Eventos</option>
                  </select>
                  <textarea
                    placeholder="Resumo curto para o feed"
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <textarea
                    placeholder="Conteúdo completo do informativo"
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    rows={4}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={newsUrgent}
                      onChange={(e) => setNewsUrgent(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span className="font-semibold text-slate-700">Marcar como comunicado prioritário / urgente</span>
                  </label>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewsModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Publicar para Moradores
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab: Central de Conversas */}
      {activeTab === 'conversas' && (
        <div className="space-y-3">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs text-xs text-slate-500">
            Monitoramento de todos os atendimentos entre moradores e administração ABM.
          </div>

          <div className="space-y-2">
            {conversations.map((conv) => (
              <div key={conv.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {conv.type === 'resident_abm' ? 'Atendimento ABM' : 'Chat Lojista'}
                    </span>
                    <span className="text-[10px] text-slate-400">{conv.lastMessageAt}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{conv.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{conv.lastMessage}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold shrink-0">
                  {conv.status === 'resolved' ? 'Resolvido' : 'Em Atendimento'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
