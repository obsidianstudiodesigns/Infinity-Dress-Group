import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals, CURRENCIES, generateWhatsAppOrderUrl } from '../utils/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency?: any;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  onOpenBridalSuite: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const currencyFormatter = CURRENCIES['ZAR'].format;

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
    const waUrl = generateWhatsAppOrderUrl(items, dummyCustomer, 'ZAR');
    window.open(waUrl, '_blank');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white text-stone-800 shadow-2xl border-l border-rose-100 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            <h2 className="font-serif text-lg font-bold text-stone-900">Your Shopping Cart</h2>
            <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
              {totals.totalItemCount}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-rose-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="p-3 bg-[#fff5f7] border-b border-rose-100 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            {totals.subtotalZar >= freeThresholdZar ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                🎉 Free SA Door-to-Door Courier Unlocked!
              </span>
            ) : (
              <span className="text-stone-700">
                Add <strong className="text-rose-600">{currencyFormatter(remainingForFreeZar)}</strong> more for <strong>FREE Courier</strong>
              </span>
            )}
            <span className="text-rose-700 font-bold">{Math.round(progressToFree)}%</span>
          </div>
          <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Your Cart is Empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our convertible infinity dresses, Claire lace gowns, and circle flare gowns.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition-colors shadow-2xs cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-rose-100 flex gap-3 text-xs shadow-2xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-rose-50 shrink-0 relative border border-rose-100">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: item.color.hex }}
                    title={item.color.name}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">
                        {item.productName}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.bridesmaidName && (
                      <span className="text-[11px] text-rose-600 font-semibold block mt-0.5">
                        For: {item.bridesmaidName}
                      </span>
                    )}

                    <div className="text-[11px] text-stone-500 space-y-0.5 mt-1">
                      <div>Color: <span className="text-stone-800 font-medium">{item.color.name}</span></div>
                      <div>Size: <span className="text-stone-800 font-medium">{item.size}</span></div>
                      <div>Length: <span className="text-stone-800 font-medium">{item.length.name}</span></div>
                    </div>

                    {item.addOns.length > 0 && (
                      <div className="mt-1 text-[10px] text-emerald-700 font-medium">
                        + {item.addOns.map((a) => a.name).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-rose-50">
                    <div className="flex items-center gap-2 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-stone-500 hover:text-stone-900 font-bold"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-stone-900 px-1 text-xs">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-stone-500 hover:text-stone-900 font-bold"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right font-bold text-rose-600 text-sm">
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
          <div className="p-4 sm:p-5 bg-rose-50/70 border-t border-rose-100 space-y-3">
            {/* Bulk discount notice */}
            {totals.discountAmountZar > 0 && (
              <div className="flex items-center justify-between text-xs text-rose-900 font-semibold bg-rose-100/80 p-2 rounded-lg border border-rose-200">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  Bridal Party {totals.discountPercentage * 100}% Discount Applied:
                </span>
                <span>-{currencyFormatter(totals.discountAmountZar)}</span>
              </div>
            )}

            {/* Subtotal & Estimated Grand Total */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Subtotal ({totals.totalItemCount} items):</span>
                <span className="font-bold text-stone-900">{currencyFormatter(totals.subtotalZar)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Estimated SA Courier:</span>
                <span className="font-semibold text-emerald-700">
                  {totals.isFreeDeliveryEligible ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-sm">
                <span className="font-bold text-stone-900 uppercase tracking-wider">Subtotal:</span>
                <span className="font-serif text-xl font-bold text-rose-600">
                  {currencyFormatter(totals.subtotalZar - totals.discountAmountZar)}
                </span>
              </div>
            </div>

            {/* Primary Proceed to Checkout Button */}
            <button
              type="button"
              onClick={onOpenCheckout}
              className="w-full py-3.5 px-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Direct WhatsApp Quick Order */}
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              className="w-full py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
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
