import React from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-[#121215] border border-[#232329] transition-all duration-300 hover:border-[#42424e] hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between">
      {/* Top Media Area */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#18181c]">
        {/* Subtle Status Label (Single unboxed text tag as per anti-slop guidelines) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
          {product.isLimited && (
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c5a880] bg-[#0c0c0e]/90 px-2 py-0.5 border border-[#c5a880]/30">
              Limited Edition
            </span>
          )}
          {product.isBestseller && !product.isLimited && (
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#f8f6f0] bg-[#0c0c0e]/90 px-2 py-0.5 border border-white/20">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestseller && !product.isLimited && (
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#e2cca6] bg-[#0c0c0e]/90 px-2 py-0.5 border border-[#e2cca6]/30">
              New Flacon
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#0c0c0e]/75 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#e8e4dc] hover:text-[#c5a880] hover:scale-110 transition-all cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#c5a880] text-[#c5a880]' : ''
            }`}
          />
        </button>

        {/* Product Image with Hover Zoom */}
        <div
          onClick={() => viewProduct(product.id)}
          className="w-full h-full cursor-pointer relative"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Floating Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-3 px-3 z-20 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-[#0c0c0e]/90 backdrop-blur-md text-[#f8f6f0] hover:text-[#c5a880] text-[11px] font-medium tracking-[0.14em] uppercase border border-white/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.defaultSize, 1);
            }}
            className="flex-1 py-2 px-3 bg-[#c5a880] text-[#0a0a0b] hover:bg-[#d8c29d] text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Collection & Concentration unboxed metadata */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#8e8a82] mb-1.5">
            <span>{product.collection}</span>
            <span>{product.concentration}</span>
          </div>

          {/* Perfume Name */}
          <h3
            onClick={() => viewProduct(product.id)}
            className="font-serif text-lg sm:text-xl text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors cursor-pointer tracking-wide"
          >
            {product.name}
          </h3>

          {/* Subtitle / Olfactory Family */}
          <p className="text-xs text-[#a8a49c] italic mt-0.5 mb-2 font-serif">
            {product.subtitle} · {product.family} Olfactory
          </p>

          {/* Star Rating and Reviews (unboxed text) */}
          <div className="flex items-center gap-1.5 text-xs text-[#c5a880] mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#c5a880] text-[#c5a880]'
                      : 'text-[#484852]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#a8a49c] text-[11px] tabular-nums font-mono">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-3 border-t border-[#232329] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-semibold text-[#f8f6f0] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-[#726e67] line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#8e8a82] uppercase tracking-wider block">
              {product.defaultSize} Flacon
            </span>
          </div>

          {/* Mobile direct Add to Bag button */}
          <button
            onClick={() => addToCart(product, product.defaultSize, 1)}
            aria-label={`Add ${product.name} to bag`}
            className="sm:hidden p-2.5 bg-[#c5a880] text-[#0a0a0b] hover:bg-[#d8c29d] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
