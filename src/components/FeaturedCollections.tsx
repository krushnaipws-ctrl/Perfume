import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FeaturedCollections: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] border-b border-[#1f1f24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-3">
              Curated Universes
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide">
              Featured Fragrance Collections
            </h2>
          </div>
          <p className="text-sm text-[#a8a49c] max-w-md font-light leading-relaxed">
            From the smoldering depths of Cambodian agarwood to sunlit Mediterranean citrus gardens, explore our olfactory chapters.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, idx) => {
            // First and fourth items can have distinctive presence
            const isFeatured = idx === 0 || idx === 3;

            return (
              <div
                key={col.id}
                onClick={() => navigateTo('shop', col.categoryFilter)}
                className={`group relative overflow-hidden bg-[#131317] border border-[#25252b] hover:border-[#c5a880]/50 transition-all duration-500 cursor-pointer flex flex-col justify-end ${
                  isFeatured ? 'md:row-span-1 min-h-[360px]' : 'min-h-[320px]'
                }`}
              >
                {/* Background Image with Dark Vignette */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/70 to-[#0c0c0e]/20 group-hover:via-[#0c0c0e]/60 transition-colors" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#c5a880] mb-2">
                    {col.tagline}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f8f6f0] mb-2 group-hover:text-[#c5a880] transition-colors flex items-center justify-between">
                    <span>{col.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#c5a880]" />
                  </h3>
                  <p className="text-xs text-[#d0ccc4] font-light line-clamp-2 leading-relaxed mb-4">
                    {col.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors pt-2 border-t border-white/10">
                    <span>Shop Collection</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
