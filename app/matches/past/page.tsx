import { MatchCard } from '@/components/MatchCard';
import { getCompletedMatches } from '@/lib/stats';

export default function PastMatchesPage() {
  const matches = getCompletedMatches();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">📅 Historial</p>
        <h1 className="text-3xl font-bold tracking-tight">Partidos Pasados</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Resultados completados ordenados del más reciente al más antiguo, incluyendo el detalle de goleadores por equipo.
        </p>
      </header>

      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} showScorers />
        ))}
      </div>
    </section>
  );
}
