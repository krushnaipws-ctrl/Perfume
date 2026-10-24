import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      addToast(
        'Welcome to Le Cercle Élora',
        'Your invitation and 10% welcome privilege have been dispatched to your inbox.',
        'gold'
      );
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#09090b] text-[#e8e4dc] border-t border-[#1f1f24] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1f1f24] items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#f8f6f0] block">
              Élora Parfums
            </span>
            <p className="text-xs sm:text-sm text-[#a8a49c] font-light max-w-md leading-relaxed">
              Haute Parfumerie conceived in Grasse, France. Rare botanical essences, aged agarwood, and bespoke crystal flacons designed to become your indelible olfactory signature.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#111114] border border-[#232328] p-6 sm:p-8">
            <span className="text-xs uppercase tracking-[0.22em] text-[#c5a880] block mb-1">
              Privilège Newsletter
            </span>
            <h3 className="font-serif text-xl text-[#f8f6f0] mb-2">
              Receive Private Harvest Invitations
            </h3>
            <p className="text-xs text-[#8e8a82] mb-4">
              Be the first to access limited-run seasonal distillation flacons, masterclass invitations, and a 10% welcome gift.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#726e67]" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#18181e] border border-[#2b2b36] pl-10 pr-3 py-2.5 text-xs text-[#f8f6f0] placeholder:text-[#555] focus:outline-none focus:border-[#c5a880]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#c5a880] hover:bg-[#d8c29d] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 4-Column Navigation & Boutiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#1f1f24] text-xs">
          {/* Column 1: Haute Collections */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#f8f6f0] font-semibold">
              Fragrance Houses
            </h4>
            <ul className="space-y-2 text-[#8e8a82]">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  All Haute Parfums
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'women')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Women's Floral & Poetic
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'men')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Men's Sartorial Woods
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'unisex')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Unisex Boundary-Free
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'oud')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Imperial Aged Oud Flacons
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Olfactory Discovery */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#f8f6f0] font-semibold">
              Discovery & Services
            </h4>
            <ul className="space-y-2 text-[#8e8a82]">
              <li>
                <button
                  onClick={() => navigateTo('finder')}
                  className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3 h-3 text-[#c5a880]" />
                  <span>Fragrance Finder Consultation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  The Grasse Atelier Story
                </button>
              </li>
              <li>
                <span className="hover:text-[#c5a880] cursor-pointer">
                  Complimentary Tester Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-[#c5a880] cursor-pointer">
                  Crystal Flacon Refill Service
                </span>
              </li>
              <li>
                <span className="hover:text-[#c5a880] cursor-pointer">
                  Bespoke Monogramming & Seals
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#f8f6f0] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-[#8e8a82]">
              <li>Email: concierge@elora-parfums.com</li>
              <li>Telephone: +91 (0) 22 4890 1200</li>
              <li>Complimentary Dispatch on Orders ₹3,000+</li>
              <li>14-Day Flacon Return Guarantee</li>
              <li>Track Courier Dispatch</li>
            </ul>
          </div>

          {/* Column 4: Flagship Boutiques */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#f8f6f0] font-semibold">
              Global Salons
            </h4>
            <div className="space-y-2 text-[#8e8a82] text-[11px]">
              <div>
                <strong className="text-[#d0ccc4] block">Paris</strong>
                <span>18 Place Vendôme, 75001</span>
              </div>
              <div>
                <strong className="text-[#d0ccc4] block">Mumbai</strong>
                <span>Jio World Plaza, BKC, Bandra</span>
              </div>
              <div>
                <strong className="text-[#d0ccc4] block">London</strong>
                <span>42 New Bond Street, Mayfair</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#726e67]">
          <div>
            © {new Date().getFullYear()} ÉLORA PARFUMS S.A. All rights reserved. Haute Parfumerie.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#a8a49c] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#a8a49c] cursor-pointer">Terms of Luxury Sale</span>
            <span className="hover:text-[#a8a49c] cursor-pointer">Authenticity & Traceability</span>
          </div>

          <div className="flex items-center gap-4 text-[#8e8a82]">
            <a href="#" className="hover:text-[#c5a880] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
