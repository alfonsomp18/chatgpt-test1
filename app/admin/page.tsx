'use client';

import { useMemo, useState } from 'react';
import type { MatchEvent } from '@/data/matches';
import { getTeamColorEmoji } from '@/lib/helpers';
import { computeStandings } from '@/lib/standings';
import { getScorers, getTeamsWithPlayers } from '@/lib/stats';
import {
  addJornada,
  addMatch,
  addPlayer,
  addTeam,
  deletePlayer,
  deleteTeam,
  updateMatchResult,
  updatePlayer,
  updateTeam,
  useTournamentStore,
} from '@/lib/store';

const AUTH_KEY = 'isAdminAuthenticated';
const AUTH_USER = 'admin';
const AUTH_PASS = 'admin1';

type AdminTab = 'jornadas' | 'resultados' | 'miembros' | 'equipos';

const tabs: Array<{ id: AdminTab; label: string }> = [
  { id: 'jornadas', label: 'Gestionar Jornadas / Partidos' },
  { id: 'resultados', label: 'Registrar Resultados' },
  { id: 'miembros', label: 'Miembros por equipo' },
  { id: 'equipos', label: 'Equipos' },
];

function parseGoalEntries(entries: string, data: ReturnType<typeof useTournamentStore>['data']): MatchEvent[] {
  const lines = entries
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const playersMap = new Map(data.players.map((player) => [player.id, player]));

  return lines.flatMap((line) => {
    const [playerId, minuteRaw] = line.split(',').map((segment) => segment?.trim());
    const player = playersMap.get(playerId ?? '');

    if (!player) {
      return [];
    }

    return [
      {
        playerId: player.id,
        teamId: player.teamId,
        minute: minuteRaw ? Number(minuteRaw) : undefined,
      },
    ];
  });
}

