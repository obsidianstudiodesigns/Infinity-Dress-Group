import React, { useState } from 'react';
import { X, MessageCircle, Printer, Mail, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { calculateCartTotals, CURRENCIES, DELIVERY_FEES, generateWhatsAppOrderUrl } from '../utils/order';
import { COMPANY_DETAILS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency?: any;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    deliveryMethod: 'courier_sa',
    streetAddress: '',
    suburb: '',
    city: '',
    province: 'Gauteng',
    postalCode: '',
    country: 'South Africa',
    eventDate: '',
    specialInstructions: '',
  });

  const totals = calculateCartTotals(cartItems, customer.deliveryMethod);
  const currencyFormatter = CURRENCIES['ZAR'].format;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = generateWhatsAppOrderUrl(cartItems, customer, 'ZAR');
    window.open(waUrl, '_blank');
    onOrderSuccess();
  };

  const handlePrintInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const orderRef = `INF-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const itemsHtml = cartItems
      .map(
        (item, idx) => `
        <tr style="border-bottom: 1px solid #fecdd3;">
          <td style="padding: 10px; font-weight: bold; color: #1c1917;">
            ${idx + 1}. ${item.productName}
            ${item.bridesmaidName ? `<div style="font-size: 11px; color: #e11d48;">For: ${item.bridesmaidName}</div>` : ''}
            <div style="font-size: 11px; color: #78716c;">Color: ${item.color.name} | Size: ${item.size} | Length: ${item.length.name}</div>
            ${item.addOns.length ? `<div style="font-size: 11px; color: #059669;">Add-ons: ${item.addOns.map((a) => a.name).join(', ')}</div>` : ''}
          </td>
          <td style="padding: 10px; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; text-align: right;">${currencyFormatter(item.unitPriceZar)}</td>
          <td style="padding: 10px; text-align: right; font-weight: bold; color: #e11d48;">${currencyFormatter(item.totalPriceZar)}</td>
        </tr>
      `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proforma Quote - ${COMPANY_DETAILS.name}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #292524; line-height: 1.5; font-size: 13px; background: #fff; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e11d48; padding-bottom: 20px; margin-bottom: 20px; }
          .title { font-size: 22px; font-weight: bold; color: #be123c; }
          .subtitle { font-size: 11px; color: #78716c; text-transform: uppercase; letter-spacing: 1px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
          .box { background: #fff5f7; padding: 15px; border-radius: 8px; border: 1px solid #fecdd3; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background: #be123c; color: white; padding: 10px; text-align: left; font-size: 11px; text-transform: uppercase; }
          .totals-table { width: 300px; margin-left: auto; }
          .totals-table td { padding: 6px 10px; }
          .grand-total { font-size: 16px; font-weight: bold; color: #be123c; border-top: 2px solid #be123c; }
          .footer { margin-top: 40px; border-top: 1px solid #fecdd3; padding-top: 15px; font-size: 11px; color: #78716c; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">${COMPANY_DETAILS.name}</div>
            <div class="subtitle">${COMPANY_DETAILS.tradeMarkNotice}</div>
            <div style="margin-top: 5px;">Phone: ${COMPANY_DETAILS.phoneDisplay} | WhatsApp: ${COMPANY_DETAILS.phoneIntl}</div>
            <div>Email: ${COMPANY_DETAILS.email}</div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #be123c;">PROFORMA QUOTE</h2>
            <div><strong>Quote Ref:</strong> #${orderRef}</div>
            <div><strong>Date:</strong> ${dateStr}</div>
            ${customer.eventDate ? `<div><strong>Wedding Date:</strong> ${customer.eventDate}</div>` : ''}
          </div>
        </div>

        <div class="meta-grid">
          <div class="box">
            <strong>CLIENT DETAILS:</strong><br>
            <strong>Name:</strong> ${customer.fullName || 'Valued Client'}<br>
            <strong>Contact:</strong> ${customer.phone || customer.whatsappNumber || '-'}<br>
            <strong>Email:</strong> ${customer.email || '-'}<br>
          </div>
          <div class="box">
            <strong>DELIVERY INFORMATION:</strong><br>
            <strong>Method:</strong> ${DELIVERY_FEES[customer.deliveryMethod]?.name || 'Courier'}<br>
            <strong>Address:</strong> ${[customer.streetAddress, customer.suburb, customer.city, customer.province, customer.postalCode, customer.country].filter(Boolean).join(', ') || 'Factory Pickup'}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <table class="totals-table">
          <tr>
            <td>Subtotal:</td>
            <td style="text-align: right; font-weight: bold;">${currencyFormatter(totals.subtotalZar)}</td>
          </tr>
          ${
            totals.discountAmountZar > 0
              ? `<tr>
            <td style="color: #be123c;">Bridal Party Discount (${totals.discountPercentage * 100}%):</td>
            <td style="text-align: right; color: #be123c; font-weight: bold;">-${currencyFormatter(totals.discountAmountZar)}</td>
          </tr>`
              : ''
          }
          <tr>
            <td>Delivery Fee:</td>
            <td style="text-align: right; font-weight: bold;">${totals.deliveryFee === 0 ? 'FREE' : currencyFormatter(totals.deliveryFee)}</td>
          </tr>
          <tr class="grand-total">
            <td>Grand Total:</td>
            <td style="text-align: right;">${currencyFormatter(totals.grandTotalZar)}</td>
          </tr>
        </table>

        <div class="box" style="margin-top: 20px;">
          <strong>BANKING & PAYMENT INSTRUCTIONS:</strong><br>
          Please send this quote ref (<strong>#${orderRef}</strong>) to our factory on WhatsApp (<strong>${COMPANY_DETAILS.phoneIntl}</strong>) or via email to confirm production slot reservation.
        </div>

        <div class="footer">
          ${COMPANY_DETAILS.name} • Registered South African Manufacturer • Shipped Worldwide
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleEmailOrder = () => {
    const subject = encodeURIComponent(`Order Quote Request #${Date.now().toString().slice(-6)} - ${customer.fullName || 'Client'}`);
    const body = encodeURIComponent(
      `Hello Infinity Dress Group Team,\n\nI would like to place an order / request a quote with the following details:\n\nName: ${customer.fullName}\nPhone: ${customer.phone}\nDelivery: ${DELIVERY_FEES[customer.deliveryMethod]?.name}\nAddress: ${customer.streetAddress}, ${customer.city}, ${customer.province}\nTotal Estimated: ${currencyFormatter(totals.grandTotalZar)}\n\nPlease find my item details attached or let me know the next steps.\n\nThank you!`
    );
    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  const provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'International / SADC',
  ];

  return (
    <div
      id="checkout-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-stone-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-rose-100 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>Direct Factory Checkout</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Complete Your Order
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Select your delivery destination and submit your order directly to our South African manufacturing team via WhatsApp or Email.
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

        {/* Content Form */}
        <form onSubmit={handleWhatsAppCheckout} className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Section 1: Customer Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">
              1. Your Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica van der Merwe"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">WhatsApp / Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 082 123 4567"
                  value={customer.whatsappNumber || customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, whatsappNumber: e.target.value, phone: e.target.value })
                  }
                  className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jessica@example.co.za"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Wedding / Event Date (Optional)</label>
                <input
                  type="date"
                  value={customer.eventDate}
                  onChange={(e) => setCustomer({ ...customer, eventDate: e.target.value })}
                  className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Method */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">
              2. Choose Delivery Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(DELIVERY_FEES).map(([key, info]) => {
                const isSelected = customer.deliveryMethod === key;
                const isFree = totals.isFreeDeliveryEligible && key === 'courier_sa';
                return (
                  <label
                    key={key}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-rose-50/80 border-rose-500 ring-1 ring-rose-400 text-stone-900'
                        : 'bg-white border-rose-100 text-stone-700 hover:border-rose-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={isSelected}
                      onChange={() => setCustomer({ ...customer, deliveryMethod: key as any })}
                      className="mt-0.5 text-rose-600 focus:ring-rose-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>{info.name}</span>
                        <span className={isFree || info.costZar === 0 ? 'text-emerald-600 font-bold' : 'text-rose-600'}>
                          {isFree || info.costZar === 0 ? 'FREE' : currencyFormatter(info.costZar)}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block mt-0.5">
                        Estimated transit: {info.time}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 3: Delivery Address */}
          {customer.deliveryMethod !== 'factory_collection' && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">
                3. Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-stone-600 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 14 Protea Avenue, Complex/Building Name"
                    value={customer.streetAddress}
                    onChange={(e) => setCustomer({ ...customer, streetAddress: e.target.value })}
                    className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Suburb</label>
                  <input
                    type="text"
                    placeholder="e.g. Camps Bay / Sandton"
                    value={customer.suburb}
                    onChange={(e) => setCustomer({ ...customer, suburb: e.target.value })}
                    className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">City / Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Cape Town / Johannesburg"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Province / State</label>
                  <select
                    value={customer.province}
                    onChange={(e) => setCustomer({ ...customer, province: e.target.value })}
                    className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                  >
                    {provinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 8001 / 2196"
                    value={customer.postalCode}
                    onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                    className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Special Delivery or Tailoring Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Gate code, deliver before 15th, bridesmaid is 1.8m tall..."
              value={customer.specialInstructions}
              onChange={(e) => setCustomer({ ...customer, specialInstructions: e.target.value })}
              className="w-full bg-rose-50/30 rounded-lg px-3 py-2 text-xs text-stone-900 border border-rose-200 focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-700">
              <span>Items Total ({totals.totalItemCount} dresses/items):</span>
              <span className="font-semibold text-stone-900">{currencyFormatter(totals.subtotalZar)}</span>
            </div>

            {totals.discountAmountZar > 0 && (
              <div className="flex items-center justify-between text-rose-700 font-medium">
                <span>Bridal Party Discount ({totals.discountPercentage * 100}% OFF):</span>
                <span className="font-bold">-{currencyFormatter(totals.discountAmountZar)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-stone-700">
              <span>Delivery Fee ({DELIVERY_FEES[customer.deliveryMethod]?.name}):</span>
              <span className="font-semibold text-stone-900">
                {totals.deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  currencyFormatter(totals.deliveryFee)
                )}
              </span>
            </div>

            <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-sm">
              <span className="font-bold text-stone-900 uppercase tracking-wider">Grand Total:</span>
              <span className="font-serif text-xl font-bold text-rose-600">
                {currencyFormatter(totals.grandTotalZar)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Send Order to Factory WhatsApp (Fastest)</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePrintInvoice}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-rose-50 text-stone-800 text-xs font-semibold uppercase tracking-wider border border-rose-200 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-rose-500" />
                <span>Print Proforma Quote</span>
              </button>

              <button
                type="button"
                onClick={handleEmailOrder}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-rose-50 text-stone-800 text-xs font-semibold uppercase tracking-wider border border-rose-200 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>Email Order Request</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
