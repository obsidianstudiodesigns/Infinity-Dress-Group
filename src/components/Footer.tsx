import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, Heart, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#fff5f6] to-[#feeef1] border-t border-rose-200/80 text-stone-700">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-rose-200/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>South African Direct Factory Pricing</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Ready to Style Your Bridal Party?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Get in touch with our bridal team on WhatsApp for bespoke sizing queries, bulk pricing, or fast nationwide dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to inquire about ordering Infinity Dresses for my bridesmaids.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Us: 061 510 7109</span>
            </a>

            <a
              href={`tel:${COMPANY_DETAILS.phoneIntl}`}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-rose-50 text-stone-800 font-bold text-xs uppercase tracking-wider border border-rose-200 transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Call 061 510 7109</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Trademark Notice */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="dark" />
            <p className="text-xs text-stone-600 leading-relaxed pr-6">
              THE INFINITY DRESS™ GROUP is the proud trademark holder and premier manufacturer of genuine convertible infinity dresses in South Africa and worldwide. Handcrafted in heavy 280gsm fabric for the ultimate flattering fit.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Factory Direct Contact
            </h4>
            <ul className="space-y-2.5 text-stone-600">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>
                  <strong>Call:</strong> {COMPANY_DETAILS.phoneDisplay}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>WhatsApp:</strong> {COMPANY_DETAILS.phoneDisplay}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-rose-600 underline">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Manufacturing Atelier:</strong> South Africa • Courier direct to your door nationwide & worldwide.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="#collection" className="hover:text-rose-600 transition-colors">
                  The Convertible Collection
                </a>
              </li>
              <li>
                <a href="#styles" className="hover:text-rose-600 transition-colors">
                  Ways to Wrap Tutorial
                </a>
              </li>
              <li>
                <a href="#trademark" className="hover:text-rose-600 transition-colors">
                  Trademark & Quality Standards
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-rose-600 transition-colors">
                  Real Bride Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-6 border-t border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-rose-600">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>in South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
