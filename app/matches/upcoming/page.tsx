import { MatchCard } from '@/components/MatchCard';
import { getUpcomingMatches } from '@/lib/stats';

export default function UpcomingMatchesPage() {
  const matches = getUpcomingMatches();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">🗓️ Agenda</p>
        <h1 className="text-3xl font-bold tracking-tight">Partidos Próximos</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Próximos encuentros programados. La estructura ya permite editar resultado más adelante sin cambiar el modelo de datos.
        </p>
      </header>

      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} showScorers={false} />
        ))}
      </div>
    </section>
  );
}
