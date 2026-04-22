'use client';

import { useEffect, useMemo, useState } from 'react';
import { jornadas as defaultJornadas, type JornadaRecord } from '@/data/jornadas';
import { matches as defaultMatches, type MatchEvent, type MatchRecord } from '@/data/matches';
import { players as defaultPlayers, type PlayerRecord } from '@/data/players';
import { teams as defaultTeams, type TeamRecord } from '@/data/teams';
import type { TournamentDataShape } from '@/lib/stats';

const STORAGE_KEY = 'tournamentData';

export interface TournamentData extends TournamentDataShape {}

export const DEFAULT_TOURNAMENT_DATA: TournamentData = {
  teams: defaultTeams,
  players: defaultPlayers,
  matches: defaultMatches,
  jornadas: defaultJornadas,
};

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}


function normalizeTournamentData(parsed: TournamentData): TournamentData {
  const migratedJornadas = parsed.jornadas.map((jornada) =>
    jornada.number === 3 ? { ...jornada, date: '2026-04-23' } : jornada,
  );

  const migratedMatches = parsed.matches.map((match) => {
    if (match.jornada !== 3 || !match.date.startsWith('2026-04-22T')) {
      return match;
    }

    return {
      ...match,
      date: match.date.replace('2026-04-22T', '2026-04-23T'),
    };
  });

  return {
    ...parsed,
    jornadas: migratedJornadas,
    matches: migratedMatches,
    players: parsed.players.map((player) => ({
      ...player,
      position: player.position ?? '',
      area: player.area ?? '',
    })),
  };
}

export function loadTournamentData(): TournamentData {
  if (typeof window === 'undefined') {
    return DEFAULT_TOURNAMENT_DATA;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return DEFAULT_TOURNAMENT_DATA;
  }

  try {
    const parsed = JSON.parse(raw) as TournamentData;

    if (!parsed?.teams || !parsed?.players || !parsed?.matches || !parsed?.jornadas) {
      return DEFAULT_TOURNAMENT_DATA;
    }

    return normalizeTournamentData(parsed);
  } catch {
    return DEFAULT_TOURNAMENT_DATA;
  }
}

export function persistTournamentData(data: TournamentData) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addJornada(data: TournamentData, input: { number: number; date: string }): TournamentData {
  const existing = data.jornadas.find((jornada) => jornada.number === input.number);

  if (existing) {
    const jornadas = data.jornadas.map((jornada) =>
      jornada.number === input.number ? { ...jornada, date: input.date } : jornada,
    );
    return { ...data, jornadas };
  }

  const jornadas = [...data.jornadas, { number: input.number, date: input.date }].sort(
    (a, b) => a.number - b.number,
  );

  return { ...data, jornadas };
}

export function addMatch(
  data: TournamentData,
  input: {
    jornada: number;
    homeTeamId: string;
    awayTeamId: string;
    date: string;
  },
): TournamentData {
  const nextMatch: MatchRecord = {
    id: generateId('match'),
    jornada: input.jornada,
    homeTeamId: input.homeTeamId,
    awayTeamId: input.awayTeamId,
    date: input.date,
    status: 'scheduled',
    score: {
      home: 0,
      away: 0,
    },
    events: [],
  };

  return {
    ...data,
    matches: [...data.matches, nextMatch],
  };
}

export function updateMatchResult(
  data: TournamentData,
  matchId: string,
  input: {
    homeGoals: number;
    awayGoals: number;
    events: MatchEvent[];
  },
): TournamentData {
  return {
    ...data,
    matches: data.matches.map((match) =>
      match.id === matchId
        ? {
            ...match,
            score: {
              home: input.homeGoals,
              away: input.awayGoals,
            },
            status: 'completed',
            events: input.events,
          }
        : match,
    ),
  };
}

export function addPlayer(
  data: TournamentData,
  input: { name: string; teamId: string; position: string; area: string },
): TournamentData {
  const player: PlayerRecord = {
    id: generateId('player'),
    name: input.name,
    teamId: input.teamId,
    position: input.position,
    area: input.area,
  };

  return {
    ...data,
    players: [...data.players, player],
    teams: data.teams.map((team) =>
      team.id === input.teamId ? { ...team, players: [...team.players, player.id] } : team,
    ),
  };
}

export function updatePlayer(
  data: TournamentData,
  playerId: string,
  input: { name: string; teamId: string; position: string; area: string },
): TournamentData {
  const current = data.players.find((player) => player.id === playerId);
  if (!current) {
    return data;
  }

  const players = data.players.map((player) =>
    player.id === playerId
      ? { ...player, name: input.name, teamId: input.teamId, position: input.position, area: input.area }
      : player,
  );

  const teams = data.teams.map((team) => {
    const withoutPlayer = team.players.filter((id) => id !== playerId);

    if (team.id === input.teamId) {
      return { ...team, players: [...withoutPlayer, playerId] };
    }

    return { ...team, players: withoutPlayer };
  });

  return { ...data, players, teams };
}

export function deletePlayer(data: TournamentData, playerId: string): TournamentData {
  return {
    ...data,
    players: data.players.filter((player) => player.id !== playerId),
    teams: data.teams.map((team) => ({
      ...team,
      players: team.players.filter((id) => id !== playerId),
    })),
    matches: data.matches.map((match) => ({
      ...match,
      events: match.events.filter((event) => event.playerId !== playerId),
    })),
  };
}

export function addTeam(data: TournamentData, input: { name: string; color: string }): TournamentData {
  const normalizedName = input.name.trim();
  if (!normalizedName) {
    return data;
  }

  const exists = data.teams.some((team) => team.name.toLowerCase() === normalizedName.toLowerCase());
  if (exists) {
    return data;
  }

  const team: TeamRecord = {
    id: generateId('team'),
    name: normalizedName,
    color: input.color,
    players: [],
  };

  return {
    ...data,
    teams: [...data.teams, team],
  };
}

export function updateTeam(
  data: TournamentData,
  teamId: string,
  input: { name: string; color: string },
): TournamentData {
  const normalizedName = input.name.trim();

  const duplicate = data.teams.some(
    (team) => team.id !== teamId && team.name.toLowerCase() === normalizedName.toLowerCase(),
  );

  if (duplicate || !normalizedName) {
    return data;
  }

  return {
    ...data,
    teams: data.teams.map((team) =>
      team.id === teamId ? { ...team, name: normalizedName, color: input.color } : team,
    ),
  };
}

export function deleteTeam(data: TournamentData, teamId: string): TournamentData {
  return {
    ...data,
    teams: data.teams.filter((team) => team.id !== teamId),
    players: data.players.filter((player) => player.teamId !== teamId),
    matches: data.matches.filter((match) => match.homeTeamId !== teamId && match.awayTeamId !== teamId),
  };
}

export function useTournamentStore() {
  const [data, setData] = useState<TournamentData>(DEFAULT_TOURNAMENT_DATA);

  useEffect(() => {
    const initial = loadTournamentData();
    setData(initial);
  }, []);

  const api = useMemo(
    () => ({
      data,
      setData: (nextData: TournamentData) => {
        setData(nextData);
        persistTournamentData(nextData);
      },
    }),
    [data],
  );

  return api;
}
