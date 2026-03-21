import { matches as baseMatches, type MatchEvent, type MatchRecord } from '@/data/matches';
import { players } from '@/data/players';
import { teams } from '@/data/teams';
import { computeStandings } from '@/lib/standings';

export interface MatchWithDetails extends MatchRecord {
  homeTeamName: string;
  awayTeamName: string;
  scorers: {
    home: string[];
    away: string[];
  };
}

export interface ScorerRow {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  goals: number;
}

export interface TeamWithPlayers {
  id: string;
  name: string;
  players: Array<{
    id: string;
    name: string;
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

export function getCompletedMatches(matchList: MatchRecord[] = baseMatches): MatchWithDetails[] {
  return matchList
    .filter((match) => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((match) => ({
      ...match,
      homeTeamName: teamMap.get(match.homeTeamId)?.name ?? match.homeTeamId,
      awayTeamName: teamMap.get(match.awayTeamId)?.name ?? match.awayTeamId,
      scorers: {
        home: getScorerNames(match, match.homeTeamId),
        away: getScorerNames(match, match.awayTeamId),
      },
    }));
}

export function getUpcomingMatches(matchList: MatchRecord[] = baseMatches): MatchWithDetails[] {
  return matchList
    .filter((match) => match.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((match) => ({
      ...match,
      homeTeamName: teamMap.get(match.homeTeamId)?.name ?? match.homeTeamId,
      awayTeamName: teamMap.get(match.awayTeamId)?.name ?? match.awayTeamId,
      scorers: {
        home: [],
        away: [],
      },
    }));
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
    players: players
      .filter((player) => player.teamId === team.id)
      .map((player) => ({
        id: player.id,
        name: player.name,
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
