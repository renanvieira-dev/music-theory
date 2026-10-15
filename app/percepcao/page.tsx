// app/percepcao/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';
import { Fretboard } from '@/components/fretboard/Fretboard';
import { FretMarker } from '@/types/course';
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Ear,
  Sparkles,
  Play,
} from 'lucide-react';

type ChallengeCategory = 'intervalos' | 'triades' | 'tetrades';
type PlaybackStyle = 'melodico' | 'harmonico';

interface ChallengeItem {
  id: string;
  name: string;
  description: string;
  semitones: number[];
  options: string[];
  correctAnswer: string;
}

const INTERVAL_CHALLENGES: ChallengeItem[] = [
  {
    id: 'int-3m-3m',
    name: 'Terça Maior vs. Terça Menor',
    description: 'A 3M soa aberta e alegre (2 tons); a 3m soa introspectiva (1,5 tom).',
    semitones: [0, 4],
    options: ['3ª Maior (3M)', '3ª Menor (3m)'],
    correctAnswer: '3ª Maior (3M)',
  },
  {
    id: 'int-tri-5j',
    name: 'Quinta Justa vs. Trítono',
    description: 'A 5J soa estável e consonante (power chord); o Trítono soa tenso e instável.',
    semitones: [0, 6],
    options: ['5ª Justa (5J)', 'Trítono (4aum / 5dim)'],
    correctAnswer: 'Trítono (4aum / 5dim)',
  },
  {
    id: 'int-7m-7m',
    name: 'Sétima Maior vs. Sétima Menor',
    description: 'A 7M dista meio tom da oitava; a 7m dista 1 tom da oitava (blues/dominante).',
    semitones: [0, 10],
    options: ['7ª Maior (7M)', '7ª Menor (7m)'],
    correctAnswer: '7ª Menor (7m)',
  },
];

const TRIAD_CHALLENGES: ChallengeItem[] = [
  {
    id: 'tri-maior',
    name: 'Tríade Maior',
    description: 'F - 3M - 5J. Sonoridade solar e estável.',
    semitones: [0, 4, 7],
    options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'],
    correctAnswer: 'Maior',
  },
  {
    id: 'tri-menor',
    name: 'Tríade Menor',
    description: 'F - 3m - 5J. Sonoridade intimista e nostálgica.',
    semitones: [0, 3, 7],
    options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'],
    correctAnswer: 'Menor',
  },
  {
    id: 'tri-dim',
    name: 'Tríade Diminuta',
    description: 'F - 3m - b5. Máxima tensão com duas terças menores sobrepostas.',
    semitones: [0, 3, 6],
    options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'],
    correctAnswer: 'Diminuta',
  },
  {
    id: 'tri-aum',
    name: 'Tríade Aumentada',
    description: 'F - 3M - #5. Sonoridade suspensa e cinematográfica.',
    semitones: [0, 4, 8],
    options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'],
    correctAnswer: 'Aumentada',
  },
];

