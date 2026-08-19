import React, { useState } from 'react';
import { Sparkles, Check, Package, MessageCircle } from 'lucide-react';
import { COLOR_SWATCHES, COMPANY_DETAILS } from '../data/products';
import { ColorSwatch } from '../types';

export const FabricAndColors: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSwatch, setActiveSwatch] = useState<ColorSwatch>(COLOR_SWATCHES[0]);

  const categories = ['All', 'Jewel & Earth', 'Pastel & Floral', 'Classic', 'Bold & Bright'];

  const filteredSwatches =
    selectedCategory === 'All'
      ? COLOR_SWATCHES
      : COLOR_SWATCHES.filter((s) => s.category === selectedCategory);

  return (
    <section id="colors" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Over 22+ Luxury Dye-Lots</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Fabric Swatches & Color Atelier
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Every roll of fabric is custom-milled in South Africa to our strict 280gsm density standards. Anti-crease, non-clinging, and opaque with rich color saturation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Color Swatch Interactive Palette */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSwatches.map((swatch) => {
            const isSelected = activeSwatch.id === swatch.id;
            return (
              <button
                key={swatch.id}
                type="button"
                onClick={() => setActiveSwatch(swatch)}
                className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-stone-800 border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-xl'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-600 hover:bg-stone-800/60'
                }`}
              >
                <div
                  className="w-full h-14 rounded-lg shadow-inner relative flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: swatch.hex }}
                >
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-stone-950/80 backdrop-blur-sm flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white truncate">{swatch.name}</h4>
                  <span className="text-[10px] text-stone-400 block mt-0.5">{swatch.category}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Swatch Spotlight & Fabric Swatch Sample Pack CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex items-center gap-4">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-2xl border-2 border-stone-700 shrink-0"
              style={{ backgroundColor: activeSwatch.hex }}
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Selected Swatch
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {activeSwatch.name}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Guaranteed matching dye-lot for all bridesmaid dresses & groomsmen ties.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 text-xs text-stone-300 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓ 280gsm Heavyweight Drape:</span>
              <span>Does not show underwear seams or cling unflatteringly.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓ 4-Way Elastic Memory:</span>
              <span>Stretches effortlessly and returns to shape without bagging.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓ Non-Crease / Wash & Wear:</span>
              <span>Pack in luggage for destination weddings with zero ironing.</span>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(`Hello! I would like to order a Fabric Swatch Sample Pack in ${activeSwatch.name} and other shades for my upcoming wedding.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase text-center transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-stone-950" />
              <span>Order Swatch Sample Pack</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(`Hello! Can I request high-resolution photos or video clips of the ${activeSwatch.name} fabric in natural daylight?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs text-center border border-stone-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Request Daylight Video</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
