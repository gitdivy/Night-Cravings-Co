import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getCartTotal } from '../lib/cart';
import { MenuItem, Combo } from '../data';

interface CartFabProps {
  cartCount: number;
  cart: Record<string, number>;
  onCheckout: () => void;
  globalMenuItems: MenuItem[];
  globalCombos: Combo[];
}

export function CartFab({ cartCount, cart, onCheckout, globalMenuItems, globalCombos }: CartFabProps) {
  if (cartCount === 0) return null;

  const total = getCartTotal(cart, globalMenuItems, globalCombos);

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <button
            onClick={onCheckout}
            className="pointer-events-auto flex items-center justify-between w-full max-w-sm bg-brand-orange text-white px-5 py-4 rounded-full shadow-[0_8px_30px_rgba(255,90,0,0.3)] hover:bg-orange-600 active:scale-95 transition-all group overflow-hidden relative"
          >
            {/* Pulse effect background */}
            <span className="absolute inset-0 rounded-full animate-ping bg-brand-orange/40 opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '2s' }} />

            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/20 px-3 py-1 rounded-full font-bold font-display text-sm">
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <span className="font-semibold tracking-wide">Review Cravings 🌙</span>
              <span className="font-bold text-lg font-display bg-white/20 px-3 py-1 rounded-full">
                ₹{total}
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
