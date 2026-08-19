import React from 'react';
import { Phone, Mail, MessageCircle, ShieldCheck, MapPin, Clock, Heart, Award, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../data/products';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Trademark Summary (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />

            <p className="text-stone-400 leading-relaxed max-w-sm mt-3">
              <strong>THE INFINITY DRESS™ GROUP</strong> is the proud registered trademark holder and manufacturer of Infinity Dresses in South Africa and worldwide. Every gown is tailored in our local South African facility to deliver heirloom quality for your wedding day.
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Registered Trademark Holder (South Africa & International)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>100% South African Manufacturing & Job Creation</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              The Collection
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#collection" className="hover:text-amber-300 transition-colors">
                  Signature Infinity Dress™
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-300 transition-colors">
                  Claire Lace Infinity Dress™
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-300 transition-colors">
                  Classic Mesh Infinity Dress™
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-300 transition-colors">
                  Kiara Flare Circle Dress™
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-300 transition-colors">
                  Vintage Lace Wrap Dress™
                </a>
              </li>
              <li>
                <a href="#colors" className="hover:text-amber-300 transition-colors">
                  Color Swatches Palette
                </a>
              </li>
            </ul>
          </div>

          {/* Styling & Guides (Col 4) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Guides & Support
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#styles" className="hover:text-amber-300 transition-colors">
                  27+ Ways to Wrap Tutorial
                </a>
              </li>
              <li>
                <a href="#styles" className="hover:text-amber-300 transition-colors">
                  Bra-Friendly Styles
                </a>
              </li>
              <li>
                <a href="#styles" className="hover:text-amber-300 transition-colors">
                  Maternity & Plus Size Tips
                </a>
              </li>
              <li>
                <a href="#trademark" className="hover:text-amber-300 transition-colors">
                  Fabric Specifications (280gsm)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">
                  Real Bride Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 5) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <a
                href={`tel:${COMPANY_DETAILS.phoneIntl}`}
                className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">{COMPANY_DETAILS.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {COMPANY_DETAILS.phoneIntl}</span>
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="flex items-center gap-2 text-stone-300 hover:text-amber-300 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Cape Town & Johannesburg Production Hubs, South Africa</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Trademark Bar */}
      <div className="bg-stone-900 border-t border-stone-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} <strong>THE INFINITY DRESS™ GROUP</strong>. All rights reserved. The Infinity Dress™ is a registered trademark in South Africa and international jurisdictions.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold">
              Proudly Made in South Africa 🇿🇦
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
