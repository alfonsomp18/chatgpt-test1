import { formatReadableDate, getTeamColorEmoji } from '@/lib/helpers';
import type { MatchWithDetails } from '@/lib/stats';

export function MatchCard({ match, showScorers }: { match: MatchWithDetails; showScorers: boolean }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="text-left text-sm font-medium text-gray-900 sm:text-base">
          {getTeamColorEmoji(match.homeTeamColor)} {match.homeTeamName}
        </div>

        <div className="space-y-1 text-center">
          {match.status === 'completed' ? (
            <p className="text-2xl font-bold tracking-tight text-gray-900">
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
          <p className="text-xs text-gray-500">{formatReadableDate(match.date)}</p>
        </div>

        <div className="text-right text-sm font-medium text-gray-900 sm:text-base">
          {getTeamColorEmoji(match.awayTeamColor)} {match.awayTeamName}
        </div>
      </div>

      {showScorers ? (
        <div className="mt-4 grid gap-4 border-t border-gray-200 pt-4 sm:grid-cols-2">
          <ul className="space-y-1 text-left text-sm text-gray-700">
            {match.scorers.home.length > 0 ? (
              match.scorers.home.map((scorer) => <li key={`${match.id}-${scorer}`}>{scorer}</li>)
            ) : (
              <li className="text-gray-400">—</li>
            )}
          </ul>

          <ul className="space-y-1 text-right text-sm text-gray-700">
            {match.scorers.away.length > 0 ? (
              match.scorers.away.map((scorer) => <li key={`${match.id}-${scorer}`}>{scorer}</li>)
            ) : (
              <li className="text-gray-400">—</li>
            )}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
