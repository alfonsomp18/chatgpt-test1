import { matches as baseMatches, type MatchEvent, type MatchRecord } from '@/data/matches';
import { players } from '@/data/players';
import { teams } from '@/data/teams';
import { computeStandings } from '@/lib/standings';

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
    area: string;
    goals: number;
  }>;
}

const teamMap = new Map(teams.map((team) => [team.id, team]));
const playerMap = new Map(players.map((player) => [player.id, player]));

function getScorerNames(match: MatchRecord, teamId: string) {
  return match.events
    .filter((event) => event.teamId === teamId)
    .map((event) => {
      const player = playerMap.get(event.playerId);
      return player ? `${player.name}${event.minute ? ` (${event.minute}')` : ''}` : 'Jugador desconocido';
    });
}

function addMatchDetails(match: MatchRecord): MatchWithDetails {
  return {
    ...match,
    homeTeamName: teamMap.get(match.homeTeamId)?.name ?? match.homeTeamId,
    awayTeamName: teamMap.get(match.awayTeamId)?.name ?? match.awayTeamId,
    homeTeamColor: teamMap.get(match.homeTeamId)?.color ?? 'white',
    awayTeamColor: teamMap.get(match.awayTeamId)?.color ?? 'white',
    scorers: {
      home: getScorerNames(match, match.homeTeamId),
      away: getScorerNames(match, match.awayTeamId),
    },
  };
}

function groupMatchesByJornada(matches: MatchWithDetails[]) {
  const grouped = new Map<number, MatchWithDetails[]>();

  matches.forEach((match) => {
    grouped.set(match.jornada, [...(grouped.get(match.jornada) ?? []), match]);
  });

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map<MatchesByJornada>(([jornada, jornadaMatches]) => ({ jornada, matches: jornadaMatches }));
}

export function getCompletedMatches(matchList: MatchRecord[] = baseMatches): MatchWithDetails[] {
  return matchList
    .filter((match) => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(addMatchDetails);
}

export function getCompletedMatchesByJornada(matchList: MatchRecord[] = baseMatches) {
  return groupMatchesByJornada(
    getCompletedMatches(matchList).sort((a, b) => {
      if (a.jornada !== b.jornada) {
        return a.jornada - b.jornada;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }),
  );
}

export function getUpcomingMatches(matchList: MatchRecord[] = baseMatches): MatchWithDetails[] {
  return matchList
    .filter((match) => match.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(addMatchDetails);
}

export function getUpcomingMatchesByJornada(matchList: MatchRecord[] = baseMatches) {
  return groupMatchesByJornada(getUpcomingMatches(matchList));
}

export function getScorers(matchList: MatchRecord[] = baseMatches): ScorerRow[] {
  const goalTotals = new Map<string, number>();

  matchList
    .filter((match) => match.status === 'completed')
    .forEach((match) => {
      match.events.forEach((event) => {
        goalTotals.set(event.playerId, (goalTotals.get(event.playerId) ?? 0) + 1);
      });
    });

  return players
    .map((player) => ({
      playerId: player.id,
      playerName: player.name,
      teamId: player.teamId,
      teamName: teamMap.get(player.teamId)?.name ?? player.teamId,
      teamColor: teamMap.get(player.teamId)?.color ?? 'white',
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

export function getTeamsWithPlayers(matchList: MatchRecord[] = baseMatches): TeamWithPlayers[] {
  const scorers = getScorers(matchList);
  const goalsByPlayer = new Map(scorers.map((row) => [row.playerId, row.goals]));

  return teams.map((team) => ({
    id: team.id,
    name: team.name,
    color: team.color,
    players: players
      .filter((player) => player.teamId === team.id)
      .map((player) => ({
        id: player.id,
        name: player.name,
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

export function updateMatchResult(
  matchId: string,
  data: UpdateMatchInput,
  matchList: MatchRecord[] = baseMatches,
) {
  const updatedMatches = matchList.map((match) =>
    match.id === matchId
      ? {
          ...match,
          score: data.score,
          events: data.events,
          status: data.status ?? 'completed',
        }
      : match,
  );

  return {
    matches: updatedMatches,
    standings: computeStandings(teams, updatedMatches),
    scorers: getScorers(updatedMatches),
    teamMembers: getTeamsWithPlayers(updatedMatches),
  };
}
