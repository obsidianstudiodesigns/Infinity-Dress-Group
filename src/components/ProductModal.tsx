import React, { useState } from 'react';
import { X, Sparkles, Check, Ruler, ShoppingBag, MessageCircle, Heart, Palette, ShieldCheck } from 'lucide-react';
import { ColorSwatch, DressSize, Product } from '../types';
import { COLOR_SWATCHES, LENGTH_OPTIONS, COMPANY_DETAILS } from '../data/products';
import { CURRENCIES } from '../utils/order';

interface ProductModalProps {
  product: Product | null;
  currency?: any;
  onClose: () => void;
  onAddToCart: (item: {
    productId: string;
    productName: string;
    image: string;
    color: ColorSwatch;
    size: DressSize;
    length: typeof LENGTH_OPTIONS['maxi'];
    addOns: any[];
    quantity: number;
    unitPriceZar: number;
    totalPriceZar: number;
  }) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.images.front);
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(COLOR_SWATCHES[0]);
  const [selectedSize, setSelectedSize] = useState<DressSize>('M (36-38)');
  const [quantity, setQuantity] = useState<number>(1);
  const [customBustWaist, setCustomBustWaist] = useState<string>('');

  const currencyFormatter = CURRENCIES['ZAR'].format;
  const standardLength = LENGTH_OPTIONS['maxi'];

  // Unit and Total Price
  const unitPrice = product.basePriceZar;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      image: product.images.front,
      color: selectedColor,
      size: selectedSize === 'Custom Measurements' && customBustWaist ? (`Custom (${customBustWaist})` as any) : selectedSize,
      length: standardLength,
      addOns: [],
      quantity,
      unitPriceZar: unitPrice,
      totalPriceZar: totalPrice,
    });
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello! I would like to order the *${product.name}*:\n\n• Selected Fabric Color: ${selectedColor.name}\n• Size: ${selectedSize === 'Custom Measurements' && customBustWaist ? `Custom (${customBustWaist})` : selectedSize}\n• Quantity: ${quantity}\n• Price: ${currencyFormatter(totalPrice)}\n\nPlease advise delivery and banking details.`;
    const url = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const sizes: DressSize[] = [
    'XS (28-30)',
    'S (32-34)',
    'M (36-38)',
    'L (40-42)',
    'XL (44-46)',
    '2XL (48-50)',
    '3XL+ (52-54)',
    'Custom Measurements',
  ];

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-stone-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-rose-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-rose-50/60 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Customize Your {product.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-rose-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh] grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Natural High-Resolution Product Image with Live Fabric Color Card */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-rose-50/40 border border-rose-100 shadow-inner group">
              {/* Natural Photograph (crisp, true-to-life colors for model, hair, and scene) */}
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Floating Dedicated Selected Fabric Swatch Card */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-rose-200/80 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm shrink-0 flex items-center justify-center ring-1 ring-stone-300"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block truncate">
                      Selected Fabric Color
                    </span>
                    <span className="text-xs font-bold text-stone-900 block truncate">
                      {selectedColor.name}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 font-medium shrink-0 flex items-center gap-1 bg-rose-50/80 px-2 py-1 rounded-md border border-rose-100">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Dye-Lot Match</span>
                </div>
              </div>
            </div>

            {/* Front / Back View Switcher */}
            {product.images.back && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImage(product.images.front)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeImage === product.images.front
                      ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold shadow-2xs'
                      : 'border-rose-100 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <span>Front View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveImage(product.images.back!)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeImage === product.images.back
                      ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold shadow-2xs'
                      : 'border-rose-100 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <span>Back View</span>
                </button>
              </div>
            )}

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
                <span>280gsm Anti-Crease Heavy Knit</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Authentic South African manufacturing with certified uniform dye-lots.
              </p>
            </div>
          </div>

          {/* Right Column: Customization (Colors & Size) */}
          <div className="md:col-span-6 space-y-6 text-xs">
            {/* 1. Color Swatches Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  1. Choose Dress Colour: <span className="text-rose-600 font-bold">{selectedColor.name}</span>
                </label>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-52 overflow-y-auto p-1.5 bg-rose-50/30 rounded-xl border border-rose-100">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = selectedColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColor(swatch)}
                      className={`h-11 rounded-lg relative flex flex-col items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-600 ring-2 ring-rose-400 scale-105 shadow-md z-10'
                          : 'border-stone-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                      <span className="text-[9px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate max-w-full px-1 mt-0.5">
                        {swatch.name.split('/')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dress Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  2. Select Size (South African)
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold text-[11px] cursor-pointer"
                >
                  <Ruler className="w-3 h-3 text-rose-500" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 px-1 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-600 text-white font-bold shadow-2xs'
                          : 'border-rose-100 bg-white text-stone-700 hover:bg-rose-50'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {selectedSize === 'Custom Measurements' && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter Bust, Waist, & Waist-to-Floor cm (e.g. 96cm, 78cm, 114cm)"
                    value={customBustWaist}
                    onChange={(e) => setCustomBustWaist(e.target.value)}
                    className="w-full bg-rose-50/50 rounded-xl px-3 py-2 text-xs text-stone-900 border border-rose-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}
            </div>

            {/* Quality Note */}
            <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 text-xs block">
                Standard Maxi Length (110cm Floor Drape)
              </span>
              <p className="text-[11px] text-stone-500">
                All dresses come standard in our classic, sweeping floor-length cut designed to wrap in over 27 styles.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-rose-50/80 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                Total Price (ZAR)
              </span>
              <span className="font-serif text-2xl font-bold text-stone-900">
                {currencyFormatter(totalPrice)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-rose-200">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-500 hover:text-stone-900 font-bold px-1"
              >
                -
              </button>
              <span className="font-bold text-stone-900 px-1 text-xs">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-500 hover:text-stone-900 font-bold px-1"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
