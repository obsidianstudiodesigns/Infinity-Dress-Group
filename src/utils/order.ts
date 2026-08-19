import { CartItem, Currency, CurrencyRate, CustomerDetails } from '../types';
import { COMPANY_DETAILS } from '../data/products';

export const CURRENCIES: Record<Currency, CurrencyRate> = {
  ZAR: {
    symbol: 'R',
    rate: 1,
    format: (amt) => `R ${Math.round(amt).toLocaleString('en-ZA')}`,
  },
  USD: {
    symbol: '$',
    rate: 0.056,
    format: (amt) => `$${(amt * 0.056).toFixed(2)}`,
  },
  GBP: {
    symbol: '£',
    rate: 0.044,
    format: (amt) => `£${(amt * 0.044).toFixed(2)}`,
  },
  EUR: {
    symbol: '€',
    rate: 0.052,
    format: (amt) => `€${(amt * 0.052).toFixed(2)}`,
  },
  AUD: {
    symbol: 'A$',
    rate: 0.086,
    format: (amt) => `A$${(amt * 0.086).toFixed(2)}`,
  },
};

export const DELIVERY_FEES: Record<string, { name: string; costZar: number; time: string }> = {
  courier_sa: {
    name: 'Door-to-Door Courier (South Africa Nationwide)',
    costZar: 120,
    time: '2 - 4 Working Days',
  },
  postnet: {
    name: 'PostNet to PostNet Counter Pickup',
    costZar: 109,
    time: '2 - 3 Working Days',
  },
  factory_collection: {
    name: 'Factory Dispatch Collection (Cape Town / JHB)',
    costZar: 0,
    time: 'Ready upon notification',
  },
  dhl_international: {
    name: 'DHL Express Worldwide Tracked Courier',
    costZar: 480,
    time: '4 - 7 Business Days',
  },
};

export function calculateCartTotals(items: CartItem[], deliveryMethod: string = 'courier_sa') {
  const subtotalZar = items.reduce((sum, item) => sum + item.totalPriceZar, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Bulk discount for bridal parties
  let discountPercentage = 0;
  if (totalItemCount >= 8) {
    discountPercentage = 0.15; // 15% discount for 8+ dresses
  } else if (totalItemCount >= 5) {
    discountPercentage = 0.10; // 10% discount for 5-7 dresses
  }

  const discountAmountZar = Math.round(subtotalZar * discountPercentage);
  const discountedSubtotal = subtotalZar - discountAmountZar;

  const deliveryFee = subtotalZar >= 2500 && deliveryMethod === 'courier_sa'
    ? 0
    : (DELIVERY_FEES[deliveryMethod]?.costZar || 120);

  const grandTotalZar = discountedSubtotal + deliveryFee;

  return {
    subtotalZar,
    discountPercentage,
    discountAmountZar,
    deliveryFee,
    grandTotalZar,
    totalItemCount,
    isFreeDeliveryEligible: subtotalZar >= 2500,
  };
}

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerDetails,
  currency: Currency = 'ZAR'
): string {
  const totals = calculateCartTotals(items, customer.deliveryMethod);
  const orderRef = `INF-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const currencyFormatter = CURRENCIES[currency].format;

  let message = `✨ *NEW ORDER REQUEST — ${COMPANY_DETAILS.name}* ✨\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *Order Ref:* #${orderRef}\n`;
  message += `📅 *Date:* ${dateStr}\n`;
  if (customer.eventDate) {
    message += `💍 *Wedding / Event Date:* ${customer.eventDate}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• *Name:* ${customer.fullName || 'Not provided'}\n`;
  message += `• *Phone / WA:* ${customer.whatsappNumber || customer.phone || 'Not provided'}\n`;
  message += `• *Email:* ${customer.email || 'Not provided'}\n`;
  message += `• *Delivery:* ${DELIVERY_FEES[customer.deliveryMethod]?.name || 'Courier'}\n`;
  if (customer.deliveryMethod !== 'factory_collection') {
    message += `• *Address:* ${[customer.streetAddress, customer.suburb, customer.city, customer.province, customer.postalCode, customer.country].filter(Boolean).join(', ')}\n`;
  }
  message += `\n👗 *ORDERED ITEMS (${totals.totalItemCount} total):*\n`;

  items.forEach((item, idx) => {
    message += `\n*${idx + 1}. ${item.productName}*\n`;
    if (item.bridesmaidName) {
      message += `   🏷️ *For:* ${item.bridesmaidName}\n`;
    }
    message += `   🎨 *Color:* ${item.color.name} (Hex: ${item.color.hex})\n`;
    message += `   📏 *Size:* ${item.size}\n`;
    message += `   ✂️ *Length:* ${item.length.name}\n`;

    if (item.customMeasurements) {
      const { bust, underbust, waist, waistToFloor, notes } = item.customMeasurements;
      message += `   📐 *Custom Sizing:* Bust: ${bust || '-'}cm | Underbust: ${underbust || '-'}cm | Waist: ${waist || '-'}cm | Waist-Floor: ${waistToFloor || '-'}cm\n`;
      if (notes) message += `   📝 *Fit Notes:* ${notes}\n`;
    }

    if (item.addOns.length > 0) {
      message += `   ➕ *Add-ons:* ${item.addOns.map((a) => a.name).join(', ')}\n`;
    }

    message += `   🔢 *Qty:* ${item.quantity} × ${currencyFormatter(item.unitPriceZar)} = *${currencyFormatter(item.totalPriceZar)}*\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *ORDER SUMMARY:*\n`;
  message += `• *Subtotal:* ${currencyFormatter(totals.subtotalZar)}\n`;

  if (totals.discountAmountZar > 0) {
    message += `• *Bridal Party Discount (${totals.discountPercentage * 100}% off):* -${currencyFormatter(totals.discountAmountZar)}\n`;
  }

  message += `• *Delivery:* ${totals.deliveryFee === 0 ? 'FREE' : currencyFormatter(totals.deliveryFee)}\n`;
  message += `• *GRAND TOTAL:* *${currencyFormatter(totals.grandTotalZar)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  if (customer.specialInstructions) {
    message += `\n💬 *Special Instructions:* ${customer.specialInstructions}\n`;
  }

  message += `\n🇿🇦 *Manufacturer:* THE INFINITY DRESS™ GROUP (South Africa)\n`;
  message += `_Please confirm stock, manufacturing slot, and provide banking / payment details. Thank you!_`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encoded}`;
}
