import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-8 text-center bg-[#FFFDF9] dark:bg-[#111111] border-t border-gray-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Also Available on</span>
        <div className="flex items-center gap-4">
          <span className="font-display font-black text-xl text-orange-600 dark:text-orange-500 tracking-tight">SWIGGY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
          <span className="font-display font-black text-xl text-red-600 dark:text-red-500 tracking-tight italic">zomato</span>
        </div>
      </div>
    </footer>
  );
}
