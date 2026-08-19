import React from 'react';
import { Star, CheckCircle2, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { REVIEWS, COMPANY_DETAILS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-400" />
            <span>South African & Global Brides</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Real Weddings, Real Reviews
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Over 10,000+ happy bridal parties dressed across South Africa, the United Kingdom, United States, Europe, Australia, and Namibia.
          </p>

          {/* Average Rating Stats */}
          <div className="mt-6 inline-flex items-center gap-3 bg-stone-900 px-4 py-2 rounded-full border border-stone-800">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9 / 5.0</span>
            <span className="text-xs text-stone-400">(Over 1,200+ Verified South African Bride Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-colors shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-white mt-3">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed mt-2 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{rev.author}</span>
                    {rev.verifiedBride && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Bride" />
                    )}
                  </div>
                  <span className="text-stone-400 text-[11px]">{rev.location}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase block">
                    {rev.dressBought}
                  </span>
                  <span className="text-[10px] text-stone-400">Color: {rev.color}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Wedding Photos Banner */}
        <div className="mt-16 p-6 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">
                Share Your Wedding Photos With Us
              </h4>
              <p className="text-xs text-stone-400">
                Send your wedding photographer’s shots to our team and be featured in our official bridal lookbook.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello! I would like to share our wedding photos featuring your Infinity Dresses!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider border border-stone-700 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Send Photos to Factory</span>
          </a>
        </div>
      </div>
    </section>
  );
};
