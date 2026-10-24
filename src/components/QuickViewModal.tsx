import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    viewProduct,
  } = useShop();

  if (!quickViewProduct) return null;

  const [selectedSize, setSelectedSize] = useState<string>(quickViewProduct.defaultSize);
  const sizeObj = quickViewProduct.sizes.find((s) => s.size === selectedSize) || quickViewProduct.sizes[0];
  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleFullDetails = () => {
    const prodId = quickViewProduct.id;
    setQuickViewProduct(null);
    viewProduct(prodId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111114] border border-[#2a2a32] max-w-3xl w-full text-[#e8e4dc] z-10 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-1.5 text-[#8e8a82] hover:text-white bg-[#0c0c0e]/80 rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#18181d] overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase text-[#c5a880] bg-[#0c0c0e]/80 px-2 py-0.5 border border-[#c5a880]/20">
              {quickViewProduct.concentration}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#c5a880] mb-1">
                {quickViewProduct.collection}
              </div>
              <h3 className="font-serif text-2xl text-[#f8f6f0] mb-1">
                {quickViewProduct.name}
              </h3>
              <p className="font-serif italic text-xs text-[#a8a49c] mb-3">
                {quickViewProduct.subtitle} · {quickViewProduct.family} Family
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-[#c5a880] mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-[#c5a880] text-[#c5a880]'
                          : 'text-[#484852]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] text-[#f8f6f0]">
                  {quickViewProduct.rating.toFixed(1)} ({quickViewProduct.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="font-mono text-xl font-semibold text-[#f8f6f0] tabular-nums mb-4">
                ₹{sizeObj.price.toLocaleString('en-IN')}
              </div>

              {/* Description */}
              <p className="text-xs text-[#a8a49c] line-clamp-3 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Notes Highlight */}
              <div className="text-[11px] text-[#8e8a82] space-y-1 mb-5 p-3 bg-[#16161b] border border-[#232328]">
                <div>
                  <strong className="text-[#c5a880]">Top:</strong> {quickViewProduct.topNotes.slice(0, 3).join(', ')}
                </div>
                <div>
                  <strong className="text-[#c5a880]">Heart:</strong> {quickViewProduct.heartNotes.slice(0, 3).join(', ')}
                </div>
                <div>
                  <strong className="text-[#c5a880]">Base:</strong> {quickViewProduct.baseNotes.slice(0, 3).join(', ')}
                </div>
              </div>

              {/* Size Buttons */}
              <div className="flex gap-2 mb-6">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`flex-1 py-2 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                      selectedSize === s.size
                        ? 'border-[#c5a880] bg-[#1a1a20] text-[#f8f6f0]'
                        : 'border-[#26262e] text-[#8e8a82] hover:border-[#3d3d48]'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#232328]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, selectedSize, 1);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] font-semibold text-xs tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  aria-label="Wishlist"
                  className="p-3 border border-[#2a2a32] hover:border-[#c5a880] text-[#e8e4dc] transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#c5a880] text-[#c5a880]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleFullDetails}
                className="w-full text-center text-xs text-[#a8a49c] hover:text-[#c5a880] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Complete Olfactory Details & Pyramid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
