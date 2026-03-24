'use client';

import { MatchCard } from '@/components/MatchCard';
import { formatReadableDate } from '@/lib/helpers';
import { getUpcomingMatchesByJornada } from '@/lib/stats';
import { useTournamentStore } from '@/lib/store';

export default function UpcomingMatchesPage() {
  const { data } = useTournamentStore();
  const jornadas = getUpcomingMatchesByJornada(data);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">🗓️ Agenda</p>
        <h1 className="text-3xl font-bold tracking-tight">Partidos Próximos</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Próximos encuentros agrupados por jornada, con la fecha oficial de cada bloque visible antes de los partidos.
        </p>
      </header>

      <div className="space-y-6">
        {jornadas.map((group) => (
          <section key={group.jornada} className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">Jornada {group.jornada}</h2>
              {group.jornadaDate ? <p className="text-sm text-gray-500">{formatReadableDate(group.jornadaDate)}</p> : null}
            </div>
            <div className="space-y-4">
              {group.matches.map((match) => (
                <MatchCard key={match.id} match={match} showScorers={false} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
