import { MatchCard } from '@/components/MatchCard';
import { getCompletedMatchesByJornada } from '@/lib/stats';

export default function PastMatchesPage() {
  const jornadas = getCompletedMatchesByJornada();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">📅 Historial</p>
        <h1 className="text-3xl font-bold tracking-tight">Partidos Pasados</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Resultados completados agrupados por jornada, con el marcador destacado y los goleadores organizados por equipo.
        </p>
      </header>

      <div className="space-y-6">
        {jornadas.map((group) => (
          <section key={group.jornada} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Jornada {group.jornada}</h2>
            <div className="space-y-4">
              {group.matches.map((match) => (
                <MatchCard key={match.id} match={match} showScorers />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
