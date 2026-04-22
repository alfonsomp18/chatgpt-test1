import type { JornadaRecord } from '@/data/jornadas';
import type { MatchEvent, MatchRecord } from '@/data/matches';
import { matches as defaultMatches } from '@/data/matches';
import type { PlayerRecord } from '@/data/players';
import { players as defaultPlayers } from '@/data/players';
import type { TeamRecord } from '@/data/teams';
import { teams as defaultTeams } from '@/data/teams';
import { computeStandings } from '@/lib/standings';

export interface TournamentDataShape {
  teams: TeamRecord[];
  players: PlayerRecord[];
  matches: MatchRecord[];
  jornadas: JornadaRecord[];
}

const defaultData: TournamentDataShape = {
  teams: defaultTeams,
  players: defaultPlayers,
  matches: defaultMatches,
  jornadas: [],
};

export interface MatchWithDetails extends MatchRecord {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamColor: string;
  awayTeamColor: string;
  scorers: {
    home: string[];
    away: string[];
  };
}

export interface MatchesByJornada {
  jornada: number;
  jornadaDate?: string;
  matches: MatchWithDetails[];
}

export interface ScorerRow {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  teamColor: string;
  goals: number;
}

export interface TeamWithPlayers {
  id: string;
  name: string;
  color: string;
  players: Array<{
    id: string;
    name: string;
    position: string;
    area: string;
    goals: number;
  }>;
}

function getScorerNames(match: MatchRecord, teamId: string, playersMap: Map<string, PlayerRecord>) {
  return match.events
    .filter((event) => event.teamId === teamId)
    .map((event) => {
      const player = playersMap.get(event.playerId);
      return player ? `${player.name}${event.minute ? ` (${event.minute}')` : ''}` : 'Jugador desconocido';
    });
}

function addMatchDetails(match: MatchRecord, teamsMap: Map<string, TeamRecord>, playersMap: Map<string, PlayerRecord>): MatchWithDetails {
  return {
    ...match,
    homeTeamName: teamsMap.get(match.homeTeamId)?.name ?? match.homeTeamId,
    awayTeamName: teamsMap.get(match.awayTeamId)?.name ?? match.awayTeamId,
    homeTeamColor: teamsMap.get(match.homeTeamId)?.color ?? 'white',
    awayTeamColor: teamsMap.get(match.awayTeamId)?.color ?? 'white',
    scorers: {
      home: getScorerNames(match, match.homeTeamId, playersMap),
      away: getScorerNames(match, match.awayTeamId, playersMap),
    },
  };
}

function groupMatchesByJornada(matches: MatchWithDetails[], jornadasMap: Map<number, JornadaRecord>) {
  const grouped = new Map<number, MatchWithDetails[]>();

  matches.forEach((match) => {
    grouped.set(match.jornada, [...(grouped.get(match.jornada) ?? []), match]);
  });

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map<MatchesByJornada>(([jornada, jornadaMatches]) => ({
      jornada,
      jornadaDate: jornadasMap.get(jornada)?.date,
      matches: jornadaMatches,
    }));
}

function getMaps(data: TournamentDataShape) {
  return {
    teamsMap: new Map(data.teams.map((team) => [team.id, team])),
    playersMap: new Map(data.players.map((player) => [player.id, player])),
    jornadasMap: new Map(data.jornadas.map((jornada) => [jornada.number, jornada])),
  };
}

export function getCompletedMatches(data: TournamentDataShape = defaultData): MatchWithDetails[] {
  const { teamsMap, playersMap } = getMaps(data);

  return data.matches
    .filter((match) => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((match) => addMatchDetails(match, teamsMap, playersMap));
}

export function getCompletedMatchesByJornada(data: TournamentDataShape = defaultData) {
  const { jornadasMap } = getMaps(data);

  return groupMatchesByJornada(
    getCompletedMatches(data).sort((a, b) => {
      if (a.jornada !== b.jornada) {
        return a.jornada - b.jornada;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }),
    jornadasMap,
  );
}

export function getUpcomingMatches(data: TournamentDataShape = defaultData): MatchWithDetails[] {
  const { teamsMap, playersMap } = getMaps(data);

  return data.matches
    .filter((match) => match.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((match) => addMatchDetails(match, teamsMap, playersMap));
}

export function getUpcomingMatchesByJornada(data: TournamentDataShape = defaultData) {
  const { jornadasMap } = getMaps(data);
  return groupMatchesByJornada(getUpcomingMatches(data), jornadasMap);
}

export function getScorers(data: TournamentDataShape = defaultData): ScorerRow[] {
  const goalTotals = new Map<string, number>();
  const { teamsMap } = getMaps(data);

  data.matches
    .filter((match) => match.status === 'completed')
    .forEach((match) => {
      match.events.forEach((event) => {
        goalTotals.set(event.playerId, (goalTotals.get(event.playerId) ?? 0) + 1);
      });
    });

  return data.players
    .map((player) => ({
      playerId: player.id,
      playerName: player.name,
      teamId: player.teamId,
      teamName: teamsMap.get(player.teamId)?.name ?? player.teamId,
      teamColor: teamsMap.get(player.teamId)?.color ?? 'white',
      goals: goalTotals.get(player.id) ?? 0,
    }))
    .sort((a, b) => {
      const goalsDifference = b.goals - a.goals;
      if (goalsDifference !== 0) {
        return goalsDifference;
      }
      return a.playerName.localeCompare(b.playerName);
    });
}

export function getTeamsWithPlayers(data: TournamentDataShape = defaultData): TeamWithPlayers[] {
  const scorers = getScorers(data);
  const goalsByPlayer = new Map(scorers.map((row) => [row.playerId, row.goals]));

  return data.teams.map((team) => ({
    id: team.id,
    name: team.name,
    color: team.color,
    players: data.players
      .filter((player) => player.teamId === team.id)
      .map((player) => ({
        id: player.id,
        name: player.name,
        position: player.position ?? '',
        area: player.area,
        goals: goalsByPlayer.get(player.id) ?? 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

interface UpdateMatchInput {
  score: {
    home: number;
    away: number;
  };
  events: MatchEvent[];
  status?: MatchRecord['status'];
}

export function updateMatchResult(matchId: string, data: UpdateMatchInput, sourceData: TournamentDataShape = defaultData) {
  const updatedMatches = sourceData.matches.map((match) =>
    match.id === matchId
      ? {
          ...match,
          score: data.score,
          events: data.events,
          status: data.status ?? 'completed',
        }
      : match,
  );

  const nextData = {
    ...sourceData,
    matches: updatedMatches,
  };

  return {
    data: nextData,
    standings: computeStandings(nextData.teams, nextData.matches),
    scorers: getScorers(nextData),
    teamMembers: getTeamsWithPlayers(nextData),
  };
}
