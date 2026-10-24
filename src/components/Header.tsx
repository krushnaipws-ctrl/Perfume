import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    setIsSearchOpen,
    addToast,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' as const, category: 'all' },
    { label: 'Shop All', view: 'shop' as const, category: 'all' },
    { label: 'Women', view: 'shop' as const, category: 'women' },
    { label: 'Men', view: 'shop' as const, category: 'men' },
    { label: 'Unisex', view: 'shop' as const, category: 'unisex' },
    { label: 'Collections', view: 'shop' as const, category: 'oud' },
    { label: 'Bestsellers', view: 'shop' as const, category: 'bestsellers' },
    { label: 'Fragrance Finder', view: 'finder' as const, category: 'all' },
    { label: 'About Us', view: 'about' as const, category: 'all' },
  ];

  const handleNavClick = (view: typeof currentView, category: string = 'all') => {
    navigateTo(view, category);
    setMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    setAccountModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-[#25252b] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#e8e4dc] hover:text-[#c5a880] transition-colors"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Wordmark (Zone 1) */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.28em] font-medium text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors uppercase">
              Élora Parfums
            </span>
          </button>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.14em] uppercase text-[#a8a49c]"
          >
            {navLinks.slice(0, 8).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.category)}
                className={`transition-colors py-1 cursor-pointer hover:text-[#f8f6f0] relative ${
                  currentView === link.view && (link.category === 'all' || link.view === 'finder')
                    ? 'text-[#f8f6f0] font-medium'
                    : ''
                }`}
              >
                {link.label}
                {currentView === link.view && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('about')}
              className="transition-colors py-1 cursor-pointer hover:text-[#f8f6f0]"
            >
              About
            </button>
          </nav>

          {/* Utility Actions (Zone 3) */}
          <div className="flex items-center gap-4 sm:gap-5 text-[#e8e4dc]">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#c5a880] transition-colors relative cursor-pointer"
              aria-label="Search fragrances"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={handleAccountClick}
              className="p-1.5 hover:text-[#c5a880] transition-colors relative cursor-pointer hidden sm:block"
              aria-label="VIP Account Concierge"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Button with Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 hover:text-[#c5a880] transition-colors relative cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#c5a880] text-[#0a0a0b] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-[#c5a880] transition-colors relative cursor-pointer"
              aria-label={`Shopping bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#c5a880] text-[#0a0a0b] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#111114] border-r border-[#26262e] p-6 flex flex-col justify-between h-full z-10 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#26262e]">
                <span className="font-serif text-lg tracking-[0.25em] uppercase text-[#f8f6f0]">
                  Élora Parfums
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#a8a49c] hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.view, link.category)}
                    className="block w-full text-left py-2 text-sm uppercase tracking-[0.18em] text-[#d6d2c8] hover:text-[#c5a880] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#26262e] text-xs space-y-3 text-[#8e8a82]">
              <div className="flex items-center justify-between">
                <span>Currency</span>
                <span className="text-[#f8f6f0] font-medium">₹ INR</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Complimentary Delivery</span>
                <span className="text-[#c5a880]">Orders over ₹3,000</span>
              </div>
              <p className="text-[11px] pt-2 text-[#726e67]">
                Concierge Assistance: concierge@elora-parfums.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIP Member / Account Concierge Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121215] border border-[#2a2a32] p-8 max-w-md w-full shadow-2xl relative text-[#e8e4dc]">
            <button
              onClick={() => setAccountModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#8e8a82] hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880]">
                Maison Élora
              </span>
              <h2 className="font-serif text-2xl tracking-wide text-[#f8f6f0] mt-1">
                Le Cercle Privilège
              </h2>
              <p className="text-xs text-[#a8a49c] mt-2">
                Sign in to manage your fragrance orders, saved signature blends, and complimentary seasonal sample allocations.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAccountModalOpen(false);
                addToast('Welcome back to Le Cercle Privilège', 'VIP Member access active', 'gold');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="krushna.ipws@gmail.com"
                  required
                  className="w-full bg-[#18181d] border border-[#2c2c36] px-3 py-2.5 text-sm text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#a8a49c] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  required
                  className="w-full bg-[#18181d] border border-[#2c2c36] px-3 py-2.5 text-sm text-[#f8f6f0] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#8e8a82]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#c5a880]" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:text-[#c5a880] underline">
                  Forgot key?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#c5a880] hover:bg-[#d4b88a] text-[#0a0a0b] font-medium tracking-[0.16em] uppercase text-xs transition-colors"
              >
                Enter Privilège Account
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#24242b] text-center text-xs text-[#8e8a82]">
              Not yet a member? Orders automatically create a private collector account.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
