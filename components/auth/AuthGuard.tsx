// components/auth/AuthGuard.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudyProgress } from '@/store/useStudyProgress';
import { UserAuthModal } from '@/components/gamification/UserAuthModal';
import { Lock, ArrowLeft, LogIn, GraduationCap } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useStudyProgress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (user) {
    return <>{children}</>;
  }

  return (
    <>
      <UserAuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Contentor com altura total do ecrã e alinhamento centrado perfeito */}
      <div className="fixed inset-0 z-30 min-h-screen w-full flex items-center justify-center p-4 bg-neutral-950 overflow-y-auto">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden my-auto">
          {/* Efeitos subtis de iluminação */}
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Ícone */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-2">
            Área Exclusiva para Alunos
          </span>

          <h2 className="text-2xl font-black text-white tracking-tight mb-3">
            Inicia sessão para estudar
          </h2>

          <p className="text-xs text-neutral-400 leading-relaxed mb-6">
            Para acederes a esta lição interativa, guardares o teu progresso na nuvem, acumulares XP e desbloqueares conquistas no braço do instrumento, precisas de entrar na tua conta.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Entrar / Criar Conta Gratuita
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-xs text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Principal
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800/80 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
            <GraduationCap className="w-4 h-4 text-neutral-400" />
            <span>Acesso completo e gratuito a todos os 13 módulos</span>
          </div>
        </div>
      </div>
    </>
  );
};