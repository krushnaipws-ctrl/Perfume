import React, { useState } from 'react';
import { BookOpen, X, ArrowRight } from 'lucide-react';
import { JOURNAL_STORIES } from '../data/products';

export const FragranceJournal: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<(typeof JOURNAL_STORIES)[0] | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0b] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>The Olfactory Gazette</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f8f6f0] tracking-wide">
              The Fragrance Journal
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light max-w-md">
            Essays on rare botanicals, Grasse harvesting traditions, and the psychological architecture of signature scents.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group bg-[#121215] border border-[#232328] hover:border-[#42424e] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#c5a880] mb-3">
                  <span>{story.category}</span>
                  <span className="text-[#8e8a82] font-mono">{story.readTime}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors mb-3 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-[#a8a49c] font-light leading-relaxed mb-6">
                  {story.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#232328] flex items-center justify-between text-xs text-[#8e8a82] group-hover:text-[#f8f6f0] transition-colors">
                <span>{story.date}</span>
                <span className="flex items-center gap-1 text-[#c5a880] uppercase tracking-wider text-[11px]">
                  Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative bg-[#121215] border border-[#2a2a32] p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto text-[#e8e4dc] shadow-2xl">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-1.5 text-[#8e8a82] hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-[0.24em] text-[#c5a880] mb-2">
              {selectedStory.category} · {selectedStory.readTime}
            </div>
            <h3 className="font-serif text-3xl text-[#f8f6f0] mb-4">
              {selectedStory.title}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#d0ccc4] font-light leading-relaxed pt-4 border-t border-[#232328]">
              <p className="font-serif italic text-base text-[#c5a880]">
                "{selectedStory.excerpt}"
              </p>
              <p>{selectedStory.content}</p>
              <p>
                In our private distillation chambers, every seasonal yield is logged in handwritten leather journals detailing barometric pressure, ambient temperature, and blossom hydration levels to guarantee absolute consistency across production batches.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#232328] flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-6 py-2.5 bg-[#c5a880] text-[#0a0a0b] text-xs font-semibold uppercase tracking-wider"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
