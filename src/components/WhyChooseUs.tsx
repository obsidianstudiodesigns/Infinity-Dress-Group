import React from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, XCircle, Factory, Truck, HeartHandshake } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="trademark" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Trademark Holder & Manufacturer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Why Choose THE INFINITY DRESS™ GROUP
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            We are the official trademark holder and registered manufacturer of Infinity Dresses in South Africa and worldwide. Do not settle for thin, clingy imitations for your wedding day.
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Official Trademark Holder</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Legally registered and protected trademark. When you buy from us, you receive genuine, certified South African craftsmanship.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">South African Factory</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every dress is tailored directly in our local ateliers with strict quality checks, fair labor practices, and fast turnaround.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">280gsm Non-Cling Fabric</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Custom-milled high-density 4-way stretch that creates a smooth drape, conceals underwear lines, and never creases in transit.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Door-to-Door & Worldwide</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tracked courier directly to your door anywhere in South Africa (Courier Guy / PostNet) and DHL Express to international destinations.
            </p>
          </div>
        </div>

        {/* Comparison Table: Genuine vs Cheap Copies */}
        <div className="mt-16 bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-white">
              The Difference: Genuine Infinity Dress™ vs. Cheap Market Copies
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Your wedding photos last a lifetime. Here is why fabric grade and construction matter:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Infinity Dress Group Standard */}
            <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-600/40 space-y-4">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>THE INFINITY DRESS™ GROUP (Authentic)</span>
              </div>
              <ul className="space-y-3 text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>280gsm High-Density Knit:</strong> Luxurious heavy drape, fully opaque, non-cling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Wide & Long Finished Sashes:</strong> Generous straps allow full back coverage & modesty wraps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Batch Color Matching:</strong> All bridesmaids receive dresses from the identical dye-lot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Custom Length & Sizing:</strong> Tailored to fit heights from 1.5m to 1.9m perfectly.</span>
                </li>
              </ul>
            </div>

            {/* Cheap Imitation */}
            <div className="p-6 rounded-xl bg-red-950/20 border border-red-800/40 space-y-4">
              <div className="flex items-center gap-2 font-bold text-red-300 text-sm">
                <XCircle className="w-5 h-5 text-red-400" />
                <span>Generic Cheap Copies (Cheap Imports)</span>
              </div>
              <ul className="space-y-3 text-xs text-stone-400">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Thin 140-180gsm Polyester:</strong> See-through in sunlight, clings to cellulite and seams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Short Skimpy Straps:</strong> Narrow sashes that roll into ropes and dig into shoulders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Mismatched Dye Batches:</strong> Bridesmaids end up in slightly different shades of color.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>One-Size-Fits-None:</strong> Awkward bunching, either dragging on floor or floating above ankles.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Direct Contact Banner */}
        <div className="mt-12 text-center text-xs text-stone-400">
          <span>Need direct factory assistance? Call or WhatsApp our South African headquarters at </span>
          <a href={`tel:${COMPANY_DETAILS.phoneIntl}`} className="text-amber-300 font-bold hover:underline">
            {COMPANY_DETAILS.phoneDisplay}
          </a>
          <span> or email </span>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-amber-300 font-bold hover:underline">
            {COMPANY_DETAILS.email}
          </a>
        </div>
      </div>
    </section>
  );
};
