import React from 'react';
import { Sparkles, ShieldCheck, Heart, ArrowRight, Star, MessageCircle } from 'lucide-react';
import { HERO_IMAGE, COMPANY_DETAILS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenBridalSuite: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenBridalSuite }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden border-b border-rose-100/60">
      {/* Full Background Wallpaper Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={HERO_IMAGE}
          alt="THE INFINITY DRESS™ GROUP - South African Manufacturer Wallpaper"
          className="w-full h-full object-cover object-center sm:object-right-top"
          referrerPolicy="no-referrer"
        />
        {/* Completely smooth, seamless dreamy blush gradient overlay without any harsh lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffafb]/95 via-[#fffafb]/85 to-transparent sm:via-[#fffafb]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left">
          {/* Soft Dreamy Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 text-rose-700 text-xs font-semibold tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>South African Trademark Manufacturer</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
            One Dress, <br />
            <span className="italic font-normal text-rose-600">
              Infinite Elegant Ways
            </span>{' '}
            to Celebrate.
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-stone-700 max-w-xl font-light leading-relaxed drop-shadow-2xs">
            Handcrafted in South Africa with heavy 280gsm non-cling stretch drape. Designed to flatter every bridesmaid from size 28 to 54 with guaranteed matching dye-lots and custom lengths.
          </p>

          {/* Quick Trust Highlights Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg text-left">
            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-rose-100 shadow-2xs">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                <span>27+ Styles in 1</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">Versatile wrap straps</p>
            </div>

            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-rose-100 shadow-2xs">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Sizes 28 to 54</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">Plus size & maternity fit</p>
            </div>

            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-rose-100 shadow-2xs col-span-2 sm:col-span-1">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                <span>SA Courier Direct</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">Door-to-door dispatch</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-rose-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenBridalSuite}
              className="px-7 py-4 rounded-full bg-white/95 hover:bg-rose-50 text-rose-900 font-bold text-xs tracking-wider uppercase border border-rose-200 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Bridal Party Group Order</span>
            </button>
          </div>

          {/* Rating Social Proof and Direct Consultation */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-700 font-medium">
                4.9 / 5.0 Rating (10,000+ Brides)
              </span>
            </div>

            <span className="hidden sm:inline text-rose-300">•</span>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like styling assistance for our bridesmaid dresses.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct WhatsApp Styling Assistance</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
