import React, { useState, useEffect } from 'react';
import { User, Store, Product, Service, Ad, Conversation, StoreMetrics } from '../../types';
import { dataStore } from '../../services/store';
import { 
  Store as StoreIcon, 
  Eye, 
  MessageCircle, 
  Heart, 
  Phone, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Save, 
  TrendingUp, 
  Clock, 
  Tag, 
  Layers, 
  Image, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface MerchantDashboardProps {
  currentUser: User;
  onViewStorePage: (storeId: string) => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  currentUser,
  onViewStorePage,
}) => {
  const [store, setStore] = useState<Store | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'resumo' | 'minha_loja' | 'produtos' | 'servicos' | 'anuncios' | 'mensagens'>('resumo');
  const [metrics, setMetrics] = useState<StoreMetrics>({
    storeViews: 0,
    adViews: 0,
    whatsappClicks: 0,
    phoneClicks: 0,
    locationClicks: 0,
    favorites: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit store form state
  const [storeForm, setStoreForm] = useState<Partial<Store>>({});

  // Modals for adding products/services/ads
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('');

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newServName, setNewServName] = useState('');
  const [newServPrice, setNewServPrice] = useState('');
  const [newServDesc, setNewServDesc] = useState('');
  const [newServDuration, setNewServDuration] = useState('');

  const [showAdModal, setShowAdModal] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdDesc, setNewAdDesc] = useState('');
  const [newAdDiscount, setNewAdDiscount] = useState('');
  const [newAdCta, setNewAdCta] = useState('Pedir no WhatsApp');

  useEffect(() => {
    const update = () => {
      // Find store owned by this user or default to store_1 for demo
      const userStore = dataStore.getStores().find((s) => s.ownerId === currentUser.id) || dataStore.getStores()[0];
      setStore(userStore);
      if (userStore) {
        setStoreForm(userStore);
        setMetrics(dataStore.getStoreMetrics(userStore.id));
        setProducts(dataStore.getProducts(userStore.id));
        setServices(dataStore.getServices(userStore.id));
        setAds(dataStore.getAds(userStore.id));
        setConversations(dataStore.getConversations().filter(c => c.storeId === userStore.id));
      }
    };
    update();
    return dataStore.subscribe(update);
  }, [currentUser.id]);

  if (!store) {
    return (
      <div className="py-16 text-center text-xs text-slate-500">
        Nenhuma loja vinculada a esta conta.
      </div>
    );
  }

  const handleSaveStoreProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    dataStore.updateStore(store.id, storeForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    dataStore.addProduct({
      storeId: store.id,
      name: newProdName,
      price: parseFloat(newProdPrice),
      description: newProdDesc,
      image: newProdImg || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    });
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    setNewProdImg('');
    setShowProductModal(false);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServName) return;
    dataStore.addService({
      storeId: store.id,
      name: newServName,
      price: newServPrice ? parseFloat(newServPrice) : undefined,
      description: newServDesc,
      duration: newServDuration || '1 hora',
      availability: 'Segunda a Sábado',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    });
    setNewServName('');
    setNewServPrice('');
    setNewServDesc('');
    setNewServDuration('');
    setShowServiceModal(false);
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdDesc) return;
    dataStore.addAd({
      storeId: store.id,
      storeName: store.name,
      storeLogo: store.logo,
      title: newAdTitle,
      description: newAdDesc,
      image: store.coverImage,
      type: 'oferta',
      category: store.category,
      discountPercent: newAdDiscount ? parseInt(newAdDiscount) : undefined,
      cta: newAdCta,
      link: store.id,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2025-05-30',
      status: 'active',
    });
    setNewAdTitle('');
    setNewAdDesc('');
    setNewAdDiscount('');
    setShowAdModal(false);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Merchant Greeting & Store preview CTA */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={store.logo}
            alt={store.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700 bg-white"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                Painel do Lojista
              </span>
              <span className="text-xs text-slate-400">· {store.category}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight">{store.name}</h1>
          </div>
        </div>

        <button
          onClick={() => onViewStorePage(store.id)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          <span>Ver Página Pública da Loja</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('resumo')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'resumo' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Resumo & Métricas
        </button>
        <button
          onClick={() => setActiveTab('minha_loja')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'minha_loja' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Personalizar Loja
        </button>
        <button
          onClick={() => setActiveTab('produtos')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'produtos' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Produtos ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('servicos')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'servicos' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Serviços ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('anuncios')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'anuncios' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Anúncios ({ads.length})
        </button>
        <button
          onClick={() => setActiveTab('mensagens')}
          className={`px-3 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === 'mensagens' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Mensagens ({conversations.length})
        </button>
      </div>

      {/* Tab: Resumo & Métricas */}
      {activeTab === 'resumo' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                Visualizações da Loja
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.storeViews}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
                +18% este mês
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                Cliques no WhatsApp
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.whatsappClicks}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
                Moradores entraram em contato
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                Alcance dos Anúncios
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.adViews}
              </p>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                Impressões na Home
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Favoritado por
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.favorites} moradores
              </p>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                Em listas de favoritos
              </span>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                Cliques em Telefone
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.phoneClicks}
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
                Status de Conversão
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                26.9%
              </p>
              <span className="text-[10px] text-teal-600 font-bold mt-0.5 block">
                Taxa de engajamento
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Personalizar Loja */}
      {activeTab === 'minha_loja' && (
        <form onSubmit={handleSaveStoreProfile} className="p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Identidade Visual e Informações da Loja
              </h3>
              <p className="text-xs text-slate-400">
                Personalize as cores, fotos e contatos da sua página dentro do app ABM.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Nome Fantasia da Loja</label>
              <input
                type="text"
                value={storeForm.name || ''}
                onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Categoria</label>
              <input
                type="text"
                value={storeForm.category || ''}
                onChange={(e) => setStoreForm({ ...storeForm, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Descrição Comercial (Bio)</label>
              <textarea
                rows={3}
                value={storeForm.description || ''}
                onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">WhatsApp (apenas números com DDI + DDD)</label>
              <input
                type="text"
                value={storeForm.whatsapp || ''}
                onChange={(e) => setStoreForm({ ...storeForm, whatsapp: e.target.value })}
                placeholder="5521999999999"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Telefone Fixo Comercial</label>
              <input
                type="text"
                value={storeForm.phone || ''}
                onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Endereço Físico</label>
              <input
                type="text"
                value={storeForm.address || ''}
                onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Setor / Bloco na ABM</label>
              <input
                type="text"
                value={storeForm.condoZone || ''}
                onChange={(e) => setStoreForm({ ...storeForm, condoZone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Horário de Funcionamento</label>
              <input
                type="text"
                value={storeForm.openingHours || ''}
                onChange={(e) => setStoreForm({ ...storeForm, openingHours: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Cor Principal da Página (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={storeForm.primaryColor || '#c2410c'}
                  onChange={(e) => setStoreForm({ ...storeForm, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={storeForm.primaryColor || ''}
                  onChange={(e) => setStoreForm({ ...storeForm, primaryColor: e.target.value })}
                  className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações da Loja</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Produtos */}
      {activeTab === 'produtos' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Produtos exibidos diretamente no cardápio / catálogo do aplicativo
            </p>
            <button
              onClick={() => setShowProductModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Cadastrar Produto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((prod) => (
              <div key={prod.id} className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex gap-3">
                <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{prod.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{prod.description}</p>
                    <span className="text-xs font-bold text-emerald-700 block mt-1">R$ {prod.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-2">
                    <button
                      onClick={() => dataStore.deleteProduct(prod.id)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add Product */}
          {showProductModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handleAddProduct} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-md space-y-3 shadow-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Adicionar Novo Produto</h3>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Preço (Ex: 49.90)"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
                  />
                  <textarea
                    placeholder="Descrição detalhada dos ingredientes ou especificações"
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
                  />
                  <input
                    type="url"
                    placeholder="URL da foto (opcional)"
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab: Serviços */}
      {activeTab === 'servicos' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Serviços prestados aos moradores da comunidade
            </p>
            <button
              onClick={() => setShowServiceModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Cadastrar Serviço</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((serv) => (
              <div key={serv.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex justify-between items-start gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{serv.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{serv.description}</p>
                  <span className="text-xs font-bold text-emerald-700 block mt-1">
                    {serv.price ? `R$ ${serv.price.toFixed(2)}` : 'Sob orçamento'}
                  </span>
                </div>
                <button
                  onClick={() => dataStore.deleteService(serv.id)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Modal Add Service */}
          {showServiceModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handleAddService} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-md space-y-3 shadow-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Adicionar Novo Serviço</h3>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Nome do serviço (Ex: Instalação de Ar Condicionado)"
                    value={newServName}
                    onChange={(e) => setNewServName(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Preço base (ou deixe vazio para sob orçamento)"
                    value={newServPrice}
                    onChange={(e) => setNewServPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Duração estimada (Ex: 1 hora)"
                    value={newServDuration}
                    onChange={(e) => setNewServDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <textarea
                    placeholder="Descrição do serviço e diferenciais"
                    value={newServDesc}
                    onChange={(e) => setNewServDesc(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowServiceModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Salvar Serviço
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
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Anúncios e ofertas veiculados no feed de ofertas dos moradores
            </p>
            <button
              onClick={() => setShowAdModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Criar Campanha / Anúncio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ads.map((ad) => (
              <div key={ad.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 px-2 py-0.5 rounded">
                    {ad.type} {ad.discountPercent ? `· ${ad.discountPercent}% OFF` : ''}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Eye className="w-3 h-3" />
                    <span>{ad.viewsCount} visualizações</span>
                  </div>
                </div>

                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{ad.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">{ad.description}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-emerald-600 font-bold">
                    {ad.clicksCount} cliques no WhatsApp
                  </span>
                  <button
                    onClick={() => dataStore.deleteAd(ad.id)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                    title="Excluir Anúncio"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add Ad */}
          {showAdModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <form onSubmit={handleAddAd} className="bg-white dark:bg-slate-800 rounded-3xl p-5 w-full max-w-md space-y-3 shadow-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Criar Nova Campanha / Oferta</h3>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Título chamativo (Ex: 20% OFF para Moradores ABM)"
                    value={newAdTitle}
                    onChange={(e) => setNewAdTitle(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="number"
                    placeholder="Desconto percentual (opcional, Ex: 20)"
                    value={newAdDiscount}
                    onChange={(e) => setNewAdDiscount(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <textarea
                    placeholder="Descrição da oferta ou condição especial"
                    value={newAdDesc}
                    onChange={(e) => setNewAdDesc(e.target.value)}
                    rows={2}
                    required
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Texto do botão (Ex: Pedir no WhatsApp)"
                    value={newAdCta}
                    onChange={(e) => setNewAdCta(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-xs"
                  >
                    Publicar Anúncio
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab: Mensagens */}
      {activeTab === 'mensagens' && (
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
              Nenhuma conversa aberta com moradores no momento.
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((c) => (
                <div key={c.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xs flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{c.lastMessage}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{c.lastMessageAt}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold shrink-0">
                    Conversa Ativa
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
