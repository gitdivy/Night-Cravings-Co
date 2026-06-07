import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, Loader2 } from 'lucide-react';
import { MenuItem } from '../data';

const CATEGORIES = ['All', 'Burgers', 'Sandwiches', 'Fries', 'Maggi', 'Pizza', 'Beverages'];

export function Menu({ cart, updateCart, menuItems, loading, error, isStoreOpen = true }: { cart: Record<string, number>, updateCart: (id: string, diff: number) => void, menuItems: MenuItem[], loading: boolean, error?: string | null, isStoreOpen?: boolean }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  return (
    <section id="menu-section" className="py-8 md:py-12 px-4 max-w-7xl mx-auto">
      
      {/* Category Pills & View Mode Toggle */}
      <div className="sticky top-16 z-40 bg-[#FFFDF9]/90 dark:bg-[#111111]/90 backdrop-blur-xl py-3 -my-3 mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-grow mask-gradient-right pr-6 py-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
                activeCategory === cat 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' 
                  : 'bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5 hover:border-brand-orange/50 dark:hover:border-brand-orange/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 shrink-0">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 sm:p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-[#1A1A1A] shadow-sm text-brand-orange dark:text-brand-orange' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 sm:p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-[#1A1A1A] shadow-sm text-brand-orange dark:text-brand-orange' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            aria-label="List view"
          >
            <List size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center justify-between">
          <p><strong>Database Error:</strong> {error}. Showing offline menu.</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-brand-orange">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : menuItems.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <LayoutGrid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Menu Items Found</h3>
          <p className="text-gray-500 max-w-sm mb-6">Your Supabase database table `menu_items` is currently empty or you don't have read access.</p>
        </div>
      ) : activeCategory === 'All' ? (
        <div className="flex flex-col gap-8 pt-4">
          {CATEGORIES.filter(c => c !== 'All').map(cat => {
            const catItems = menuItems.filter(i => i.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 pl-1">{cat}</h3>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                  : "flex flex-col gap-4 lg:grid lg:grid-cols-2"
                }>
                  {catItems.map(item => (
                    <ProductCard 
                      key={item.id} 
                      item={item} 
                      quantity={cart[item.id] || 0}
                      onUpdate={(diff) => updateCart(item.id, diff)}
                      viewMode={viewMode}
                      isStoreOpen={isStoreOpen}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 pt-4"
          : "flex flex-col gap-4 pt-4 lg:grid lg:grid-cols-2"
        }>
          {filteredItems.map(item => (
            <ProductCard 
              key={item.id} 
              item={item} 
              quantity={cart[item.id] || 0}
              onUpdate={(diff) => updateCart(item.id, diff)}
              viewMode={viewMode}
              isStoreOpen={isStoreOpen}
            />
          ))}
        </div>
      )}
    </section>
  );
}
