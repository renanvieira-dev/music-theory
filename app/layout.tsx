// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { AchievementCelebrationModal } from '@/components/gamification/AchievementCelebrationModal';

export const metadata: Metadata = {
  title: 'Harmonix — Teoria, Geometria & Percepção',
  description:
    'Plataforma interativa de teoria musical aplicada ao braço do instrumento: condução de vozes, Drop 2/3, campo harmônico e treino auditivo.',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className="bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-500 selection:text-neutral-950"
      >
        {children}
        {/* Pop-up global animado de troféu conquistado */}
        <AchievementCelebrationModal />
      </body>
    </html>
  );
}