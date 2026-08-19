import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X, MessageCircle, Ruler, ChevronRight } from 'lucide-react';
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-2xs w-full">
        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 w-full">
            {/* Brand Logo - Scaled to fit gracefully on all screen widths */}
            <a href="#" className="flex items-center min-w-0 shrink max-w-[65%] sm:max-w-none">
              <Logo variant="dark" />
            </a>

            {/* Desktop Navigation Links (>= 1024px) */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-stone-600 shrink-0">
              <a
                href="#collection"
                className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap"
              >
                Collection
              </a>

              <a
                href="#styles"
                className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap"
              >
                Ways to Wrap
              </a>

              {/* Integrated Bridal Suite Nav Trigger */}
              <button
                type="button"
                onClick={onOpenBridalSuite}
                className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-600 font-bold transition-colors whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Bridal Suite</span>
              </button>

              <a
                href="#trademark"
                className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap"
              >
                Why Choose Us
              </a>

              <a
                href="#reviews"
                className="hover:text-rose-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-rose-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap"
              >
                Real Weddings
              </a>

              {/* Sizing Tool Modal Trigger */}
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-1 text-stone-600 hover:text-rose-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Size Guide</span>
              </button>
            </nav>

            {/* Right Action Group: WhatsApp (tablet/desktop), Cart Button, and Hamburger Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Direct Factory WhatsApp Quick Link (hidden on small mobile to give cart breathing room) */}
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
                title="Factory WhatsApp Direct"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap font-semibold">061 510 7109</span>
              </a>

              {/* Shopping Cart Button - Always 100% visible and unclipped */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2 sm:p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-stone-800 transition-all border border-rose-200 shrink-0 cursor-pointer shadow-2xs flex items-center justify-center min-w-[40px] min-h-[40px]"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-stone-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile / Tablet Hamburger Menu Button (< 1024px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl lg:hidden text-stone-700 hover:text-rose-600 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-200 transition-colors shrink-0 cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-rose-600" />
                ) : (
                  <Menu className="w-5 h-5 text-stone-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Slide-Down Menu (< 1024px) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-rose-100 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-1 text-sm font-semibold uppercase tracking-wider text-stone-700 divide-y divide-rose-50">
              <a
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-rose-600 py-3 flex items-center justify-between"
              >
                <span>The Collection</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>

              <a
                href="#styles"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-rose-600 py-3 flex items-center justify-between"
              >
                <span>Ways to Wrap</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBridalSuite();
                }}
                className="flex items-center justify-between text-left py-3 text-rose-700 hover:text-rose-600 font-bold uppercase cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Bridal Party Suite</span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>

              <a
                href="#trademark"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-rose-600 py-3 flex items-center justify-between"
              >
                <span>Why Choose Us</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>

              <a
                href="#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-rose-600 py-3 flex items-center justify-between"
              >
                <span>Real Weddings</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSizeGuide();
                }}
                className="flex items-center justify-between text-left py-3 text-stone-700 hover:text-rose-600 uppercase cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-rose-500" />
                  <span>Official Size Guide</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </nav>

            {/* Mobile Actions Drawer Footer */}
            <div className="pt-3 border-t border-rose-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Shopping Cart ({cartCount})</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 061 510 7109</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Dimmed backdrop when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
