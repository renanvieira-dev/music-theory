// lib/voicings.ts
import { FretMarker, IntervalDegree } from '@/types/course';

export const CHROMATIC_NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const STRING_BASE_SEMITONES: Record<number, number> = {
  1: 4,  // E
  2: 11, // B
  3: 7,  // G
  4: 2,  // D
  5: 9,  // A
  6: 4,  // E
};

export type VoicingType = 'drop3_str6' | 'drop2_str5' | 'drop2_str4';

export interface VoicingShapeDefinition {
  id: VoicingType;
  label: string;
  sublabel: string;
  strings: (1 | 2 | 3 | 4 | 5 | 6)[];
  // Padrão de intervalos relativos da digitação: [corda_mais_grave, ..., corda_mais_aguda]
  intervals: { semitoneFromRoot: number; degree: IntervalDegree; isRoot?: boolean }[];
  fretOffsets: number[]; // casas relativas à casa da fundamental
}

// Mapas anatómicos das famílias de tétrades
export const CHORD_VOICING_PATTERNS: Record<string, VoicingShapeDefinition[]> = {
  // Tétrade com 7ª Maior (7M)
  'tetrade-7m': [
    {
      id: 'drop3_str6',
      label: 'Posição 1: Drop 3 (Baixo na 6ª Corda)',
      sublabel: 'Cordas 6, 4, 3 e 2 (Fundamental - 7M - 3M - 5J)',
      strings: [6, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 11, degree: '7M' },
        { semitoneFromRoot: 4, degree: '3M' },
        { semitoneFromRoot: 7, degree: '5J' },
      ],
      fretOffsets: [0, -1, 0, -1],
    },
    {
      id: 'drop2_str5',
      label: 'Posição 2: Drop 2 (Baixo na 5ª Corda)',
      sublabel: 'Cordas 5, 4, 3 e 2 (Fundamental - 5J - 7M - 3M)',
      strings: [5, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 11, degree: '7M' },
        { semitoneFromRoot: 4, degree: '3M' },
      ],
      fretOffsets: [0, 2, 1, 2],
    },
    {
      id: 'drop2_str4',
      label: 'Posição 3: Cordas Agudas (Drop 2)',
      sublabel: 'Cordas 4, 3, 2 e 1 (Fundamental - 5J - 7M - 3M)',
      strings: [4, 3, 2, 1],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 11, degree: '7M' },
        { semitoneFromRoot: 4, degree: '3M' },
      ],
      fretOffsets: [0, 2, 2, 2],
    },
  ],

  // Tétrade Dominante (7)
  'tetrade-7': [
    {
      id: 'drop3_str6',
      label: 'Posição 1: Drop 3 (Baixo na 6ª Corda)',
      sublabel: 'Cordas 6, 4, 3 e 2 (Fundamental - b7 - 3M - 5J)',
      strings: [6, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 4, degree: '3M' },
        { semitoneFromRoot: 7, degree: '5J' },
      ],
      fretOffsets: [0, -2, 0, -2],
    },
    {
      id: 'drop2_str5',
      label: 'Posição 2: Drop 2 (Baixo na 5ª Corda)',
      sublabel: 'Cordas 5, 4, 3 e 2 (Fundamental - 5J - b7 - 3M)',
      strings: [5, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 4, degree: '3M' },
      ],
      fretOffsets: [0, 2, 0, 2],
    },
    {
      id: 'drop2_str4',
      label: 'Posição 3: Cordas Agudas (Drop 2)',
      sublabel: 'Cordas 4, 3, 2 e 1 (Fundamental - 5J - b7 - 3M)',
      strings: [4, 3, 2, 1],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 4, degree: '3M' },
      ],
      fretOffsets: [0, 2, 1, 2],
    },
  ],

  // Tétrade Menor com 7ª (m7)
  'tetrade-m7': [
    {
      id: 'drop3_str6',
      label: 'Posição 1: Drop 3 (Baixo na 6ª Corda)',
      sublabel: 'Cordas 6, 4, 3 e 2 (Fundamental - b7 - 3m - 5J)',
      strings: [6, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
        { semitoneFromRoot: 7, degree: '5J' },
      ],
      fretOffsets: [0, -2, -1, -2],
    },
    {
      id: 'drop2_str5',
      label: 'Posição 2: Drop 2 (Baixo na 5ª Corda)',
      sublabel: 'Cordas 5, 4, 3 e 2 (Fundamental - 5J - b7 - 3m)',
      strings: [5, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
      ],
      fretOffsets: [0, 2, 0, 1],
    },
    {
      id: 'drop2_str4',
      label: 'Posição 3: Cordas Agudas (Drop 2)',
      sublabel: 'Cordas 4, 3, 2 e 1 (Fundamental - 5J - b7 - 3m)',
      strings: [4, 3, 2, 1],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 7, degree: '5J' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
      ],
      fretOffsets: [0, 2, 1, 1],
    },
  ],

  // Tétrade Meio Diminuta [m7(b5)]
  'tetrade-m7b5': [
    {
      id: 'drop3_str6',
      label: 'Posição 1: Drop 3 (Baixo na 6ª Corda)',
      sublabel: 'Cordas 6, 4, 3 e 2 (Fundamental - b7 - 3m - b5)',
      strings: [6, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
        { semitoneFromRoot: 6, degree: 'b5' },
      ],
      fretOffsets: [0, -2, -1, -3],
    },
    {
      id: 'drop2_str5',
      label: 'Posição 2: Drop 2 (Baixo na 5ª Corda)',
      sublabel: 'Cordas 5, 4, 3 e 2 (Fundamental - b5 - b7 - 3m)',
      strings: [5, 4, 3, 2],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 6, degree: 'b5' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
      ],
      fretOffsets: [0, 1, 0, 1],
    },
    {
      id: 'drop2_str4',
      label: 'Posição 3: Cordas Agudas (Drop 2)',
      sublabel: 'Cordas 4, 3, 2 e 1 (Fundamental - b5 - b7 - 3m)',
      strings: [4, 3, 2, 1],
      intervals: [
        { semitoneFromRoot: 0, degree: 'F', isRoot: true },
        { semitoneFromRoot: 6, degree: 'b5' },
        { semitoneFromRoot: 10, degree: '7m' },
        { semitoneFromRoot: 3, degree: '3m' },
      ],
      fretOffsets: [0, 1, 1, 1],
    },
  ],
};

