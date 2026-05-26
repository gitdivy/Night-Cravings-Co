import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden w-full pt-16 pb-20 md:pt-24 md:pb-32 px-4 flex flex-col items-center text-center">
      
      {/* Background glow effects for late-night vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-orange/20 dark:bg-brand-orange/10 blur-[100px] rounded-full point-events-none -mr-40" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-amber-500/20 dark:bg-amber-500/10 blur-[80px] rounded-full point-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange dark:text-brand-amber text-xs font-semibold uppercase tracking-widest mb-6">
          Late Night Fix
        </span>
        
        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-4 max-w-2xl text-gray-900 dark:text-white">
          Midnight hunger has <span className="text-brand-orange dark:text-brand-amber">entered the chat.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-md font-medium">
          Fresh late-night food delivered fast. Sleep is temporary. Fries are forever.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToMenu}
          className="group relative inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,90,0,0.3)] transition-all duration-300 overflow-hidden"
        >
          {/* Subtle button gleam */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <span className="relative z-10 text-xl">🍔</span>
          <span className="relative z-10">Feed Me</span>
          <ChevronRight size={20} className="relative z-10 opacity-70 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
}
