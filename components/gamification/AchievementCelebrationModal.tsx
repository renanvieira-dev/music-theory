// components/gamification/AchievementCelebrationModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useStudyProgress } from '@/store/useStudyProgress';
import { Trophy, Sparkles, X, ArrowRight, Zap } from 'lucide-react';

export const AchievementCelebrationModal: React.FC = () => {
  const { newlyUnlockedAchievement, clearUnlockedAchievement } = useStudyProgress();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (newlyUnlockedAchievement) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [newlyUnlockedAchievement]);

  if (!visible || !newlyUnlockedAchievement) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      clearUnlockedAchievement();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in duration-300">
      {/* Card Central com Efeito Glow Dourado */}
      <div className="relative max-w-sm w-full bg-neutral-900 border border-amber-500/40 rounded-3xl p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.22)] animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Luzes de Fundo (Backdrop Glow) */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botão Fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícone do Troféu com Pulso Radial */}
        <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/25 rounded-3xl animate-ping opacity-60 duration-1000" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[2px] shadow-2xl shadow-amber-500/40">
            <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
            </div>
          </div>
        </div>

        {/* Tag Superior */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Troféu Desbloqueado!</span>
        </div>

        {/* Nome do Troféu */}
        <h3 className="text-2xl font-black text-white tracking-tight mb-2">
          {newlyUnlockedAchievement.title}
        </h3>

        {/* Descrição do Desbloqueio */}
        <p className="text-xs text-neutral-400 leading-relaxed mb-6 px-2">
          {newlyUnlockedAchievement.description}
        </p>

        {/* Recompensa de XP */}
        {newlyUnlockedAchievement.xpReward && (
          <div className="mb-6 py-2.5 px-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs text-neutral-300">Recompensa:</span>
            <span className="text-xs font-bold text-amber-400 font-mono">
              +{newlyUnlockedAchievement.xpReward} XP
            </span>
          </div>
        )}

        {/* Botão de Ação */}
        <button
          onClick={handleClose}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <span>Continuar a Estudar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};