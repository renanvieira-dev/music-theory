// components/quiz/QuizSession.tsx
'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types/course';
import { useStudyProgress } from '@/store/useStudyProgress';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizSessionProps {
  lessonId: string;
  questions: QuizQuestion[];
}

export const QuizSession: React.FC<QuizSessionProps> = ({ lessonId, questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { markLessonComplete } = useStudyProgress();

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleFinish = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    markLessonComplete(lessonId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mt-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
        <div>
          <h3 className="text-xl font-bold text-neutral-100">Exercícios de Fixação</h3>
          <p className="text-sm text-neutral-400">
            Valida o teu entendimento teórico e a localização no braço.
          </p>
        </div>
        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Quiz
          </button>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;

          return (
            <div key={q.id} className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <p className="font-semibold text-neutral-200 mb-3 text-sm">
                {qIdx + 1}. {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const chosen = selectedAnswers[qIdx] === optIdx;
                  let btnStyle = 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700';

                  if (submitted) {
                    if (optIdx === q.correctAnswer) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
                    } else if (chosen && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                    }
                  } else if (chosen) {
                    btnStyle = 'border-amber-500 bg-amber-950/30 text-amber-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`text-left text-xs p-3 rounded-md border transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`mt-3 p-3 rounded-md text-xs flex items-start gap-2 ${
                    isCorrect
                      ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/50'
                      : 'bg-rose-950/30 text-rose-300 border border-rose-900/50'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-6 flex justify-end">
          <button
            disabled={!allAnswered}
            onClick={handleFinish}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              allAnswered
                ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg cursor-pointer'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            Concluir e Validar Respostas
          </button>
        </div>
      )}
    </div>
  );
};