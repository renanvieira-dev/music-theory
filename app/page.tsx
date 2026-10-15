'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSE_MODULES } from '@/data/modules';
import { useStudyProgress } from '@/store/useStudyProgress';
import { UserAuthModal } from '@/components/gamification/UserAuthModal';
import { Logo } from '@/components/ui/Logo';
import { CourseLevel } from '@/types/course';
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Timer,
  Ear,
  User,
  Zap,
  Lock,
  PlayCircle,
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

  const allLessons = COURSE_MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug, moduleTitle: m.title }))
  );
  const nextLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || allLessons[0];

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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <UserAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Topbar Harmonix */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition">
            <Logo size="md" showTagline={true} />
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.xp} XP</span>
                </div>
                <div className="h-3 w-px bg-neutral-800" />
                <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium hidden sm:inline">{user.name}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition shadow-sm"
              >
                <User className="w-3.5 h-3.5" /> Entrar / Registar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Cockpit do Aluno */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-10">
        <section className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest font-bold">
                  {user ? `Nível: ${user.levelTitle}` : 'Ambiente de Estudos'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {user ? `Pronto para tocar, ${user.name}?` : 'Harmonia Aplicada ao Braço do Instrumento'}
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Domina formação de acordes, voicings modernos (Drop 2/3), campo harmónico funcional e percepção de intervalos de ouvido.
              </p>

              <div className="pt-2">
                {user ? (
                  <Link
                    href={`/modulo/${nextLesson.moduleSlug}/${nextLesson.slug}`}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-amber-500/10"
                  >
                    <PlayCircle className="w-4 h-4" /> Continuar Aula: {nextLesson.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-amber-500/10"
                  >
                    <Sparkles className="w-4 h-4" /> Criar Conta para Começar
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800/80 space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-neutral-300">Conclusão do Currículo</span>
                <span className="text-amber-400 font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-center">
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Lições</span>
                  <span className="text-base font-black text-white font-mono">
                    {completedLessons.length}/{totalLessons}
                  </span>
                </div>
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/60">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Troféus</span>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {unlockedTrophies}/{achievements.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ferramentas e Laboratórios de Prática */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Ferramentas & Prática Livre
            </h2>
            <span className="text-xs text-neutral-500 font-mono">Acesso Aberto</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dicionario"
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                Dicionário de Voicings (Vol. 4)
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Mapas de escalas completas e posições anatómicas fechadas (Drop 2 e Drop 3).
              </p>
            </Link>

            <Link
              href="/praticador"
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-sky-500/40 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                <Timer className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition">
                Estação de Improviso & Metrónomo
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Backing tracks automáticos de cadências com reprodução e escala guia no braço.
              </p>
            </Link>

            <Link
              href="/percepcao"
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Ear className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                Treinador de Percepção (Ear Training)
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Identifica intervalos harmónicos, tríades e tétrades de ouvido com sistema de pontuação.
              </p>
            </Link>
          </div>
        </section>

        {/* Trilha Curricular */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-800">
            <div>
              <h2 className="text-xl font-extrabold text-white">Trilha de Aulas</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Conteúdo sequencial com testes práticos ao final de cada módulo.
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'iniciante', label: 'Iniciante' },
                { id: 'intermediario', label: 'Intermédio' },
                { id: 'avancado', label: 'Avançado' },
              ].map((tab) => {
                const active = selectedLevel === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedLevel(tab.id as 'todos' | CourseLevel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {filteredModules.map((module) => {
              const moduleLessonsDone = module.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const isModuleComplete =
                moduleLessonsDone === module.lessons.length && module.lessons.length > 0;

              return (
                <div
                  key={module.id}
                  className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden shadow-sm"
                >
                  <div className="p-6 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/80">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                          Módulo {module.number}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${getLevelBadge(
                            module.level
                          )}`}
                        >
                          {module.level}
                        </span>
                        {isModuleComplete && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Concluído
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white">{module.title}</h3>
                      <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                        {module.description}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-neutral-500 shrink-0">
                      Progresso: {moduleLessonsDone}/{module.lessons.length}
                    </div>
                  </div>

                  <div className="divide-y divide-neutral-800/60">
                    {module.lessons.map((lesson) => {
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          href={`/modulo/${module.slug}/${lesson.slug}`}
                          className="flex items-center justify-between p-4 px-6 hover:bg-neutral-800/40 transition group"
                        >
                          <div className="flex items-center gap-4">
                            {isDone ? (
                              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : !user ? (
                              <Lock className="w-4 h-4 text-neutral-600 shrink-0 group-hover:text-amber-400 transition" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 shrink-0 transition" />
                            )}
                            <div>
                              <h4 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition">
                                {lesson.title}
                              </h4>
                              <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                                {lesson.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!user && (
                              <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                                Bloqueado (Login)
                              </span>
                            )}
                            <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 shrink-0 transition" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}