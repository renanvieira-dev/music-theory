// types/gamification.ts

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji ou identificador de ícone
  xpReward: number;
  unlockedAt?: string | null;
}

export interface UserProfile {
  name: string;
  email: string;
  xp: number;
  levelTitle: string;
  createdAt: string;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Primeiro Acorde',
    description: 'Completou a sua primeira lição na plataforma.',
    icon: '🎸',
    xpReward: 50,
    unlockedAt: null,
  },
  {
    id: 'ear-starter',
    title: 'Ouvido Atento',
    description: 'Fez o primeiro treino no Treinador de Percepção Auditiva.',
    icon: '👂',
    xpReward: 50,
    unlockedAt: null,
  },
  {
    id: 'streak-master',
    title: 'Ouvido de Ouro',
    description: 'Alcançou uma sequência de 5 acertos seguidos no Ear Training.',
    icon: '🔥',
    xpReward: 100,
    unlockedAt: null,
  },
  {
    id: 'cadence-explorer',
    title: 'Mestre do Groove',
    description: 'Praticou progressões no Praticador com metrônomo.',
    icon: '⏱️',
    xpReward: 75,
    unlockedAt: null,
  },
  {
    id: 'intermediate-unlocked',
    title: 'Harmonizador Nato',
    description: 'Concluiu todos os módulos da trilha Iniciante.',
    icon: '⚡',
    xpReward: 200,
    unlockedAt: null,
  },
  {
    id: 'master-graduate',
    title: 'Mestre da Harmonia',
    description: 'Concluiu todas as lições dos 13 módulos do curso.',
    icon: '🏆',
    xpReward: 500,
    unlockedAt: null,
  },
];