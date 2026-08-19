import React, { useState } from 'react';
import { Star, Eye, Sparkles, MessageCircle } from 'lucide-react';
import { Currency, Product } from '../types';
import { CURRENCIES } from '../utils/order';
import { COLOR_SWATCHES, COMPANY_DETAILS } from '../data/products';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onSelectProduct,
}) => {
  const [activeImageSide, setActiveImageSide] = useState<'front' | 'back'>('front');

  const currencyFormatter = CURRENCIES[currency].format;
  const hasBackImage = Boolean(product.images.back);
  const currentImage = activeImageSide === 'back' && product.images.back ? product.images.back : product.images.front;

  const sampleColors = COLOR_SWATCHES.filter((c) => product.availableColors.includes(c.id)).slice(0, 6);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-stone-900 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col shadow-md hover:shadow-xl"
    >
      {/* Image Showcase Container */}
      <div className="relative w-full aspect-[3/4] bg-stone-950 overflow-hidden">
        <img
          src={currentImage}
          alt={product.images.alt}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Front / Back Photo Switcher (Especially for Claire Lace Dress) */}
        {hasBackImage && (
          <div className="absolute top-3 right-3 flex items-center bg-stone-950/80 backdrop-blur-md rounded-md p-0.5 border border-stone-700/60 text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageSide('front');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeImageSide === 'front'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageSide('back');
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                activeImageSide === 'back'
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Back View
            </button>
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="w-full max-w-[200px] py-2.5 px-4 rounded bg-stone-900/90 hover:bg-stone-900 text-amber-300 border border-amber-400/50 font-semibold text-xs tracking-wider uppercase shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Eye className="w-4 h-4 text-amber-300" />
            <span>Customize Dress</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-semibold text-stone-200">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-xs text-stone-300 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Swatch Preview Dots */}
          <div className="mt-3.5 flex items-center gap-1.5">
            <span className="text-[11px] text-stone-400 mr-1">Colors:</span>
            {sampleColors.map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="w-4 h-4 rounded-full border border-stone-700 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.availableColors.length > 6 && (
              <span className="text-[10px] text-stone-400 font-medium ml-0.5">
                +{product.availableColors.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-stone-800 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-stone-400 uppercase tracking-wider block">Price from</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-amber-300">
                  {currencyFormatter(product.basePriceZar)}
                </span>
                <span className="text-xs text-stone-500 line-through">
                  {currencyFormatter(product.originalPriceZar)}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Save 15%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="w-full py-2.5 px-3 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Customize</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(`Hello! I am interested in the ${product.name}. Could you please send more information and fabric swatches?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded bg-stone-800 hover:bg-emerald-900 text-stone-200 hover:text-emerald-200 font-medium text-xs border border-stone-700 hover:border-emerald-700/60 transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
