// app/modulo/[moduleSlug]/[lessonSlug]/page.tsx
import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COURSE_MODULES } from '@/data/modules';
import { Fretboard } from '@/components/fretboard/Fretboard';
import { QuizSession } from '@/components/quiz/QuizSession';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { AudioPlayer } from '@/components/audio/AudioPlayer';

interface Props {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { moduleSlug: string; lessonSlug: string }[] = [];

  COURSE_MODULES.forEach((mod) => {
    mod.lessons.forEach((les) => {
      paths.push({
        moduleSlug: mod.slug,
        lessonSlug: les.slug,
      });
    });
  });

  return paths;
}

async function LessonContent({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params;

  const currentModule = COURSE_MODULES.find((m) => m.slug === moduleSlug);
  if (!currentModule) notFound();

  const currentLesson = currentModule.lessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 max-w-4xl mx-auto">
      {/* Navegação de regresso */}
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para a Trilha de Módulos
        </Link>
      </nav>

      {/* Cabeçalho da Aula */}
      <header className="space-y-2 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3 text-xs font-mono text-amber-500 uppercase tracking-wider">
          <span>{currentModule.title}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {currentLesson.readingTime}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {currentLesson.title}
        </h1>
        <p className="text-neutral-400 text-sm">{currentLesson.subtitle}</p>
      </header>

      {/* Pontos-chave do conceito */}
      <div className="my-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Pontos Essenciais
        </h3>
        <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
          {currentLesson.conceptSummary.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Conteúdo Teórico */}
      <section className="space-y-6 my-8">
        {currentLesson.theoryContent.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-200">{section.heading}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">{section.body}</p>
          </div>
        ))}
      </section>

      {/* Aplicação Prática no Violão / Guitarra */}
      <section className="mt-10 pt-6 border-t border-neutral-800">
        <div className="mb-4">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
            Aplicação Prática no Braço
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Geometria e Shapes</h2>
          <p className="text-sm text-neutral-400 mt-1">
            {currentLesson.guitarApplication.rule}
          </p>
        </div>

        <div className="space-y-8 mt-6">
        {currentLesson.guitarApplication.shapes.map((shape, idx) => (
            <div key={idx} className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
            <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                <h3 className="text-sm font-bold text-neutral-200">{shape.title}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{shape.description}</p>
                </div>
                <AudioPlayer markers={shape.markers} />
            </div>
            <Fretboard
                markers={shape.markers}
                startFret={shape.startFret ?? 0}
                endFret={shape.endFret ?? 8}
            />
            </div>
        ))}
        </div>
      </section>

      {/* Quiz de Fixação */}
      <QuizSession lessonId={currentLesson.id} questions={currentLesson.quiz} />
    </div>
  );
}

export default function LessonPage(props: Props) {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400 text-sm">A carregar lição...</div>}>
      <LessonContent {...props} />
    </Suspense>
  );
}