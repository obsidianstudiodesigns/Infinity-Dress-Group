import React from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2, XCircle, Factory, Truck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="trademark" className="py-16 sm:py-24 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold tracking-widest uppercase mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
            <span>Official Trademark Holder & Manufacturer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Why Choose THE INFINITY DRESS™ GROUP
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            We are the official trademark holder and registered manufacturer of Infinity Dresses in South Africa and worldwide. Every gown is crafted with care in our South African ateliers.
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-100/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Registered Trademark</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Legally registered and protected brand. Authentic South African design and certified quality.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-100/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Local SA Manufacturer</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tailored locally with strict quality checks, ethical workmanship, and quick turnaround times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-100/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">280gsm Heavy Knit</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Premium 4-way stretch fabric that falls in a smooth, non-clinging drape and never creases.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-100/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Door-to-Door Courier</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tracked nationwide courier directly to your door anywhere in South Africa and fast DHL worldwide.
            </p>
          </div>
        </div>

        {/* Quality Comparison Box */}
        <div className="mt-14 bg-[#fff5f7] rounded-3xl border border-rose-200 p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              The Difference: Authentic Infinity Dress™ vs Cheap Copies
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Your wedding day photos last forever. Here is why genuine construction and fabric grade make all the difference:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Infinity Dress Group Standard */}
            <div className="p-6 rounded-2xl bg-white border border-rose-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-rose-700 text-sm">
                <CheckCircle2 className="w-5 h-5 text-rose-500" />
                <span>THE INFINITY DRESS™ GROUP (Authentic)</span>
              </div>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>280gsm High-Density Drape:</strong> Fully opaque, conceals underwear seams, flattering weight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Wide Finished Sashes:</strong> Generous straps allow full back coverage and modesty styling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Dye-Lot Matching:</strong> All bridesmaids receive dresses from the exact same batch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Custom Length & Sizing:</strong> Tailored to fit heights from 1.5m to 1.9m perfectly.</span>
                </li>
              </ul>
            </div>

            {/* Cheap Copies */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-stone-600 text-sm">
                <XCircle className="w-5 h-5 text-stone-400" />
                <span>Generic Cheap Copies (Cheap Imports)</span>
              </div>
              <ul className="space-y-3 text-xs text-stone-500">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Thin 140-180gsm Polyester:</strong> See-through in sunlight, clings unflatteringly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Skimpy Narrow Straps:</strong> Roll into thin ropes that dig painfully into shoulders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Mismatched Dye Batches:</strong> Bridesmaids end up in visibly mismatched shades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>One-Size-Fits-None:</strong> Awkward bunching and inconsistent hem lengths.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Direct Contact Notice */}
        <div className="mt-10 text-center text-xs text-stone-500">
          <span>Need styling advice or direct factory assistance? Call or WhatsApp our South African headquarters at </span>
          <a href={`tel:${COMPANY_DETAILS.phoneIntl}`} className="text-rose-600 font-bold hover:underline">
            {COMPANY_DETAILS.phoneDisplay}
          </a>
          <span> or email </span>
          <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-rose-600 font-bold hover:underline">
            {COMPANY_DETAILS.email}
          </a>
        </div>
      </div>
    </section>
  );
};
