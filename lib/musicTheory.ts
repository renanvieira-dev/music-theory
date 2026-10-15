// lib/musicTheory.ts
import { FretMarker, IntervalDegree } from '@/types/course';

export const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Afinação padrão: cordas 6 a 1 (E2, A2, D3, G3, B3, E4)
export const GUITAR_STRINGS_ROOT = [
  { stringNumber: 1, openNote: 'E', midi: 64 },
  { stringNumber: 2, openNote: 'B', midi: 59 },
  { stringNumber: 3, openNote: 'G', midi: 55 },
  { stringNumber: 4, openNote: 'D', midi: 50 },
  { stringNumber: 5, openNote: 'A', midi: 45 },
  { stringNumber: 6, openNote: 'E', midi: 40 },
] as const;

export interface FormulaDefinition {
  id: string;
  name: string;
  category: 'escala' | 'triade' | 'tetrade';
  intervals: { semitones: number; degree: IntervalDegree }[];
  description: string;
}

export const DICTIONARY_FORMULAS: FormulaDefinition[] = [
  // --- ESCALAS DIATÓNICAS & PENTATÓNICAS ---
  {
    id: 'escala-maior',
    name: 'Escala Maior (Jónia)',
    category: 'escala',
    description: 'Fórmula diatónica pura: T - T - ST - T - T - T - ST.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 2, degree: '2M' },
      { semitones: 4, degree: '3M' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 9, degree: '6M' },
      { semitones: 11, degree: '7M' },
    ],
  },
  {
    id: 'escala-menor-natural',
    name: 'Escala Menor Natural (Eólia)',
    category: 'escala',
    description: 'Modo menor com graus modais bemolizados: b3, b6 e b7.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 2, degree: '2M' },
      { semitones: 3, degree: '3m' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 8, degree: '6m' },
      { semitones: 10, degree: '7m' },
    ],
  },
  {
    id: 'escala-menor-harmonica',
    name: 'Escala Menor Harmónica',
    category: 'escala',
    description: 'Menor com a 7ª Maior (sensível) restaurando o dominante V7.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 2, degree: '2M' },
      { semitones: 3, degree: '3m' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 8, degree: '6m' },
      { semitones: 11, degree: '7M' },
    ],
  },
  {
    id: 'escala-menor-melodica',
    name: 'Escala Menor Melódica',
    category: 'escala',
    description: 'Escala menor com 6M e 7M. Base da improvisação moderna.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 2, degree: '2M' },
      { semitones: 3, degree: '3m' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 9, degree: '6M' },
      { semitones: 11, degree: '7M' },
    ],
  },
  {
    id: 'penta-maior',
    name: 'Pentatónica Maior',
    category: 'escala',
    description: 'Estrutura de 5 sons sem semitons: 1, 2, 3, 5 e 6.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 2, degree: '2M' },
      { semitones: 4, degree: '3M' },
      { semitones: 7, degree: '5J' },
      { semitones: 9, degree: '6M' },
    ],
  },
  {
    id: 'penta-menor',
    name: 'Pentatónica Menor',
    category: 'escala',
    description: 'A pentatónica de blues e rock: 1, b3, 4, 5 e b7.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 10, degree: '7m' },
    ],
  },
  {
    id: 'pentablues',
    name: 'Escala Pentablues',
    category: 'escala',
    description: 'Pentatónica menor acrescida da blue note (b5 / #4).',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 5, degree: '4J' },
      { semitones: 6, degree: 'b5' },
      { semitones: 7, degree: '5J' },
      { semitones: 10, degree: '7m' },
    ],
  },

  // --- TRÍADES ---
  {
    id: 'triade-maior',
    name: 'Tríade Maior',
    category: 'triade',
    description: 'Fundamental, Terça Maior e Quinta Justa (F - 3M - 5J).',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 4, degree: '3M' },
      { semitones: 7, degree: '5J' },
    ],
  },
  {
    id: 'triade-menor',
    name: 'Tríade Menor',
    category: 'triade',
    description: 'Fundamental, Terça Menor e Quinta Justa (F - 3m - 5J).',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 7, degree: '5J' },
    ],
  },
  {
    id: 'triade-diminuta',
    name: 'Tríade Diminuta',
    category: 'triade',
    description: 'Fundamental, Terça Menor e Quinta Diminuta (F - 3m - b5).',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 6, degree: 'b5' },
    ],
  },
  {
    id: 'triade-aumentada',
    name: 'Tríade Aumentada',
    category: 'triade',
    description: 'Duas terças maiores sobrepostas (F - 3M - #5).',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 4, degree: '3M' },
      { semitones: 8, degree: '#5' },
    ],
  },

  // --- TÉTRADES ---
  {
    id: 'tetrade-7m',
    name: 'Tétrade com 7ª Maior (7M)',
    category: 'tetrade',
    description: 'F - 3M - 5J - 7M. Acorde de I7M e IV7M.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 4, degree: '3M' },
      { semitones: 7, degree: '5J' },
      { semitones: 11, degree: '7M' },
    ],
  },
  {
    id: 'tetrade-7',
    name: 'Tétrade Dominante (7)',
    category: 'tetrade',
    description: 'F - 3M - 5J - b7. Tensão do trítono entre 3M e 7m.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 4, degree: '3M' },
      { semitones: 7, degree: '5J' },
      { semitones: 10, degree: '7m' },
    ],
  },
  {
    id: 'tetrade-m7',
    name: 'Tétrade Menor com 7ª (m7)',
    category: 'tetrade',
    description: 'F - 3m - 5J - b7. Acordes do II, III e VI graus.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 7, degree: '5J' },
      { semitones: 10, degree: '7m' },
    ],
  },
  {
    id: 'tetrade-m7b5',
    name: 'Tétrade Meio Diminuta (m7b5)',
    category: 'tetrade',
    description: 'F - 3m - b5 - b7. O segundo cadencial menor e grau VII.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 6, degree: 'b5' },
      { semitones: 10, degree: '7m' },
    ],
  },
  {
    id: 'tetrade-dim',
    name: 'Tétrade Diminuta (Dim / °)',
    category: 'tetrade',
    description: 'F - 3m - b5 - bb7. Três terças menores sobrepostas.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 3, degree: '3m' },
      { semitones: 6, degree: 'b5' },
      { semitones: 9, degree: 'bb7' },
    ],
  },
  {
    id: 'tetrade-7sus4',
    name: 'Tétrade Suspensa (7sus4)',
    category: 'tetrade',
    description: 'F - 4J - 5J - b7. Quarta suspensa no lugar da terça.',
    intervals: [
      { semitones: 0, degree: 'F' },
      { semitones: 5, degree: '4J' },
      { semitones: 7, degree: '5J' },
      { semitones: 10, degree: '7m' },
    ],
  },
];

// Gera os marcadores ao longo do braço (até à casa 12)
export function generateFretboardMarkers(
  rootNote: string,
  formula: FormulaDefinition,
  maxFret = 12
): FretMarker[] {
  const rootIndex = CHROMATIC_NOTES.indexOf(rootNote);
  if (rootIndex === -1) return [];

  const markers: FretMarker[] = [];

  GUITAR_STRINGS_ROOT.forEach((str) => {
    const stringRootIdx = CHROMATIC_NOTES.indexOf(str.openNote);

    for (let fret = 0; fret <= maxFret; fret++) {
      const currentNoteIdx = (stringRootIdx + fret) % 12;
      const currentNote = CHROMATIC_NOTES[currentNoteIdx];

      // Calcula a distância intervalar em relação à tónica
      const semitonesFromRoot = (currentNoteIdx - rootIndex + 12) % 12;

      const matchingInterval = formula.intervals.find((i) => i.semitones === semitonesFromRoot);

      if (matchingInterval) {
        markers.push({
          string: str.stringNumber as 1 | 2 | 3 | 4 | 5 | 6,
          fret,
          note: currentNote,
          interval: matchingInterval.degree,
          isRoot: matchingInterval.degree === 'F',
        });
      }
    }
  });

  return markers;
}