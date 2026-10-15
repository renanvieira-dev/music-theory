'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo Geométrico: Conexão Harmônica no Braço */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20`}
      >
        <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center p-1.5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none" />
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10"
          >
            <line x1="9" y1="5" x2="9" y2="27" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="23" y1="5" x2="23" y2="27" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="16" x2="26" y2="16" stroke="#222222" strokeWidth="1.5" />

            {/* Condução de vozes e tríade */}
            <path
              d="M9 22L16 11L23 18"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 10L16 16L23 22"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 3"
              strokeOpacity="0.8"
            />

            <circle cx="9" cy="22" r="2.8" fill="#f59e0b" />
            <circle cx="16" cy="11" r="2.8" fill="#fbbf24" />
            <circle cx="23" cy="18" r="2.8" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      {/* Tipografia */}
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-black tracking-tight text-white leading-none flex items-center`}>
          Harmon<span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">ix</span>
        </span>
        {showTagline && (
          <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-neutral-400 mt-1">
            Teoria, Geometria & Percepção
          </span>
        )}
      </div>
    </div>
  );
};