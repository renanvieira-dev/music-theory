// store/useStudyProgress.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, Achievement, INITIAL_ACHIEVEMENTS } from '@/types/gamification';
import { supabase } from '@/lib/supabase';

interface StudyProgressStore {
  user: UserProfile | null;
  completedLessons: string[];
  achievements: Achievement[];

  setUserProfile: (profile: UserProfile | null) => void;
  syncWithSupabase: (userId: string) => Promise<void>;
  markLessonComplete: (lessonId: string) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  resetAllProgress: () => Promise<void>;
  logout: () => Promise<void>;
}

const getLevelTitle = (xp: number): string => {
  if (xp < 100) return 'Iniciante Curioso';
  if (xp < 300) return 'Praticante de Escalas';
  if (xp < 600) return 'Harmonizador Popular';
  if (xp < 1000) return 'Mestre das Cadências';
  return 'Arranjador Virtuoso';
};

export const useStudyProgress = create<StudyProgressStore>()(
  persist(
    (set, get) => ({
      user: null,
      completedLessons: [],
      achievements: INITIAL_ACHIEVEMENTS,

      setUserProfile: (profile) => set({ user: profile }),

      syncWithSupabase: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (data && !error) {
            set({
              user: {
                name: data.name,
                email: data.email,
                xp: data.xp || 0,
                levelTitle: data.level_title || getLevelTitle(data.xp || 0),
                createdAt: data.created_at,
              },
              completedLessons: data.completed_lessons || [],
              achievements: data.achievements && data.achievements.length > 0 ? data.achievements : INITIAL_ACHIEVEMENTS,
            });
          }
        } catch (err) {
          console.error('Erro ao sincronizar dados do Supabase:', err);
        }
      },

      markLessonComplete: async (lessonId: string) => {
        const { completedLessons, unlockAchievement, addXP, user } = get();
        if (completedLessons.includes(lessonId)) return;

        const updated = [...completedLessons, lessonId];
        set({ completedLessons: updated });
        addXP(30);

        if (updated.length === 1) {
          unlockAchievement('first-lesson');
        }

        // Salva na nuvem se autenticado
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          await supabase
            .from('profiles')
            .update({ completed_lessons: updated })
            .eq('id', authData.user.id);
        }
      },

      addXP: async (amount: number) => {
        const { user } = get();
        if (!user) return;

        const newXP = user.xp + amount;
        const newTitle = getLevelTitle(newXP);
        set({
          user: {
            ...user,
            xp: newXP,
            levelTitle: newTitle,
          },
        });

        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          await supabase
            .from('profiles')
            .update({ xp: newXP, level_title: newTitle })
            .eq('id', authData.user.id);
        }
      },

      unlockAchievement: async (achievementId: string) => {
        const { achievements, addXP } = get();
        const target = achievements.find((a) => a.id === achievementId);
        if (!target || target.unlockedAt) return;

        const updated = achievements.map((a) =>
          a.id === achievementId ? { ...a, unlockedAt: new Date().toISOString() } : a
        );

        set({ achievements: updated });
        addXP(target.xpReward);

        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          await supabase
            .from('profiles')
            .update({ achievements: updated })
            .eq('id', authData.user.id);
        }
      },

      resetAllProgress: async () => {
        const { user } = get();
        set({
          completedLessons: [],
          achievements: INITIAL_ACHIEVEMENTS,
          user: user
            ? {
                ...user,
                xp: 0,
                levelTitle: getLevelTitle(0),
              }
            : null,
        });

        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          await supabase
            .from('profiles')
            .update({
              completed_lessons: [],
              achievements: INITIAL_ACHIEVEMENTS,
              xp: 0,
              level_title: 'Iniciante Curioso',
            })
            .eq('id', authData.user.id);
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, completedLessons: [], achievements: INITIAL_ACHIEVEMENTS });
      },
    }),
    {
      name: 'harmony-study-progress-v2',
    }
  )
);