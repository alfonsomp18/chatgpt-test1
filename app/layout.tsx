import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Torneo Interno de Futbol de TR',
  description: 'Sistema local de gestión y visualización del torneo interno de fútbol de TR.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="px-4 py-6 sm:px-6 lg:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
