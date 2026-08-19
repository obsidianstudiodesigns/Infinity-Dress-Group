import React, { useState } from 'react';
import { Sparkles, UserPlus, Trash2, CheckCircle2, MessageCircle, ShoppingBag, X, Plus, Users, Calendar, User, Tag } from 'lucide-react';
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
      includeBandeau: false,
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
      includeBandeau: false,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/65 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-stone-800 rounded-3xl max-w-5xl w-full h-[94vh] sm:h-[90vh] flex flex-col overflow-hidden border border-rose-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header with Bridal Savings Banner */}
        <div className="p-4 sm:p-5 bg-rose-50/80 border-b border-rose-100 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-rose-200 text-[10px] font-bold text-rose-700 uppercase tracking-widest shadow-2xs">
                <Sparkles className="w-3 h-3 text-rose-500" />
                Coordinated Bridal Suite
              </span>

              {discountRate > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {discountRate * 100}% Discount Applied ({members.length} dresses)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-200">
                  <Tag className="w-3 h-3 text-rose-600" />
                  Add {5 - totalDresses} more for 10% OFF
                </span>
              )}
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              Bridal Party Group Order Builder
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wedding Details Meta Bar */}
        <div className="px-4 sm:px-6 py-3 bg-stone-50/70 border-b border-rose-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs shrink-0">
          <div>
            <label className="flex items-center gap-1 text-[11px] text-stone-600 font-semibold mb-1">
              <User className="w-3 h-3 text-rose-500" />
              Bride / Organizer Name
            </label>
            <input
              type="text"
              placeholder="e.g. Jessica Smith"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="flex items-center gap-1 text-[11px] text-stone-600 font-semibold mb-1">
              <Calendar className="w-3 h-3 text-rose-500" />
              Wedding Date
            </label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="flex items-center gap-1 text-[11px] text-stone-600 font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-rose-500" />
              Theme Color (Batch Apply)
            </label>
            <select
              value={themeColorId}
              onChange={(e) => {
                setThemeColorId(e.target.value);
                setMembers(members.map((m) => ({ ...m, colorId: e.target.value })));
              }}
              className="w-full bg-white rounded-lg px-3 py-1.5 text-stone-900 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-200 focus:outline-none text-xs"
            >
              {COLOR_SWATCHES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section Header with Quick "+ Add Bridesmaid" Action */}
        <div className="px-4 sm:px-6 py-2.5 bg-rose-50/40 border-b border-rose-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Bridesmaids in Suite ({members.length})
            </span>
          </div>

          <button
            type="button"
            onClick={addMember}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Bridesmaid</span>
          </button>
        </div>

        {/* Spacious Bridesmaid List (Expands to fill all vertical height) */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-4">
          {members.map((member, index) => {
            const selectedProduct = PRODUCTS.find((p) => p.id === member.productId) || PRODUCTS[0];
            const selectedColor = COLOR_SWATCHES.find((c) => c.id === member.colorId) || COLOR_SWATCHES[0];

            return (
              <div
                key={member.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-100 space-y-3.5 relative group shadow-sm hover:border-rose-300 transition-colors"
              >
                {/* Bridesmaid Header: Number, Name Input, and Remove Button */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-rose-50">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(member.id, { name: e.target.value })}
                      className="font-serif font-bold text-sm sm:text-base text-stone-900 border-b border-dashed border-rose-200 focus:border-rose-500 focus:outline-none px-1.5 py-0.5 bg-rose-50/30 rounded w-full max-w-sm"
                      placeholder="Enter bridesmaid name / role"
                    />
                  </div>

                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                      title="Remove bridesmaid"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Configurations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Dress Style */}
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-1 font-semibold">
                      Dress Model
                    </label>
                    <select
                      value={member.productId}
                      onChange={(e) => updateMember(member.id, { productId: e.target.value })}
                      className="w-full bg-stone-50/70 rounded-xl p-2.5 text-stone-900 border border-stone-200 focus:bg-white focus:border-rose-400 focus:outline-none"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (R{p.basePriceZar})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-1 font-semibold flex items-center gap-1">
                      <span>Color Swatch</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                    </label>
                    <select
                      value={member.colorId}
                      onChange={(e) => updateMember(member.id, { colorId: e.target.value })}
                      className="w-full bg-stone-50/70 rounded-xl p-2.5 text-stone-900 border border-stone-200 focus:bg-white focus:border-rose-400 focus:outline-none"
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
                    <label className="block text-[11px] text-stone-500 mb-1 font-semibold">
                      Size
                    </label>
                    <select
                      value={member.size}
                      onChange={(e) => updateMember(member.id, { size: e.target.value as DressSize })}
                      className="w-full bg-stone-50/70 rounded-xl p-2.5 text-stone-900 border border-stone-200 focus:bg-white focus:border-rose-400 focus:outline-none"
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
                    <label className="block text-[11px] text-stone-500 mb-1 font-semibold">
                      Length
                    </label>
                    <select
                      value={member.length}
                      onChange={(e) => updateMember(member.id, { length: e.target.value as DressLength })}
                      className="w-full bg-stone-50/70 rounded-xl p-2.5 text-stone-900 border border-stone-200 focus:bg-white focus:border-rose-400 focus:outline-none"
                    >
                      <option value="maxi">Maxi / Floor Length (110cm)</option>
                      <option value="midi">Midi Length (80cm)</option>
                      <option value="cocktail">Cocktail Length (60cm)</option>
                      <option value="train">Maxi with Train (135cm)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Custom Notes Input for this Bridesmaid */}
                <div>
                  <input
                    type="text"
                    value={member.notes || ''}
                    onChange={(e) => updateMember(member.id, { notes: e.target.value })}
                    placeholder="Optional notes for factory tailoring (e.g. extra length for 1.8m height, bust cup size, etc.)"
                    className="w-full text-[11px] bg-stone-50/50 rounded-lg px-3 py-1.5 text-stone-600 border border-stone-200 placeholder-stone-400 focus:bg-white focus:border-rose-300 focus:outline-none"
                  />
                </div>
              </div>
            );
          })}

          {/* Bottom Large "+ Add Another Bridesmaid" Card Button */}
          <button
            type="button"
            onClick={addMember}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-rose-300 hover:border-rose-500 text-rose-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-rose-50/30 hover:bg-rose-50/80 cursor-pointer shadow-2xs"
          >
            <UserPlus className="w-4 h-4 text-rose-600" />
            <span>+ Add Another Bridesmaid to Suite</span>
          </button>
        </div>

        {/* Footer Summary & Order Actions */}
        <div className="p-4 sm:p-5 bg-rose-50/90 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <div className="text-xs text-stone-600 flex items-center justify-center sm:justify-start gap-2">
              <span>{totalDresses} Bridesmaid Dress{totalDresses > 1 ? 'es' : ''} configured</span>
              {discountAmountZar > 0 && (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                  Saved {currencyFormatter(discountAmountZar)} ({discountRate * 100}% off)
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-stone-900 font-serif mt-0.5">
              {currencyFormatter(finalTotalZar)}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyToCart}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Add All To Cart ({totalDresses})</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBridalParty}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
