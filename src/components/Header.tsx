import React, { useState } from 'react';
import { Phone, MessageCircle, ShoppingBag, Menu, X, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { Currency } from '../types';
import { CURRENCIES } from '../utils/order';
import { COMPANY_DETAILS } from '../data/products';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBridalSuite: () => void;
  onOpenSizeGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenBridalSuite,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies: Currency[] = ['ZAR', 'USD', 'GBP', 'EUR', 'AUD'];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-emerald-950 border-b border-emerald-900/60 text-xs py-1.5 px-4 text-emerald-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 tracking-wider">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              OFFICIAL TRADEMARK HOLDER
            </span>
            <span className="hidden md:inline text-emerald-400">•</span>
            <span className="hidden md:inline text-stone-200">
              Handcrafted in South Africa | Shipped Worldwide
            </span>
            <span className="hidden lg:inline text-emerald-400">•</span>
            <span className="hidden lg:inline text-amber-200 font-medium">
              Free SA Courier for orders over R2,500
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] font-medium">
            <a
              href={`tel:${COMPANY_DETAILS.phoneIntl}`}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_DETAILS.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like assistance with an Infinity Dress inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors bg-emerald-800/60 px-2 py-0.5 rounded border border-emerald-700/50"
            >
              <MessageCircle className="w-3 h-3 text-emerald-300" />
              <span className="font-semibold">WhatsApp Factory</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group">
            <Logo variant="light" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide text-stone-200">
            <a href="#collection" className="hover:text-amber-300 transition-colors">
              The Collection
            </a>
            <a href="#styles" className="hover:text-amber-300 transition-colors">
              27+ Style Guide
            </a>
            <button
              type="button"
              onClick={onOpenBridalSuite}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Bridal Party Suite
            </button>
            <a href="#colors" className="hover:text-amber-300 transition-colors">
              Fabric Swatches
            </a>
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="hover:text-amber-300 transition-colors"
            >
              Size Guide
            </button>
            <a href="#trademark" className="hover:text-amber-300 transition-colors">
              Our Trademark
            </a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors">
              Real Brides
            </a>
          </nav>

          {/* Right Action Icons: Currency & Cart */}
          <div className="flex items-center space-x-3">
            {/* Currency Selector */}
            <div className="relative flex items-center bg-stone-800/80 rounded-md border border-stone-700/60 px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent text-stone-200 font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur} className="bg-stone-900 text-stone-100">
                    {cur} ({CURRENCIES[cur].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-md bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-600/40 transition-all flex items-center gap-2 group shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider">Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold bg-amber-400 text-stone-900 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-t border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2 text-sm font-medium text-stone-200">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800"
            >
              The Collection
            </a>
            <a
              href="#styles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800"
            >
              27+ Style Guide
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBridalSuite();
              }}
              className="text-left px-3 py-2 rounded text-amber-300 bg-amber-950/40 border border-amber-800/30 flex items-center justify-between"
            >
              <span>Bridal Party Suite (Bulk Discounts)</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
            <a
              href="#colors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800"
            >
              Fabric Swatches & Colors
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSizeGuide();
              }}
              className="text-left px-3 py-2 rounded hover:bg-stone-800"
            >
              Size & Fit Guide
            </button>
            <a
              href="#trademark"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800"
            >
              Our South African Trademark
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800"
            >
              Real Brides Reviews
            </a>
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2 text-xs text-stone-300">
            <div className="flex items-center justify-between py-1">
              <span>Customer Care:</span>
              <a href={`tel:${COMPANY_DETAILS.phoneIntl}`} className="font-semibold text-amber-300">
                {COMPANY_DETAILS.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>Email:</span>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-medium text-stone-300">
                {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