const TETRAD_CHALLENGES: ChallengeItem[] = [
  {
    id: 'tet-7m',
    name: 'Tétrade com 7ª Maior (7M)',
    description: 'F - 3M - 5J - 7M. O som sereno e sofisticado da Bossa Nova.',
    semitones: [0, 4, 7, 11],
    options: ['7M (Maior com 7ªM)', '7 (Dominante)', 'm7 (Menor com 7ª)', 'm7(b5) (Meio Diminuto)'],
    correctAnswer: '7M (Maior com 7ªM)',
  },
  {
    id: 'tet-7',
    name: 'Tétrade Dominante (7)',
    description: 'F - 3M - 5J - b7. Tensão do trítono querendo resolver na tónica.',
    semitones: [0, 4, 7, 10],
    options: ['7M (Maior com 7ªM)', '7 (Dominante)', 'm7 (Menor com 7ª)', 'm7(b5) (Meio Diminuto)'],
    correctAnswer: '7 (Dominante)',
  },
  {
    id: 'tet-m7',
    name: 'Tétrade Menor com 7ª (m7)',
    description: 'F - 3m - 5J - b7. A tétrade típica do segundo grau cadencial menor.',
    semitones: [0, 3, 7, 10],
    options: ['7M (Maior com 7ªM)', '7 (Dominante)', 'm7 (Menor com 7ª)', 'm7(b5) (Meio Diminuto)'],
    correctAnswer: 'm7 (Menor com 7ª)',
  },
  {
    id: 'tet-m7b5',
    name: 'Tétrade Meio Diminuta (m7b5)',
    description: 'F - 3m - b5 - b7. A cor dramática do ii - V - i menor.',
    semitones: [0, 3, 6, 10],
    options: ['7M (Maior com 7ªM)', '7 (Dominante)', 'm7 (Menor com 7ª)', 'm7(b5) (Meio Diminuto)'],
    correctAnswer: 'm7(b5) (Meio Diminuto)',
  },
];

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function EarTrainingPage() {
  const [category, setCategory] = useState<ChallengeCategory>('intervalos');
  const [playbackStyle, setPlaybackStyle] = useState<PlaybackStyle>('harmonico');
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeItem>(INTERVAL_CHALLENGES[0]);
  const [rootMidi, setRootMidi] = useState(48); // C3
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [revealedMarkers, setRevealedMarkers] = useState<FretMarker[]>([]);

  const synthRef = useRef<Tone.PolySynth | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.005, decay: 0.8, sustain: 0.1, release: 1.2 },
    }).toDestination();
    synthRef.current.volume.value = -3;

    pickNewChallenge(category);

    return () => {
      synthRef.current?.dispose();
    };
  }, []);

  const getChallengesList = (cat: ChallengeCategory) => {
    switch (cat) {
      case 'intervalos':
        return INTERVAL_CHALLENGES;
      case 'triades':
        return TRIAD_CHALLENGES;
      case 'tetrades':
        return TETRAD_CHALLENGES;
    }
  };

  const pickNewChallenge = (cat: ChallengeCategory) => {
    const list = getChallengesList(cat);
    const randomItem = list[Math.floor(Math.random() * list.length)];
    // Tónica aleatória entre A2 (45) e E3 (52)
    const randomRoot = 45 + Math.floor(Math.random() * 8);

    setCurrentChallenge(randomItem);
    setRootMidi(randomRoot);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setRevealedMarkers([]);

    // Toca o áudio do novo desafio
    playChallengeAudio(randomItem, randomRoot, playbackStyle);
  };

  const playChallengeAudio = async (
    item: ChallengeItem,
    baseMidi: number,
    style: PlaybackStyle
  ) => {
    await Tone.start();
    if (!synthRef.current) return;

    const notes = item.semitones.map((semi) =>
      Tone.Frequency(baseMidi + semi, 'midi').toNote()
    );

    const now = Tone.now();

    if (style === 'harmonico') {
      // Palhetada simultânea / arpejo curto
      notes.forEach((n, idx) => {
        synthRef.current?.triggerAttackRelease(n, '1.6n', now + idx * 0.02, 0.85);
      });
    } else {
      // Melódico: nota a nota
      notes.forEach((n, idx) => {
        synthRef.current?.triggerAttackRelease(n, '0.45n', now + idx * 0.35, 0.9);
      });
    }
  };

  const handleSelectAnswer = (ans: string) => {
    if (selectedAnswer !== null) return; // Já respondeu

    setSelectedAnswer(ans);
    const correct = ans === currentChallenge.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }

    // Mapeia marcadores no braço na corda 5 e cordas adjacentes para revelar a resposta
    const markers: FretMarker[] = currentChallenge.semitones.map((semi, idx) => {
      const midiVal = rootMidi + semi;
      const noteIdx = midiVal % 12;
      const noteName = CHROMATIC_SCALE[noteIdx];
      const fret = Math.max(0, (midiVal - 45) % 12);

      return {
        string: (idx === 0 ? 5 : (Math.min(4, idx + 1) as any)) as 1 | 2 | 3 | 4 | 5 | 6,
        fret,
        note: noteName,
        interval: idx === 0 ? 'F' : '3M',
        isRoot: idx === 0,
      };
    });

    setRevealedMarkers(markers);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-5xl mx-auto">
      {/* Navegação */}
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para a Trilha de Módulos
        </Link>
      </nav>

      {/* Cabeçalho */}
      <header className="space-y-2 pb-6 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
            <Ear className="w-4 h-4" /> Laboratório de Percepção Auditiva (Ear Training)
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Pontos: <strong className="text-white">{score}</strong>
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              🔥 Sequência: {streak}
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Treinador de Ouvido Musical</h1>
        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          Escuta os acordes e intervalos tocados pelo instrumento e identifica a sua estrutura acústica.
          Treina a ligação direta entre o teu ouvido e a geometria das cordas.
        </p>
      </header>

      {/* Controlos de Treino */}
      <section className="my-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
        {/* Categorias */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
            Modalidade:
          </label>
          <div className="flex gap-2">
            {[
              { id: 'intervalos', label: '1. Intervalos' },
              { id: 'triades', label: '2. Tríades' },
              { id: 'tetrades', label: '3. Tétrades' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id as any);
                  pickNewChallenge(cat.id as any);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  category === cat.id
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Estilo de Execução (Melódico vs Harmónico) */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
            Modo de Reprodução:
          </label>
          <div className="flex gap-2">
            {[
              { id: 'harmonico', label: 'Harmónico (Junto)' },
              { id: 'melodico', label: 'Melódico (Arpejo)' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setPlaybackStyle(st.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  playbackStyle === st.id
                    ? 'bg-sky-500 text-neutral-950 border-sky-400 font-bold'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cartão de Audição e Respostas */}
      <section className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            onClick={() => playChallengeAudio(currentChallenge, rootMidi, playbackStyle)}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-amber-500/20"
            title="Ouvir novamente"
          >
            <Volume2 className="w-8 h-8" />
          </button>
          <span className="text-xs font-mono text-neutral-400">
            Clica para ouvir o som novamente
          </span>
        </div>

        {/* Opções de Resposta */}
        <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          {currentChallenge.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isRightOption = opt === currentChallenge.correctAnswer;

            let buttonStyle = 'bg-neutral-800/80 text-neutral-200 border-neutral-700 hover:border-amber-500/60 hover:text-white';

            if (selectedAnswer !== null) {
              if (isRightOption) {
                buttonStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-500/20 text-rose-300 border-rose-500 font-bold';
              } else {
                buttonStyle = 'opacity-40 bg-neutral-800/40 text-neutral-500 border-neutral-800';
              }
            }

            return (
              <button
                key={opt}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelectAnswer(opt)}
                className={`p-4 rounded-xl border text-sm font-semibold transition flex items-center justify-between ${buttonStyle}`}
              >
                <span>{opt}</span>
                {selectedAnswer !== null && isRightOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {selectedAnswer !== null && isSelected && !isRightOption && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback da Resposta */}
        {selectedAnswer !== null && (
          <div className="pt-4 max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-left ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <span className="font-bold text-sm block">
                  {isCorrect ? 'Excelente! Resposta Correta.' : 'Não foi dessa vez.'}
                </span>
                <p>{currentChallenge.description}</p>
              </div>
            </div>

            {/* Próximo Desafio */}
            <button
              onClick={() => pickNewChallenge(category)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Próximo Desafio
            </button>
          </div>
        )}
      </section>

      {/* Revelação no Braço após responder */}
      {selectedAnswer !== null && revealedMarkers.length > 0 && (
        <section className="mt-8 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block">
            Visualização no Instrumento (Notas Ouvidas)
          </span>
          <Fretboard markers={revealedMarkers} startFret={0} endFret={8} />
        </section>
      )}
    </main>
  );
}