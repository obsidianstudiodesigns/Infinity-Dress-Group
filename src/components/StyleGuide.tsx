import React, { useState } from 'react';
import { Sparkles, Play, CheckCircle2, ChevronRight, Video, Heart } from 'lucide-react';
import { WRAPPING_STYLES, COMPANY_DETAILS } from '../data/products';
import { StyleTutorial } from '../types';

export const StyleGuide: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<StyleTutorial>(WRAPPING_STYLES[0]);

  return (
    <section id="styles" className="py-16 sm:py-24 bg-[#fff8f9] border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-semibold tracking-widest uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Convertible Styling Masterclass</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Ways to Wrap
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Every bridesmaid has a unique shape and comfort level. Explore popular wrapping styles from bra-friendly cap sleeves to glamorous Grecian crosses.
          </p>
        </div>

        {/* Interactive Masterclass Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation: Style Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 px-1">
              Select a Style to View Steps:
            </h3>

            {WRAPPING_STYLES.map((style) => {
              const isSelected = activeStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setActiveStyle(style)}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white border-rose-400 shadow-md ring-1 ring-rose-200'
                      : 'bg-white/60 border-rose-100 hover:bg-white hover:border-rose-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-stone-900 text-sm">
                        {style.name}
                      </span>
                      {style.braFriendly && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Bra-Friendly
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Difficulty: {style.difficulty}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-rose-600 translate-x-1' : 'text-stone-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Spotlight: Active Style Step-by-Step Breakdown */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {activeStyle.difficulty} Difficulty
                  </span>
                  {activeStyle.braFriendly && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      100% Bra-Friendly
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {activeStyle.name} Style
                </h3>
              </div>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(`Hello! Can you send me the video tutorial link for wrapping the ${activeStyle.name} infinity dress?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold transition-colors shrink-0 shadow-2xs"
              >
                <Video className="w-3.5 h-3.5 text-rose-600" />
                <span>Request Video Tutorial</span>
              </a>
            </div>

            {/* Steps Container */}
            <div className="mt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Step-by-Step Wrapping Instructions:
              </h4>

              <div className="space-y-3">
                {activeStyle.steps.map((step, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Styling Tip Banner */}
            <div className="mt-6 p-4 rounded-xl bg-rose-100/40 border border-rose-200/80 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-700">
                <strong className="text-stone-900 block mb-0.5">Styling Tip:</strong>
                {activeStyle.tips}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
