import React from 'react';
import { Instagram, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const InstagramGallery: React.FC = () => {
  const { viewProduct } = useShop();

  const galleryItems = [
    {
      image: '/src/assets/images/hero_luxury_perfume_1792818896936.jpg',
      handle: '@elora_parfums',
      caption: 'The golden hour in Grasse. Amber flacon resting on warm marble.',
      productId: 'amber-noir',
    },
    {
      image: '/src/assets/images/perfume_velvet_rose_1792818898149.jpg',
      handle: '@elora_parfums',
      caption: 'Centifolia roses distilled within forty minutes of harvest.',
      productId: 'velvet-rose',
    },
    {
      image: '/src/assets/images/perfume_midnight_oud_1792818897606.jpg',
      handle: '@elora_parfums',
      caption: 'Nocturnal Cambodian agarwood aged sixteen months in oak.',
      productId: 'midnight-oud',
    },
    {
      image: '/src/assets/images/perfume_golden_saffron_1792818897304.jpg',
      handle: '@elora_parfums',
      caption: 'Seventy thousand saffron stigmas per precious kilo of absolute.',
      productId: 'golden-saffron',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#0a0a0b] text-[#e8e4dc] border-b border-[#232328]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#c5a880] mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@Elora_Parfums</span>
          </div>
          <h2 className="font-serif text-3xl text-[#f8f6f0] tracking-wide">
            Moments in Haute Parfumerie
          </h2>
          <p className="text-xs text-[#8e8a82] mt-2">
            Share your signature ritual with #EloraParfums to be featured in our private salon gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => viewProduct(item.productId)}
              className="group relative aspect-square bg-[#131317] border border-[#232328] overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <div className="text-right">
                  <Instagram className="w-4 h-4 text-[#c5a880] ml-auto" />
                </div>
                <div>
                  <p className="text-[11px] text-[#f8f6f0] line-clamp-2 font-serif italic mb-2">
                    "{item.caption}"
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#c5a880] font-medium">
                    <Eye className="w-3 h-3" />
                    <span>View Flacon</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
