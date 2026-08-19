import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Phone, MessageCircle, Ruler } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBridalSuite: () => void;
  onOpenSizeGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenBridalSuite,
  onOpenSizeGuide,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group">
            <Logo variant="dark" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <a
              href="#collection"
              className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Collection
            </a>

            <a
              href="#styles"
              className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              27+ Ways to Wrap
            </a>

            <a
              href="#trademark"
              className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Why Choose Us
            </a>

            <a
              href="#reviews"
              className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Real Weddings
            </a>

            {/* Sizing Tool Modal Trigger */}
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-rose-600 transition-colors"
            >
              <Ruler className="w-3.5 h-3.5 text-rose-500" />
              <span>Size Guide</span>
            </button>
          </nav>

          {/* Right Action Icons & Direct Order */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Bridal Party Suite Button */}
            <button
              type="button"
              onClick={onOpenBridalSuite}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold tracking-wider uppercase transition-all shadow-2xs hover:shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Bridal Party Suite</span>
            </button>

            {/* Direct Factory WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
              title="Factory WhatsApp Direct"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>061 510 7109</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-stone-800 transition-all border border-rose-200"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-stone-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md lg:hidden text-stone-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-rose-100 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-stone-700">
            <a
              href="#collection"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rose-600 py-1"
            >
              The Collection
            </a>
            <a
              href="#styles"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rose-600 py-1"
            >
              27+ Ways to Wrap
            </a>
            <a
              href="#trademark"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rose-600 py-1"
            >
              Why Choose Us
            </a>
            <a
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rose-600 py-1"
            >
              Real Weddings
            </a>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSizeGuide();
              }}
              className="flex items-center gap-2 text-left py-1 text-stone-700 hover:text-rose-600 uppercase"
            >
              <Ruler className="w-4 h-4 text-rose-500" />
              <span>Official Size Guide</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-rose-100 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBridalSuite();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bridal Party Group Order Suite</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct: 061 510 7109</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
