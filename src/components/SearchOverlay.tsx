import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, viewProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularKeywords = ['Midnight Oud', 'Rose', 'Vanilla', 'Amber', 'Saffron', 'Citrus'];

  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.family.toLowerCase().includes(query) ||
          p.topNotes.some((n) => n.toLowerCase().includes(query)) ||
          p.heartNotes.some((n) => n.toLowerCase().includes(query)) ||
          p.baseNotes.some((n) => n.toLowerCase().includes(query))
        );
      })
    : [];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    viewProduct(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0c]/98 backdrop-blur-xl text-[#e8e4dc] transition-all">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between border-b border-[#232328]">
        <span className="font-serif text-sm tracking-[0.25em] uppercase text-[#c5a880]">
          Maison Élora Search
        </span>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 text-[#8e8a82] hover:text-[#f8f6f0] transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input Box */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#c5a880]" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by perfume name, olfactive notes, or ingredients..."
            className="w-full bg-[#141418] border border-[#2e2e38] pl-14 pr-10 py-4 text-base sm:text-lg text-[#f8f6f0] placeholder:text-[#666] focus:outline-none focus:border-[#c5a880] font-light"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8a82] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular searches suggestions */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#8e8a82] tracking-wider uppercase text-[11px] mr-1">
            Trending Searches:
          </span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchTerm(kw)}
              className="px-3 py-1 bg-[#18181e] border border-[#282830] hover:border-[#c5a880] text-[#a8a49c] hover:text-[#f8f6f0] transition-colors cursor-pointer text-xs"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-16 text-[#8e8a82]">
            <p className="font-serif text-2xl text-[#f8f6f0] mb-2">No Fragrances Found</p>
            <p className="text-xs">
              Try searching for notes like "Oud", "Saffron", "Rose", or "Amber".
            </p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8e8a82] mb-6">
              Found {searchResults.length} matching creations:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="group bg-[#121215] border border-[#232328] hover:border-[#c5a880] p-4 flex gap-4 cursor-pointer transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover border border-[#232328] group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block truncate">
                      {product.collection}
                    </span>
                    <h4 className="font-serif text-lg text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#8e8a82] mt-0.5">
                      {product.concentration} · {product.family}
                    </p>
                    <div className="font-mono text-xs font-semibold text-[#f8f6f0] mt-1 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#726e67] group-hover:text-[#c5a880] group-hover:translate-x-1 transition-all self-center" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
