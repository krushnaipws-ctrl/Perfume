import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const phrase = 'DISCOVER YOUR SIGNATURE SCENT ✦ ELEVATE EVERY MOMENT ✦ THE ART OF LUXURY FRAGRANCE ✦ HAUTE PARFUMERIE DE GRASSE ✦ ';

  return (
    <div className="relative overflow-hidden bg-[#121215] border-y border-[#25252c] py-3.5 select-none text-[#d4b88a]">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-serif text-sm tracking-[0.25em] uppercase mx-4 text-[#c5a880]/90">
          {phrase.repeat(4)}
        </span>
        <span className="font-serif text-sm tracking-[0.25em] uppercase mx-4 text-[#c5a880]/90">
          {phrase.repeat(4)}
        </span>
      </div>
    </div>
  );
};
