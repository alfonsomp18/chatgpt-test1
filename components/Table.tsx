import type { StandingRow, MatchResultCode } from '@/lib/standings';
import { getTeamColorEmoji } from '@/lib/helpers';

const resultEmoji: Record<MatchResultCode, string> = {
  W: '✅',
  D: '➖',
  L: '❌',
};

function formatGoalDifference(goalsFor: number, goalsAgainst: number) {
  const difference = goalsFor - goalsAgainst;
  return difference >= 0 ? `+${difference}` : `${difference}`;
}

export function Table({ standings }: { standings: StandingRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="border-b border-gray-200 px-4 py-3 font-semibold">Pos</th>
              <th className="border-b border-gray-200 px-4 py-3 font-semibold">Equipo</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">PJ</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">G</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">E</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">P</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">GF</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">GA</th>
              <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">PTS</th>
              <th className="border-b border-gray-200 px-4 py-3 font-semibold">Últimos 5</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={team.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {getTeamColorEmoji(team.color)} {team.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      DG: {formatGoalDifference(team.goalsFor, team.goalsAgainst)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">{team.played}</td>
                <td className="px-4 py-3 text-center">{team.wins}</td>
                <td className="px-4 py-3 text-center">{team.draws}</td>
                <td className="px-4 py-3 text-center">{team.losses}</td>
                <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                <td className="px-4 py-3 text-center font-semibold text-gray-900">{team.points}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5" aria-label={`Últimos 5 partidos de ${team.name}`}>
                    {team.last5.map((result, resultIndex) => (
                      <span key={`${team.id}-${result}-${resultIndex}`} title={result}>
                        {resultEmoji[result]}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
