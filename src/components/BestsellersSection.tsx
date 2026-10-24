import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const BestsellersSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'women' | 'men' | 'unisex' | 'oud'>('bestsellers');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestseller;
    if (activeTab === 'women') return p.gender === 'women';
    if (activeTab === 'men') return p.gender === 'men';
    if (activeTab === 'unisex') return p.gender === 'unisex';
    if (activeTab === 'oud') return p.collection.toLowerCase().includes('oud');
    return true;
  });

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Parfumerie</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f8f6f0] tracking-wide">
              Coveted Signature Flacons
            </h2>
          </div>

          {/* Interactive Filter Tabs (functional segmented controls per skill guide) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141418] border border-[#232328]">
            {[
              { label: 'Bestsellers', key: 'bestsellers' },
              { label: 'All (8 Flacons)', key: 'all' },
              { label: 'Women', key: 'women' },
              { label: 'Men', key: 'men' },
              { label: 'Unisex', key: 'unisex' },
              { label: 'Luxury Oud', key: 'oud' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#c5a880] text-[#0a0a0b] font-semibold shadow-sm'
                    : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to view all in Shop */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('shop', activeTab === 'bestsellers' ? 'all' : activeTab)}
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#3b3b48] hover:border-[#c5a880] text-[#f8f6f0] hover:text-[#c5a880] text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer bg-[#111114]"
          >
            <span>Explore All Fragrances</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <div className="text-[11px] text-[#726e67] mt-3">
            Every flacon includes a matching 2ml discovery vial for risk-free home testing.
          </div>
        </div>
      </div>
    </section>
  );
};
