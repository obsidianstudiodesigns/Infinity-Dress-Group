import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { calculateCartTotals, CURRENCIES, generateWhatsAppOrderUrl } from '../utils/order';
import { COMPANY_DETAILS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  onOpenBridalSuite: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onOpenBridalSuite,
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const currencyFormatter = CURRENCIES[currency].format;

  // Free delivery calculation (free over R2500)
  const freeThresholdZar = 2500;
  const progressToFree = Math.min(100, (totals.subtotalZar / freeThresholdZar) * 100);
  const remainingForFreeZar = Math.max(0, freeThresholdZar - totals.subtotalZar);

  const handleQuickWhatsApp = () => {
    const dummyCustomer = {
      fullName: 'Valued Client',
      phone: '',
      whatsappNumber: '',
      email: '',
      deliveryMethod: 'courier_sa' as const,
      streetAddress: '',
      suburb: '',
      city: '',
      province: 'Gauteng',
      postalCode: '',
      country: 'South Africa',
    };
    const waUrl = generateWhatsAppOrderUrl(items, dummyCustomer, currency);
    window.open(waUrl, '_blank');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-md w-full bg-stone-900 text-stone-100 shadow-2xl border-l border-stone-800 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-lg font-bold text-white">Your Shopping Cart</h2>
            <span className="text-xs bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-semibold">
              {totals.totalItemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="p-3 bg-stone-950/90 border-b border-stone-800/80 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            {totals.subtotalZar >= freeThresholdZar ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                🎉 Congratulations! Free SA Courier Unlocked
              </span>
            ) : (
              <span className="text-stone-300">
                Add <strong className="text-amber-300">{currencyFormatter(remainingForFreeZar)}</strong> more for <strong>FREE Courier</strong>
              </span>
            )}
            <span className="text-stone-400">{Math.round(progressToFree)}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Your Cart is Empty</h3>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Explore our collection of genuine South African convertible infinity dresses, French lace, and mesh gowns.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 flex gap-3 text-xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-md overflow-hidden bg-stone-900 shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-stone-950"
                    style={{ backgroundColor: item.color.hex }}
                    title={item.color.name}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {item.productName}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.bridesmaidName && (
                      <span className="text-[11px] text-amber-300 font-semibold block mt-0.5">
                        For: {item.bridesmaidName}
                      </span>
                    )}

                    <div className="text-[11px] text-stone-400 space-y-0.5 mt-1">
                      <div>Color: <span className="text-stone-200">{item.color.name}</span></div>
                      <div>Size: <span className="text-stone-200">{item.size}</span></div>
                      <div>Length: <span className="text-stone-200">{item.length.name}</span></div>
                    </div>

                    {item.addOns.length > 0 && (
                      <div className="mt-1 text-[10px] text-emerald-400">
                        + {item.addOns.map((a) => a.name).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/80">
                    <div className="flex items-center gap-2 bg-stone-900 px-1.5 py-0.5 rounded border border-stone-700">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white px-1 text-xs">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right font-bold text-amber-300 text-sm">
                      {currencyFormatter(item.totalPriceZar)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 space-y-3">
            {/* Bulk discount notice */}
            {totals.discountAmountZar > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold bg-emerald-950/60 p-2 rounded border border-emerald-800/40">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bridal Party {totals.discountPercentage * 100}% Discount Applied:
                </span>
                <span>-{currencyFormatter(totals.discountAmountZar)}</span>
              </div>
            )}

            {/* Subtotal & Estimated Grand Total */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span>Subtotal ({totals.totalItemCount} items):</span>
                <span className="font-bold text-white">{currencyFormatter(totals.subtotalZar)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span>Estimated SA Courier:</span>
                <span className="font-semibold text-emerald-400">
                  {totals.isFreeDeliveryEligible ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-sm">
                <span className="font-bold text-white uppercase tracking-wider">Subtotal:</span>
                <span className="font-serif text-xl font-bold text-amber-300">
                  {currencyFormatter(totals.subtotalZar - totals.discountAmountZar)}
                </span>
              </div>
            </div>

            {/* Primary Proceed to Checkout Button */}
            <button
              type="button"
              onClick={onOpenCheckout}
              className="w-full py-3.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            {/* Direct WhatsApp Quick Order */}
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              className="w-full py-2.5 px-3 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase border border-emerald-600/40 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Quick Order on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
