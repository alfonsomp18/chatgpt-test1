import { MatchCard } from '@/components/MatchCard';
import { getUpcomingMatchesByJornada } from '@/lib/stats';

export default function UpcomingMatchesPage() {
  const jornadas = getUpcomingMatchesByJornada();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">🗓️ Agenda</p>
        <h1 className="text-3xl font-bold tracking-tight">Partidos Próximos</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Próximos encuentros programados agrupados por jornada para mantener la misma estructura de lectura que en los partidos ya jugados.
        </p>
      </header>

      <div className="space-y-6">
        {jornadas.map((group) => (
          <section key={group.jornada} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Jornada {group.jornada}</h2>
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
