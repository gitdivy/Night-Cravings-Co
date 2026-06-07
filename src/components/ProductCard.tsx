import React from 'react';
import { MenuItem } from '../data';
import { Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  item: MenuItem;
  quantity: number;
  onUpdate: (diff: number) => void;
  viewMode?: 'grid' | 'list';
  isStoreOpen?: boolean;
}

export function ProductCard({ item, quantity, onUpdate, viewMode = 'grid', isStoreOpen = true }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        className="group bg-white dark:bg-[#1A1A1A] rounded-[24px] border border-gray-100 dark:border-white/5 p-2 flex flex-row items-center gap-3 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-shadow"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
          <img 
            src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }}
          />
        </div>

        <div className="flex flex-col flex-grow py-1 pr-1">
          <div className="flex justify-between items-start mb-1 gap-1">
            <h4 className="font-display font-semibold text-gray-900 dark:text-white leading-tight">
              {item.name}
              {item.isPopular && <span className="ml-1.5 text-xs text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded-full inline-flex align-middle">🔥</span>}
            </h4>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1 italic">
            "{item.description}"
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-lg text-gray-900 dark:text-white flex items-baseline">
              <span className="text-sm text-gray-500 mr-0.5">₹</span>{item.price}
            </span>

            <div className="h-9">
              <AnimatePresence mode="popLayout">
                {quantity === 0 ? (
                  <motion.button
                    key="add-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => isStoreOpen && onUpdate(1)}
                    disabled={!isStoreOpen}
                    className={`h-full px-5 rounded-full font-semibold text-xs sm:text-sm transition-colors ${
                      isStoreOpen 
                        ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Add
                  </motion.button>
                ) : (
                  <motion.div
                    key="qty-controls"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center bg-brand-orange text-white rounded-full h-full p-1"
                  >
                    <button 
                      onClick={() => onUpdate(-1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-5 sm:w-6 text-center font-bold font-display text-sm">{quantity}</span>
                    <button 
                      onClick={() => onUpdate(1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      className="group bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5 p-3 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-shadow"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }}
        />
        {item.isPopular && (
          <div className="absolute top-2 left-2 bg-brand-orange text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
            <span>🔥</span> Most Ordered
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow px-2 pb-2">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-display font-semibold text-gray-900 dark:text-white leading-tight">
            {item.name}
          </h4>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-grow line-clamp-2 italic">
          "{item.description}"
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-auto">
          <span className="font-bold text-lg text-gray-900 dark:text-white flex items-baseline">
            <span className="text-sm text-gray-500 mr-0.5">₹</span>{item.price}
          </span>

          <div className="h-8 sm:h-10 w-full sm:w-auto">
            <AnimatePresence mode="popLayout">
              {quantity === 0 ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isStoreOpen && onUpdate(1)}
                  disabled={!isStoreOpen}
                  className={`h-full px-3 sm:px-5 w-full sm:w-auto rounded-full font-semibold text-xs sm:text-sm transition-colors ${
                    isStoreOpen
                      ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  Add
                </motion.button>
              ) : (
                <motion.div
                  key="qty-controls"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-between sm:justify-start bg-brand-orange text-white rounded-full h-full p-1 w-full sm:w-auto"
                >
                  <button 
                    onClick={() => onUpdate(-1)}
                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
                  >
                    <Minus size={14} strokeWidth={3} />
                  </button>
                  <span className="w-6 sm:w-8 text-center font-bold font-display text-xs sm:text-base">{quantity}</span>
                  <button 
                    onClick={() => onUpdate(1)}
                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
