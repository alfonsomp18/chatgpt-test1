'use client';

import { getTeamColorEmoji } from '@/lib/helpers';
import { getScorers } from '@/lib/stats';
import { useTournamentStore } from '@/lib/store';

export default function ScorersPage() {
  const { data } = useTournamentStore();
  const scorers = getScorers(data).filter((player) => player.goals > 0);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">🥇 Estadística individual</p>
        <h1 className="text-3xl font-bold tracking-tight">Tabla de Goleo</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Los goles se agregan automáticamente desde los eventos registrados en cada partido completado.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">Jugador</th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">Equipo</th>
                <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold">Goles</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((player) => (
                <tr key={player.playerId} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{player.playerName}</td>
                  <td className="px-4 py-3">
                    {getTeamColorEmoji(player.teamColor)} {player.teamName}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-900">{player.goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
