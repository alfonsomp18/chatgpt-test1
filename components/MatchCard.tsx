import type { MatchWithDetails } from '@/lib/stats';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function MatchCard({ match, showScorers }: { match: MatchWithDetails; showScorers: boolean }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{formatDate(match.date)}</p>
          <h3 className="text-base font-semibold text-gray-900">
            {match.homeTeamName} vs {match.awayTeamName}
          </h3>
        </div>

        {match.status === 'completed' ? (
          <p className="text-lg font-semibold text-gray-900">
            {match.score.home} - {match.score.away}
          </p>
        ) : (
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Editar resultado
          </button>
        )}
      </div>

      {showScorers ? (
        <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{match.homeTeamName}</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {match.scorers.home.length > 0 ? (
                match.scorers.home.map((scorer) => <li key={`${match.id}-${scorer}`}>{scorer}</li>)
              ) : (
                <li>Sin goles registrados</li>
              )}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{match.awayTeamName}</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {match.scorers.away.length > 0 ? (
                match.scorers.away.map((scorer) => <li key={`${match.id}-${scorer}`}>{scorer}</li>)
              ) : (
                <li>Sin goles registrados</li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  );
}
