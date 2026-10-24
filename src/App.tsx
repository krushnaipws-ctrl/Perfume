import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeBanner } from './components/MarqueeBanner';
import { BestsellersSection } from './components/BestsellersSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { FragranceFinder } from './components/FragranceFinder';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { FragranceJournal } from './components/FragranceJournal';
import { InstagramGallery } from './components/InstagramGallery';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ToastContainer } from './components/ToastContainer';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessView } from './components/OrderSuccessView';

const MainContent: React.FC = () => {
  const { currentView, selectedProductId, selectedCategory } = useShop();

  return (
    <main className="flex-1">
      {currentView === 'home' && (
        <>
          <HeroSection />
          <MarqueeBanner />
          <BestsellersSection />
          <FeaturedCollections />
          <FragranceFinder />
          <BrandStory />
          <CustomerReviews />
          <FragranceJournal />
          <InstagramGallery />
          <FAQSection />
        </>
      )}

      {currentView === 'shop' && (
        <ShopPage initialCategory={selectedCategory} />
      )}

      {currentView === 'product' && selectedProductId && (
        <ProductDetailPage productId={selectedProductId} />
      )}

      {currentView === 'finder' && (
        <div className="py-8">
          <FragranceFinder />
        </div>
      )}

      {currentView === 'about' && (
        <div className="py-8">
          <BrandStory />
          <FragranceJournal />
          <FAQSection />
        </div>
      )}

      {currentView === 'checkout' && <CheckoutPage />}

      {currentView === 'order-success' && <OrderSuccessView />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#0a0a0b] text-[#e8e4dc] font-sans antialiased selection:bg-[#c5a880] selection:text-[#0a0a0b]">
        <AnnouncementBar />
        <Header />
        <MainContent />
        <Footer />

        {/* Global Overlays & Micro-interactions */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
