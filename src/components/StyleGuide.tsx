import React, { useState } from 'react';
import { Sparkles, ChevronRight, Video, ZoomIn, Eye } from 'lucide-react';
import { WRAPPING_STYLES, COMPANY_DETAILS } from '../data/products';
import { StyleTutorial } from '../types';

export const StyleGuide: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<StyleTutorial>(WRAPPING_STYLES[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const currentImage = activeStyle.image || activeStyle.images?.front || '';

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
            Every bridesmaid has a unique shape and comfort level. Explore popular wrapping styles with clear step-by-step visual guides to achieve each look effortlessly.
          </p>
        </div>

        {/* Interactive Masterclass Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation: Style Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 px-1 flex items-center justify-between">
              <span>Select a Style to View Steps:</span>
              <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {WRAPPING_STYLES.length} Styles
              </span>
            </h3>

            {WRAPPING_STYLES.map((style) => {
              const isSelected = activeStyle.id === style.id;
              const thumbImg = style.image || style.images?.front;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setActiveStyle(style)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center gap-3.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-white border-rose-400 shadow-md ring-2 ring-rose-200/70 scale-[1.01]'
                      : 'bg-white/70 border-rose-100 hover:bg-white hover:border-rose-300'
                  }`}
                >
                  {/* Miniature Thumbnail */}
                  {thumbImg && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-rose-100 shrink-0 shadow-2xs">
                      <img
                        src={thumbImg}
                        alt={style.name}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-serif font-bold text-stone-900 text-sm truncate">
                        {style.name}
                      </span>
                      {style.braFriendly && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                          Bra-Friendly
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Difficulty: <strong className="text-stone-700 font-medium">{style.difficulty}</strong>
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-rose-600 translate-x-1' : 'text-stone-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Spotlight: Active Style Visual Guide & Step-by-Step Breakdown */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-md">
            {/* Header of Active Style */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {activeStyle.difficulty} Difficulty
                  </span>
                  {activeStyle.braFriendly && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      100% Bra-Friendly
                    </span>
                  )}
                  {activeStyle.plusSizeFriendly && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Curve & Plus-Size Friendly
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold transition-colors shrink-0 shadow-2xs cursor-pointer"
              >
                <Video className="w-4 h-4 text-rose-600" />
                <span>Request Video Tutorial</span>
              </a>
            </div>

            {/* Split Content: Single High-Definition Visual Guide + Steps */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Visual Presentation */}
              {currentImage && (
                <div className="md:col-span-5 space-y-3">
                  <div
                    className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 border border-rose-100 shadow-sm group cursor-pointer"
                    onClick={() => setIsZoomed(true)}
                  >
                    <img
                      src={currentImage}
                      alt={`${activeStyle.name} Visual Wrap Guide`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Zoom Hint */}
                    <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-rose-600" />
                        Click to Enlarge
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-[11px] text-stone-600 text-center">
                    <span className="font-semibold text-stone-800">Visual Wrap Guide:</span> Shows precise neckline drape, strap placement, and waistband cinch.
                  </div>
                </div>
              )}

              {/* Steps Container */}
              <div className={`${currentImage ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step-by-Step Wrapping Instructions:
                </h4>

                <div className="space-y-3">
                  {activeStyle.steps.map((step, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-start gap-3.5 hover:bg-rose-50/80 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {index + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Styling Tip Banner */}
                <div className="p-4 rounded-2xl bg-rose-100/40 border border-rose-200/80 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-700 leading-relaxed">
                    <strong className="text-stone-900 block mb-0.5 font-bold">Styling Tip:</strong>
                    {activeStyle.tips}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Fullscreen Zoom Lightbox */}
      {isZoomed && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-4 shadow-2xl border border-rose-100 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  {activeStyle.name} — Style Preview
                </h4>
                <p className="text-xs text-stone-500">
                  Detailed fabric drape and strap placement
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-full hover:bg-rose-50 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 border border-rose-100">
              <img
                src={currentImage}
                alt={activeStyle.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
