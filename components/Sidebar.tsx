'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const navigationItems = [
  { href: '/standings', label: 'Tabla Principal' },
  { href: '/matches/past', label: 'Partidos Pasados' },
  { href: '/matches/upcoming', label: 'Partidos Próximos' },
  { href: '/scorers', label: 'Tabla de Goleo' },
  { href: '/teams', label: 'Miembros por equipo' },
  { href: '/admin', label: 'Admin' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const lastUpdated = useMemo(
    () =>
      new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date()),
    [],
  );

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 transition-colors hover:bg-gray-800"
        >
          {isOpen ? 'Cerrar menú' : 'Abrir menú'}
        </button>
      </div>

      <aside
        className={[
          'border-r border-gray-800 bg-gray-950 lg:sticky lg:top-0 lg:block lg:h-screen',
          isOpen ? 'block' : 'hidden lg:block',
        ].join(' ')}
      >
        <div className="flex h-full flex-col gap-6 px-4 py-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">⚽ Torneo Interno</p>
            <h1 className="text-lg font-semibold text-gray-100">Torneo Interno de Futbol de TR</h1>
          </div>

          <nav className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    'rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive ? 'bg-gray-100 text-gray-950' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-500">Última actualización: {lastUpdated}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
