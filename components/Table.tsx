import { sortedTeams, type MatchResult } from '@/data/teams';

const resultEmoji: Record<MatchResult, string> = {
  W: '✅',
  D: '➖',
  L: '❌',
  N: '⏸️',
};

const resultLabel: Record<MatchResult, string> = {
  W: 'Victoria',
  D: 'Empate',
  L: 'Derrota',
  N: 'Sin jugar',
};
};

const topThreeStyles = [
  'bg-amber-50/90',
  'bg-slate-50/90',
  'bg-orange-50/90',
];

export function Table() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-card backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full whitespace-nowrap text-left text-sm text-slate-700">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.24em] text-slate-100">
            <tr>
              <th className="px-4 py-4 font-semibold">Pos</th>
              <th className="px-4 py-4 font-semibold">Equipo</th>
              <th className="px-4 py-4 text-center font-semibold">PJ</th>
              <th className="px-4 py-4 text-center font-semibold">G</th>
              <th className="px-4 py-4 text-center font-semibold">E</th>
              <th className="px-4 py-4 text-center font-semibold">P</th>
              <th className="px-4 py-4 text-center font-semibold">GF</th>
              <th className="px-4 py-4 text-center font-semibold">GA</th>
              <th className="px-4 py-4 text-center font-semibold">PTS</th>
              <th className="px-4 py-4 font-semibold">Últimos 5</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const goalDifference = team.goalsFor - team.goalsAgainst;
              const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';
              const topThreeClass = index < 3 ? topThreeStyles[index] : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';

              return (
                <tr
                  key={team.name}
                  className={`${rowClass} border-b border-slate-200/80 transition hover:bg-emerald-50`}
                  className={`${topThreeClass} border-b border-slate-200/80 transition hover:bg-emerald-50`}
                >
                  <td className="px-4 py-4 align-middle font-semibold text-slate-900">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <span className="text-base">⚽</span>
                      {index < 3 ? <span className="text-base">🏅</span> : <span className="text-base">⚽</span>}
                      <div>
                        <p className="font-semibold text-slate-900">{team.name}</p>
                        <p className="text-xs text-slate-500">DG: {goalDifference >= 0 ? `+${goalDifference}` : goalDifference}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-medium">{team.played}</td>
                  <td className="px-4 py-4 text-center">{team.wins}</td>
                  <td className="px-4 py-4 text-center">{team.draws}</td>
                  <td className="px-4 py-4 text-center">{team.losses}</td>
                  <td className="px-4 py-4 text-center">{team.goalsFor}</td>
                  <td className="px-4 py-4 text-center">{team.goalsAgainst}</td>
                  <td className="px-4 py-4 text-center text-base font-bold text-pitch">{team.points}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-lg" aria-label={`Últimos 5 partidos de ${team.name}`}>
                      {team.last5.map((result, resultIndex) => (
                        <span key={`${team.name}-${result}-${resultIndex}`} title={resultLabel[result]}>
                        <span key={`${team.name}-${result}-${resultIndex}`} title={result}>
                          {resultEmoji[result]}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
