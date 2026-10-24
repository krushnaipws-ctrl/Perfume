import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Plus,
  Minus,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    viewProduct,
    addToast,
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState<string>(product.defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Delivery checker
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Active accordion/tab
  const [activeTab, setActiveTab] = useState<'olfactory' | 'craftsmanship' | 'shipping'>('olfactory');

  // Frequently bought together bundle state
  const recommendedProduct = PRODUCTS.find((p) => product.recommendedWith.includes(p.id)) || PRODUCTS[1];
  const [includeBundle, setIncludeBundle] = useState(true);

  // Current price based on size
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const currentPrice = currentSizeObj.price;
  const originalPrice = currentSizeObj.originalPrice;

  const isFavorited = isInWishlist(product.id);

  // Secondary/detail images list
  const galleryImages = [
    product.image,
    recommendedProduct.image,
    '/src/assets/images/hero_luxury_perfume_1792818896936.jpg',
  ];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 5) {
      setPincodeStatus('Please enter a valid 6-digit postal code');
      return;
    }
    setPincodeStatus('Express 48h White Glove Delivery Available to ' + pincode);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigateTo('checkout');
  };

  const handleAddBundle = () => {
    addToCart(product, selectedSize, 1);
    if (includeBundle) {
      addToCart(recommendedProduct, recommendedProduct.defaultSize, 1);
      addToast('Luxury Duo Added to Bag', `${product.name} + ${recommendedProduct.name}`, 'gold');
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-[#0a0a0b] text-[#e8e4dc] min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8e8a82] hover:text-[#c5a880] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Contiguous Purchase Module & Gallery (Split View) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 border shrink-0 overflow-hidden transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#c5a880] ring-1 ring-[#c5a880]'
                      : 'border-[#26262e] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 aspect-[4/3] sm:aspect-[4/5] bg-[#121215] border border-[#232328] overflow-hidden relative group">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle watermarked origin */}
              <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] text-[#c5a880] bg-[#0c0c0e]/80 px-2.5 py-1 backdrop-blur-sm border border-[#c5a880]/20">
                Haute Parfumerie · Grasse, France
              </div>
            </div>
          </div>

          {/* Right Column: Product Detail & Contiguous Purchase Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand & Collection Kicker */}
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#c5a880] mb-2">
                <span>Élora Parfums · {product.collection}</span>
                <span className="text-[#8e8a82]">{product.concentration}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide mb-1">
                {product.name}
              </h1>
              <p className="font-serif italic text-base text-[#c5a880] mb-4">
                {product.subtitle}
              </p>

              {/* Rating Review Summary */}
              <div className="flex items-center gap-2 mb-6 text-xs">
                <div className="flex items-center text-[#c5a880]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#c5a880] text-[#c5a880]'
                          : 'text-[#383842]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono tabular-nums text-[#f8f6f0]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#8e8a82]">·</span>
                <span className="text-[#8e8a82] hover:text-[#f8f6f0] cursor-pointer underline">
                  {product.reviewCount} Connoisseur Reviews
                </span>
              </div>

              {/* Price Display */}
              <div className="pb-6 border-b border-[#232328]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#f8f6f0] tabular-nums">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {originalPrice && (
                    <span className="font-mono text-sm text-[#737068] line-through tabular-nums">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-[#8e8a82] ml-1">
                    (Inclusive of all taxes & luxury duty)
                  </span>
                </div>
                <p className="text-xs text-[#a8a49c] mt-2 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="py-6 border-b border-[#232328]">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#a8a49c] mb-3">
                  <span>Select Flacon Volume:</span>
                  <span className="text-[#c5a880] font-medium">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 px-2 border text-center transition-all cursor-pointer ${
                        selectedSize === s.size
                          ? 'border-[#c5a880] bg-[#1a1a20] text-[#f8f6f0]'
                          : 'border-[#26262e] bg-[#121215] text-[#a8a49c] hover:border-[#3d3d48]'
                      }`}
                    >
                      <span className="block text-xs font-semibold tracking-wider uppercase mb-0.5">
                        {s.size}
                      </span>
                      <span className="block font-mono text-[11px] text-[#8e8a82] tabular-nums">
                        ₹{s.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTAs */}
              <div className="py-6 border-b border-[#232328] space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#2e2e38] bg-[#141418]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 text-[#a8a49c] hover:text-[#f8f6f0] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 font-mono text-sm font-semibold tabular-nums text-[#f8f6f0]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 text-[#a8a49c] hover:text-[#f8f6f0] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={() => addToCart(product, selectedSize, quantity)}
                    className="flex-1 py-3.5 px-6 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a880]/15"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
                  </button>

                  {/* Wishlist Toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Save to wishlist"
                    className="p-3.5 border border-[#2e2e38] bg-[#141418] hover:border-[#c5a880] text-[#e8e4dc] hover:text-[#c5a880] transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#c5a880] text-[#c5a880]' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 border border-[#424250] hover:border-[#c5a880] text-[#f8f6f0] hover:text-[#c5a880] font-medium text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer bg-black/40"
                >
                  Instant Buy Now — Express Checkout
                </button>
              </div>

              {/* Delivery Postal Code Checker */}
              <div className="py-6 border-b border-[#232328]">
                <div className="text-xs uppercase tracking-wider text-[#a8a49c] mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c5a880]" />
                  <span>Check Concierge Courier Dispatch:</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code (e.g. 400001)"
                    maxLength={6}
                    className="flex-1 bg-[#141418] border border-[#2e2e38] px-3 py-2 text-xs text-[#f8f6f0] placeholder:text-[#555] focus:outline-none focus:border-[#c5a880]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 border border-[#424250] hover:border-[#c5a880] text-xs uppercase tracking-wider text-[#f8f6f0] transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs text-[#c5a880] mt-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{pincodeStatus}</span>
                  </p>
                )}
              </div>

              {/* Guarantees Strip */}
              <div className="pt-6 grid grid-cols-2 gap-4 text-xs text-[#8e8a82]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f8f6f0] block font-medium">100% Authentic Flacon</span>
                    <span>Hand-inspected in France</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f8f6f0] block font-medium">Complimentary Sample</span>
                    <span>Test vial included with bottle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Olfactory Architecture & Story Tabs */}
        <div className="mt-20 pt-12 border-t border-[#232328]">
          <div className="flex border-b border-[#232328] mb-8">
            <button
              onClick={() => setActiveTab('olfactory')}
              className={`py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors relative cursor-pointer ${
                activeTab === 'olfactory' ? 'text-[#c5a880]' : 'text-[#8e8a82] hover:text-[#f8f6f0]'
              }`}
            >
              Olfactory Pyramid & Notes
              {activeTab === 'olfactory' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors relative cursor-pointer ${
                activeTab === 'craftsmanship' ? 'text-[#c5a880]' : 'text-[#8e8a82] hover:text-[#f8f6f0]'
              }`}
            >
              Artisan Story & Provenance
              {activeTab === 'craftsmanship' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors relative cursor-pointer ${
                activeTab === 'shipping' ? 'text-[#c5a880]' : 'text-[#8e8a82] hover:text-[#f8f6f0]'
              }`}
            >
              Packaging & Ritual
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" />
              )}
            </button>
          </div>

          {/* Tab 1: Olfactory Pyramid */}
          {activeTab === 'olfactory' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#121215] border border-[#232328] p-8">
              <div className="p-4 border-b md:border-b-0 md:border-r border-[#232328]">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
                  01. Top Notes (First 15-30 Mins)
                </span>
                <h4 className="font-serif text-xl text-[#f8f6f0] mb-3">The Awakening</h4>
                <ul className="space-y-2 text-xs text-[#d0ccc4]">
                  {product.topNotes.map((note) => (
                    <li key={note} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-b md:border-b-0 md:border-r border-[#232328]">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
                  02. Heart Notes (2-6 Hours)
                </span>
                <h4 className="font-serif text-xl text-[#f8f6f0] mb-3">The Soul & Sillage</h4>
                <ul className="space-y-2 text-xs text-[#d0ccc4]">
                  {product.heartNotes.map((note) => (
                    <li key={note} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
                  03. Base Notes (6-14+ Hours)
                </span>
                <h4 className="font-serif text-xl text-[#f8f6f0] mb-3">The Eternal Memory</h4>
                <ul className="space-y-2 text-xs text-[#d0ccc4]">
                  {product.baseNotes.map((note) => (
                    <li key={note} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Craftsmanship */}
          {activeTab === 'craftsmanship' && (
            <div className="bg-[#121215] border border-[#232328] p-8 max-w-4xl space-y-4">
              <h4 className="font-serif text-2xl text-[#f8f6f0]">The Creation Narrative</h4>
              <p className="text-sm text-[#d0ccc4] leading-relaxed font-light">
                {product.story}
              </p>
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-[#232328]">
                <div>
                  <span className="text-[#8e8a82] block">Longevity:</span>
                  <span className="text-[#f8f6f0] font-medium">{product.longevity}</span>
                </div>
                <div>
                  <span className="text-[#8e8a82] block">Sillage:</span>
                  <span className="text-[#f8f6f0] font-medium">{product.sillage}</span>
                </div>
                <div>
                  <span className="text-[#8e8a82] block">Ideal Season:</span>
                  <span className="text-[#f8f6f0] font-medium">{product.season}</span>
                </div>
                <div>
                  <span className="text-[#8e8a82] block">Emotional Aura:</span>
                  <span className="text-[#f8f6f0] font-medium">{product.mood}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Presentation */}
          {activeTab === 'shipping' && (
            <div className="bg-[#121215] border border-[#232328] p-8 max-w-4xl space-y-4 text-xs text-[#d0ccc4] leading-relaxed">
              <h4 className="font-serif text-2xl text-[#f8f6f0]">The Maison Unboxing Ritual</h4>
              <p>
                Each flacon is ensconced in our signature midnight-noir presentation box, lined with silk velvet, and sealed with embossed champagne gold foil.
              </p>
              <p>
                Complimentary 2ml discovery vials are included with every bottle. We encourage you to test the vial first; should the blend not suit your skin chemistry, unsealed full flacons may be exchanged with complimentary courier return within 14 days.
              </p>
            </div>
          )}
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="mt-16 bg-[#121215] border border-[#232328] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Maison Pairing Suggestion</span>
          </div>
          <h3 className="font-serif text-2xl text-[#f8f6f0] mb-6">Frequently Bought Together</h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover border border-[#2a2a32]"
                />
                <div>
                  <h4 className="font-serif text-sm text-[#f8f6f0]">{product.name}</h4>
                  <span className="text-xs font-mono text-[#c5a880]">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <span className="text-xl text-[#726e67] font-serif">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-16 h-16 object-cover border border-[#2a2a32]"
                />
                <div>
                  <h4 className="font-serif text-sm text-[#f8f6f0]">{recommendedProduct.name}</h4>
                  <span className="text-xs font-mono text-[#c5a880]">
                    ₹{recommendedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Total & Action */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-[#a8a49c] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBundle}
                  onChange={(e) => setIncludeBundle(e.target.checked)}
                  className="accent-[#c5a880]"
                />
                <span>Include {recommendedProduct.name}</span>
              </label>

              <button
                onClick={handleAddBundle}
                className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                Add Duo to Bag (₹{(currentPrice + (includeBundle ? recommendedProduct.price : 0)).toLocaleString('en-IN')})
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#232328]">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#c5a880] block mb-1">
                Connoisseur Impressions
              </span>
              <h3 className="font-serif text-3xl text-[#f8f6f0]">Client Reviews & Ratings</h3>
            </div>
            <div className="text-right text-xs text-[#8e8a82]">
              Verified Client Feedback · Demo Sample Showcase
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 4).map((rev) => (
              <div key={rev.id} className="bg-[#121215] border border-[#232328] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c5a880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a880]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#726e67]">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base text-[#f8f6f0]">"{rev.title}"</h4>
                <p className="text-xs text-[#d0ccc4] leading-relaxed font-light">
                  {rev.comment}
                </p>

                <div className="pt-3 border-t border-[#1f1f24] flex items-center justify-between text-[11px] text-[#8e8a82]">
                  <span className="text-[#f8f6f0]">{rev.author}</span>
                  <span className="text-[#c5a880] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase · {rev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Fragrance Recommendations */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
              Complementary Horizons
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0]">
              You May Also Appreciate
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
