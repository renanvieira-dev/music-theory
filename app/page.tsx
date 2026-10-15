// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSE_MODULES } from '@/data/modules';
import { useStudyProgress } from '@/store/useStudyProgress';
import { UserAuthModal } from '@/components/gamification/UserAuthModal';
import { CourseLevel } from '@/types/course';
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Compass,
  Timer,
  Ear,
  User,
  Trophy,
} from 'lucide-react';

export default function HomePage() {
  const { completedLessons, user, achievements } = useStudyProgress();
  const [selectedLevel, setSelectedLevel] = useState<'todos' | CourseLevel>('todos');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const filteredModules = COURSE_MODULES.filter((m) =>
    selectedLevel === 'todos' ? true : m.level === selectedLevel
  );

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);
  const unlockedTrophies = achievements.filter((a) => a.unlockedAt !== null).length;

  const getLevelBadge = (level: CourseLevel) => {
    switch (level) {
      case 'iniciante':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
      case 'intermediario':
        return 'bg-sky-950/60 text-sky-400 border-sky-800/60';
      case 'avancado':
        return 'bg-purple-950/60 text-purple-400 border-purple-800/60';
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-5xl mx-auto">
      {/* Modal de Login e Conquistas */}
      <UserAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Header com Perfil do Aluno */}
      <header className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Plataforma de Harmonia Funcional
          </span>

          {/* Botão de Perfil / Conquistas */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all bg-neutral-900 border-neutral-800 hover:border-amber-500/60 text-neutral-200"
          >
            {user ? (
              <>
                <div className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 ml-1">
                  <Trophy className="w-3 h-3" /> {unlockedTrophies}
                </span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Entrar / Ver Conquistas</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Harmonia Prática no Violão & Guitarra
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Domine teoria musical, formação de acordes, campo harmónico e cadências com aplicação
          direta na geometria das cordas e áudio de violão real.
        </p>

        {/* Card de Progresso Global */}
        <div className="mt-6 p-5 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-neutral-300">Progresso Global das Lições</span>
            <span className="text-amber-400 font-mono">{progressPercent}% Concluído</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Ferramentas e Laboratórios Interativos */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/dicionario"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-800 hover:border-amber-500/50 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Dicionário de Escalas & Acordes (Vol. 4)
          </Link>

          <Link
            href="/praticador"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-sky-400 border border-neutral-800 hover:border-sky-500/50 transition-all shadow-sm"
          >
            <Timer className="w-4 h-4" />
            Cadências, Metrónomo & Estação de Improviso
          </Link>

          <Link
            href="/percepcao"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-purple-400 border border-neutral-800 hover:border-purple-500/50 transition-all shadow-sm"
          >
            <Ear className="w-4 h-4" />
            Treinador de Percepção (Ear Training)
          </Link>
        </div>
      </header>

      {/* Filtros por Nível */}
      <section className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mr-2 font-mono">
          <Compass className="w-4 h-4" /> Nível:
        </div>
        {[
          { id: 'todos', label: 'Todos os Módulos' },
          { id: 'iniciante', label: 'Iniciante' },
          { id: 'intermediario', label: 'Intermediário' },
          { id: 'avancado', label: 'Avançado' },
        ].map((tab) => {
          const active = selectedLevel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id as 'todos' | CourseLevel)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                active
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* Lista de Módulos */}
      <div className="space-y-8">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                    Etapa {module.number}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${getLevelBadge(
                      module.level
                    )}`}
                  >
                    {module.level}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{module.title}</h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-4">
              {module.lessons.map((lesson) => {
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    href={`/modulo/${module.slug}/${lesson.slug}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 shrink-0 transition" />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                          {lesson.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 shrink-0 transition" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}