import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Promotional announcement"
      className="relative z-50 bg-[#16161a] border-b border-[#2d2d34] text-[#d4b88a] text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#a7885e]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
          <span>Haute Parfumerie</span>
        </div>

        <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] shrink-0 hidden md:inline" />
          <span>
            Discover your signature scent — complimentary shipping on qualifying orders
          </span>
          <span className="hidden lg:inline text-[#a7885e] normal-case tracking-normal">
            · Code: <strong className="text-[#f8f6f0] tracking-wider uppercase font-semibold">SIGNATURE15</strong> for 15% off
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[#8e8a82] text-[11px] tracking-widest">
            IN / ₹ INR
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="p-1 hover:text-white transition-colors cursor-pointer text-[#a7885e]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
