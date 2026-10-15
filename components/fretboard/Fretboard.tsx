// components/fretboard/Fretboard.tsx
'use client';

import React from 'react';
import { FretMarker } from '@/types/course';

interface FretboardProps {
  markers: FretMarker[];
  startFret?: number;
  endFret?: number;
}

const STRINGS = [1, 2, 3, 4, 5, 6] as const;

export const Fretboard: React.FC<FretboardProps> = ({
  markers,
  startFret = 0,
  endFret = 12,
}) => {
  const frets = Array.from(
    { length: Math.max(endFret - startFret + 1, 5) },
    (_, i) => startFret + i
  );

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="min-w-[620px] bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-inner select-none">
        {/* Cabeçalho de Casas */}
        <div className="grid grid-cols-[48px_repeat(auto-fit,minmax(38px,1fr))] mb-2 text-center text-xs font-mono text-neutral-500">
          <div className="text-neutral-600 font-bold">Corda</div>
          {frets.map((fret) => (
            <div key={fret} className="font-semibold">
              {fret === 0 ? 'Solta' : `${fret}ª`}
            </div>
          ))}
        </div>

        {/* Cordas e Casas */}
        <div className="space-y-4">
          {STRINGS.map((stringNum) => (
            <div
              key={stringNum}
              className="grid grid-cols-[48px_repeat(auto-fit,minmax(38px,1fr))] items-center relative"
            >
              {/* Rótulo da Corda */}
              <div className="text-xs font-mono text-neutral-400 font-bold">
                {stringNum}ª
              </div>

              {/* Trastes da Corda */}
              {frets.map((fret) => {
                const marker = markers.find(
                  (m) => m.string === stringNum && m.fret === fret
                );

                const isScale = marker?.isScaleOverlay;
                const isRoot = marker?.isRoot && !isScale;

                return (
                  <div
                    key={fret}
                    className={`h-9 flex items-center justify-center relative border-r border-neutral-700/60 ${
                      fret === 0
                        ? 'border-r-4 border-r-amber-500/70 bg-neutral-950/40'
                        : 'border-b border-b-neutral-800'
                    }`}
                  >
                    {/* Linha física de corda */}
                    <div
                      className="absolute inset-x-0 h-0.5 bg-neutral-600/70 pointer-events-none"
                      style={{
                        height: `${0.8 + (stringNum - 1) * 0.35}px`,
                      }}
                    />

                    {/* Marcador de Nota */}
                    {marker && (
                      <div
                        className={`relative z-10 w-7 h-7 rounded-full flex flex-col items-center justify-center text-[10px] font-mono transition-all shadow-md ${
                          isScale
                            ? 'bg-sky-500/20 border border-sky-400/60 text-sky-200 ring-2 ring-sky-500/10'
                            : isRoot
                            ? 'bg-amber-400 text-neutral-950 font-black ring-4 ring-amber-400/30'
                            : 'bg-amber-500 text-neutral-950 font-bold'
                        }`}
                        title={`${marker.note} (${marker.interval})`}
                      >
                        <span className="leading-none font-bold">
                          {marker.note}
                        </span>
                        <span className="text-[8px] leading-none opacity-80">
                          {marker.interval}
                        </span>
                      </div>
                    )}

                    {/* Marcações clássicas do braço nas casas 3, 5, 7, 9, 12 */}
                    {stringNum === 3 && [3, 5, 7, 9].includes(fret) && !marker && (
                      <div className="absolute w-2 h-2 rounded-full bg-neutral-700/50 pointer-events-none" />
                    )}
                    {stringNum === 3 && fret === 12 && !marker && (
                      <div className="absolute flex gap-1 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-700/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-700/60" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};