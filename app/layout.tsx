import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harmonia Prática - Violão & Guitarra',
  description: 'Plataforma interativa de harmonia e teoria musical aplicada.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-neutral-950 text-neutral-100 antialiased"
      >
        {children}
      </body>
    </html>
  );
}