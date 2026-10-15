// app/praticador/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';
import {
  CADENCE_PRESETS,
  ALL_KEYS,
  MusicalKey,
  getTransposedCadence,
  generateChordScaleOverlay,
} from '@/lib/cadences';
import { Fretboard } from '@/components/fretboard/Fretboard';
import {
  ArrowLeft,
  Play,
  Square,
  Timer,
  Activity,
  Music2,
  Volume2,
  VolumeX,
  Sparkles,
  Guitar,
} from 'lucide-react';

const STRING_MIDI_MAP: Record<number, number> = {
  6: 40,
  5: 45,
  4: 50,
  3: 55,
  2: 59,
  1: 64,
};

const ACOUSTIC_GUITAR_BASE_URL =
  'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_guitar_nylon-mp3/';

type CompingPattern = 'sustentado' | 'bossa' | 'seminimas';

export default function PracticerPage() {
  const [bpm, setBpm] = useState(80);
  const [timeSignature, setTimeSignature] = useState<'4/4' | '3/4' | '2/4' | '6/8'>('4/4');
  const [selectedKey, setSelectedKey] = useState<MusicalKey>('C');
  const [selectedCadenceId, setSelectedCadenceId] = useState(CADENCE_PRESETS[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Novos controles: Mute, Estilo de Comping e Overlay de Escala
  const [isMuted, setIsMuted] = useState(false);
  const [compingPattern, setCompingPattern] = useState<CompingPattern>('sustentado');
  const [showScaleOverlay, setShowScaleOverlay] = useState(true);

  const baseCadence =
    CADENCE_PRESETS.find((c) => c.id === selectedCadenceId) || CADENCE_PRESETS[0];
  const activeProgression = getTransposedCadence(baseCadence, selectedKey);
  const currentChord = activeProgression.chords[currentChordIndex];

  // Cálculo da Escala Recomendada
  const { scaleName: recommendedScale, markers: scaleMarkers } =
    generateChordScaleOverlay(currentChord.name, currentChord.degree);

  // Combina marcadores: notas da escala como overlay + notas do acorde em destaque
  const combinedMarkers = showScaleOverlay
    ? [
        ...scaleMarkers.filter(
          (sm) => !currentChord.markers.some((cm) => cm.string === sm.string && cm.fret === sm.fret)
        ),
        ...currentChord.markers,
      ]
    : currentChord.markers;

  const guitarSamplerRef = useRef<Tone.Sampler | null>(null);
  const fallbackSynthRef = useRef<Tone.PolySynth | null>(null);
  const clickSynthRef = useRef<Tone.MembraneSynth | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const beatsPerMeasure =
    timeSignature === '3/4' ? 3 : timeSignature === '2/4' ? 2 : timeSignature === '6/8' ? 6 : 4;

  useEffect(() => {
    fallbackSynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.005, decay: 0.8, sustain: 0.1, release: 1.2 },
    }).toDestination();
    fallbackSynthRef.current.volume.value = -4;

    clickSynthRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.005,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.04 },
    }).toDestination();

    try {
      guitarSamplerRef.current = new Tone.Sampler({
        urls: {
          E2: 'E2.mp3',
          A2: 'A2.mp3',
          D3: 'D3.mp3',
          G3: 'G3.mp3',
          B3: 'B3.mp3',
          E4: 'E4.mp3',
        },
        baseUrl: ACOUSTIC_GUITAR_BASE_URL,
        onload: () => setIsAudioReady(true),
        onerror: () => setIsAudioReady(true),
      }).toDestination();
    } catch {
      setIsAudioReady(true);
    }

    const safetyTimeout = setTimeout(() => setIsAudioReady(true), 2000);

    return () => {
      clearTimeout(safetyTimeout);
      guitarSamplerRef.current?.dispose();
      fallbackSynthRef.current?.dispose();
      clickSynthRef.current?.dispose();
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, []);

  const playGuitarStrum = (markers: typeof currentChord.markers, duration = '2n') => {
    if (isMuted || markers.length === 0) return;

    const sortedMarkers = [...markers].sort((a, b) => b.string - a.string);
    const now = Tone.now();
    const noteNames = sortedMarkers.map((m) => {
      const baseMidi = STRING_MIDI_MAP[m.string] || 40;
      return Tone.Frequency(baseMidi + m.fret, 'midi').toNote();
    });

    if (guitarSamplerRef.current && guitarSamplerRef.current.loaded) {
      try {
        noteNames.forEach((note, idx) => {
          guitarSamplerRef.current?.triggerAttackRelease(note, duration, now + idx * 0.022, 0.82);
        });
        return;
      } catch (err) {
        console.warn('Fallback de áudio:', err);
      }
    }

    if (fallbackSynthRef.current) {
      noteNames.forEach((note, idx) => {
        fallbackSynthRef.current?.triggerAttackRelease(note, duration, now + idx * 0.022, 0.7);
      });
    }
  };

  const handleToggleRunning = async () => {
    if (isRunning) {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      setIsRunning(false);
      setCurrentBeat(0);
      return;
    }

    await Tone.start();
    setIsRunning(true);
    setCurrentBeat(0);
    setCurrentChordIndex(0);

    // Toca o primeiro acorde
    playGuitarStrum(activeProgression.chords[0].markers);

    let localBeat = 0;
    let localChordIdx = 0;
    const intervalMs = (60 / bpm) * 1000;

    intervalIdRef.current = setInterval(() => {
      localBeat = (localBeat + 1) % beatsPerMeasure;
      setCurrentBeat(localBeat);

      // Clique do Metrônomo
      const clickPitch = localBeat === 0 ? 'G4' : 'C4';
      clickSynthRef.current?.triggerAttackRelease(clickPitch, '32n');

      // Avança o acorde no tempo 1 do compasso
      if (localBeat === 0) {
        localChordIdx = (localChordIdx + 1) % activeProgression.chords.length;
        setCurrentChordIndex(localChordIdx);
        playGuitarStrum(activeProgression.chords[localChordIdx].markers, '1.8n');
      } else {
        // Levadas rítmicas adicionais
        if (compingPattern === 'seminimas') {
          playGuitarStrum(activeProgression.chords[localChordIdx].markers, '4n');
        } else if (compingPattern === 'bossa' && (localBeat === 2 || localBeat === 3)) {
          playGuitarStrum(activeProgression.chords[localChordIdx].markers, '8n');
        }
      }
    }, intervalMs);
  };

  const handleKeyChange = (key: MusicalKey) => {
    if (isRunning && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      setIsRunning(false);
      setCurrentBeat(0);
    }
    setSelectedKey(key);
    setCurrentChordIndex(0);
  };

  const handleCadenceSelect = (id: string) => {
    if (isRunning && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      setIsRunning(false);
      setCurrentBeat(0);
    }
    setSelectedCadenceId(id);
    setCurrentChordIndex(0);
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
            <Timer className="w-4 h-4" /> Estação de Improviso & Metrônomo (Vol. 5)
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAudioReady ? 'Violão Pronto' : 'Carregando Som...'}</span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Praticador de Cadências & Solo</h1>
        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          Toque com a base harmônica em qualquer um dos 12 tons. Visualize os formatos do acorde e a
          escala guia no braço para solar no tempo exato de cada resolução.
        </p>
      </header>

      {/* Seletor de Tonalidade (12 Tons) */}
      <section className="my-6 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Music2 className="w-3.5 h-3.5 text-amber-400" /> Tom da Cadência (Transposição Automática):
          </label>
          <span className="text-xs font-mono text-amber-400 font-bold">Tom Selecionado: {selectedKey}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_KEYS.map((k) => (
            <button
              key={k}
              disabled={isRunning}
              onClick={() => handleKeyChange(k)}
              className={`w-11 h-9 rounded-xl text-xs font-mono font-bold border transition-all ${
                selectedKey === k
                  ? 'bg-amber-500 text-neutral-950 border-amber-300 shadow-sm scale-105'
                  : 'bg-neutral-800/90 text-neutral-300 border-neutral-700 hover:border-neutral-500 hover:text-white'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      {/* Painel do Metrônomo & Levadas */}
      <section className="mb-8 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* BPM */}
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Andamento</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold font-mono text-white">{bpm}</span>
              <span className="text-sm font-mono text-amber-400">BPM</span>
            </div>
            <input
              type="range"
              min={40}
              max={220}
              value={bpm}
              disabled={isRunning}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-2"
            />
          </div>

          {/* Levada Rítmica / Comping */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">Levada do Violão</span>
            <div className="flex gap-1.5">
              {[
                { id: 'sustentado', label: 'Sustentado' },
                { id: 'bossa', label: 'Bossa/Sync' },
                { id: 'seminimas', label: '4 Batidas' },
              ].map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => setCompingPattern(pat.id as CompingPattern)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    compingPattern === pat.id
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                  }`}
                >
                  {pat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botões Mute e Start/Stop */}
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={() => setIsMuted((m) => !m)}
              className={`p-3.5 rounded-xl border transition ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
              }`}
              title={isMuted ? 'Violão Silenciado (Apenas Metrônomo)' : 'Violão Ativado'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Guitar className="w-5 h-5" />}
            </button>

            <button
              onClick={handleToggleRunning}
              disabled={!isAudioReady && !isRunning}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold border transition-all ${
                !isAudioReady && !isRunning
                  ? 'opacity-60 cursor-not-allowed bg-neutral-800 text-neutral-400 border-neutral-700'
                  : isRunning
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-300 shadow-md'
              }`}
            >
              {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Parar Base' : 'Iniciar Base'}</span>
            </button>
          </div>
        </div>

        {/* Pulsos Visuais */}
        <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 uppercase">Tempo:</span>
            <div className="flex gap-2">
              {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
                const isActive = isRunning && currentBeat === idx;
                const isDownbeat = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isActive
                        ? isDownbeat
                          ? 'bg-amber-400 text-neutral-950 scale-110 ring-4 ring-amber-400/30'
                          : 'bg-sky-400 text-neutral-950 scale-105 ring-2 ring-sky-400/30'
                        : 'bg-neutral-800 text-neutral-500 border border-neutral-700/60'
                    }`}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle de Overlay da Escala */}
          <button
            onClick={() => setShowScaleOverlay((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
              showScaleOverlay
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showScaleOverlay ? 'Escala Guia Ativa' : 'Mostrar Escala Guia'}</span>
          </button>
        </div>
      </section>

      {/* Seletor de Cadência */}
      <section className="mb-8 space-y-4">
        <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
          Progressão Harmônica:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CADENCE_PRESETS.map((cad) => {
            const active = selectedCadenceId === cad.id;
            const transposedPreview = getTransposedCadence(cad, selectedKey);

            return (
              <button
                key={cad.id}
                onClick={() => handleCadenceSelect(cad.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  active
                    ? 'bg-amber-500/10 border-amber-500/60 text-neutral-100'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-white">{cad.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-amber-400 font-bold">
                    TOM: {selectedKey}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-1">{cad.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  {transposedPreview.chords.map((ch, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-mono px-2 py-1 rounded border ${
                        active && currentChordIndex === idx && isRunning
                          ? 'bg-amber-400 text-neutral-950 font-bold border-amber-300'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                      }`}
                    >
                      {ch.name}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Visualização Integrada no Braço */}
      <section className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">
              Acorde em Execução
            </span>
            <div className="flex items-baseline gap-2.5 mt-0.5">
              <span className="text-3xl font-black text-white">{currentChord.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-sky-400 border border-neutral-700">
                Grau {currentChord.degree}
              </span>
            </div>
          </div>

          {/* Destaque da Escala Recomendada */}
          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-neutral-400 block">
              Escala Recomendada para Improviso:
            </span>
            <span className="text-sm font-extrabold text-sky-300 font-mono">
              {recommendedScale}
            </span>
          </div>
        </div>

        {/* Fretboard com Overlay */}
        <Fretboard
          markers={combinedMarkers}
          startFret={showScaleOverlay ? 0 : currentChord.startFret}
          endFret={showScaleOverlay ? 12 : currentChord.endFret}
        />

        {/* Legenda */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-300" />
            <span>Notas da Tétrade (Acorde)</span>
          </div>
          {showScaleOverlay && (
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-sky-500/20 border border-sky-400 text-sky-300" />
              <span>Notas da Escala Guia (Solo)</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}