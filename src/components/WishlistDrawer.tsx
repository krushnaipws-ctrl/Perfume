import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    viewProduct,
    navigateTo,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#111114] border-l border-[#26262e] text-[#e8e4dc] flex flex-col justify-between h-full z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#232328] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#c5a880] fill-[#c5a880]" />
            <h2 className="font-serif text-xl text-[#f8f6f0] tracking-wide">
              Saved Fragrances
            </h2>
            <span className="text-xs text-[#8e8a82] font-mono tabular-nums">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 text-[#8e8a82] hover:text-[#f8f6f0] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#232328]">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Heart className="w-12 h-12 text-[#42424d] mx-auto stroke-[1.2]" />
              <h3 className="font-serif text-2xl text-[#f8f6f0]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#8e8a82] max-w-xs mx-auto leading-relaxed">
                Save your cherished perfumes and compare olfactory pyramids at your leisure.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigateTo('shop', 'all');
                }}
                className="mt-4 px-6 py-3 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Discover Fragrances
              </button>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div key={p.id} className="py-4 flex gap-4 items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  onClick={() => {
                    setIsWishlistOpen(false);
                    viewProduct(p.id);
                  }}
                  className="w-20 h-20 object-cover bg-[#18181d] border border-[#2a2a32] cursor-pointer shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#c5a880] truncate">
                    {p.collection}
                  </div>
                  <h4
                    onClick={() => {
                      setIsWishlistOpen(false);
                      viewProduct(p.id);
                    }}
                    className="font-serif text-base text-[#f8f6f0] hover:text-[#c5a880] transition-colors cursor-pointer truncate"
                  >
                    {p.name}
                  </h4>
                  <div className="text-xs text-[#8e8a82] mt-0.5">
                    {p.defaultSize} · {p.concentration}
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#f8f6f0] mt-1 tabular-nums">
                    ₹{p.price.toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => {
                        addToCart(p, p.defaultSize, 1);
                        toggleWishlist(p);
                      }}
                      className="px-3 py-1.5 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(p)}
                      className="text-[#726e67] hover:text-[#d9534f] text-[11px] flex items-center gap-1 cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 bg-[#0f0f12] border-t border-[#232328]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p, p.defaultSize, 1));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-[#1b1b22] hover:bg-[#282832] border border-[#363644] text-[#f8f6f0] hover:text-[#c5a880] font-semibold text-xs tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Shopping Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
