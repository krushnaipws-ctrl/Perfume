import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'family',
    title: 'Which olfactory family resonates most with you?',
    subtitle: 'The primary character that defines your fragrance soul.',
    options: [
      { label: 'Woody & Smoky', description: 'Deep cedar, aged agarwood, vetiver & resins', value: 'Woody' },
      { label: 'Floral & Poetic', description: 'Grasse roses, peony, jasmine & magnolia', value: 'Floral' },
      { label: 'Oriental & Warm', description: 'Sensual amber, spicy saffron, cardamom & myrrh', value: 'Oriental' },
      { label: 'Fresh & Aquatic', description: 'Crisp Atlantic sea salt, wild sage & driftwood', value: 'Fresh' },
      { label: 'Citrus & Solar', description: 'Calabrian bergamot, neroli & sun-kissed fruits', value: 'Citrus' },
      { label: 'Gourmand & Rich', description: 'Bourbon vanilla orchid, dark rum & toasted tonka', value: 'Gourmand' },
    ],
  },
  {
    id: 'mood',
    title: 'What emotional atmosphere do you wish to project?',
    subtitle: 'The aura that surrounds you when entering an intimate space.',
    options: [
      { label: 'Mysterious & Enigmatic', description: 'Intriguing, nocturnal, magnetic allure', value: 'Mysterious' },
      { label: 'Confident & Commanding', description: 'Authoritative, sharp, boardroom elegance', value: 'Confident' },
      { label: 'Romantic & Luminous', description: 'Graceful, tender, unforgettable charm', value: 'Romantic' },
      { label: 'Relaxed & Liberated', description: 'Clean, airy, effortless natural grace', value: 'Relaxed' },
      { label: 'Energetic & Radiant', description: 'Sparkling, vibrant, sun-drenched spirit', value: 'Energetic' },
    ],
  },
  {
    id: 'occasion',
    title: 'For which moments is this flacon destined?',
    subtitle: 'Where this signature will leave its indelible mark.',
    options: [
      { label: 'Evening Galas & Special Events', description: 'Opulent occasions demanding memorable presence', value: 'Special Events' },
      { label: 'Date Nights & Intimate Encounters', description: 'Seductive close-proximity enchantment', value: 'Date Night' },
      { label: 'Everyday Signature', description: 'Your timeless everyday olfactory identity', value: 'Everyday' },
      { label: 'Executive & Sartorial', description: 'Impeccably tailored daytime presence', value: 'Office' },
      { label: 'Haute Gifting', description: 'An extraordinary gift for someone esteemed', value: 'Gifting' },
    ],
  },
  {
    id: 'intensity',
    title: 'What level of sillage and intensity do you prefer?',
    subtitle: 'The projection strength and longevity on your skin.',
    options: [
      { label: 'Intense (Extrait de Parfum)', description: 'Maximum oil concentration, 14+ hours, fills a room', value: 'Intense' },
      { label: 'Balanced (Eau de Parfum)', description: 'Rich projection, 8-12 hours, elegant aura', value: 'Balanced' },
      { label: 'Light & Ethereal (Eau de Toilette)', description: 'Crisp, refreshing, 6-8 hours intimate wear', value: 'Light' },
    ],
  },
];

export const FragranceFinder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    family: 'Woody',
    mood: 'Mysterious',
    occasion: 'Special Events',
    intensity: 'Intense',
  });
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowResults(false);
  };

  // Smart matching algorithm
  const getMatches = (): Product[] => {
    const scored = PRODUCTS.map((prod) => {
      let score = 0;
      if (prod.family.toLowerCase() === answers.family.toLowerCase()) score += 40;
      if (prod.mood.toLowerCase().includes(answers.mood.toLowerCase())) score += 25;

      if (answers.intensity === 'Intense' && (prod.concentration === 'Extrait de Parfum' || prod.concentration === 'Eau de Parfum')) {
        score += 20;
      } else if (answers.intensity === 'Light' && (prod.concentration === 'Eau de Toilette' || prod.concentration === 'Eau de Cologne')) {
        score += 20;
      } else if (answers.intensity === 'Balanced') {
        score += 15;
      }

      if (answers.occasion === 'Special Events' && (prod.isLimited || prod.price >= 4000)) score += 15;
      if (answers.occasion === 'Everyday' && prod.price <= 3500) score += 15;

      return { prod, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((item) => item.prod);
  };

  const matchedProducts = getMatches();

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0b] relative overflow-hidden border-b border-[#232328]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Olfactory Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f8f6f0] tracking-wide">
            Find Your Signature Scent
          </h2>
          <p className="text-sm text-[#a8a49c] font-light mt-3">
            Answer four curated questions crafted by our master perfumers to discover the flacon that mirrors your individuality.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-10 shadow-2xl relative">
            {/* Progress Bar & Step Label */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#8e8a82] mb-3">
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                <span className="text-[#c5a880]">
                  {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-1 bg-[#1f1f26] overflow-hidden">
                <div
                  className="h-full bg-[#c5a880] transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Details */}
            <div className="mb-8 text-center sm:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f8f6f0] mb-2">
                {currentQuestion.title}
              </h3>
              <p className="text-xs text-[#a8a49c] font-light">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`p-5 text-left border transition-all duration-200 cursor-pointer relative group flex items-start justify-between ${
                      isSelected
                        ? 'border-[#c5a880] bg-[#1a1a20]'
                        : 'border-[#26262e] bg-[#141418] hover:border-[#3d3d48] hover:bg-[#18181e]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-base text-[#f8f6f0] group-hover:text-[#c5a880] transition-colors mb-1">
                        {opt.label}
                      </div>
                      <p className="text-xs text-[#8e8a82] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#c5a880] text-[#0a0a0b]'
                          : 'border-[#3a3a46]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-[#232328]">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase transition-colors ${
                  currentStep === 0
                    ? 'text-[#484852] cursor-not-allowed'
                    : 'text-[#a8a49c] hover:text-[#f8f6f0] cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#c5a880] text-[#0a0a0b] hover:bg-[#d8c29d] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c5a880]/10"
              >
                <span>{currentStep === QUESTIONS.length - 1 ? 'Reveal Signatures' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="bg-[#121215] border border-[#232328] p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-8 mb-8 border-b border-[#232328] gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
                  Olfactory Diagnosis
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f8f6f0]">
                  Your Tailored Signature Matches
                </h3>
                <p className="text-xs text-[#a8a49c] mt-1">
                  Profiles tuned for: <strong>{answers.family}</strong> · <strong>{answers.mood}</strong> · <strong>{answers.intensity}</strong>
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#34343d] hover:border-[#c5a880] text-xs text-[#a8a49c] hover:text-[#c5a880] tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>

            {/* Matched Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {matchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center pt-6 text-xs text-[#8e8a82]">
              All flacons include complimentary sample vials allowing you to test the fragrance on skin before unsealing the full bottle.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
