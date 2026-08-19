import React from 'react';
import { Sparkles, MessageCircle, ArrowDown, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { landingHeroImg, COMPANY_DETAILS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenBridalSuite: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenBridalSuite }) => {
  return (
    <section className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Image Container with Optical Gradient Framing */}
      <div className="relative w-full h-[640px] sm:h-[720px] lg:h-[820px] max-h-[90vh]">
        <img
          src={landingHeroImg}
          alt="THE INFINITY DRESS GROUP official South African collection featuring three emerald green infinity dress styles in luxury atelier"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Multi-layered Vignette & Darkening Gradients for Pristine Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/40 to-transparent lg:w-3/4" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
            <div className="max-w-2xl">
              {/* Official Trademark Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm shadow-md">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>The Proud Trademark Holder</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-white">
                The Original <br />
                <span className="text-amber-300 font-normal italic">Infinity Dress™</span> <br />
                In South Africa & Worldwide
              </h1>

              {/* Subtitle & Value Proposition */}
              <p className="mt-5 text-base sm:text-lg text-stone-200 leading-relaxed font-light">
                Hand-tailored in our South African factory using our exclusive 280gsm 4-way stretch fabric, French lace, and airy mesh overlays. <strong className="font-semibold text-white">One dress — over 27 ways to wrap</strong>. Flattering every body type from sizes 28 to 54.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="px-7 py-3.5 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-400/20 flex items-center justify-center gap-2 group"
                >
                  <span>Shop The Collection</span>
                  <ArrowDown className="w-4 h-4 text-stone-950 group-hover:translate-y-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenBridalSuite}
                  className="px-6 py-3.5 rounded bg-emerald-800/90 hover:bg-emerald-700 text-white font-semibold text-sm tracking-wider uppercase border border-emerald-500/50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Bridal Party Suite (Discounts)</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses from THE INFINITY DRESS™ GROUP.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-medium text-sm border border-stone-700/70 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Factory</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Made in SA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24+ Color Swatches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sizes 28 - 54 + Custom</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Worldwide Tracked Courier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Ribbon Beneath Hero */}
      <div className="bg-stone-900 border-y border-stone-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center text-xs sm:text-sm text-stone-300">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">Registered Trademark</span>
            <span className="text-stone-400">Authenticity Guarantee</span>
          </div>
          <div className="hidden sm:inline text-stone-600">|</div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">280gsm</span>
            <span className="font-medium text-white">Heavy Drape Fabric</span>
            <span className="text-stone-400">(Non-Cling, Non-Crease)</span>
          </div>
          <div className="hidden md:inline text-stone-600">|</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">27+ Styles</span>
            <span className="font-medium text-white">In One Gown</span>
            <span className="text-stone-400">Tutorial Included</span>
          </div>
          <div className="hidden lg:inline text-stone-600">|</div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Bulk Discounts</span>
            <span className="font-medium text-white">10% - 15% Off</span>
            <span className="text-stone-400">for Bridal Parties</span>
          </div>
        </div>
      </div>
    </section>
  );
};
