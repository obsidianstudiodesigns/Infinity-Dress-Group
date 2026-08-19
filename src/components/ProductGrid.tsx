import React, { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { Currency, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ currency, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Lace', 'Mesh', 'Flare', 'Wrap', 'Signature'];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="collection" className="py-16 sm:py-24 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>South African Master Atelier</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            The Trademark Collection
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Every dress is custom-tailored with our signature heavyweight non-cling stretch knit, French lace, and sweeping mesh overlays. Choose your style, color swatch, and length below.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat === 'All' ? 'All Styles' : `${cat} Collection`}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-xl bg-stone-900/80 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
              Need a Custom Dye-Lot or Specific Pantone Shade for Your Wedding?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              We manufacture on-site in South Africa and can coordinate exact matching fabric swatches for your entire wedding party, including matching groomsmen accessories.
            </p>
          </div>
          <a
            href="https://wa.me/27615107109?text=Hello%20Infinity%20Dress%20Group!%20I%20would%20like%20to%20consult%20regarding%20a%20custom%20color%20match%20for%20my%20wedding."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase border border-emerald-600/40 transition-colors"
          >
            Speak to a Color Consultant
          </a>
        </div>
      </div>
    </section>
  );
};
