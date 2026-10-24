import React from 'react';
import { Sparkles, Feather, Leaf, Droplets } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading Lockup */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f8f6f0] tracking-wide mb-6">
            “More Than a Fragrance. A Memory.”
          </h2>
          <p className="text-sm sm:text-base text-[#d0ccc4] font-light leading-relaxed">
            In an ephemeral world of fleeting impressions, we believe scent is the ultimate sensory anchor. It transcends geography, resurrects forgotten lovers, and imprints your soul upon eternity.
          </p>
        </div>

        {/* Magazine-Style Split: Section 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] bg-[#141418] border border-[#26262e] overflow-hidden group">
            <img
              src="/src/assets/images/perfume_amber_noir_1792818898452.jpg"
              alt="Artisanal glassmaking and fragrance aging"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-[#c5a880]">
              The Grasse Formulation Atelier · Provence
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880]">
              <Feather className="w-4 h-4" />
              <span>01. Our Story & Heritage</span>
            </div>
            <h3 className="font-serif text-3xl text-[#f8f6f0]">
              Born of Ancient Grasse Lineage
            </h3>
            <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed">
              Founded on the belief that true luxury requires patience, Élora Parfums collaborates with master perfumers who have spent decades perfecting the subtle architecture of volatile botanical molecules.
            </p>
            <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed">
              Rather than rushing trend cycles, each formula matures through a slow, cold-maceration process lasting up to four months, allowing the rarest absolutes to marry harmoniously before being poured into crystal.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid (Our Story, Art of Perfumery, Ingredients, Sustainability) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#232328]">
          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-[#f8f6f0]">The Art of Perfumery</h4>
            <p className="text-xs text-[#a8a49c] font-light leading-relaxed">
              Composed with 25% to 30% concentration of pure fragrance oils. The result is an unmatched longevity and a gradual, breathtaking evolution across morning to midnight.
            </p>
          </div>

          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-[#f8f6f0]">Our Ingredients</h4>
            <p className="text-xs text-[#a8a49c] font-light leading-relaxed">
              Centifolia roses from Grasse, wild Cambodian agarwood, Kashmiri red saffron, and sun-drenched Calabrian bergamot, gathered at the precise zenith of potency.
            </p>
          </div>

          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-[#f8f6f0]">Sustainability & Packaging</h4>
            <p className="text-xs text-[#a8a49c] font-light leading-relaxed">
              Recyclable French crystal, refillable atomizers, FSC-certified velvet coffrets, and zero single-use plastics in our shipping presentation.
            </p>
          </div>

          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-8 space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
              <Feather className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-[#f8f6f0]">The Bespoke Flacon</h4>
            <p className="text-xs text-[#a8a49c] font-light leading-relaxed">
              Substantial, weighted crystal topped with hand-finished champagne gold and gunmetal caps that produce a satisfying mechanical seal with every closure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
