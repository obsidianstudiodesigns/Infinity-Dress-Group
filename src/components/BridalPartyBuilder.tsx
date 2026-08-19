import React, { useState } from 'react';
import { Sparkles, UserPlus, Trash2, CheckCircle2, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { BridalPartyMember, ColorSwatch, Currency, DressLength, DressSize, LengthOption, ProductAddOn } from '../types';
import { COLOR_SWATCHES, LENGTH_OPTIONS, PRODUCTS, STANDARD_ADD_ONS, COMPANY_DETAILS } from '../data/products';
import { CURRENCIES } from '../utils/order';

interface BridalPartyBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
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
  currency,
  onAddAllToCart,
}) => {
  if (!isOpen) return null;

  const [brideName, setBrideName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [themeColorId, setThemeColorId] = useState('emerald-green');

  const [members, setMembers] = useState<BridalPartyMember[]>([
    {
      id: '1',
      name: 'Sarah (Maid of Honor)',
      role: 'Maid of Honor',
      productId: 'signature-infinity-dress',
      colorId: 'emerald-green',
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
      colorId: 'emerald-green',
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
      colorId: 'emerald-green',
      size: 'L (40-42)',
      length: 'maxi',
      includeBandeau: true,
      notes: '',
    },
  ]);

  const currencyFormatter = CURRENCIES[currency].format;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-900 text-stone-100 rounded-xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-stone-800 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Coordinated Bridal Suite</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Bridal Party Group Order Builder
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Configure each bridesmaid’s individual size, length, and style in one synchronized group order with guaranteed matching dye-lots.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Wedding Meta Bar */}
        <div className="p-4 bg-stone-950/80 border-b border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-stone-400 mb-1">Bride / Organizer Name</label>
            <input
              type="text"
              placeholder="e.g. Jessica Smith"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Wedding Date</label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Theme Color Preset</label>
            <select
              value={themeColorId}
              onChange={(e) => {
                setThemeColorId(e.target.value);
                setMembers(members.map((m) => ({ ...m, colorId: e.target.value })));
              }}
              className="w-full bg-stone-800 rounded px-2.5 py-1.5 text-white border border-stone-700 focus:border-amber-400 focus:outline-none text-xs"
            >
              {COLOR_SWATCHES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Discount Alert */}
        <div className="px-5 py-2.5 bg-amber-950/40 border-b border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Bulk Savings:</strong> 5+ dresses = 10% OFF | 8+ dresses = 15% OFF!
            </span>
          </div>
          <span className="font-bold text-amber-300">
            Current Tier:{' '}
            {discountRate > 0 ? `${discountRate * 100}% Discount Applied` : `${5 - totalDresses} more for 10% OFF`}
          </span>
        </div>

        {/* Bridesmaid List */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[50vh] space-y-4">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="p-4 rounded-lg bg-stone-950 border border-stone-800/90 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-300 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, { name: e.target.value })}
                    className="bg-transparent font-bold text-sm text-white border-b border-transparent focus:border-amber-400 focus:outline-none px-1"
                    placeholder="Enter name (e.g. Sarah - MOH)"
                  />
                </div>

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                    title="Remove bridesmaid"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {/* Dress Style */}
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Dress Model</label>
                  <select
                    value={member.productId}
                    onChange={(e) => updateMember(member.id, { productId: e.target.value })}
                    className="w-full bg-stone-900 rounded p-2 text-white border border-stone-700"
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
                  <label className="block text-[11px] text-stone-400 mb-1">Color Swatch</label>
                  <select
                    value={member.colorId}
                    onChange={(e) => updateMember(member.id, { colorId: e.target.value })}
                    className="w-full bg-stone-900 rounded p-2 text-white border border-stone-700"
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
                  <label className="block text-[11px] text-stone-400 mb-1">Size</label>
                  <select
                    value={member.size}
                    onChange={(e) => updateMember(member.id, { size: e.target.value as DressSize })}
                    className="w-full bg-stone-900 rounded p-2 text-white border border-stone-700"
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
                  <label className="block text-[11px] text-stone-400 mb-1">Length</label>
                  <select
                    value={member.length}
                    onChange={(e) => updateMember(member.id, { length: e.target.value as DressLength })}
                    className="w-full bg-stone-900 rounded p-2 text-white border border-stone-700"
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
                <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.includeBandeau}
                    onChange={(e) => updateMember(member.id, { includeBandeau: e.target.checked })}
                    className="rounded border-stone-700 text-amber-500 focus:ring-0"
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
            className="w-full py-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-amber-400/60 text-stone-300 hover:text-amber-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 bg-stone-950/40"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Another Bridesmaid</span>
          </button>
        </div>

        {/* Footer Summary & Actions */}
        <div className="p-5 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-stone-400">
              Total: {totalDresses} Bridesmaid Dress{totalDresses > 1 ? 'es' : ''}
              {discountAmountZar > 0 && (
                <span className="text-emerald-400 ml-2 font-medium">
                  (Includes {discountRate * 100}% Bridal Discount: -{currencyFormatter(discountAmountZar)})
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-amber-300 font-serif">
              {currencyFormatter(finalTotalZar)}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyToCart}
              className="w-full sm:w-auto px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Add All To Cart ({totalDresses})</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBridalParty}
              className="w-full sm:w-auto px-6 py-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase border border-emerald-500/50 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Send Bridal Suite to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
