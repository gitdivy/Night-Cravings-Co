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

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<'home' | 'cart'>('home');
  const { items: globalMenuItems, loading, error } = useMenuItems();

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
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        cartCount={totalItems} 
        onCartClick={() => setView('cart')}
        onHomeClick={() => setView('home')}
      />
      
      <main className="flex-1 pb-32">
        {view === 'home' ? (
          <>
            <Hero />
            <SocialProofTicker />
            <ComboSection cart={cart} updateCart={updateCart} />
            <Menu cart={cart} updateCart={updateCart} menuItems={globalMenuItems} loading={loading} error={error} />
          </>
        ) : (
          <CartPage 
            cart={cart}
            updateCart={updateCart}
            clearCart={clearCart}
            onBack={() => setView('home')}
            globalMenuItems={globalMenuItems}
          />
        )}
      </main>

      {view === 'home' && (
        <CartFab 
          cartCount={totalItems} 
          cart={cart}
          onCheckout={() => setView('cart')} 
        />
      )}

      <Footer />
    </div>
  );
}
