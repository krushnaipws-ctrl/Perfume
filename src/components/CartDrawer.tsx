import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    freeShippingThreshold,
    freeShippingProgress,
    discountCode,
    discountAmount,
    discountError,
    applyDiscount,
    total,
    navigateTo,
    viewProduct,
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyDiscount(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#111114] border-l border-[#26262e] text-[#e8e4dc] flex flex-col justify-between h-full z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#232328] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
            <h2 className="font-serif text-xl text-[#f8f6f0] tracking-wide">
              Your Shopping Bag
            </h2>
            <span className="text-xs text-[#8e8a82] font-mono tabular-nums">
              ({cart.length})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#8e8a82] hover:text-[#f8f6f0] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#16161b] px-6 py-3 border-b border-[#232328]">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-[#c5a880] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complimentary Luxury Shipping Unlocked</span>
              </span>
            ) : (
              <span>
                Add ₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')} for Free Shipping
              </span>
            )}
            <span className="font-mono text-[10px] text-[#8e8a82]">
              {freeShippingProgress}%
            </span>
          </div>
          <div className="w-full h-1 bg-[#282832] overflow-hidden">
            <div
              className="h-full bg-[#c5a880] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#232328]">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#42424d] mx-auto stroke-[1.2]" />
              <h3 className="font-serif text-2xl text-[#f8f6f0]">Your Bag is Empty</h3>
              <p className="text-xs text-[#8e8a82] max-w-xs mx-auto leading-relaxed">
                Allow yourself the pleasure of discovering our haute fragrances, blended with rare essences in Grasse.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop', 'all');
                }}
                className="mt-4 px-6 py-3 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onClick={() => {
                    setIsCartOpen(false);
                    viewProduct(item.product.id);
                  }}
                  className="w-20 h-20 object-cover bg-[#18181d] border border-[#2a2a32] cursor-pointer shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#c5a880] truncate">
                    {item.product.collection}
                  </div>
                  <h4
                    onClick={() => {
                      setIsCartOpen(false);
                      viewProduct(item.product.id);
                    }}
                    className="font-serif text-base text-[#f8f6f0] hover:text-[#c5a880] transition-colors cursor-pointer truncate"
                  >
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-[#8e8a82] mt-0.5">
                    {item.selectedSize} · {item.product.concentration}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#2a2a32] bg-[#16161b]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[#8e8a82] hover:text-[#f8f6f0] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold tabular-nums text-[#f8f6f0]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-[#8e8a82] hover:text-[#f8f6f0] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price & Delete */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-[#f8f6f0] tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#726e67] hover:text-[#d9534f] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary Area */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#0f0f12] border-t border-[#232328] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#726e67]" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Code: SIGNATURE15"
                  className="w-full bg-[#16161b] border border-[#282832] pl-9 pr-3 py-2 text-xs text-[#f8f6f0] placeholder:text-[#555] uppercase tracking-wider focus:outline-none focus:border-[#c5a880]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-[#3b3b48] hover:border-[#c5a880] text-xs uppercase tracking-wider text-[#d0ccc4] hover:text-[#c5a880] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {discountCode && (
              <div className="flex items-center justify-between text-xs text-[#c5a880]">
                <span>Privilège Code ({discountCode}) Applied:</span>
                <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {discountError && (
              <p className="text-[11px] text-[#e06c75]">{discountError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#a8a49c] pt-2 border-t border-[#232328]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#f8f6f0] tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Shipping</span>
                <span className="font-mono text-[#f8f6f0] tabular-nums">
                  {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#f8f6f0] pt-2 border-t border-[#232328]">
                <span>Estimated Total</span>
                <span className="font-mono text-base text-[#c5a880] tabular-nums">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] font-semibold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a880]/15"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[10px] text-[#726e67] tracking-wider uppercase">
              2 Complimentary Fragrance Samples Included · Gift Boxed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
