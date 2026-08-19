import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, Shield, Heart, Crown, Feather, Zap } from 'lucide-react';
import { STYLE_TUTORIALS } from '../data/products';
import { StyleTutorial } from '../types';

export const StyleGuide: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<StyleTutorial>(STYLE_TUTORIALS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Classic', 'Bra-Friendly', 'Backless', 'One-Shoulder', 'Sleeved'];

  const filteredTutorials =
    filterCategory === 'All'
      ? STYLE_TUTORIALS
      : STYLE_TUTORIALS.filter((t) => t.category === filterCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Feather':
        return <Feather className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="styles" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versatility Masterclass</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            How to Wrap: 27+ Styles in 1 Dress
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Every member of your bridal party can wrap the straps to match their personal comfort, bra preference, and body silhouette. Explore our popular wrapping techniques below:
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors ${
                filterCategory === cat
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Studio Viewer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Style Selector Sidebar (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Select a Style to View Step-by-Step Instructions:
            </span>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredTutorials.map((tut) => {
                const isSelected = selectedTutorial.id === tut.id;
                return (
                  <button
                    key={tut.id}
                    type="button"
                    onClick={() => setSelectedTutorial(tut)}
                    className={`w-full p-4 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-stone-800 border-amber-400 shadow-md ring-1 ring-amber-400/40 text-white'
                        : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-stone-900 border border-stone-700">
                        {getIcon(tut.iconName)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{tut.name}</h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400">
                          <span>{tut.category}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{tut.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {tut.braFriendly && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/40 font-medium">
                          Bra Friendly
                        </span>
                      )}
                      {tut.plusSizeFriendly && (
                        <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800/40 font-medium">
                          Plus-Size Fav
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tutorial Display (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-stone-950 rounded-xl border border-stone-800 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
                  <span>{selectedTutorial.category} Wrapping Method</span>
                  <span>•</span>
                  <span>Difficulty: {selectedTutorial.difficulty}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {selectedTutorial.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {selectedTutorial.braFriendly && (
                  <span className="text-xs bg-emerald-900/60 text-emerald-200 px-2.5 py-1 rounded border border-emerald-700/50 font-medium">
                    ✓ Full Bra Support
                  </span>
                )}
              </div>
            </div>

            {/* Steps Breakdown */}
            <div className="mt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Step-by-Step Wrapping Guide:
              </h4>

              <div className="space-y-3">
                {selectedTutorial.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-stone-900/90 border border-stone-800 text-sm text-stone-200 leading-relaxed"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylist Pro Tip */}
            <div className="mt-6 p-4 rounded-lg bg-amber-950/40 border border-amber-500/40 text-xs text-stone-200">
              <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Atelier Stylist Advice:</span>
              </div>
              <p className="leading-relaxed text-stone-300">{selectedTutorial.tips}</p>
            </div>

            {/* Quick Consultation CTA */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
              <span>Need styling assistance for your bridesmaids?</span>
              <a
                href={`https://wa.me/27615107109?text=Hello!%20I%20would%20like%20guidance%20on%20how%20to%20style%20the%20${encodeURIComponent(selectedTutorial.name)}%20infinity%20dress%20look.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4"
              >
                Ask our Factory Stylist on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
