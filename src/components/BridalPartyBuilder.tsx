import React, { useState } from 'react';
import { Sparkles, UserPlus, Trash2, CheckCircle2, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { BridalPartyMember, ColorSwatch, DressLength, DressSize, LengthOption, ProductAddOn } from '../types';
import { COLOR_SWATCHES, LENGTH_OPTIONS, PRODUCTS, STANDARD_ADD_ONS, COMPANY_DETAILS } from '../data/products';
import { CURRENCIES } from '../utils/order';

interface BridalPartyBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: any;
  onAddAllToCart: (items: Array<{
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
  }>) => void;
}

export const BridalPartyBuilder: React.FC<BridalPartyBuilderProps> = ({
  isOpen,
  onClose,
  onAddAllToCart,
}) => {
  if (!isOpen) return null;

  const [brideName, setBrideName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [themeColorId, setThemeColorId] = useState('blush-pink');

  const [members, setMembers] = useState<BridalPartyMember[]>([
    {
      id: '1',
      name: 'Sarah (Maid of Honor)',
      role: 'Maid of Honor',
      productId: 'signature-infinity-dress',
      colorId: 'blush-pink',
      size: 'M (36-38)',
      length: 'maxi',
      includeBandeau: true,
      notes: '',
    },
    {
      id: '2',
      name: 'Jessica (Bridesmaid)',
      role: 'Bridesmaid',
      productId: 'signature-infinity-dress',
      colorId: 'blush-pink',
      size: 'S (32-34)',
      length: 'maxi',
      includeBandeau: false,
      notes: '',
    },
    {
      id: '3',
      name: 'Thandi (Bridesmaid)',
      role: 'Bridesmaid',
      productId: 'signature-infinity-dress',
      colorId: 'blush-pink',
      size: 'L (40-42)',
      length: 'maxi',
      includeBandeau: true,
      notes: '',
    },
  ]);

  const currencyFormatter = CURRENCIES['ZAR'].format;

  const addMember = () => {
    const newId = (members.length + 1).toString();
    setMembers([
      ...members,
      {
        id: newId,
        name: `Bridesmaid #${members.length + 1}`,
        role: 'Bridesmaid',
        productId: 'signature-infinity-dress',
        colorId: themeColorId,
        size: 'M (36-38)',
        length: 'maxi',
        includeBandeau: false,
        notes: '',
      },
    ]);
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers(members.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, updates: Partial<BridalPartyMember>) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  // Bulk Discount calculation
  const totalDresses = members.length;
  let discountRate = 0;
  if (totalDresses >= 8) {
    discountRate = 0.15;
  } else if (totalDresses >= 5) {
    discountRate = 0.10;
  }

  // Calculate Subtotal
  let rawSubtotalZar = 0;
  const computedItems = members.map((m) => {
    const product = PRODUCTS.find((p) => p.id === m.productId) || PRODUCTS[0];
    const color = COLOR_SWATCHES.find((c) => c.id === m.colorId) || COLOR_SWATCHES[0];
    const lengthOpt = LENGTH_OPTIONS[m.length];

    const addOns: ProductAddOn[] = [];
    if (m.includeBandeau) {
      const bandeau = STANDARD_ADD_ONS.find((a) => a.id === 'matching-bandeau');
      if (bandeau) addOns.push(bandeau);
    }

    const addOnsTotal = addOns.reduce((acc, a) => acc + a.priceZar, 0);
    const unitPrice = product.basePriceZar + lengthOpt.priceModifierZar + addOnsTotal;
    rawSubtotalZar += unitPrice;

    return {
      productId: product.id,
      productName: product.name,
      image: product.images.front,
      color,
      size: m.size,
      length: lengthOpt,
      bridesmaidName: m.name,
      addOns,
      quantity: 1,
      unitPriceZar: unitPrice,
      totalPriceZar: unitPrice,
    };
  });

  const discountAmountZar = Math.round(rawSubtotalZar * discountRate);
  const finalTotalZar = rawSubtotalZar - discountAmountZar;

  const handleApplyToCart = () => {
    onAddAllToCart(computedItems);
    onClose();
  };

  const handleWhatsAppBridalParty = () => {
    let msg = `💍 *BRIDAL PARTY GROUP ORDER — ${COMPANY_DETAILS.name}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    if (brideName) msg += `👰 *Bride / Organizer:* ${brideName}\n`;
    if (weddingDate) msg += `📅 *Wedding Date:* ${weddingDate}\n`;
    msg += `👥 *Total Bridesmaids:* ${members.length}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    members.forEach((m, idx) => {
      const prod = PRODUCTS.find((p) => p.id === m.productId) || PRODUCTS[0];
      const col = COLOR_SWATCHES.find((c) => c.id === m.colorId) || COLOR_SWATCHES[0];
      msg += `*${idx + 1}. ${m.name}*\n`;
      msg += `   👗 *Dress:* ${prod.name}\n`;
      msg += `   🎨 *Color:* ${col.name}\n`;
      msg += `   📏 *Size:* ${m.size} | *Length:* ${LENGTH_OPTIONS[m.length].name}\n`;
      if (m.includeBandeau) msg += `   ➕ *Includes Matching Bandeau/Tube Top*\n`;
      if (m.notes) msg += `   📝 *Note:* ${m.notes}\n`;
      msg += `\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *Subtotal:* ${currencyFormatter(rawSubtotalZar)}\n`;
    if (discountAmountZar > 0) {
      msg += `🎉 *Bridal Party Discount (${discountRate * 100}% off):* -${currencyFormatter(discountAmountZar)}\n`;
    }
    msg += `✨ *Estimated Total:* *${currencyFormatter(finalTotalZar)}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🇿🇦 South African Factory Dispatch with guaranteed dye-lot matching.`;

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
      id="bridal-suite-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-stone-800 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-rose-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Coordinated Bridal Suite</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Bridal Party Group Order Builder
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Configure each bridesmaid’s individual size, length, and style in one synchronized order with guaranteed matching dye-lots.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-rose-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Wedding Meta Bar */}
        <div className="p-4 bg-rose-50/40 border-b border-rose-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">Bride / Organizer Name</label>
            <input
              type="text"
              placeholder="e.g. Jessica Smith"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Wedding Date</label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Theme Color Preset</label>
            <select
              value={themeColorId}
              onChange={(e) => {
                setThemeColorId(e.target.value);
                setMembers(members.map((m) => ({ ...m, colorId: e.target.value })));
              }}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none text-xs"
            >
              {COLOR_SWATCHES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Discount Alert Banner */}
        <div className="px-5 py-2.5 bg-rose-100/60 border-b border-rose-200 flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-600" />
            <span>
              <strong>Bridal Savings:</strong> 5+ dresses = 10% OFF | 8+ dresses = 15% OFF!
            </span>
          </div>
          <span className="font-bold text-rose-700">
            {discountRate > 0 ? `${discountRate * 100}% Discount Applied` : `${5 - totalDresses} more for 10% OFF`}
          </span>
        </div>

        {/* Bridesmaid List */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[50vh] space-y-4">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-rose-50/30 border border-rose-100 space-y-3 relative group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, { name: e.target.value })}
                    className="bg-transparent font-bold text-sm text-stone-900 border-b border-transparent focus:border-rose-500 focus:outline-none px-1"
                    placeholder="Enter name (e.g. Sarah - MOH)"
                  />
                </div>

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                    title="Remove bridesmaid"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* Dress Style */}
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1 font-semibold">Dress Model</label>
                  <select
                    value={member.productId}
                    onChange={(e) => updateMember(member.id, { productId: e.target.value })}
                    className="w-full bg-white rounded-lg p-2 text-stone-900 border border-rose-200"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1 font-semibold">Color Swatch</label>
                  <select
                    value={member.colorId}
                    onChange={(e) => updateMember(member.id, { colorId: e.target.value })}
                    className="w-full bg-white rounded-lg p-2 text-stone-900 border border-rose-200"
                  >
                    {COLOR_SWATCHES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1 font-semibold">Size</label>
                  <select
                    value={member.size}
                    onChange={(e) => updateMember(member.id, { size: e.target.value as DressSize })}
                    className="w-full bg-white rounded-lg p-2 text-stone-900 border border-rose-200"
                  >
                    {sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Length */}
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1 font-semibold">Length</label>
                  <select
                    value={member.length}
                    onChange={(e) => updateMember(member.id, { length: e.target.value as DressLength })}
                    className="w-full bg-white rounded-lg p-2 text-stone-900 border border-rose-200"
                  >
                    <option value="maxi">Maxi / Floor Length (110cm)</option>
                    <option value="midi">Midi Length (80cm)</option>
                    <option value="cocktail">Cocktail Length (60cm)</option>
                    <option value="train">Maxi with Train (135cm)</option>
                  </select>
                </div>
              </div>

              {/* Bandeau Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.includeBandeau}
                    onChange={(e) => updateMember(member.id, { includeBandeau: e.target.checked })}
                    className="rounded border-rose-300 text-rose-600 focus:ring-0"
                  />
                  <span>Add Matching Bandeau / Tube Top (+R95) for bra coverage</span>
                </label>
              </div>
            </div>
          ))}

          {/* Add Another Bridesmaid Button */}
          <button
            type="button"
            onClick={addMember}
            className="w-full py-3 rounded-xl border-2 border-dashed border-rose-200 hover:border-rose-400 text-rose-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 bg-rose-50/40"
          >
            <UserPlus className="w-4 h-4 text-rose-600" />
            <span>+ Add Another Bridesmaid</span>
          </button>
        </div>

        {/* Footer Summary & Actions */}
        <div className="p-5 sm:p-6 bg-rose-50/70 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-stone-500">
              Total: {totalDresses} Bridesmaid Dress{totalDresses > 1 ? 'es' : ''}
              {discountAmountZar > 0 && (
                <span className="text-emerald-700 ml-2 font-medium">
                  (Includes {discountRate * 100}% Discount: -{currencyFormatter(discountAmountZar)})
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-stone-900 font-serif">
              {currencyFormatter(finalTotalZar)}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyToCart}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Add All To Cart ({totalDresses})</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBridalParty}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Send Suite to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
