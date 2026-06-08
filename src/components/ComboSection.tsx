import React from 'react';
import { Combo } from '../data';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export function ComboSection({ cart, updateCart, isStoreOpen = true, combos }: { cart: Record<string, number>, updateCart: (id: string, diff: number) => void, isStoreOpen?: boolean, combos: Combo[] }) {
  if (!combos || combos.length === 0) return null;
  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Midnight Combos
        </h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-orange/20 text-brand-orange uppercase tracking-wider">
          Best Value
        </span>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 snap-x snap-mandatory">
        {combos.map((combo, idx) => (
          <motion.div 
            key={combo.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className="flex-none w-[280px] md:w-[320px] rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden snap-center group"
          >
            <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img 
                src={combo.image} 
                alt={combo.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-900 dark:text-gray-100">
                {combo.label}
              </div>
            </div>
            
            <div className="p-5">
              <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
                {combo.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {combo.items.join(' + ')}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  ₹{combo.price}
                </span>
                <button
                  onClick={() => {
                    if (isStoreOpen) {
                      updateCart(combo.id, 1);
                    }
                  }}
                  disabled={!isStoreOpen}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 z-10 relative shadow-md ${
                    isStoreOpen
                      ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-brand-orange/20'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                  aria-label="Add combo to cart"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
