import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'compact';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Trademark Infinity Icon with Haute Couture Diamond Apex */}
      <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
        <svg
          viewBox="0 0 100 60"
          className={`w-full h-full ${isLight ? 'text-amber-300' : 'text-emerald-800'}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer continuous looping ribbon */}
          <path
            d="M30 12 C18 12, 10 20, 10 30 C10 40, 18 48, 30 48 C42 48, 48 38, 50 30 C52 22, 58 12, 70 12 C82 12, 90 20, 90 30 C90 40, 82 48, 70 48 C58 48, 52 38, 50 30 C48 22, 42 12, 30 12 Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner accent loop */}
          <path
            d="M30 18 C22 18, 16 23, 16 30 C16 37, 22 42, 30 42 C38 42, 44 35, 50 30 C56 25, 62 18, 70 18 C78 18, 84 23, 84 30 C84 37, 78 42, 70 42 C62 42, 56 35, 50 30 C44 25, 38 18, 30 18 Z"
            stroke={isLight ? '#FDE68A' : '#0F5132'}
            strokeWidth="1.8"
            strokeDasharray="2 3"
          />
          {/* Center dressmaker silhouette accent */}
          <circle cx="50" cy="30" r="3" fill={isLight ? '#FFFFFF' : '#0B4D3C'} />
          <path
            d="M50 10 L53 17 L47 17 Z"
            fill={isLight ? '#FDE68A' : '#D97706'}
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span
            className={`font-serif tracking-[0.18em] text-lg sm:text-xl font-bold uppercase leading-none ${
              isLight ? 'text-white' : 'text-stone-900'
            }`}
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            THE INFINITY DRESS<span className="text-xs align-super ml-0.5 text-amber-600 font-sans font-semibold">™</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`tracking-[0.26em] text-[9px] sm:text-[10px] font-semibold uppercase ${
              isLight ? 'text-amber-200/90' : 'text-emerald-800'
            }`}
          >
            GROUP
          </span>
          <span className={`text-[9px] ${isLight ? 'text-stone-400' : 'text-stone-400'}`}>•</span>
          <span
            className={`tracking-[0.16em] text-[8.5px] sm:text-[9.5px] uppercase font-medium ${
              isLight ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            South Africa & Worldwide
          </span>
        </div>
      </div>
    </div>
  );
};
