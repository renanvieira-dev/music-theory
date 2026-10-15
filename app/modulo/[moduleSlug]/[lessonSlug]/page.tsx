// app/modulo/[moduleSlug]/[lessonSlug]/page.tsx
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { COURSE_MODULES } from '@/data/modules';
import { Fretboard } from '@/components/fretboard/Fretboard';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { QuizSession } from '@/components/quiz/QuizSession';
import { AuthGuard } from '@/components/auth/AuthGuard';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Loader2,
  Sparkles,
} from 'lucide-react';

function LessonContent() {
  const params = useParams();
  const moduleSlug = params?.moduleSlug as string;
  const lessonSlug = params?.lessonSlug as string;

  // Localiza o módulo atual
  const currentModule = COURSE_MODULES.find((m) => m.slug === moduleSlug);
  if (!currentModule) {
    notFound();
  }

  // Localiza a lição atual
  const currentLessonIndex = currentModule.lessons.findIndex(
    (l) => l.slug === lessonSlug
  );
  if (currentLessonIndex === -1) {
    notFound();
  }

  const lesson = currentModule.lessons[currentLessonIndex] as any;
  const prevLesson =
    currentLessonIndex > 0 ? currentModule.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < currentModule.lessons.length - 1
      ? currentModule.lessons[currentLessonIndex + 1]
      : null;

  // Extração das secções teóricas estruturadas (theoryContent)
  const theorySections: Array<{ heading?: string; title?: string; body?: string; content?: string }> =
    Array.isArray(lesson.theoryContent)
      ? lesson.theoryContent
      : Array.isArray(lesson.sections)
      ? lesson.sections
      : [];

  // Extração do resumo de conceitos (conceptSummary)
  const conceptSummary: string[] = Array.isArray(lesson.conceptSummary)
    ? lesson.conceptSummary
    : [];

  // Suporte adicional caso alguma lição possua texto simples legado (content/theory/description)
  const legacyContent =
    typeof lesson.content === 'string'
      ? lesson.content
      : typeof lesson.theory === 'string'
      ? lesson.theory
      : null;

  // Marcadores do braço do instrumento (fretboard)
  const markers = lesson.markers || lesson.fretboardMarkers || [];
  const startFret = lesson.fretboardStartFret ?? lesson.startFret ?? 0;
  const endFret = lesson.fretboardEndFret ?? lesson.endFret ?? 12;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-4xl mx-auto space-y-10">
        {/* Navegação Superior */}
        <nav className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-4 border-b border-neutral-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel
          </Link>
          <span className="uppercase text-neutral-500">
            {currentModule.title} • Aula {currentLessonIndex + 1} de{' '}
            {currentModule.lessons.length}
          </span>
        </nav>

        {/* Cabeçalho da Lição */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase font-bold">
              Etapa {currentModule.number} • {currentModule.level}
            </span>
            {lesson.readingTime && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                <Clock className="w-3 h-3 text-neutral-500" />
                {lesson.readingTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {lesson.title}
          </h1>

          {lesson.subtitle && (
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              {lesson.subtitle}
            </p>
          )}
        </header>

        {/* Resumo de Conceitos-Chave (conceptSummary) */}
        {conceptSummary.length > 0 && (
          <section className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Conceitos Essenciais</span>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-neutral-300 leading-relaxed">
              {conceptSummary.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Braço do Instrumento & Player de Áudio */}
        {markers.length > 0 && (
          <section className="bg-neutral-900/80 p-6 rounded-3xl border border-neutral-800 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Geometria no Braço do Instrumento</span>
              </div>

              <AudioPlayer markers={markers} label="Ouvir Exemplo" />
            </div>

            <Fretboard
              markers={markers}
              startFret={startFret}
              endFret={endFret}
            />

            {/* Legenda de Notas */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500">Notas em destaque:</span>
              {markers
                .filter(
                  (m: any, i: number, arr: any[]) =>
                    arr.findIndex((x: any) => x.note === m.note) === i
                )
                .map((m: any, idx: number) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded border ${
                      m.isRoot
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    {m.note} {m.interval ? `(${m.interval})` : ''}
                  </span>
                ))}
            </div>
          </section>
        )}

        {/* Conteúdo Teórico Estruturado (theoryContent) */}
        {theorySections.length > 0 && (
          <section className="space-y-6">
            {theorySections.map((sec, index) => {
              const heading = sec.heading || sec.title;
              const body = sec.body || sec.content;
              return (
                <article
                  key={index}
                  className="bg-neutral-900/40 p-6 md:p-8 rounded-3xl border border-neutral-800/80 space-y-3"
                >
                  {heading && (
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <span className="text-amber-500 font-mono text-sm">#</span>
                      {heading}
                    </h3>
                  )}
                  {body && (
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {body}
                    </p>
                  )}
                </article>
              );
            })}
          </section>
        )}

        {/* Suporte a Conteúdo de Texto Legado */}
        {legacyContent && theorySections.length === 0 && (
          <section className="bg-neutral-900/40 p-6 md:p-8 rounded-3xl border border-neutral-800/80 space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
            <p>{legacyContent}</p>
          </section>
        )}

        {/* Dicas Práticas Adicionais */}
        {lesson.tips && lesson.tips.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
              <Lightbulb className="w-4 h-4" /> Dica de Prática
            </div>
            <ul className="list-disc list-inside text-xs md:text-sm text-neutral-300 space-y-1">
              {lesson.tips.map((tip: string, idx: number) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Exercícios Práticos (Quiz com Ganho de XP) */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Fixação do Conhecimento</span>
            </div>
            <QuizSession lessonId={lesson.id} questions={lesson.quiz} />
          </section>
        )}

        {/* Navegação Inferior */}
        <footer className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/modulo/${moduleSlug}/${prevLesson.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Aula Anterior</span>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/modulo/${moduleSlug}/${nextLesson.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition shadow-sm"
            >
              <span>Próxima Aula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Concluir Módulo</span>
            </Link>
          )}
        </footer>
      </main>
    </AuthGuard>
  );
}

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-neutral-400 font-mono text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span>A carregar lição...</span>
        </div>
      }
    >
      <LessonContent />
    </Suspense>
  );
}