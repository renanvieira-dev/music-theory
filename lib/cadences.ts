// lib/cadences.ts
import { FretMarker, IntervalDegree } from '@/types/course';

export const ALL_KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'] as const;
export type MusicalKey = typeof ALL_KEYS[number];

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export interface CadenceChord {
  name: string;
  degree: string;
  markers: FretMarker[];
  startFret: number;
  endFret: number;
}

export interface CadenceProgression {
  id: string;
  title: string;
  type: 'maior' | 'menor';
  defaultKey: MusicalKey;
  description: string;
  defaultBeatsPerChord: number;
  chords: CadenceChord[];
}

export const CADENCE_PRESETS: CadenceProgression[] = [
  {
    id: 'two-five-one-maior',
    title: 'Cadência ii - V - I Maior',
    type: 'maior',
    defaultKey: 'C',
    description: 'Subdominante (IIm7) -> Dominante (V7) -> Tónica (I7M). O pilar da harmonia popular.',
    defaultBeatsPerChord: 4,
    chords: [
      {
        name: 'Dm7',
        degree: 'IIm7',
        startFret: 4,
        endFret: 8,
        markers: [
          { string: 5, fret: 5, note: 'D', interval: 'F', isRoot: true },
          { string: 4, fret: 7, note: 'A', interval: '5J' },
          { string: 3, fret: 5, note: 'C', interval: 'b7' },
          { string: 2, fret: 6, note: 'F', interval: '3m' },
        ],
      },
      {
        name: 'G7',
        degree: 'V7',
        startFret: 2,
        endFret: 5,
        markers: [
          { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
          { string: 4, fret: 3, note: 'F', interval: 'b7' },
          { string: 3, fret: 4, note: 'B', interval: '3M' },
          { string: 2, fret: 3, note: 'D', interval: '5J' },
        ],
      },
      {
        name: 'C7M',
        degree: 'I7M',
        startFret: 2,
        endFret: 6,
        markers: [
          { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
          { string: 4, fret: 5, note: 'G', interval: '5J' },
          { string: 3, fret: 4, note: 'B', interval: '7M' },
          { string: 2, fret: 5, note: 'E', interval: '3M' },
        ],
      },
    ],
  },
  {
    id: 'two-five-one-menor',
    title: 'Cadência ii - V - i Menor',
    type: 'menor',
    defaultKey: 'A',
    description: 'Segundo cadencial meio diminuto com V7(b9) resolvendo no tom menor.',
    defaultBeatsPerChord: 4,
    chords: [
      {
        name: 'Bm7(b5)',
        degree: 'IIm7(b5)',
        startFret: 1,
        endFret: 4,
        markers: [
          { string: 5, fret: 2, note: 'B', interval: 'F', isRoot: true },
          { string: 4, fret: 3, note: 'F', interval: 'b5' },
          { string: 3, fret: 2, note: 'A', interval: 'b7' },
          { string: 2, fret: 3, note: 'D', interval: '3m' },
        ],
      },
      {
        name: 'E7(b9)',
        degree: 'V7(b9)',
        startFret: 5,
        endFret: 8,
        markers: [
          { string: 5, fret: 7, note: 'E', interval: 'F', isRoot: true },
          { string: 4, fret: 6, note: 'G#', interval: '3M' },
          { string: 3, fret: 7, note: 'D', interval: 'b7' },
          { string: 2, fret: 6, note: 'F', interval: 'b2' },
        ],
      },
      {
        name: 'Am7',
        degree: 'Im7',
        startFret: 0,
        endFret: 3,
        markers: [
          { string: 5, fret: 0, note: 'A', interval: 'F', isRoot: true },
          { string: 4, fret: 2, note: 'E', interval: '5J' },
          { string: 3, fret: 0, note: 'G', interval: 'b7' },
          { string: 2, fret: 1, note: 'C', interval: 'b3' },
        ],
      },
    ],
  },
  {
    id: 'two-subv-one',
    title: 'Cadência Cromática: ii - SubV7 - I',
    type: 'maior',
    defaultKey: 'C',
    description: 'Substituição por trítono com baixo cromático descendente (Ré -> Réb -> Dó).',
    defaultBeatsPerChord: 4,
    chords: [
      {
        name: 'Dm7',
        degree: 'IIm7',
        startFret: 4,
        endFret: 8,
        markers: [
          { string: 5, fret: 5, note: 'D', interval: 'F', isRoot: true },
          { string: 4, fret: 7, note: 'A', interval: '5J' },
          { string: 3, fret: 5, note: 'C', interval: 'b7' },
          { string: 2, fret: 6, note: 'F', interval: '3m' },
        ],
      },
      {
        name: 'Db7',
        degree: 'SubV7',
        startFret: 3,
        endFret: 6,
        markers: [
          { string: 5, fret: 4, note: 'Db', interval: 'F', isRoot: true },
          { string: 4, fret: 3, note: 'F', interval: '3M' },
          { string: 3, fret: 4, note: 'B', interval: 'b7' },
          { string: 2, fret: 6, note: 'F', interval: '3M' },
        ],
      },
      {
        name: 'C7M',
        degree: 'I7M',
        startFret: 2,
        endFret: 6,
        markers: [
          { string: 5, fret: 3, note: 'C', interval: 'F', isRoot: true },
          { string: 4, fret: 5, note: 'G', interval: '5J' },
          { string: 3, fret: 4, note: 'B', interval: '7M' },
          { string: 2, fret: 5, note: 'E', interval: '3M' },
        ],
      },
    ],
  },
  {
    id: 'vamp-dorico',
    title: 'Vamp Dórico: Im7 <-> IV7',
    type: 'menor',
    defaultKey: 'D',
    description: 'Alternância modal sustentando a 6ª Maior característica sem cadência dominante.',
    defaultBeatsPerChord: 4,
    chords: [
      {
        name: 'Dm7',
        degree: 'Im7',
        startFret: 4,
        endFret: 8,
        markers: [
          { string: 5, fret: 5, note: 'D', interval: 'F', isRoot: true },
          { string: 4, fret: 7, note: 'A', interval: '5J' },
          { string: 3, fret: 5, note: 'C', interval: 'b7' },
          { string: 2, fret: 6, note: 'F', interval: '3m' },
        ],
      },
      {
        name: 'G7',
        degree: 'IV7',
        startFret: 2,
        endFret: 5,
        markers: [
          { string: 6, fret: 3, note: 'G', interval: 'F', isRoot: true },
          { string: 4, fret: 3, note: 'F', interval: 'b7' },
          { string: 3, fret: 4, note: 'B', interval: '3M' },
          { string: 2, fret: 3, note: 'D', interval: '5J' },
        ],
      },
    ],
  },
];

const STRING_BASE_NOTES = { 1: 4, 2: 11, 3: 7, 4: 2, 5: 9, 6: 4 }; // E, B, G, D, A, E em índices cromáticos

export function getTransposedCadence(preset: CadenceProgression, targetKey: string): CadenceProgression {
  const normKey = (k: string) => (k === 'Db' ? 'C#' : k === 'Eb' ? 'D#' : k === 'Gb' ? 'F#' : k === 'Ab' ? 'G#' : k === 'Bb' ? 'A#' : k);

  const baseIdx = CHROMATIC_SCALE.indexOf(normKey(preset.defaultKey));
  const targetIdx = CHROMATIC_SCALE.indexOf(normKey(targetKey));

  if (baseIdx === -1 || targetIdx === -1) return preset;

  let semitones = (targetIdx - baseIdx + 12) % 12;
  // Mantém os shapes na zona média/confortável do braço (evita passar da casa 12)
  if (semitones > 7) semitones -= 12;

  const transposedChords: CadenceChord[] = preset.chords.map((chord) => {
    // Transpõe nome do acorde
    const rootMatch = chord.name.match(/^[A-G][#b]?/);
    let newChordName = chord.name;
    if (rootMatch) {
      const origRoot = rootMatch[0];
      const origIdx = CHROMATIC_SCALE.indexOf(normKey(origRoot));
      if (origIdx !== -1) {
        const newRootIdx = (origIdx + semitones + 12) % 12;
        newChordName = chord.name.replace(origRoot, CHROMATIC_SCALE[newRootIdx]);
      }
    }

    // Transpõe trastes e notas
    let minFret = 15;
    let maxFret = 0;

    const newMarkers: FretMarker[] = chord.markers.map((m) => {
      let newFret = m.fret + semitones;
      if (newFret < 0) newFret += 12;
      if (newFret > 13) newFret -= 12;

      minFret = Math.min(minFret, newFret);
      maxFret = Math.max(maxFret, newFret);

      const strBase = STRING_BASE_NOTES[m.string] ?? 0;
      const noteIdx = (strBase + newFret) % 12;
      const newNote = CHROMATIC_SCALE[noteIdx];

      return {
        ...m,
        fret: newFret,
        note: newNote,
      };
    });

    return {
      name: newChordName,
      degree: chord.degree,
      startFret: Math.max(0, minFret - 1),
      endFret: Math.max(4, maxFret + 1),
      markers: newMarkers,
    };
  });

  return {
    ...preset,
    chords: transposedChords,
  };
}

// Adicione ao final de lib/cadences.ts

export interface ScaleOverlayRule {
  scaleName: string;
  semitones: number[];
}

// Mapeia a escala recomendada pelo método para cada grau comum
export const DEGREE_SCALE_MAP: Record<string, ScaleOverlayRule> = {
  I7M: {
    scaleName: 'Jônia (Maior)',
    semitones: [0, 2, 4, 5, 7, 9, 11], // 1, 2, 3, 4, 5, 6, 7
  },
  IIm7: {
    scaleName: 'Dórica',
    semitones: [0, 2, 3, 5, 7, 9, 10], // 1, 2, b3, 4, 5, 6, b7
  },
  V7: {
    scaleName: 'Mixolídia',
    semitones: [0, 2, 4, 5, 7, 9, 10], // 1, 2, 3, 4, 5, 6, b7
  },
  'IIm7(b5)': {
    scaleName: 'Lócria',
    semitones: [0, 1, 3, 5, 6, 8, 10], // 1, b2, b3, 4, b5, b6, b7
  },
  'V7(b9)': {
    scaleName: 'Mixo b9 b13',
    semitones: [0, 1, 4, 5, 7, 8, 10], // 1, b2, 3, 4, 5, b6, b7
  },
  Im7: {
    scaleName: 'Eólia (Menor)',
    semitones: [0, 2, 3, 5, 7, 8, 10], // 1, 2, b3, 4, 5, b6, b7
  },
  SubV7: {
    scaleName: 'Mixo #11 (Lídia b7)',
    semitones: [0, 2, 4, 6, 7, 9, 10], // 1, 2, 3, #4, 5, 6, b7
  },
  IV7: {
    scaleName: 'Mixo #11',
    semitones: [0, 2, 4, 6, 7, 9, 10],
  },
};

const STRINGS_ROOT_PITCH = [
  { string: 1, base: 4 }, // E
  { string: 2, base: 11 }, // B
  { string: 3, base: 7 }, // G
  { string: 4, base: 2 }, // D
  { string: 5, base: 9 }, // A
  { string: 6, base: 4 }, // E
] as const;

// Gera os marcadores da escala recomendada pelas casas 0 a 12
export function generateChordScaleOverlay(
  chordName: string,
  degree: string
): { scaleName: string; markers: FretMarker[] } {
  const rootMatch = chordName.match(/^[A-G][#b]?/);
  if (!rootMatch) return { scaleName: 'Escala Pentatônica', markers: [] };

  const chordRoot = rootMatch[0];
  const normRoot =
    chordRoot === 'Db' ? 'C#' :
    chordRoot === 'Eb' ? 'D#' :
    chordRoot === 'Gb' ? 'F#' :
    chordRoot === 'Ab' ? 'G#' :
    chordRoot === 'Bb' ? 'A#' : chordRoot;

  const rootIndex = CHROMATIC_SCALE.indexOf(normRoot);
  const rule = DEGREE_SCALE_MAP[degree] || {
    scaleName: 'Pentatônica / Diatônica',
    semitones: [0, 2, 4, 7, 9],
  };

  const markers: FretMarker[] = [];

  STRINGS_ROOT_PITCH.forEach((str) => {
    for (let fret = 0; fret <= 12; fret++) {
      const currentNoteIdx = (str.base + fret) % 12;
      const semitonesFromRoot = (currentNoteIdx - rootIndex + 12) % 12;

      if (rule.semitones.includes(semitonesFromRoot)) {
        markers.push({
          string: str.string as 1 | 2 | 3 | 4 | 5 | 6,
          fret,
          note: CHROMATIC_SCALE[currentNoteIdx],
          interval: semitonesFromRoot === 0 ? 'F' : '2M',
          isRoot: semitonesFromRoot === 0,
          isScaleOverlay: true,
        });
      }
    }
  });

  return {
    scaleName: `${chordRoot} ${rule.scaleName}`,
    markers,
  };
}