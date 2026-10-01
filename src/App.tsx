import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { updateSEO } from './utils/seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { WholesaleView } from './views/WholesaleView';
import { ImpactView } from './views/ImpactView';
import { BlogView } from './views/BlogView';
import { AnalyticsView } from './views/AnalyticsView';
import { WordPressThemeView } from './views/WordPressThemeView';

const MainContent: React.FC = () => {
  const { activeView, selectedProductId } = useCart();

  useEffect(() => {
    switch (activeView) {
      case 'shop':
        updateSEO({
          title: 'Shop Single-Origin Coffee, Honey & Dried Fruits | Ntamba Processors',
          description: 'Order roasted Robusta beans, ground specialty coffee, raw apiary honey, and FruitTreat dried fruits in single packs or 12x wholesale cartons.',
          canonicalPath: '/shop'
        });
        break;
      case 'product': {
        const prod = PRODUCTS.find((p) => p.id === selectedProductId);
        if (prod) {
          updateSEO({
            title: `${prod.name} | Ntamba Processors Single-Farm Origin`,
            description: `${prod.shortDescription} Single-farm Ugandan origin, 100% natural, certified processing.`,
            canonicalPath: `/product/${prod.id}`,
            type: 'product',
            product: prod
          });
        }
        break;
      }
      case 'wholesale':
        updateSEO({
          title: 'B2B Coffee Wholesale & Cupping Sample Desk | Ntamba Processors',
          description: 'Request DHL Express cupping samples of Screen 18 Fine Robusta, FOB Mombasa container logistics, and EUDR-compliant supply contracts.',
          canonicalPath: '/wholesale'
        });
        break;
      case 'impact':
        updateSEO({
          title: '385-Acre Circular Agroecology & EUDR Traceability | Ntamba Processors',
          description: 'Discover Ntamba Processors’ closed-loop agroforestry, zero-waste vermicomposting, female farmer empowerment, and satellite-verified zero-deforestation polygon.',
          canonicalPath: '/impact'
        });
        break;
      case 'blog':
        updateSEO({
          title: 'Stories from the Estate: Coffee Science & Agroecology | Ntamba',
          description: 'Read field dispatches, roast chemistry analysis, EUDR regulatory briefings, and circular farming research from Ntamba Processors.',
          canonicalPath: '/blog',
          type: 'article'
        });
        break;
      case 'analytics':
        updateSEO({
          title: 'Commercial Dashboard & Analytics | Ntamba Processors',
          description: 'Track real-time export volumes, currency exchange rates, and inventory status.',
          canonicalPath: '/analytics'
        });
        break;
      case 'theme-exporter':
        updateSEO({
          title: 'WordPress Production Theme Code | Ntamba Processors',
          description: 'Production-ready PHP and CSS codebase for WooCommerce integration.',
          canonicalPath: '/theme'
        });
        break;
      case 'home':
      default:
        updateSEO({
          title: 'Ntamba Processors — Single-Origin Ugandan Robusta & Agroecology',
          description: 'Direct single-farm Fine Robusta coffee, raw multi-floral honey, and solar-dried tropical fruits from our 385-acre regenerative estate in Kyantamba, Uganda.',
          canonicalPath: '/'
        });
        break;
    }

    // Smooth scroll to top on view changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProductId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2] text-[#2A1E17] font-body selection:bg-[#D4A017]/30 selection:text-[#2A1E17]">
      <Header />
      
      <main className="flex-grow">
        {activeView === 'home' && <HomeView />}
        {activeView === 'shop' && <ShopView />}
        {activeView === 'product' && <ProductDetailView />}
        {activeView === 'wholesale' && <WholesaleView />}
        {activeView === 'impact' && <ImpactView />}
        {activeView === 'blog' && <BlogView />}
        {activeView === 'analytics' && <AnalyticsView />}
        {activeView === 'theme-exporter' && <WordPressThemeView />}
      </main>

      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
