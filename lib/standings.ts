import { matches, type MatchRecord } from '@/data/matches';
import { teams, type TeamRecord } from '@/data/teams';

export type MatchResultCode = 'W' | 'D' | 'L';

export interface StandingRow {
  id: string;
  name: string;
  color: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  last5: MatchResultCode[];
}

function completedMatchesOnly(matchList: MatchRecord[]) {
  return matchList.filter((match) => match.status === 'completed');
}

function getTeamResult(match: MatchRecord, teamId: string): MatchResultCode | null {
  if (match.status !== 'completed') {
    return null;
  }

  const isHomeTeam = match.homeTeamId === teamId;
  const isAwayTeam = match.awayTeamId === teamId;

  if (!isHomeTeam && !isAwayTeam) {
    return null;
  }

  const goalsFor = isHomeTeam ? match.score.home : match.score.away;
  const goalsAgainst = isHomeTeam ? match.score.away : match.score.home;

  if (goalsFor > goalsAgainst) {
    return 'W';
  }

  if (goalsFor < goalsAgainst) {
    return 'L';
  }

  return 'D';
}

export function computeStandings(teamList: TeamRecord[] = teams, matchList: MatchRecord[] = matches): StandingRow[] {
  const completedMatches = completedMatchesOnly(matchList);

  const table = teamList.map<StandingRow>((team) => {
    const teamMatches = completedMatches.filter(
      (match) => match.homeTeamId === team.id || match.awayTeamId === team.id,
    );

    let wins = 0;
    let draws = 0;
    let losses = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;

    const last5 = [...teamMatches]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((match) => getTeamResult(match, team.id))
      .filter((result): result is MatchResultCode => result !== null);

    for (const match of teamMatches) {
      const isHomeTeam = match.homeTeamId === team.id;
      const scored = isHomeTeam ? match.score.home : match.score.away;
      const conceded = isHomeTeam ? match.score.away : match.score.home;

      goalsFor += scored;
      goalsAgainst += conceded;

      if (scored > conceded) {
        wins += 1;
      } else if (scored < conceded) {
        losses += 1;
      } else {
        draws += 1;
      }
    }

    return {
      id: team.id,
      name: team.name,
      color: team.color,
      played: teamMatches.length,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      points: wins * 3 + draws,
      last5,
    };
  });

  return table.sort((a, b) => {
    const pointsDifference = b.points - a.points;

    if (pointsDifference !== 0) {
      return pointsDifference;
    }

    const goalDifference = b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);

    if (goalDifference !== 0) {
      return goalDifference;
    }

    return b.goalsFor - a.goalsFor;
  });
}
