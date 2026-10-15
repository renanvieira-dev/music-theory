// components/audio/AudioPlayer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Volume2, Play, Loader2 } from 'lucide-react';
import { FretMarker } from '@/types/course';

interface AudioPlayerProps {
  markers: FretMarker[];
  label?: string;
}

// Mapeamento MIDI da afinação padrão (6ª corda E2 até 1ª corda E4)
const STRING_ROOT_MIDI: Record<number, number> = {
  6: 40, // E2
  5: 45, // A2
  4: 50, // D3
  3: 55, // G3
  2: 59, // B3
  1: 64, // E4
};

// Gerenciador global de instrumento (Singleton com Promise compartilhada)
type InstrumentType = Tone.Sampler | Tone.PolySynth;
let globalInstrument: InstrumentType | null = null;
let instrumentPromise: Promise<InstrumentType> | null = null;

function getAcousticInstrument(): Promise<InstrumentType> {
  if (globalInstrument) {
    return Promise.resolve(globalInstrument);
  }
  if (instrumentPromise) {
    return instrumentPromise;
  }

  instrumentPromise = new Promise((resolve) => {
    let resolved = false;

    // Fallback: se a CDN externa demorar mais de 2.5s, ativa o sintetizador de violão local
    const fallbackTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        const synthFallback = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle8' },
          envelope: {
            attack: 0.005,
            decay: 0.35,
            sustain: 0.1,
            release: 1.2,
          },
        }).toDestination();
        globalInstrument = synthFallback;
        resolve(synthFallback);
      }
    }, 2500);

    try {
      const sampler = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          C3: 'C3.mp3',
          D3: 'D3.mp3',
          G3: 'G3.mp3',
          A3: 'A3.mp3',
          C4: 'C4.mp3',
          E4: 'E4.mp3',
          G4: 'G4.mp3',
        },
        baseUrl: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/guitar-acoustic/',
        onload: () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(fallbackTimer);
            globalInstrument = sampler;
            resolve(sampler);
          }
        },
        onerror: () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(fallbackTimer);
            const synthFallback = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'triangle8' },
              envelope: {
                attack: 0.005,
                decay: 0.35,
                sustain: 0.1,
                release: 1.2,
              },
            }).toDestination();
            globalInstrument = synthFallback;
            resolve(synthFallback);
          }
        },
      }).toDestination();
    } catch {
      if (!resolved) {
        resolved = true;
        clearTimeout(fallbackTimer);
        const synthFallback = new Tone.PolySynth().toDestination();
        globalInstrument = synthFallback;
        resolve(synthFallback);
      }
    }
  });

  return instrumentPromise;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ markers, label = 'Ouvir no Violão' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAcousticInstrument().then(() => {
      if (mounted) {
        setIsReady(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const playNotes = async () => {
    if (isPlaying || !isReady || markers.length === 0) return;
    setIsPlaying(true);

    try {
      await Tone.start();
      const instrument = await getAcousticInstrument();

      // Converte corda e casa para nome de nota real (ex: C3, G3, E4)
      const notesToPlay = markers.map((m) => {
        const baseMidi = STRING_ROOT_MIDI[m.string] || 40;
        const noteMidi = baseMidi + m.fret;
        return Tone.Frequency(noteMidi, 'midi').toNote();
      });

      const now = Tone.now();

      // Arpejo natural com 220ms de intervalo entre cordas
      notesToPlay.forEach((note, idx) => {
        instrument.triggerAttackRelease(note, '2n', now + idx * 0.22);
      });

      const totalDuration = notesToPlay.length * 0.22 + 1.2;
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration * 1000);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={playNotes}
      disabled={isPlaying || !isReady}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
        !isReady
          ? 'bg-neutral-900 border-neutral-800 text-neutral-500 cursor-wait'
          : isPlaying
          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
          : 'bg-neutral-800/80 hover:bg-neutral-700/80 border-neutral-700 text-neutral-200 cursor-pointer'
      }`}
    >
      {!isReady ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-500" />
      ) : isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
      ) : (
        <Play className="w-3.5 h-3.5 text-amber-400" />
      )}
      <span>{!isReady ? 'Carregando timbre...' : isPlaying ? 'Soando...' : label}</span>
    </button>
  );
};