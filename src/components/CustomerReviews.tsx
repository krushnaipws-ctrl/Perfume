import React from 'react';
import { Star, Check, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2">
            The Collector Voice
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide mb-3">
            Words of Devotion
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light">
            Reflections from connoisseurs and patrons who wear our flacons across Paris, London, Mumbai, and New York.
          </p>
          <span className="text-[10px] text-[#726e67] tracking-wider uppercase block mt-2">
            Demonstration client evaluations & impressions
          </span>
        </div>

        {/* 4 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121215] border border-[#232328] hover:border-[#383844] p-6 sm:p-8 flex flex-col justify-between transition-colors"
            >
              <div>
                <Quote className="w-6 h-6 text-[#c5a880]/30 mb-4" />
                <div className="flex items-center gap-1 text-[#c5a880] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c5a880]" />
                  ))}
                </div>
                <h4 className="font-serif text-base text-[#f8f6f0] mb-2 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#a8a49c] font-light leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f1f26]">
                <div className="font-medium text-xs text-[#f8f6f0]">{rev.author}</div>
                <div className="text-[11px] text-[#8e8a82] flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3 text-[#c5a880]" />
                  <span>{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
