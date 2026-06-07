import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProofTicker } from './components/SocialProofTicker';
import { Menu } from './components/Menu';
import { ComboSection } from './components/ComboSection';
import { CartFab } from './components/CartFab';
import { CartPage } from './components/CartPage';
import { Footer } from './components/Footer';
import { useMenuItems } from './hooks/useMenuItems';
import { useStoreSettings } from './hooks/useStoreSettings';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<'home' | 'cart'>('home');
  const { items: globalMenuItems, loading, error } = useMenuItems();
  const { settings } = useStoreSettings();
  const isStoreOpen = settings.store_open;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const updateCart = (itemId: string, diff: number) => {
    if (!isStoreOpen) return; // Prevent adding if closed
    setCart((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + diff);
      if (newQty === 0) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const clearCart = () => setCart({});

  const totalItems = (Object.values(cart) as number[]).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        cartCount={totalItems} 
        onCartClick={() => setView('cart')}
        onHomeClick={() => setView('home')}
        isStoreOpen={isStoreOpen}
      />
      
      <main className="flex-1 pb-32">
        {view === 'home' ? (
          <>
            <Hero />
            <SocialProofTicker />
            <ComboSection cart={cart} updateCart={updateCart} isStoreOpen={isStoreOpen} />
            <Menu cart={cart} updateCart={updateCart} menuItems={globalMenuItems} loading={loading} error={error} isStoreOpen={isStoreOpen} />
          </>
        ) : (
          <CartPage 
            cart={cart}
            updateCart={updateCart}
            clearCart={clearCart}
            onBack={() => setView('home')}
            globalMenuItems={globalMenuItems}
            isStoreOpen={isStoreOpen}
          />
        )}
      </main>

      {view === 'home' && (
        <CartFab 
          cartCount={totalItems} 
          cart={cart}
          onCheckout={() => setView('cart')} 
          globalMenuItems={globalMenuItems}
        />
      )}

      {/* Closed Banner Overlay */}
      <AnimatePresence>
        {!isStoreOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none"
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(239,68,68,0.4)] text-center font-medium max-w-sm w-full mx-auto backdrop-blur-md bg-red-500/90 border border-red-400">
              Kitchen is closed right now. Come back for midnight cravings 🌙
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