// Calcula a posição física do voicing transposta para a tónica desejada
export function calculateVoicingMarkers(
  rootNote: string,
  voicingDef: VoicingShapeDefinition
): { markers: FretMarker[]; startFret: number; endFret: number } {
  const normKey = (k: string) =>
    k === 'Db' ? 'C#' : k === 'Eb' ? 'D#' : k === 'Gb' ? 'F#' : k === 'Ab' ? 'G#' : k === 'Bb' ? 'A#' : k;

  const rootIdx = CHROMATIC_NOTES.indexOf(normKey(rootNote));
  if (rootIdx === -1) return { markers: [], startFret: 0, endFret: 5 };

  // Localiza a casa da fundamental na corda do baixo
  const bassString = voicingDef.strings[0];
  const bassBaseSemitone = STRING_BASE_SEMITONES[bassString] ?? 4;
  let rootFret = (rootIdx - bassBaseSemitone + 12) % 12;

  // Se o shape for Drop 3 e tiver offsets negativos, sobe uma oitava se for menor que a casa 2
  if (voicingDef.id === 'drop3_str6' && rootFret < 3) {
    rootFret += 12;
  }

  const markers: FretMarker[] = [];
  let minFret = 15;
  let maxFret = 0;

  voicingDef.strings.forEach((stringNum, idx) => {
    const offset = voicingDef.fretOffsets[idx];
    let fret = rootFret + offset;

    // Normaliza para dentro do braço utilizável
    if (fret < 0) fret += 12;
    if (fret > 14) fret -= 12;

    minFret = Math.min(minFret, fret);
    maxFret = Math.max(maxFret, fret);

    const stringBase = STRING_BASE_SEMITONES[stringNum] ?? 0;
    const noteIdx = (stringBase + fret) % 12;
    const noteName = CHROMATIC_NOTES[noteIdx];

    const intervalInfo = voicingDef.intervals[idx];

    markers.push({
      string: stringNum,
      fret,
      note: noteName,
      interval: intervalInfo.degree,
      isRoot: intervalInfo.isRoot,
    });
  });

  return {
    markers,
    startFret: Math.max(0, minFret - 1),
    endFret: Math.max(4, maxFret + 1),
  };
}