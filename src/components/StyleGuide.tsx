import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, ChevronRight, Video, ZoomIn, Eye, MoveHorizontal, RotateCcw } from 'lucide-react';
import { WRAPPING_STYLES, COMPANY_DETAILS } from '../data/products';
import { StyleTutorial } from '../types';

export const StyleGuide: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<StyleTutorial>(WRAPPING_STYLES[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  
  // Slider / Drag comparison position (0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Handle horizontal drag
  const handleDrag = useCallback((clientX: number, targetContainer: HTMLDivElement | null) => {
    if (!targetContainer) return;
    const rect = targetContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
    if (percentage > 50) {
      setActiveView('back');
    } else {
      setActiveView('front');
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e.clientX, isZoomed ? zoomContainerRef.current : containerRef.current);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleDrag(e.touches[0].clientX, isZoomed ? zoomContainerRef.current : containerRef.current);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleDrag(e.clientX, isZoomed ? zoomContainerRef.current : containerRef.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleDrag(e.touches[0].clientX, isZoomed ? zoomContainerRef.current : containerRef.current);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, isZoomed, handleDrag]);

  // Current images for active style
  const frontImg = activeStyle.images?.front || activeStyle.image || '';
  const backImg = activeStyle.images?.back || activeStyle.image || '';

  return (
    <section id="styles" className="py-16 sm:py-24 bg-[#fff8f9] border-b border-rose-100 select-none">
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
            Every bridesmaid has a unique shape and comfort level. Explore popular wrapping styles with interactive front and back views to see every strap crossover and draping detail.
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
              const thumbImg = style.images?.front || style.image;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setActiveStyle(style);
                    setSliderPos(50);
                  }}
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

          {/* Right Spotlight: Active Style Interactive Visuals & Step-by-Step Breakdown */}
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

            {/* Split Content: Interactive Front/Back Slider + Steps */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Interactive Visual Canvas Container */}
              <div className="md:col-span-5 space-y-3">
                {/* View Toggle Buttons */}
                <div className="flex items-center justify-between bg-rose-50/70 p-1 rounded-xl border border-rose-100">
                  <button
                    type="button"
                    onClick={() => setSliderPos(0)}
                    className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sliderPos <= 20
                        ? 'bg-white text-rose-800 shadow-xs ring-1 ring-rose-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Front View
                  </button>

                  <button
                    type="button"
                    onClick={() => setSliderPos(50)}
                    className={`py-1 px-2 rounded-lg text-[10px] font-semibold transition-all text-stone-500 hover:text-rose-600 cursor-pointer flex items-center gap-1`}
                    title="Reset split compare view"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Split</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSliderPos(100)}
                    className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sliderPos >= 80
                        ? 'bg-white text-rose-800 shadow-xs ring-1 ring-rose-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Back View
                  </button>
                </div>

                {/* Interactive Drag Viewer Canvas */}
                <div
                  ref={containerRef}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 border border-rose-100 shadow-sm cursor-ew-resize touch-none select-none group"
                >
                  {/* Back View Image (Base layer) */}
                  <img
                    src={backImg}
                    alt={`${activeStyle.name} Back View`}
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Front View Image (Clipped layer on top) */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-none"
                    style={{ width: `${100 - sliderPos}%` }}
                  >
                    <img
                      src={frontImg}
                      alt={`${activeStyle.name} Front View`}
                      className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                        height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Vertical Divider Slider Bar */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-10 transition-none"
                    style={{ left: `${100 - sliderPos}%` }}
                  >
                    {/* Drag Handle Bubble */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/95 text-rose-700 shadow-md border border-rose-200 flex items-center justify-center pointer-events-auto cursor-ew-resize">
                      <MoveHorizontal className="w-4 h-4 text-rose-600 animate-pulse" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase pointer-events-none">
                    Front
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase pointer-events-none">
                    Back
                  </div>

                  {/* Click to Zoom Overlay Trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(true);
                    }}
                    className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-stone-900 text-[11px] font-semibold shadow-md flex items-center gap-1 cursor-pointer transition-all hover:scale-105 z-20"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-rose-600" />
                    <span>Zoom</span>
                  </button>
                </div>

                {/* Instruction prompt below viewer */}
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-[11px] text-stone-600 text-center flex items-center justify-center gap-1.5">
                  <MoveHorizontal className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span><strong>Drag horizontally</strong> side-to-side to view front & back drape</span>
                </div>
              </div>

              {/* Steps Container */}
              <div className="md:col-span-7 space-y-4">
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

      {/* Fullscreen Interactive Zoom Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-5 shadow-2xl border border-rose-100 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  {activeStyle.name} — Interactive Front & Back Detail
                </h4>
                <p className="text-xs text-stone-500">
                  Drag side-to-side to compare front neckline and back strap detailing
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-full hover:bg-rose-50 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick View Switches */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setSliderPos(0)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  sliderPos <= 20
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Show Front Only
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 cursor-pointer"
              >
                50/50 Split
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(100)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  sliderPos >= 80
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Show Back Only
              </button>
            </div>

            {/* Interactive Canvas */}
            <div
              ref={zoomContainerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 border border-rose-100 cursor-ew-resize select-none touch-none"
            >
              <img
                src={backImg}
                alt={`${activeStyle.name} Back View High-Res`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                referrerPolicy="no-referrer"
              />

              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${100 - sliderPos}%` }}
              >
                <img
                  src={frontImg}
                  alt={`${activeStyle.name} Front View High-Res`}
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{
                    width: zoomContainerRef.current ? `${zoomContainerRef.current.clientWidth}px` : '100%',
                    height: zoomContainerRef.current ? `${zoomContainerRef.current.clientHeight}px` : '100%',
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none z-10"
                style={{ left: `${100 - sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-rose-700 shadow-xl border border-rose-200 flex items-center justify-center">
                  <MoveHorizontal className="w-5 h-5 text-rose-600" />
                </div>
              </div>

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900/75 backdrop-blur-xs text-white text-xs font-bold uppercase pointer-events-none">
                Front View
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/75 backdrop-blur-xs text-white text-xs font-bold uppercase pointer-events-none">
                Back View
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
