// app/dicionario/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CHROMATIC_NOTES,
  DICTIONARY_FORMULAS,
  generateFretboardMarkers,
} from '@/lib/musicTheory';
import {
  CHORD_VOICING_PATTERNS,
  calculateVoicingMarkers,
} from '@/lib/voicings';
import { Fretboard } from '@/components/fretboard/Fretboard';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { ArrowLeft, BookOpen, Layers, Guitar } from 'lucide-react';

export default function DictionaryPage() {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedCategory, setSelectedCategory] = useState<'escala' | 'triade' | 'tetrade'>('escala');
  const [selectedFormulaId, setSelectedFormulaId] = useState('escala-maior');

  // Modo de Exibição para Acordes: Mapa Completo vs Voicing Anatómico
  const [viewMode, setViewMode] = useState<'mapa' | 'voicing'>('mapa');
  const [activeVoicingIndex, setActiveVoicingIndex] = useState(0);

  const availableFormulas = DICTIONARY_FORMULAS.filter((f) => f.category === selectedCategory);
  const currentFormula =
    DICTIONARY_FORMULAS.find((f) => f.id === selectedFormulaId) || availableFormulas[0];

  // Verifica se a fórmula atual possui voicings práticos cadastrados
  const voicingPatterns = CHORD_VOICING_PATTERNS[currentFormula.id] || null;
  const isVoicingAvailable = selectedCategory === 'tetrade' && Boolean(voicingPatterns);

  // Calcula marcadores de acordo com o modo ativo
  let displayMarkers = generateFretboardMarkers(selectedRoot, currentFormula, 12);
  let fretboardStart = 0;
  let fretboardEnd = 12;

  if (viewMode === 'voicing' && isVoicingAvailable && voicingPatterns) {
    const currentPattern = voicingPatterns[activeVoicingIndex] || voicingPatterns[0];
    const calculated = calculateVoicingMarkers(selectedRoot, currentPattern);
    displayMarkers = calculated.markers;
    fretboardStart = calculated.startFret;
    fretboardEnd = calculated.endFret;
  }

  // Amostras para áudio
  const audioMarkers = displayMarkers
    .filter((m, idx, self) =>
      self.findIndex((s) => s.string === m.string && s.fret === m.fret) === idx
    )
    .slice(0, 6);

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
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
          <BookOpen className="w-4 h-4" /> Dicionário de Escalas, Acordes & Arpejos (Vol. 4)
        </div>
        <h1 className="text-3xl font-extrabold text-white">Visualizador Livre & Seletor de Voicings</h1>
        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          Explora as 12 tonalidades nos 5 volumes: visualiza mapas de escalas ao longo do braço ou alterna
          para os formatos práticos de voicings (Drop 2 e Drop 3) utilizados no Jazz e MPB.
        </p>
      </header>

      {/* Controlos Principais */}
      <section className="my-8 space-y-6 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800">
        {/* Seletor de Categoria */}
        <div>
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
            1. Categoria:
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: 'escala', label: 'Escalas & Pentatónicas' },
              { id: 'triade', label: 'Tríades (3 Sons)' },
              { id: 'tetrade', label: 'Tétrades & Voicings' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  const firstOfCat = DICTIONARY_FORMULAS.find((f) => f.category === cat.id);
                  if (firstOfCat) setSelectedFormulaId(firstOfCat.id);
                  setViewMode('mapa');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 border-amber-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de Tónica (12 Tons) */}
        <div>
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
            2. Tónica (Fundamental):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CHROMATIC_NOTES.map((note) => (
              <button
                key={note}
                onClick={() => setSelectedRoot(note)}
                className={`w-10 h-9 rounded-lg text-xs font-mono font-bold border transition ${
                  selectedRoot === note
                    ? 'bg-amber-500 text-neutral-950 border-amber-300 shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de Fórmula */}
        <div>
          <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
            3. Estrutura / Fórmula:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFormulas.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedFormulaId(f.id);
                  setActiveVoicingIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  currentFormula.id === f.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-600'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Seletor de Modo de Exibição (Mapa Completo vs Voicing Anatómico) */}
        {isVoicingAvailable && (
          <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">Visualização:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('mapa')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    viewMode === 'mapa'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Mapa Completo (Casas 0-12)
                </button>
                <button
                  onClick={() => setViewMode('voicing')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    viewMode === 'voicing'
                      ? 'bg-sky-500 text-neutral-950 border-sky-400 font-bold'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                  }`}
                >
                  <Guitar className="w-3.5 h-3.5" /> Shapes Práticos (Drop 2 / Drop 3)
                </button>
              </div>
            </div>

            {/* Alternância de Posições (Drop 3 na 6ª vs Drop 2 na 5ª vs Cordas Agudas) */}
            {viewMode === 'voicing' && voicingPatterns && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {voicingPatterns.map((vp, idx) => (
                  <button
                    key={vp.id}
                    onClick={() => setActiveVoicingIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border transition ${
                      activeVoicingIndex === idx
                        ? 'bg-sky-400 text-neutral-950 border-sky-300'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    Posição {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Visualização no Braço */}
      <section className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white">
                {selectedRoot} {currentFormula.name}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-neutral-800 text-amber-400 border border-neutral-700">
                {currentFormula.category.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {viewMode === 'voicing' && voicingPatterns
                ? voicingPatterns[activeVoicingIndex]?.sublabel
                : currentFormula.description}
            </p>
          </div>

          <AudioPlayer markers={audioMarkers} label="Ouvir Dedilhado" />
        </div>

        <Fretboard
          markers={displayMarkers}
          startFret={fretboardStart}
          endFret={fretboardEnd}
        />

        {/* Legenda de Intervalos */}
        <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono">
          <span className="text-neutral-500">Notas & Graus:</span>
          {displayMarkers
            .filter((m, i, arr) => arr.findIndex((x) => x.note === m.note) === i)
            .map((m, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded border ${
                  m.isRoot
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                }`}
              >
                {m.note} ({m.interval})
              </span>
            ))}
        </div>
      </section>
    </main>
  );
}