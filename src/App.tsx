import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { StyleGuide } from './components/StyleGuide';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { BridalPartyBuilder } from './components/BridalPartyBuilder';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { COMPANY_DETAILS } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('infinity_dress_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBridalSuiteOpen, setIsBridalSuiteOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('infinity_dress_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const fullItem: CartItem = {
      ...newItem,
      id,
    };
    setCartItems((prev) => [...prev, fullItem]);
    showToast(`Added "${newItem.productName}" to your cart!`);
    setIsCartOpen(true);
  };

  const handleAddAllToCart = (items: Array<Omit<CartItem, 'id'>>) => {
    const newItemsWithIds: CartItem[] = items.map((it, idx) => ({
      ...it,
      id: `bridal-${Date.now()}-${idx}`,
    }));
    setCartItems((prev) => [...prev, ...newItemsWithIds]);
    showToast(`Added ${items.length} bridal party dresses to your cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const unitPrice = item.unitPriceZar;
          return {
            ...item,
            quantity: newQty,
            totalPriceZar: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCollection = () => {
    const elem = document.getElementById('collection');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-950 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl border border-rose-300/40 shadow-2xl flex items-center gap-3 animate-fade-in text-xs sm:text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Site Header (No top ticker banner, clean light dreamy styling) */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBridalSuite={() => setIsBridalSuiteOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Showcase Landing Section */}
        <Hero
          onExploreClick={scrollToCollection}
          onOpenBridalSuite={() => setIsBridalSuiteOpen(true)}
        />

        {/* Collection & Product Customizer Grid */}
        <ProductGrid
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 27+ Styles Wrapping Masterclass Guide */}
        <StyleGuide />

        {/* Trademark Protection & South African Atelier Guarantee */}
        <WhyChooseUs />

        {/* Customer Reviews & Real South African Weddings */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Direct Factory Button */}
      <a
        href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering from THE INFINITY DRESS™ GROUP.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group border border-emerald-400/50"
        aria-label="Direct WhatsApp Factory Inquiry"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold tracking-wider uppercase pr-1">
          WhatsApp Us
        </span>
      </a>

      {/* Floating Bridal Party Suite Button for Mobile */}
      <button
        type="button"
        onClick={() => setIsBridalSuiteOpen(true)}
        className="lg:hidden fixed bottom-6 right-20 z-40 p-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full shadow-2xl transition-transform border border-rose-300/60"
        title="Bridal Party Group Order (Discounts)"
        aria-label="Bridal Party Suite"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {/* Modals & Slide-out Drawers */}
      {/* 1. Dress Customizer Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* 2. Bridal Party Group Order Suite */}
      <BridalPartyBuilder
        isOpen={isBridalSuiteOpen}
        onClose={() => setIsBridalSuiteOpen(false)}
        onAddAllToCart={handleAddAllToCart}
      />

      {/* 3. Official Size & Measurement Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* 4. Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenBridalSuite={() => {
          setIsCartOpen(false);
          setIsBridalSuiteOpen(true);
        }}
      />

      {/* 5. Checkout & WhatsApp Order Generator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => {
          setIsCheckoutOpen(false);
          showToast('Order submitted to WhatsApp successfully!');
        }}
      />
    </div>
  );
}
