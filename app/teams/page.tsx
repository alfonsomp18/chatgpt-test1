'use client';

import { getTeamColorEmoji } from '@/lib/helpers';
import { getTeamsWithPlayers } from '@/lib/stats';
import { useTournamentStore } from '@/lib/store';

export default function TeamsPage() {
  const { data } = useTournamentStore();
  const groupedTeams = getTeamsWithPlayers(data);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">👥 Plantillas</p>
        <h1 className="text-3xl font-bold tracking-tight">Miembros por equipo</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          Cada jugador muestra su posición, área interna y total de goles acumulados desde los partidos completados.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {groupedTeams.map((team) => (
          <article key={team.id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {getTeamColorEmoji(team.color)} {team.name}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {team.players.map((player) => (
                <li key={player.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-600">⚽ {player.goals} goles</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    <span className="font-medium">Posición:</span> {player.position || 'Sin posición'}
                    <span className="mx-2">•</span>
                    <span className="font-medium">Área:</span> {player.area || 'Sin área'}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
