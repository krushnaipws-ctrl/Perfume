import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product, FragranceFamily } from '../types';
import { useShop } from '../context/ShopContext';

interface ShopPageProps {
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory = 'all' }) => {
  const { viewProduct, addToCart } = useShop();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>(
    initialCategory === 'women' || initialCategory === 'men' || initialCategory === 'unisex'
      ? initialCategory
      : 'all'
  );
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedConcentration, setSelectedConcentration] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>(
    initialCategory === 'bestsellers' ? 'bestseller' : initialCategory === 'oud' ? 'oud' : 'all'
  );
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('bestseller');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const families: FragranceFamily[] = ['Woody', 'Floral', 'Oriental', 'Fresh', 'Citrus', 'Gourmand'];
  const concentrations = ['Eau de Parfum', 'Extrait de Parfum', 'Eau de Toilette', 'Eau de Cologne'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      if (
        searchTerm &&
        !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !p.topNotes.some((n) => n.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !p.heartNotes.some((n) => n.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !p.baseNotes.some((n) => n.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return false;
      }

      // Gender
      if (selectedGender !== 'all' && p.gender !== selectedGender) {
        return false;
      }

      // Family
      if (selectedFamily !== 'all' && p.family !== selectedFamily) {
        return false;
      }

      // Concentration
      if (selectedConcentration !== 'all' && p.concentration !== selectedConcentration) {
        return false;
      }

      // Availability / Special tag
      if (selectedAvailability === 'bestseller' && !p.isBestseller) return false;
      if (selectedAvailability === 'new' && !p.isNew) return false;
      if (selectedAvailability === 'limited' && !p.isLimited) return false;
      if (selectedAvailability === 'oud' && !p.collection.toLowerCase().includes('oud')) return false;

      // Price
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [
    searchTerm,
    selectedGender,
    selectedFamily,
    selectedConcentration,
    selectedAvailability,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGender('all');
    setSelectedFamily('all');
    setSelectedConcentration('all');
    setSelectedAvailability('all');
    setMaxPrice(6000);
    setSortBy('bestseller');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedGender !== 'all' ||
    selectedFamily !== 'all' ||
    selectedConcentration !== 'all' ||
    selectedAvailability !== 'all' ||
    maxPrice < 6000;

  return (
    <div className="bg-[#0a0a0b] text-[#e8e4dc] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-[#232328]">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2">
            The Haute Fragrance Collection
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f8f6f0] tracking-wide">
            Shop All Perfumes
          </h1>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light mt-2 max-w-2xl">
            Explore our curated catalog of rare olfactive masterworks, handcrafted in Grasse using ancestral enfleurage and aged essences.
          </p>
        </div>

        {/* Search, Filter Bar, Sorting, and View Toggles */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#726e67]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by perfume name, note, or resin..."
              className="w-full bg-[#141418] border border-[#2e2e38] pl-10 pr-4 py-2.5 text-xs text-[#f8f6f0] placeholder:text-[#666] focus:outline-none focus:border-[#c5a880]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#726e67] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Filter Toggle (Mobile), Sort Dropdown, View Mode */}
          <div className="flex items-center gap-3 justify-between lg:justify-end">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 border border-[#2e2e38] bg-[#141418] text-xs uppercase tracking-wider text-[#d0ccc4] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Filters {hasActiveFilters ? '•' : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8e8a82] uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#141418] border border-[#2e2e38] px-3 py-2 text-xs text-[#f8f6f0] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="bestseller">Bestsellers First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals First</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center border border-[#2e2e38] bg-[#141418]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#c5a880] text-[#0a0a0b]' : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-[#c5a880] text-[#0a0a0b]' : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Desktop Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-[#121215] border border-[#232328] p-6 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#232328]">
              <span className="text-xs uppercase tracking-[0.22em] text-[#c5a880] font-medium flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter Catalog</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#8e8a82] hover:text-[#c5a880] underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Gender / Category */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-2 font-medium">
                Olfactory Audience
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'All Creations', value: 'all' },
                  { label: "Women's Perfumes", value: 'women' },
                  { label: "Men's Perfumes", value: 'men' },
                  { label: 'Unisex Fragrances', value: 'unisex' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setSelectedGender(item.value)}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors ${
                      selectedGender === item.value
                        ? 'text-[#c5a880] bg-[#1c1c22] font-semibold'
                        : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance Family */}
            <div className="pt-4 border-t border-[#232328]">
              <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-2 font-medium">
                Fragrance Family
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedFamily('all')}
                  className={`block w-full text-left py-1 px-2 rounded-sm transition-colors ${
                    selectedFamily === 'all'
                      ? 'text-[#c5a880] bg-[#1c1c22] font-semibold'
                      : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                  }`}
                >
                  All Families
                </button>
                {families.map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors ${
                      selectedFamily === fam
                        ? 'text-[#c5a880] bg-[#1c1c22] font-semibold'
                        : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                    }`}
                  >
                    {fam}
                  </button>
                ))}
              </div>
            </div>

            {/* Concentration */}
            <div className="pt-4 border-t border-[#232328]">
              <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-2 font-medium">
                Concentration
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedConcentration('all')}
                  className={`block w-full text-left py-1 px-2 rounded-sm transition-colors ${
                    selectedConcentration === 'all'
                      ? 'text-[#c5a880] bg-[#1c1c22] font-semibold'
                      : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                  }`}
                >
                  All Concentrations
                </button>
                {concentrations.map((conc) => (
                  <button
                    key={conc}
                    onClick={() => setSelectedConcentration(conc)}
                    className={`block w-full text-left py-1 px-2 rounded-sm transition-colors ${
                      selectedConcentration === conc
                        ? 'text-[#c5a880] bg-[#1c1c22] font-semibold'
                        : 'text-[#8e8a82] hover:text-[#f8f6f0]'
                    }`}
                  >
                    {conc}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-[#232328]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#a8a49c] mb-2">
                <span>Maximum Price:</span>
                <span className="text-[#f8f6f0] font-mono tabular-nums">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={6000}
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c5a880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#726e67] font-mono mt-1">
                <span>₹2,000</span>
                <span>₹6,000</span>
              </div>
            </div>
          </aside>

          {/* Products List/Grid Section */}
          <main className="lg:col-span-3">
            {/* Active Filters Tag Strip */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#8e8a82] uppercase tracking-wider">
                Showing <strong className="text-[#f8f6f0] font-mono">{filteredProducts.length}</strong> creations
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#c5a880] hover:underline"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#121215] border border-[#232328] p-12 text-center my-8">
                <Sparkles className="w-8 h-8 text-[#c5a880] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#f8f6f0] mb-2">
                  No Flacons Match Your Exact Criteria
                </h3>
                <p className="text-xs text-[#a8a49c] max-w-md mx-auto mb-6">
                  Try adjusting the price slider or resetting olfactory family filters to discover our other masterworks.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#c5a880] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#121215] border border-[#232328] p-4 flex flex-col sm:flex-row items-center gap-6 hover:border-[#42424e] transition-colors"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => viewProduct(p.id)}
                      className="w-full sm:w-36 h-36 object-cover cursor-pointer shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#c5a880] mb-1">
                        <span>{p.collection}</span>
                        <span>·</span>
                        <span>{p.concentration}</span>
                      </div>
                      <h3
                        onClick={() => viewProduct(p.id)}
                        className="font-serif text-2xl text-[#f8f6f0] hover:text-[#c5a880] cursor-pointer"
                      >
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#a8a49c] mt-1 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="text-[11px] text-[#8e8a82] mt-2">
                        Notes: {p.topNotes.slice(0, 2).join(', ')}, {p.heartNotes.slice(0, 1).join(', ')}
                      </div>
                    </div>

                    <div className="text-right sm:border-l border-[#232328] sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                      <div className="font-mono text-xl font-semibold text-[#f8f6f0]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => addToCart(p, p.defaultSize, 1)}
                        className="mt-3 px-5 py-2.5 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#111114] border-r border-[#26262e] p-6 flex flex-col justify-between h-full z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#26262e]">
                <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#f8f6f0]">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#a8a49c] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile filter controls */}
              <div className="py-6 space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a49c] mb-2">
                    Audience
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full bg-[#18181d] border border-[#2c2c36] p-2 text-xs text-[#f8f6f0]"
                  >
                    <option value="all">All Audiences</option>
                    <option value="women">Women's Perfumes</option>
                    <option value="men">Men's Perfumes</option>
                    <option value="unisex">Unisex Fragrances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a49c] mb-2">
                    Fragrance Family
                  </label>
                  <select
                    value={selectedFamily}
                    onChange={(e) => setSelectedFamily(e.target.value)}
                    className="w-full bg-[#18181d] border border-[#2c2c36] p-2 text-xs text-[#f8f6f0]"
                  >
                    <option value="all">All Families</option>
                    {families.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a49c] mb-2">
                    Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min={2000}
                    max={6000}
                    step={250}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-[#c5a880] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider"
            >
              Apply ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
