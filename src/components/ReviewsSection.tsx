import React from 'react';
import { Star, CheckCircle2, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { REVIEWS, COMPANY_DETAILS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#fffafb] border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-semibold tracking-widest uppercase mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
            <span>South African & Global Brides</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Real Weddings, Real Reviews
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Over 10,000+ happy bridal parties dressed across South Africa, Namibia, the UK, Europe, Australia, and worldwide.
          </p>

          {/* Average Rating Pill */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-rose-100 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900">4.9 / 5.0</span>
            <span className="text-xs text-stone-500">(1,200+ Verified South African Bride Reviews)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-rose-100/90 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-stone-900 mt-3">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-rose-50 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <span>{rev.author}</span>
                    {rev.verifiedBride && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Bride" />
                    )}
                  </div>
                  <span className="text-stone-500 text-[11px]">{rev.location}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-rose-600 font-bold uppercase block">
                    {rev.dressBought}
                  </span>
                  <span className="text-[10px] text-stone-400">Color: {rev.color}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Send Photos Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50 to-[#fff0f3] border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-full bg-white text-rose-500 shadow-2xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Share Your Wedding Photos With Us
              </h4>
              <p className="text-xs text-stone-600">
                Send your wedding photographer’s shots to our team to be featured in our official South African bridal gallery.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to share our wedding photos featuring your Infinity Dresses!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-200 transition-colors flex items-center gap-2 shadow-2xs shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Send Photos on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
