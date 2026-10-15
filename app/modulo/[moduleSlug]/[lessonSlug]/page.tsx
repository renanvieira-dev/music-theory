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
  HelpCircle,
  Lightbulb,
  Loader2,
} from 'lucide-react';

function LessonContent() {
  const params = useParams();
  const moduleSlug = params?.moduleSlug as string;
  const lessonSlug = params?.lessonSlug as string;

  const currentModule = COURSE_MODULES.find((m) => m.slug === moduleSlug);
  if (!currentModule) {
    notFound();
  }

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

  const contentParagraphs: string[] = Array.isArray(lesson.content)
    ? lesson.content
    : typeof lesson.content === 'string'
    ? lesson.content.split('\n\n').filter((p: string) => p.trim().length > 0)
    : [];

  const markers = lesson.markers || lesson.fretboardMarkers || [];
  const startFret = lesson.fretboardStartFret ?? lesson.startFret ?? 0;
  const endFret = lesson.fretboardEndFret ?? lesson.endFret ?? 12;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-4xl mx-auto space-y-10">
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

        <header className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
              Etapa {currentModule.number} • {currentModule.level}
            </span>
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

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="text-neutral-500">Notas em destaque:</span>
              {markers
                .filter((m: any, i: number, arr: any[]) => arr.findIndex((x: any) => x.note === m.note) === i)
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

        <section className="space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed bg-neutral-900/40 p-6 md:p-8 rounded-3xl border border-neutral-800/80">
          <div className="prose prose-invert max-w-none space-y-4">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {lesson.tips && lesson.tips.length > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
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
        </section>

        {lesson.quiz && lesson.quiz.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Fixação do Conhecimento</span>
            </div>
            <QuizSession lessonId={lesson.id} questions={lesson.quiz} />
          </section>
        )}

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