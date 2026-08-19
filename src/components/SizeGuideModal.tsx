import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { DressSize } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputBust, setInputBust] = useState<string>('');
  const [inputWaist, setInputWaist] = useState<string>('');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  const handleCalculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const bustNum = parseFloat(inputBust);
    const waistNum = parseFloat(inputWaist);

    if (isNaN(bustNum) && isNaN(waistNum)) {
      setCalculatedSize(null);
      return;
    }

    // Determine based on waist/bust cm
    const metric = !isNaN(waistNum) ? waistNum : bustNum - 14;

    if (metric <= 68) {
      setCalculatedSize('XS (SA 28-30 / UK 4-6 / US 0-2)');
    } else if (metric <= 76) {
      setCalculatedSize('S (SA 32-34 / UK 8-10 / US 4-6)');
    } else if (metric <= 86) {
      setCalculatedSize('M (SA 36-38 / UK 12-14 / US 8-10)');
    } else if (metric <= 98) {
      setCalculatedSize('L (SA 40-42 / UK 16-18 / US 12-14)');
    } else if (metric <= 112) {
      setCalculatedSize('XL (SA 44-46 / UK 20-22 / US 16-18)');
    } else if (metric <= 126) {
      setCalculatedSize('2XL (SA 48-50 / UK 24-26 / US 20-22)');
    } else {
      setCalculatedSize('3XL+ (SA 52-54) or Bespoke Custom Measurements');
    }
  };

  const sizeTable = [
    { size: 'XS', sa: '28 - 30', uk: '4 - 6', us: '0 - 2', bust: '76 - 82 cm', waist: '60 - 66 cm', hips: '84 - 90 cm' },
    { size: 'S', sa: '32 - 34', uk: '8 - 10', us: '4 - 6', bust: '84 - 90 cm', waist: '68 - 74 cm', hips: '92 - 98 cm' },
    { size: 'M', sa: '36 - 38', uk: '12 - 14', us: '8 - 10', bust: '92 - 98 cm', waist: '76 - 84 cm', hips: '100 - 106 cm' },
    { size: 'L', sa: '40 - 42', uk: '16 - 18', us: '12 - 14', bust: '100 - 108 cm', waist: '86 - 96 cm', hips: '108 - 116 cm' },
    { size: 'XL', sa: '44 - 46', uk: '20 - 22', us: '16 - 18', bust: '110 - 120 cm', waist: '98 - 108 cm', hips: '118 - 128 cm' },
    { size: '2XL', sa: '48 - 50', uk: '24 - 26', us: '20 - 22', bust: '122 - 134 cm', waist: '110 - 122 cm', hips: '130 - 142 cm' },
    { size: '3XL+', sa: '52 - 54', uk: '28 - 30', us: '24 - 26', bust: '136 - 150 cm', waist: '124 - 140 cm', hips: '144 - 158 cm' },
  ];

  return (
    <div
      id="size-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-stone-900 text-stone-100 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-stone-800 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-400 text-stone-950">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">
                Official Size & Measurement Guide
              </h2>
              <p className="text-xs text-stone-400">
                Because our dresses feature 4-way elastic stretch, sizing is forgiving and comfortable.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Interactive Fit Calculator */}
          <div className="p-5 rounded-xl bg-stone-950 border border-amber-500/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Smart Sizing Calculator</span>
            </div>

            <form onSubmit={handleCalculateSize} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Your Bust Measurement (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 94"
                  value={inputBust}
                  onChange={(e) => setInputBust(e.target.value)}
                  className="w-full bg-stone-800 rounded px-3 py-2 text-sm text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-400 mb-1">Your Waist Measurement (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 78"
                  value={inputWaist}
                  onChange={(e) => setInputWaist(e.target.value)}
                  className="w-full bg-stone-800 rounded px-3 py-2 text-sm text-white border border-stone-700 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors"
              >
                Calculate My Size
              </button>
            </form>

            {calculatedSize && (
              <div className="mt-4 p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-stone-300">Recommended Size for You:</span>
                  <div className="text-base font-bold text-white mt-0.5">{calculatedSize}</div>
                </div>
              </div>
            )}
          </div>

          {/* Size Conversion Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
              Standard South African, UK & US Size Chart
            </h3>

            <div className="overflow-x-auto rounded-lg border border-stone-800">
              <table className="w-full text-xs text-left text-stone-200">
                <thead className="bg-stone-950 text-[11px] uppercase tracking-wider text-amber-300 font-bold border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3">South Africa</th>
                    <th className="py-3 px-3">UK / AU</th>
                    <th className="py-3 px-3">US / CA</th>
                    <th className="py-3 px-3">Bust</th>
                    <th className="py-3 px-3">Waist</th>
                    <th className="py-3 px-3">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 bg-stone-900/50">
                  {sizeTable.map((row) => (
                    <tr key={row.size} className="hover:bg-stone-800/60 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-amber-400">{row.size}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{row.sa}</td>
                      <td className="py-2.5 px-3 text-stone-300">{row.uk}</td>
                      <td className="py-2.5 px-3 text-stone-300">{row.us}</td>
                      <td className="py-2.5 px-3 text-stone-300">{row.bust}</td>
                      <td className="py-2.5 px-3 text-stone-300">{row.waist}</td>
                      <td className="py-2.5 px-3 text-stone-300">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                How to Measure Length (Waist-to-Floor)
              </h4>
              <p className="text-stone-400 leading-relaxed">
                Place the measuring tape at your natural waist (narrowest part of your torso, roughly 2 inches above the belly button) and measure straight down to the floor while wearing your intended wedding heels. Standard Maxi is <strong>110cm</strong>.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                Maternity & Plus Size Bridesmaids
              </h4>
              <p className="text-stone-400 leading-relaxed">
                Our 4-way stretch knit effortlessly expands across baby bumps and curvier busts. If you are between sizes, choose the larger size or select "Custom Measurements" in the dress customizer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors"
          >
            Got It, Back to Customizer
          </button>
        </div>
      </div>
    </div>
  );
};
