import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Signature Classic',
    'Claire Lace',
    'Classic Mesh',
    'Kiara Flare',
    'Vintage Wrap',
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (selectedCategory === 'Signature Classic') return p.id.includes('signature');
          if (selectedCategory === 'Claire Lace') return p.id.includes('claire');
          if (selectedCategory === 'Classic Mesh') return p.id.includes('mesh');
          if (selectedCategory === 'Kiara Flare') return p.id.includes('kiara');
          if (selectedCategory === 'Vintage Wrap') return p.id.includes('vintage');
          return true;
        });

  return (
    <section id="collection" className="py-16 sm:py-24 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
            <span>South African Bridal Atelier</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            The Convertible Collection
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Every gown is meticulously crafted to wrap in over 27 styles. Select your model below to customize with your bridal color, length, size, and matching bandeau.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs font-bold'
                  : 'bg-rose-50/70 text-stone-600 hover:text-stone-900 hover:bg-rose-100/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
