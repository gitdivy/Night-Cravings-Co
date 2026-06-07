import React from 'react';
import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  cartCount: number;
  onCartClick?: () => void;
  onHomeClick?: () => void;
  isStoreOpen: boolean;
}

export function Navbar({ isDarkMode, toggleDarkMode, cartCount, onCartClick, onHomeClick, isStoreOpen }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FFFDF9]/80 dark:bg-[#111111]/80 border-b border-gray-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo & Status */}
        <div className="flex flex-col cursor-pointer" onClick={onHomeClick}>
          <h1 className="font-display font-bold text-lg md:text-xl text-gray-900 dark:text-white tracking-tight">
            Night Cravings Co.
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isStoreOpen ? (
              <span className="text-[10px] md:text-xs font-semibold tracking-wider text-green-600 dark:text-green-400 uppercase">
                🟢 OPEN NOW 🌙
              </span>
            ) : (
              <span className="text-[10px] md:text-xs font-semibold tracking-wider text-red-600 dark:text-red-400 uppercase">
                🔴 CLOSED NOW
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-amber transition-colors rounded-full active:scale-95"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
          </button>

          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-amber transition-colors rounded-full active:scale-95"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-brand-orange rounded-full border-2 border-[#FFFDF9] dark:border-[#111111]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </div>
    </nav>
  );
}
