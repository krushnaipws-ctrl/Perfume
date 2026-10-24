import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/products';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0c0c0e]">
      {/* Background Campaign Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Élora Parfums Haute Campaign"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered luxury gradient scrim to guarantee text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/75 to-[#0c0c0e]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-[#0c0c0e]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          {/* Subtle Label */}
          <div className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#c5a880] mb-5">
            <span className="w-8 h-[1px] bg-[#c5a880]" />
            <span>The Art of Fragrance</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f8f6f0] leading-[1.12] tracking-wide mb-6">
            A Scent That Becomes Your Signature.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#d0ccc4] font-light leading-relaxed mb-10 max-w-xl">
            Discover extraordinary fragrances crafted in our Grasse ateliers to leave an unforgettable impression. Rare botanicals, aged resins, and precious flacons.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => navigateTo('shop', 'all')}
              className="group px-8 py-4 bg-[#c5a880] text-[#0a0a0b] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#d8c29d] hover:shadow-xl hover:shadow-[#c5a880]/15 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigateTo('finder')}
              className="group px-8 py-4 border border-[#484854] text-[#f8f6f0] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#c5a880] hover:text-[#c5a880] flex items-center justify-center gap-3 cursor-pointer bg-black/30 backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#c5a880]" />
              <span>Fragrance Finder</span>
            </button>
          </div>

          {/* Trust Attributes */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-[#a8a49c]">
            <div>
              <p className="text-[#f8f6f0] font-medium tracking-wider uppercase text-[11px]">
                Grasse, France
              </p>
              <p className="text-[#7e7b75] text-[11px] mt-0.5">Artisanal Extraction</p>
            </div>
            <div>
              <p className="text-[#f8f6f0] font-medium tracking-wider uppercase text-[11px]">
                25-30% Essence
              </p>
              <p className="text-[#7e7b75] text-[11px] mt-0.5">Extrait & Eau de Parfum</p>
            </div>
            <div>
              <p className="text-[#f8f6f0] font-medium tracking-wider uppercase text-[11px]">
                Artisanal Flacons
              </p>
              <p className="text-[#7e7b75] text-[11px] mt-0.5">Weighted Crystal Caps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
