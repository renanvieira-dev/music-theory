// store/useStudyProgress.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  email: string;
  xp: number;
  levelTitle: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  xpReward?: number;
  unlockedAt: string | null;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-lesson',
    title: 'Primeira Digitação',
    description: 'Concluiu a primeira aula na plataforma Harmonix.',
    xpReward: 50,
    unlockedAt: null,
  },
  {
    id: 'ach-module-1',
    title: 'Geometria Inicial',
    description: 'Dominou o Módulo 1 de Intervalos e Formação no Braço.',
    xpReward: 100,
    unlockedAt: null,
  },
  {
    id: 'ach-perfect-quiz',
    title: 'Ouvido de Ouro',
    description: 'Acertou todas as perguntas de um teste de fixação de primeira.',
    xpReward: 75,
    unlockedAt: null,
  },
  {
    id: 'ach-voicings-drop',
    title: 'Arquiteto de Acordes',
    description: 'Completou os estudos de voicings anatômicos Drop 2 e Drop 3.',
    xpReward: 150,
    unlockedAt: null,
  },
  {
    id: 'ach-ear-training',
    title: 'Mestre da Percepção',
    description: 'Alcançou 10 acertos consecutivos no laboratório de percepção.',
    xpReward: 100,
    unlockedAt: null,
  },
  {
    id: 'ach-xp-500',
    title: 'Improvisador Experiente',
    description: 'Acumulou mais de 500 XP em lições e desafios.',
    xpReward: 200,
    unlockedAt: null,
  },
];

interface StudyProgressState {
  user: UserProfile | null;
  completedLessons: string[];
  achievements: Achievement[];
  newlyUnlockedAchievement: Achievement | null;

  // Actions
  setUser: (user: UserProfile | null) => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  clearUnlockedAchievement: () => void;
  resetProgress: () => void;
}

const calculateLevel = (xp: number): string => {
  if (xp >= 1500) return 'Mestre da Harmonia';
  if (xp >= 800) return 'Arranjador Avançado';
  if (xp >= 400) return 'Músico Prático';
  if (xp >= 150) return 'Estudante Intermediário';
  return 'Iniciante Curioso';
};

export const useStudyProgress = create<StudyProgressState>()(
  persist(
    (set, get) => ({
      user: null,
      completedLessons: [],
      achievements: DEFAULT_ACHIEVEMENTS,
      newlyUnlockedAchievement: null,

      setUser: (user) => set({ user }),

      addXp: (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const newXp = currentUser.xp + amount;
        const newLevel = calculateLevel(newXp);

        set({
          user: {
            ...currentUser,
            xp: newXp,
            levelTitle: newLevel,
          },
        });

        // Checagem automática do troféu de 500 XP
        if (newXp >= 500) {
          get().unlockAchievement('ach-xp-500');
        }
      },

      completeLesson: (lessonId) => {
        const { completedLessons } = get();
        if (completedLessons.includes(lessonId)) return;

        const updatedLessons = [...completedLessons, lessonId];
        set({ completedLessons: updatedLessons });

        // Adiciona XP pela lição
        get().addXp(40);

        // Primeiro Troféu: Primeira Aula Concluída
        if (updatedLessons.length === 1) {
          get().unlockAchievement('ach-first-lesson');
        }
      },

      unlockAchievement: (achievementId) => {
        const { achievements } = get();
        const target = achievements.find((a) => a.id === achievementId);

        // Se não existir ou já estiver desbloqueado, ignora
        if (!target || target.unlockedAt !== null) return;

        const now = new Date().toISOString();
        const updatedTarget: Achievement = {
          ...target,
          unlockedAt: now,
        };

        const updatedList = achievements.map((a) =>
          a.id === achievementId ? updatedTarget : a
        );

        // Bônus de XP do próprio troféu
        if (target.xpReward) {
          const currentUser = get().user;
          if (currentUser) {
            const newXp = currentUser.xp + target.xpReward;
            set({
              user: {
                ...currentUser,
                xp: newXp,
                levelTitle: calculateLevel(newXp),
              },
            });
          }
        }

        // Ativa o Pop-up na tela!
        set({
          achievements: updatedList,
          newlyUnlockedAchievement: updatedTarget,
        });
      },

      clearUnlockedAchievement: () => {
        set({ newlyUnlockedAchievement: null });
      },

      resetProgress: () => {
        set({
          completedLessons: [],
          achievements: DEFAULT_ACHIEVEMENTS,
          newlyUnlockedAchievement: null,
        });
      },
    }),
    {
      name: 'harmonix-study-storage',
    }
  )
);