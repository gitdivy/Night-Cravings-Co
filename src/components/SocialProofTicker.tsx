import React from 'react';
import { motion } from 'motion/react';

const MESSAGES = [
  "🔥 12 people ordered Maggi in the last hour",
  "🍟 Peri Peri Fries going crazy tonight",
  "🌙 Tourists' favourite after midnight",
  "🧀 Someone just ordered 4 Cheese Burgers",
  "🥤 Don't forget to hydrate",
];

export function SocialProofTicker() {
  return (
    <div className="w-full bg-brand-orange dark:bg-brand-orange/90 py-3 overflow-hidden border-y border-orange-600/20 dark:border-white/5">
      <div className="relative flex whitespace-nowrap">
        <motion.div 
          className="flex whitespace-nowrap items-center text-sm font-semibold text-white tracking-wide"
          animate={{ x: [0, -1035] }}
          transition={{ 
            ease: "linear", 
            duration: 20, 
            repeat: Infinity
          }}
        >
          {[...MESSAGES, ...MESSAGES, ...MESSAGES].map((msg, i) => (
            <span key={i} className="mx-8 flex items-center">
              {msg}
              <span className="mx-8 opacity-30 text-xs">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
