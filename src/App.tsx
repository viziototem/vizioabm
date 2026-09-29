import React, { useState, useEffect } from 'react';
import { User, Store, Conversation } from './types';
import { dataStore } from './services/store';

// Layout components
import { Header } from './components/layout/Header';
import { RoleSwitcherBar } from './components/layout/RoleSwitcherBar';
import { BottomNavigation } from './components/layout/BottomNavigation';

// Home components
import { BannerCarousel } from './components/home/BannerCarousel';
import { SmartSearchSection } from './components/home/SmartSearchSection';
import { CategorySlider } from './components/home/CategorySlider';
import { FeaturedStores } from './components/home/FeaturedStores';
import { LatestAdsSection } from './components/home/LatestAdsSection';
import { ABMNewsSection } from './components/home/ABMNewsSection';

// Feature Views
import { StoreDirectory } from './components/stores/StoreDirectory';
import { StoreDetailPage } from './components/stores/StoreDetailPage';
import { SearchAndAIAssistant } from './components/search/SearchAndAIAssistant';
import { ABMHub } from './components/abm/ABMHub';
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProfileView } from './components/profile/ProfileView';
import { ChatInterface } from './components/chat/ChatInterface';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(dataStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setCurrentUser(dataStore.getCurrentUser());
    };
    return dataStore.subscribe(update);
  }, []);

  // Navigation handlers
  const handleNavigate = (tab: string, entityId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'loja_detalhe' && entityId) {
      setSelectedStoreId(entityId);
      setActiveTab('loja_detalhe');
    } else if (tab === 'chat' && entityId) {
      setSelectedConversationId(entityId);
      setActiveTab('chat');
    } else if (tab === 'lojas') {
      setSelectedStoreId(null);
      setActiveTab('lojas');
    } else {
      setSelectedStoreId(null);
      setSelectedConversationId(null);
      setActiveTab(tab);
    }
  };

  const handleSearchFromHome = (query: string, openAssistant?: boolean) => {
    setSearchInitialQuery(query);
    setActiveTab('buscar');
  };

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('lojas');
  };

  const handleSelectStore = (storeId: string) => {
    setSelectedStoreId(storeId);
    setActiveTab('loja_detalhe');
  };

  const handleStartChatWithStore = (store: Store) => {
    const abmConv = dataStore.createConversation(
      'resident_merchant',
      currentUser,
      {
        id: store.ownerId,
        name: store.name,
        avatar: store.logo,
        role: 'merchant',
        storeId: store.id,
      },
      `Olá ${store.name}! Tenho uma dúvida sobre os produtos/serviços no app ABM.`
    );
    setSelectedConversationId(abmConv.id);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Interactive Role Switcher Banner for testing roles */}
      <RoleSwitcherBar
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Top Application Header */}
      <Header
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 py-3 sm:py-5 pb-24">
        {/* VIEW 1: INÍCIO (HOME) */}
        {activeTab === 'inicio' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Main Carousel Banner */}
            <BannerCarousel
              onNavigateToStore={handleSelectStore}
              onNavigateToAd={(adId) => {
                const ad = dataStore.getAds().find(a => a.id === adId);
                if (ad) handleSelectStore(ad.storeId);
              }}
              onNavigateToABM={() => handleNavigate('abm')}
            />

            {/* Smart Search Bar & AI Dock */}
            <SmartSearchSection onSearch={handleSearchFromHome} />

            {/* Quick Categories Slider */}
            <CategorySlider onSelectCategory={handleSelectCategoryFromHome} />

            {/* Featured Stores (iFood/Airbnb Style) */}
            <FeaturedStores
              onSelectStore={handleSelectStore}
              onSeeAllStores={() => handleNavigate('lojas')}
            />

            {/* Latest Community Ads & Discounts */}
            <LatestAdsSection onSelectStore={handleSelectStore} />

            {/* Official ABM News Bulletin */}
            <ABMNewsSection onNavigateToABM={(newsId) => handleNavigate('abm', newsId)} />
          </div>
        )}

        {/* VIEW 2: LOJAS (STORE DIRECTORY) */}
        {activeTab === 'lojas' && (
          <div className="animate-in fade-in duration-150">
            <StoreDirectory
              onSelectStore={handleSelectStore}
              initialCategory={selectedCategory}
            />
          </div>
        )}

        {/* VIEW 3: LOJA DETALHE (CUSTOMIZED STORE PAGE) */}
        {activeTab === 'loja_detalhe' && selectedStoreId && (
          <div className="animate-in fade-in duration-150">
            <StoreDetailPage
              storeId={selectedStoreId}
              currentUser={currentUser}
              onBack={() => handleNavigate('lojas')}
              onStartChat={handleStartChatWithStore}
            />
          </div>
        )}

        {/* VIEW 4: BUSCAR & ABM ASSISTENTE (SMART LOCAL CHATBOT) */}
        {activeTab === 'buscar' && (
          <div className="animate-in fade-in duration-150">
            <SearchAndAIAssistant
              initialQuery={searchInitialQuery}
              onSelectStore={handleSelectStore}
            />
          </div>
        )}

        {/* VIEW 5: ABM (PORTAL INSTITUCIONAL & ATENDIMENTO) */}
        {activeTab === 'abm' && (
          <div className="animate-in fade-in duration-150">
            <ABMHub
              currentUser={currentUser}
            />
          </div>
        )}

        {/* VIEW 6: CHAT 1-ON-1 */}
        {activeTab === 'chat' && selectedConversationId && (
          <div className="animate-in fade-in duration-150">
            <ChatInterface
              conversationId={selectedConversationId}
              currentUser={currentUser}
              onBack={() => handleNavigate('inicio')}
              onViewStore={handleSelectStore}
            />
          </div>
        )}

        {/* VIEW 7: PAINEL DO LOJISTA (MERCHANT DASHBOARD) */}
        {activeTab === 'merchant_dashboard' && (
          <div className="animate-in fade-in duration-150">
            <MerchantDashboard
              currentUser={currentUser}
              onViewStorePage={handleSelectStore}
            />
          </div>
        )}

        {/* VIEW 8: DASHBOARD ADMINISTRATIVO (ADMIN MASTER) */}
        {activeTab === 'admin_dashboard' && (
          <div className="animate-in fade-in duration-150">
            <AdminDashboard
              currentUser={currentUser}
              onViewStore={handleSelectStore}
            />
          </div>
        )}

        {/* VIEW 9: PERFIL DO USUÁRIO */}
        {activeTab === 'perfil' && (
          <div className="animate-in fade-in duration-150">
            <ProfileView
              currentUser={currentUser}
              onOpenMerchantDashboard={() => handleNavigate('merchant_dashboard')}
              onOpenAdminDashboard={() => handleNavigate('admin_dashboard')}
              onSelectStore={handleSelectStore}
              onOpenChat={(convId) => handleNavigate('chat', convId)}
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation (Mobile & Desktop) */}
      <BottomNavigation
        activeTab={activeTab === 'loja_detalhe' || activeTab === 'chat' || activeTab === 'merchant_dashboard' || activeTab === 'admin_dashboard' ? '' : activeTab}
        onTabChange={(tab) => handleNavigate(tab)}
      />

      {/* Authentication & Resident Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          handleNavigate('inicio');
        }}
      />
    </div>
  );
}