export default function AdminPage() {
  const store = useTournamentStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('jornadas');

  const [jornadaNumber, setJornadaNumber] = useState('');
  const [jornadaDate, setJornadaDate] = useState('');

  const [newMatchJornada, setNewMatchJornada] = useState('');
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [matchDate, setMatchDate] = useState('');

  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [homeGoals, setHomeGoals] = useState('0');
  const [awayGoals, setAwayGoals] = useState('0');
  const [goalEntries, setGoalEntries] = useState('');

  const [playerName, setPlayerName] = useState('');
  const [playerTeamId, setPlayerTeamId] = useState('');
  const [playerArea, setPlayerArea] = useState('');
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('azul');
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const scheduledMatches = useMemo(
    () => store.data.matches.filter((match) => match.status === 'scheduled'),
    [store.data.matches],
  );

  const standingsPreview = useMemo(
    () => computeStandings(store.data.teams, store.data.matches),
    [store.data.matches, store.data.teams],
  );

  const scorersPreview = useMemo(() => getScorers(store.data), [store.data]);
  const teamsPreview = useMemo(() => getTeamsWithPlayers(store.data), [store.data]);

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username === AUTH_USER && password === AUTH_PASS) {
      setIsAuthenticated(true);
      setLoginError('');
      window.localStorage.setItem(AUTH_KEY, 'true');
      return;
    }

    setLoginError('Credenciales inválidas. Usa admin / admin1.');
  }

  function handleLogout() {
    setIsAuthenticated(false);
    window.localStorage.removeItem(AUTH_KEY);
  }

  function handleAddJornada(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!jornadaNumber || !jornadaDate) {
      return;
    }

    const nextData = addJornada(store.data, {
      number: Number(jornadaNumber),
      date: jornadaDate,
    });

    store.setData(nextData);
    setJornadaNumber('');
    setJornadaDate('');
  }

  function handleAddMatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newMatchJornada || !homeTeamId || !awayTeamId || !matchDate || homeTeamId === awayTeamId) {
      return;
    }

    const nextData = addMatch(store.data, {
      jornada: Number(newMatchJornada),
      homeTeamId,
      awayTeamId,
      date: new Date(matchDate).toISOString(),
    });

    store.setData(nextData);
    setNewMatchJornada('');
    setHomeTeamId('');
    setAwayTeamId('');
    setMatchDate('');
  }

  function handleSaveResult(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedMatchId) {
      return;
    }

    const events = parseGoalEntries(goalEntries, store.data);
    const nextData = updateMatchResult(store.data, selectedMatchId, {
      homeGoals: Number(homeGoals),
      awayGoals: Number(awayGoals),
      events,
    });

    store.setData(nextData);
    setSelectedMatchId('');
    setHomeGoals('0');
    setAwayGoals('0');
    setGoalEntries('');
  }

  function handleSavePlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!playerName || !playerTeamId || !playerArea) {
      return;
    }

    const nextData = editingPlayerId
      ? updatePlayer(store.data, editingPlayerId, {
          name: playerName,
          teamId: playerTeamId,
          area: playerArea,
        })
      : addPlayer(store.data, {
          name: playerName,
          teamId: playerTeamId,
          area: playerArea,
        });

    store.setData(nextData);
    setEditingPlayerId(null);
    setPlayerName('');
    setPlayerTeamId('');
    setPlayerArea('');
  }

  function beginEditPlayer(playerId: string) {
    const player = store.data.players.find((candidate) => candidate.id === playerId);

    if (!player) {
      return;
    }

    setEditingPlayerId(player.id);
    setPlayerName(player.name);
    setPlayerTeamId(player.teamId);
    setPlayerArea(player.area);
  }

  function handleDeletePlayer(playerId: string) {
    store.setData(deletePlayer(store.data, playerId));

    if (editingPlayerId === playerId) {
      setEditingPlayerId(null);
      setPlayerName('');
      setPlayerTeamId('');
      setPlayerArea('');
    }
  }

  function handleSaveTeam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!teamName || !teamColor) {
      return;
    }

    const nextData = editingTeamId
      ? updateTeam(store.data, editingTeamId, {
          name: teamName,
          color: teamColor,
        })
      : addTeam(store.data, {
          name: teamName,
          color: teamColor,
        });

    store.setData(nextData);
    setEditingTeamId(null);
    setTeamName('');
    setTeamColor('azul');
  }

  function beginEditTeam(teamId: string) {
    const team = store.data.teams.find((candidate) => candidate.id === teamId);

    if (!team) {
      return;
    }

    setEditingTeamId(team.id);
    setTeamName(team.name);
    setTeamColor(team.color);
  }

  function handleDeleteTeam(teamId: string) {
    store.setData(deleteTeam(store.data, teamId));

    if (editingTeamId === teamId) {
      setEditingTeamId(null);
      setTeamName('');
      setTeamColor('azul');
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">Ingresa con tus credenciales para acceder al panel administrativo.</p>

        <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
          <label className="block text-sm text-gray-700">
            Usuario
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
            />
          </label>

          <label className="block text-sm text-gray-700">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
            />
          </label>

          {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}

          <button type="submit" className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white">
            Iniciar sesión
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin</h1>
          <p className="text-sm text-gray-600">Gestiona jornadas, partidos, resultados, jugadores y equipos desde un solo panel.</p>
        </div>
        <button onClick={handleLogout} className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700">
          Cerrar sesión
        </button>
      </header>

      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap gap-2 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'rounded-md px-3 py-2 text-sm',
                activeTab === tab.id ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-700',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'jornadas' ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={handleAddJornada} className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Crear / Actualizar Jornada</h2>
            <input
              type="number"
              placeholder="Número de jornada"
              value={jornadaNumber}
              onChange={(event) => setJornadaNumber(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            />
            <input
              type="date"
              value={jornadaDate}
              onChange={(event) => setJornadaDate(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            />
            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">Guardar jornada</button>
          </form>

          <form onSubmit={handleAddMatch} className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Agregar Partido</h2>
            <select
              value={newMatchJornada}
              onChange={(event) => setNewMatchJornada(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="">Seleccionar jornada</option>
              {store.data.jornadas.map((jornada) => (
                <option key={jornada.number} value={jornada.number}>
                  Jornada {jornada.number}
                </option>
              ))}
            </select>

            <select
              value={homeTeamId}
              onChange={(event) => setHomeTeamId(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="">Equipo local</option>
              {store.data.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {getTeamColorEmoji(team.color)} {team.name}
                </option>
              ))}
            </select>

            <select
              value={awayTeamId}
              onChange={(event) => setAwayTeamId(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="">Equipo visitante</option>
              {store.data.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {getTeamColorEmoji(team.color)} {team.name}
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              value={matchDate}
              onChange={(event) => setMatchDate(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            />

            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">Agregar Partido</button>
          </form>
        </div>
      ) : null}

      {activeTab === 'resultados' ? (
        <form onSubmit={handleSaveResult} className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Registrar Resultados</h2>

          <select
            value={selectedMatchId}
            onChange={(event) => setSelectedMatchId(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2"
          >
            <option value="">Seleccionar partido</option>
            {scheduledMatches.map((match) => {
              const home = store.data.teams.find((team) => team.id === match.homeTeamId)?.name ?? match.homeTeamId;
              const away = store.data.teams.find((team) => team.id === match.awayTeamId)?.name ?? match.awayTeamId;

              return (
                <option key={match.id} value={match.id}>
                  Jornada {match.jornada} — {home} vs {away}
                </option>
              );
            })}
          </select>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="number"
              min={0}
              value={homeGoals}
              onChange={(event) => setHomeGoals(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
              placeholder="Goles local"
            />
            <input
              type="number"
              min={0}
              value={awayGoals}
              onChange={(event) => setAwayGoals(event.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2"
              placeholder="Goles visitante"
            />
          </div>

          <label className="block text-sm text-gray-700">
            Goleadores (una fila por gol, formato: playerId,minute)
            <textarea
              value={goalEntries}
              onChange={(event) => setGoalEntries(event.target.value)}
              className="mt-1 min-h-28 w-full rounded-md border border-gray-200 px-3 py-2"
              placeholder="player-1,12\nplayer-6,55"
            />
          </label>

          <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">Guardar resultado</button>
        </form>
      ) : null}

      {activeTab === 'miembros' ? (
        <div className="space-y-4">
          <form onSubmit={handleSavePlayer} className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-4">
            <input
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Nombre"
              className="rounded-md border border-gray-200 px-3 py-2"
            />
            <select
              value={playerTeamId}
              onChange={(event) => setPlayerTeamId(event.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              <option value="">Equipo</option>
              {store.data.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <input
              value={playerArea}
              onChange={(event) => setPlayerArea(event.target.value)}
              placeholder="Área"
              className="rounded-md border border-gray-200 px-3 py-2"
            />
            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
              {editingPlayerId ? 'Actualizar' : 'Agregar'}
            </button>
          </form>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Equipo</th>
                  <th className="px-4 py-3">Área</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {store.data.players.map((player) => (
                  <tr key={player.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{player.name}</td>
                    <td className="px-4 py-3">
                      {store.data.teams.find((team) => team.id === player.teamId)?.name ?? player.teamId}
                    </td>
                    <td className="px-4 py-3">{player.area}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => beginEditPlayer(player.id)} className="rounded border border-gray-200 px-2 py-1">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDeletePlayer(player.id)} className="rounded border border-gray-200 px-2 py-1">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {activeTab === 'equipos' ? (
        <div className="space-y-4">
          <form onSubmit={handleSaveTeam} className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:grid-cols-3">
            <input
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              placeholder="Nombre del equipo"
              className="rounded-md border border-gray-200 px-3 py-2"
            />
            <select
              value={teamColor}
              onChange={(event) => setTeamColor(event.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2"
            >
              {['azul', 'negro', 'verde', 'amarillo', 'blanco'].map((color) => (
                <option key={color} value={color}>
                  {getTeamColorEmoji(color)} {color}
                </option>
              ))}
            </select>
            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
              {editingTeamId ? 'Actualizar' : 'Agregar'}
            </button>
          </form>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Equipo</th>
                  <th className="px-4 py-3">Color</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {store.data.teams.map((team) => (
                  <tr key={team.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      {getTeamColorEmoji(team.color)} {team.name}
                    </td>
                    <td className="px-4 py-3">{team.color}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => beginEditTeam(team.id)} className="rounded border border-gray-200 px-2 py-1">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDeleteTeam(team.id)} className="rounded border border-gray-200 px-2 py-1">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-500">Resumen Tabla</h3>
          <p className="mt-2 text-sm text-gray-700">Equipos en tabla: {standingsPreview.length}</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-500">Resumen Goleo</h3>
          <p className="mt-2 text-sm text-gray-700">Jugadores registrados: {scorersPreview.length}</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-500">Resumen Plantillas</h3>
          <p className="mt-2 text-sm text-gray-700">Equipos gestionados: {teamsPreview.length}</p>
        </article>
      </div>
    </section>
  );
}
