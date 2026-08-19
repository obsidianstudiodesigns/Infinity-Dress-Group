import React, { useState } from 'react';
import { X, Sparkles, Check, Ruler, ShoppingBag, MessageCircle, Heart } from 'lucide-react';
import { ColorSwatch, DressLength, DressSize, LengthOption, Product, ProductAddOn } from '../types';
import { COLOR_SWATCHES, LENGTH_OPTIONS, STANDARD_ADD_ONS, COMPANY_DETAILS } from '../data/products';
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
    length: LengthOption;
    bridesmaidName?: string;
    addOns: ProductAddOn[];
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
  const [selectedLengthKey, setSelectedLengthKey] = useState<DressLength>('maxi');
  const [selectedAddOns, setSelectedAddOns] = useState<ProductAddOn[]>([]);
  const [bridesmaidName, setBridesmaidName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customBustWaist, setCustomBustWaist] = useState<string>('');

  const currencyFormatter = CURRENCIES['ZAR'].format;
  const currentLength = LENGTH_OPTIONS[selectedLengthKey];

  // Calculate Unit Price
  const addOnsTotal = selectedAddOns.reduce((acc, a) => acc + a.priceZar, 0);
  const unitPrice = product.basePriceZar + currentLength.priceModifierZar + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: ProductAddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      image: product.images.front,
      color: selectedColor,
      size: selectedSize === 'Custom Measurements' && customBustWaist ? (`Custom (${customBustWaist})` as any) : selectedSize,
      length: currentLength,
      bridesmaidName: bridesmaidName.trim() || undefined,
      addOns: selectedAddOns,
      quantity,
      unitPriceZar: unitPrice,
      totalPriceZar: totalPrice,
    });
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello! I would like to order the *${product.name}*:\n\n• Color: ${selectedColor.name}\n• Size: ${selectedSize}\n• Length: ${currentLength.name}\n${bridesmaidName ? `• For: ${bridesmaidName}\n` : ''}${selectedAddOns.length ? `• Add-ons: ${selectedAddOns.map((a) => a.name).join(', ')}\n` : ''}• Quantity: ${quantity}\n• Price: ${currencyFormatter(totalPrice)}\n\nPlease advise delivery and banking details.`;
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
        className="relative bg-white text-stone-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-rose-100 shadow-2xl my-auto"
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
          {/* Left Column: Image Previews */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-rose-50/40 border border-rose-100">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-xs"
                style={{ backgroundColor: selectedColor.hex }}
              >
                {selectedColor.name}
              </div>
            </div>

            {/* Thumbnail Switcher */}
            {product.images.back && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImage(product.images.front)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.images.front
                      ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
                      : 'border-rose-100 bg-white text-stone-600 hover:border-rose-300'
                  }`}
                >
                  <span>Front View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveImage(product.images.back!)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.images.back
                      ? 'border-rose-500 bg-rose-50 text-rose-800 font-bold'
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
                No ironing required. Flattering opacity and drape guaranteed.
              </p>
            </div>
          </div>

          {/* Right Column: Customization Options */}
          <div className="md:col-span-7 space-y-5 text-xs">
            {/* 1. Color Swatches Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  1. Choose Color Swatch: <span className="text-rose-600 font-semibold">{selectedColor.name}</span>
                </label>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-28 overflow-y-auto p-1 bg-rose-50/30 rounded-lg border border-rose-100">
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = selectedColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColor(swatch)}
                      className={`h-9 rounded-md relative flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'border-rose-600 ring-2 ring-rose-300 scale-105 shadow-xs'
                          : 'border-stone-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dress Length */}
            <div>
              <label className="block font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                2. Select Length (Waist-to-Hem)
              </label>

              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(LENGTH_OPTIONS) as [DressLength, LengthOption][]).map(([key, opt]) => {
                  const isSelected = selectedLengthKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedLengthKey(key)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/80 text-rose-900 ring-1 ring-rose-400'
                          : 'border-rose-100 bg-white text-stone-700 hover:border-rose-300'
                      }`}
                    >
                      <div className="font-bold">{opt.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5 flex items-center justify-between">
                        <span>{opt.description}</span>
                        {opt.priceModifierZar > 0 && (
                          <span className="text-rose-600 font-semibold">
                            +{currencyFormatter(opt.priceModifierZar)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Dress Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  3. Select Size (South African)
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold text-[11px]"
                >
                  <Ruler className="w-3 h-3 text-rose-500" />
                  <span>Size Chart / Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-1 rounded-lg border text-center font-medium transition-all ${
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
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter Bust, Waist, & Waist-to-Floor cm (e.g. 96cm, 78cm, 114cm)"
                    value={customBustWaist}
                    onChange={(e) => setCustomBustWaist(e.target.value)}
                    className="w-full bg-rose-50/50 rounded-lg px-3 py-2 text-xs text-stone-900 border border-rose-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}
            </div>

            {/* 4. Bridesmaid Name Tag (Optional) */}
            <div>
              <label className="block font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-1">
                4. Bridesmaid Name / Label (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah - Maid of Honor"
                value={bridesmaidName}
                onChange={(e) => setBridesmaidName(e.target.value)}
                className="w-full bg-white rounded-lg px-3 py-2 text-xs text-stone-900 border border-rose-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* 5. Add-Ons Selection */}
            <div>
              <label className="block font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                5. Matching Accessories & Add-Ons
              </label>

              <div className="space-y-1.5">
                {STANDARD_ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-rose-400 bg-rose-50/70 text-rose-900'
                          : 'border-rose-100 bg-white text-stone-700 hover:bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddOn(addon)}
                          className="rounded text-rose-600 focus:ring-rose-400 border-stone-300"
                        />
                        <div>
                          <div className="font-semibold text-stone-900">{addon.name}</div>
                          <div className="text-[10px] text-stone-500">{addon.description}</div>
                        </div>
                      </div>
                      <span className="font-bold text-rose-600">
                        +{currencyFormatter(addon.priceZar)}
                      </span>
                    </label>
                  );
                })}
              </div>
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
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-rose-200">
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
