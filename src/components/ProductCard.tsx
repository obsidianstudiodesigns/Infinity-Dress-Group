import React, { useState } from 'react';
import { Eye, Sparkles, Check, Heart } from 'lucide-react';
import { Product } from '../types';
import { CURRENCIES } from '../utils/order';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [isHovered, setIsHovered] = useState(false);

  const currentImage =
    currentView === 'back' && product.images.back
      ? product.images.back
      : isHovered && product.images.back
      ? product.images.back
      : product.images.front;

  const currencyFormatter = CURRENCIES['ZAR'].format;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-rose-100/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Showcase */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-rose-50/50">
        <img
          src={currentImage}
          alt={product.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badge: Best Seller or Exclusive */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Best Seller</span>
          </div>
        )}

        {/* Front / Back Toggle Pill (if back image exists) */}
        {product.images.back && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-full p-0.5 border border-rose-100 flex items-center shadow-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentView('front');
              }}
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                currentView === 'front' ? 'bg-rose-500 text-white' : 'text-stone-600 hover:text-rose-600'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentView('back');
              }}
              className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                currentView === 'back' ? 'bg-rose-500 text-white' : 'text-stone-600 hover:text-rose-600'
              }`}
            >
              Back
            </button>
          </div>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-rose-50 text-stone-800 p-2 rounded-full shadow-md border border-rose-100 transition-transform active:scale-95"
          title="Customize & Order"
        >
          <Eye className="w-4 h-4 text-rose-600" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 uppercase tracking-wider mb-1">
            <span>{product.fabricGrade}</span>
            <span className="text-rose-600 font-semibold">{product.category}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Features Highlights */}
        <div className="pt-2 border-t border-rose-50 flex flex-wrap gap-1.5">
          {product.features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-600 bg-rose-50/80 px-2 py-0.5 rounded-full"
            >
              <Check className="w-2.5 h-2.5 text-rose-500" />
              <span>{feat}</span>
            </span>
          ))}
        </div>

        {/* Bottom Price and CTA */}
        <div className="pt-3 border-t border-rose-100/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
              From
            </span>
            <span className="font-serif text-xl font-bold text-stone-900">
              {currencyFormatter(product.basePriceZar)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(product)}
            className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-2xs hover:shadow-xs"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};
