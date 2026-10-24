import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How should I apply haute fragrance to achieve maximum longevity?',
    a: 'Apply to warm pulse points where blood flows closest to the skin: the base of the throat, wrists, inner elbows, and behind the ears. Never rub your wrists together after spraying, as this breaks down fragile top-note volatile molecules and alters the fragrance drydown.',
  },
  {
    q: 'What is the distinction between Extrait de Parfum and Eau de Parfum?',
    a: 'Extrait de Parfum possesses our highest concentration of pure aromatic oils (25-30%), offering a deep, intimate, and narcotic sillage that lasts 14+ hours. Eau de Parfum features 18-22% fragrance oils, providing a balanced radiance ideal for everyday elegance.',
  },
  {
    q: 'How does your complimentary sample guarantee work?',
    a: 'Every 50ml and 100ml flacon arrives with a complimentary matching 2ml discovery vial. You are encouraged to test the vial first on clean skin. If you find the composition does not match your personal chemistry, you may return the unopened, sealed full-size flacon within 14 days for a full refund or exchange.',
  },
  {
    q: 'Are Élora flacons refillable?',
    a: 'Yes. In alignment with our commitment to French crystal preservation, all our standard flacons feature threaded pump collars that can be replenished indefinitely at any Élora Parfums boutique fragrance fountain or via our online refill cartridges.',
  },
  {
    q: 'How should I preserve and store my fragrance flacons?',
    a: 'Fragrance oils are sensitive to intense UV light and extreme temperature fluctuations. Store your flacon in a cool, dry setting away from direct sunlight—ideally within its original presentation box or a darkened dressing vanity.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2 flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Haute Advice & Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide">
            Frequently Inquired Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121215] border border-[#232328] transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-[#f8f6f0] hover:text-[#c5a880] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#c5a880] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed border-t border-[#1f1f26] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
