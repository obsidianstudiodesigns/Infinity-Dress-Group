import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, Ruler, MessageCircle, ShoppingBag, Plus, Minus } from 'lucide-react';
import { ColorSwatch, Currency, DressLength, DressSize, LengthOption, Product, ProductAddOn } from '../types';
import { CURRENCIES } from '../utils/order';
import { COLOR_SWATCHES, LENGTH_OPTIONS, STANDARD_ADD_ONS, COMPANY_DETAILS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (item: {
    productId: string;
    productName: string;
    image: string;
    color: ColorSwatch;
    size: DressSize;
    length: LengthOption;
    customMeasurements?: {
      bust?: string;
      underbust?: string;
      waist?: string;
      waistToFloor?: string;
      notes?: string;
    };
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
  currency,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const availableColorObjects = COLOR_SWATCHES.filter((c) =>
    product.availableColors.includes(c.id)
  );

  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(
    availableColorObjects[0] || COLOR_SWATCHES[0]
  );
  const [selectedSize, setSelectedSize] = useState<DressSize>('M (36-38)');
  const [selectedLength, setSelectedLength] = useState<DressLength>('maxi');
  const [activeImageSide, setActiveImageSide] = useState<'front' | 'back'>('front');
  const [quantity, setQuantity] = useState<number>(1);
  const [bridesmaidName, setBridesmaidName] = useState<string>('');

  // Custom Measurements State
  const [bust, setBust] = useState<string>('');
  const [underbust, setUnderbust] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [waistToFloor, setWaistToFloor] = useState<string>('110');
  const [fitNotes, setFitNotes] = useState<string>('');

  // Add-ons State
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currencyFormatter = CURRENCIES[currency].format;
  const currentLengthOption = LENGTH_OPTIONS[selectedLength];

  // Calculate Unit Price
  const addOnsTotalZar = selectedAddOnIds.reduce((sum, id) => {
    const addon = STANDARD_ADD_ONS.find((a) => a.id === id);
    return sum + (addon ? addon.priceZar : 0);
  }, 0);

  const customSizingFee = selectedSize === 'Custom Measurements' ? 120 : 0;
  const unitPriceZar = product.basePriceZar + currentLengthOption.priceModifierZar + addOnsTotalZar + customSizingFee;
  const totalPriceZar = unitPriceZar * quantity;

  const hasBackImage = Boolean(product.images.back);
  const currentImage = activeImageSide === 'back' && product.images.back ? product.images.back : product.images.front;

  const handleAddToCart = () => {
    const chosenAddOns = STANDARD_ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));

    onAddToCart({
      productId: product.id,
      productName: product.name,
      image: currentImage,
      color: selectedColor,
      size: selectedSize,
      length: currentLengthOption,
      customMeasurements:
        selectedSize === 'Custom Measurements'
          ? { bust, underbust, waist, waistToFloor, notes: fitNotes }
          : undefined,
      bridesmaidName: bridesmaidName.trim() || undefined,
      addOns: chosenAddOns,
      quantity,
      unitPriceZar,
      totalPriceZar,
    });
    onClose();
  };

  const handleInstantWhatsApp = () => {
    const chosenAddOns = STANDARD_ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));
    let msg = `✨ *INQUIRY / ORDER: ${product.name}*\n`;
    msg += `• *Color:* ${selectedColor.name}\n`;
    msg += `• *Size:* ${selectedSize}\n`;
    msg += `• *Length:* ${currentLengthOption.name}\n`;
    if (selectedSize === 'Custom Measurements') {
      msg += `• *Custom Sizing:* Bust: ${bust || '-'}cm, Underbust: ${underbust || '-'}cm, Waist: ${waist || '-'}cm, Length: ${waistToFloor || '-'}cm\n`;
    }
    if (chosenAddOns.length > 0) {
      msg += `• *Add-ons:* ${chosenAddOns.map((a) => a.name).join(', ')}\n`;
    }
    if (bridesmaidName) {
      msg += `• *For:* ${bridesmaidName}\n`;
    }
    msg += `• *Qty:* ${quantity}\n`;
    msg += `• *Estimated Total:* ${currencyFormatter(totalPriceZar)}\n\n`;
    msg += `Please confirm fabric availability and production timeline. Thank you!`;

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(msg)}`;
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
      id="product-customizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-900 text-stone-100 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row overflow-hidden border border-stone-800 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="md:w-1/2 bg-stone-950 flex flex-col justify-between relative min-h-[320px] md:min-h-full">
          <div className="relative w-full h-full aspect-[3/4] md:aspect-auto">
            <img
              src={currentImage}
              alt={product.images.alt}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

            {/* Front / Back Toggle Buttons */}
            {hasBackImage && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
                <div className="bg-stone-950/90 backdrop-blur-md p-1 rounded-lg border border-stone-700/80 flex gap-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => setActiveImageSide('front')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                      activeImageSide === 'front'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Front View
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageSide('back')}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                      activeImageSide === 'back'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Back Criss-Cross View
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Swatch Indicator Banner */}
          <div className="p-4 bg-stone-950 border-t border-stone-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span
                className="w-5 h-5 rounded-full border border-stone-600 shadow-sm shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="font-medium text-stone-200">
                Selected Color: <strong className="text-amber-300">{selectedColor.name}</strong>
              </span>
            </div>
            <span className="text-stone-400 text-[11px]">280gsm Heavy Lycra</span>
          </div>
        </div>

        {/* Right Column: Customizer Options */}
        <div className="md:w-1/2 p-5 sm:p-6 overflow-y-auto max-h-[80vh] md:max-h-[88vh] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-1 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Genuine South African Trademark Gown</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Step 1: Select Color Swatch */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-200">
                  1. Select Color Swatch ({availableColorObjects.length} Available)
                </label>
                <span className="text-xs text-amber-300 font-semibold">{selectedColor.name}</span>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-36 overflow-y-auto p-1.5 bg-stone-950 rounded-lg border border-stone-800">
                {availableColorObjects.map((swatch) => {
                  const isSelected = selectedColor.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColor(swatch)}
                      title={swatch.name}
                      className={`relative aspect-square rounded-md transition-all flex items-center justify-center border-2 ${
                        isSelected
                          ? 'border-amber-400 scale-110 shadow-md ring-2 ring-amber-400/40'
                          : 'border-transparent hover:border-stone-500'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 stroke-[3] ${
                            ['pure-ivory', 'champagne-nude', 'dusty-rose', 'blush-pink', 'silver-grey'].includes(
                              swatch.id
                            )
                              ? 'text-stone-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-200">
                  2. Choose Size
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  const isCustom = sz === 'Custom Measurements';
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-2.5 rounded text-xs font-semibold transition-all border text-center ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-sm'
                          : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-500'
                      } ${isCustom ? 'col-span-2 sm:col-span-4' : ''}`}
                    >
                      {sz}
                      {isCustom && <span className="ml-1 text-[10px] opacity-80">(Made to your exact cm)</span>}
                    </button>
                  );
                })}
              </div>

              {/* Custom Measurements Input Fields */}
              {selectedSize === 'Custom Measurements' && (
                <div className="mt-3 p-3.5 rounded-lg bg-stone-950 border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      Tailored Custom Sizing (Bespoke Cut)
                    </span>
                    <span className="text-[11px] text-stone-400">+R120</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Bust (cm)</label>
                      <input
                        type="number"
                        placeholder="e.g. 92"
                        value={bust}
                        onChange={(e) => setBust(e.target.value)}
                        className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Underbust (cm)</label>
                      <input
                        type="number"
                        placeholder="e.g. 80"
                        value={underbust}
                        onChange={(e) => setUnderbust(e.target.value)}
                        className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Waist (cm)</label>
                      <input
                        type="number"
                        placeholder="e.g. 74"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-stone-400 mb-1">Waist-to-Floor (cm)</label>
                      <input
                        type="number"
                        placeholder="e.g. 115"
                        value={waistToFloor}
                        onChange={(e) => setWaistToFloor(e.target.value)}
                        className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">Special fit notes (e.g. pregnancy, tall, petite)</label>
                    <input
                      type="text"
                      placeholder="Optional notes for our dressmakers"
                      value={fitNotes}
                      onChange={(e) => setFitNotes(e.target.value)}
                      className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-xs text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Dress Length */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-200 mb-2">
                3. Choose Length
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.lengths.map((lenKey) => {
                  const lenOption = LENGTH_OPTIONS[lenKey];
                  const isSelected = selectedLength === lenKey;
                  return (
                    <button
                      key={lenKey}
                      type="button"
                      onClick={() => setSelectedLength(lenKey)}
                      className={`p-2.5 rounded text-left transition-all border ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-400 ring-1 ring-amber-400/50 text-white'
                          : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-500'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{lenOption.name}</span>
                        {lenOption.priceModifierZar !== 0 && (
                          <span className={lenOption.priceModifierZar > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                            {lenOption.priceModifierZar > 0 ? `+R${lenOption.priceModifierZar}` : `-R${Math.abs(lenOption.priceModifierZar)}`}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">{lenOption.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-200 mb-2">
                4. Optional Add-ons & Matching Accessories
              </label>
              <div className="space-y-2">
                {STANDARD_ADD_ONS.map((addOn) => {
                  const isChecked = selectedAddOnIds.includes(addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-stone-800/90 border-amber-400 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="mt-0.5 rounded border-stone-600 text-amber-500 focus:ring-amber-400 focus:ring-offset-stone-900"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span>{addOn.name}</span>
                          <span className="text-amber-300">+{currencyFormatter(addOn.priceZar)}</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">{addOn.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Bridesmaid Label (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-200 mb-1">
                5. Bridesmaid Name / Label (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Kelly - Maid of Honour, Nicole - Bridesmaid"
                value={bridesmaidName}
                onChange={(e) => setBridesmaidName(e.target.value)}
                className="w-full bg-stone-950 text-xs text-white rounded-lg px-3 py-2 border border-stone-800 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Bar: Quantity, Total & Buttons */}
          <div className="pt-4 border-t border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-stone-950 p-1 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-white px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total Calculation */}
              <div className="text-right">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                  Total ({quantity} dress{quantity > 1 ? 'es' : ''})
                </span>
                <span className="text-xl font-bold text-amber-300">
                  {currencyFormatter(totalPriceZar)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Add To Cart</span>
              </button>

              <button
                type="button"
                onClick={handleInstantWhatsApp}
                className="w-full py-3 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase border border-emerald-500/50 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
