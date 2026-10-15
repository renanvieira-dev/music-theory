// types/course.ts

export type CourseLevel = 'iniciante' | 'intermediario' | 'avancado';

export type IntervalDegree =
  | 'F'    // Fundamental
  | '2m' | 'b2'
  | '2M' | '2'
  | '3m' | 'b3'
  | '3M' | '3'
  | '4J' | '4'
  | '4aum' | '#4'
  | '5dim' | 'b5'
  | '5J' | '5'
  | '5aum' | '#5'
  | '6m' | 'b6'
  | '6M' | '6'
  | '7dim' | 'bb7'
  | '7m' | 'b7'
  | '7M' | '7'
  | '8J' | '8';

export interface FretMarker {
  string: 1 | 2 | 3 | 4 | 5 | 6; // 1 = Mi agudo, 6 = Mi bordão
  fret: number;                   // 0 = corda solta, 1 a 15
  note: string;                   // ex: "C", "E", "G"
  interval: IntervalDegree;       // ex: "F", "3M", "b5"
  isRoot?: boolean;               // Destaque visual da tônica
}

export interface FretboardShape {
  title: string;
  description: string;
  startFret?: number;
  endFret?: number;
  markers: FretMarker[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  conceptSummary: string[];
  theoryContent: {
    heading: string;
    body: string;
  }[];
  guitarApplication: {
    rule: string;
    shapes: FretboardShape[];
  };
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  slug: string;
  number: number;
  level: CourseLevel;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface FretMarker {
  string: 1 | 2 | 3 | 4 | 5 | 6; // 1 = Mi agudo, 6 = Mi bordão
  fret: number;                   // 0 = corda solta, 1 a 15
  note: string;                   // ex: "C", "E", "G"
  interval: IntervalDegree;       // ex: "F", "3M", "b5"
  isRoot?: boolean;               // Destaque visual da tônica
  isScaleOverlay?: boolean;       // Nota da escala guia para improvisação
}