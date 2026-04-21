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
          Cada jugador mantiene la relación con su equipo, su área interna y su cuenta de goles derivada de los partidos.
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
                <li key={player.id} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  <span>
                    {player.name} — {player.area}
                  </span>
                  <span className="text-gray-500">{player.goals} goles</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
