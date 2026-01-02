import { NextResponse } from "next/server"

function calculateStats(matches: any[], playerId: string, targetMode: string) {
  const stats = {
    wins: 0,
    losses: 0,
    games: 0,
    civs: {} as Record<string, { wins: number, games: number }>,
    maps: {} as Record<string, { wins: number, games: number }>,
    opponents: {} as Record<string, number>,
    names: new Set<string>(),
    recentMatches: [] as any[]
  };

  const playerIdStr = playerId.toString();
  
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    
    // 1. IMPROVED MODE DETECTION
    const isUnrankedTabMatch = targetMode === "unranked" && (
        m.leaderboardId?.includes("unranked") || 
        m.leaderboardId?.includes("qp_") || 
        m.leaderboardId === "17" || 
        m.leaderboardId === "18" ||
        !m.leaderboardId
    );
    const isRankedMatch = m.leaderboardId === targetMode;
    if (!isUnrankedTabMatch && !isRankedMatch) continue;

    // 2. STRICT 1v1 PLAYER COUNT
    let totalPlayers = 0;
    if (m.teams) m.teams.forEach((t: any) => totalPlayers += (t.players?.length || 0));
    else if (m.players) totalPlayers = m.players.length;

    if ((targetMode === "unranked" || targetMode === "rm_1v1") && totalPlayers !== 2) continue;

    let p = m.players?.find((pl: any) => (pl.profileId || pl.profile_id || pl.profileid)?.toString() === playerIdStr);
    if (!p && m.teams) {
        for (const team of m.teams) {
            const found = team.players?.find((pl: any) => (pl.profileId || pl.profile_id || pl.profileid)?.toString() === playerIdStr);
            if (found) { p = found; break; }
        }
    }

    if (!p) continue;

    // 3. ROBUST OUTCOME
    let won = p.won === true || p.won === "true" || p.outcome === 1;
    if (p.won === null || p.won === undefined) {
        if (p.ratingDiff && p.ratingDiff > 0) won = true;
        else if (p.ratingDiff && p.ratingDiff < 0) won = false;
        else if (targetMode !== "unranked") continue; 
    }

    const mapName = m.mapName || m.mapname || m.map_type || "Unknown";
    if (mapName === "Unknown") continue;

    if (p.name) stats.names.add(p.name);
    stats.games++;
    if (won) stats.wins++; else stats.losses++;

    // 4. RECENT MATCHES (Matches are already sorted by date outside)
    if (stats.recentMatches.length < 3) {
        const myTeam: any[] = [];
        const opponentTeam: any[] = [];
        const myTeamId = p.team?.toString() || p.team_id?.toString();

        const processPlayer = (pl: any) => ({
            name: pl.name || "Anonymous",
            civ: pl.civ || pl.civilization_id || pl.civilizationId,
            rating: pl.rating || 0
        });

        if (m.teams) {
            m.teams.forEach((t: any) => {
                const teamId = t.teamId?.toString() || t.team_id?.toString() || t.team?.toString();
                const players = t.players?.map(processPlayer) || [];
                if (teamId === myTeamId) myTeam.push(...players);
                else opponentTeam.push(...players);
            });
        }

        stats.recentMatches.push({
            matchId: m.matchId || m.match_id,
            map: mapName,
            won,
            date: m.started || m.finished,
            myTeam,
            opponentTeam,
            modeLabel: totalPlayers === 2 ? "1v1" : "TG"
        });
    }

    // UPDATE STATS
    const civId = p.civ || p.civilization_id || p.civilizationId;
    if (civId) {
      if (!stats.civs[civId]) stats.civs[civId] = { wins: 0, games: 0 };
      stats.civs[civId].games++;
      if (won) stats.civs[civId].wins++;
    }

    if (!stats.maps[mapName]) stats.maps[mapName] = { wins: 0, games: 0 };
    stats.maps[mapName].games++;
    if (won) stats.maps[mapName].wins++;
  }

  // 5. MASTER SCORE CALCULATION
  const topCivs = Object.entries(stats.civs)
    .filter(([_, data]) => data.wins > 0)
    .map(([id, data]) => ({ id, ...data, winRate: Math.round((data.wins/data.games)*100), masterScore: (data.wins * 1000) + data.games }))
    .sort((a, b) => b.masterScore - a.masterScore).slice(0, 5);

  const topMaps = Object.entries(stats.maps)
    .filter(([_, data]) => data.wins > 0)
    .map(([name, data]) => ({ name, ...data, winRate: Math.round((data.wins/data.games)*100), masterScore: (data.wins * 1000) + data.games }))
    .sort((a, b) => b.masterScore - a.masterScore).slice(0, 5);

  return { wins: stats.wins, losses: stats.losses, games: stats.games, topCivs, topMaps, recentMatches: stats.recentMatches, names: Array.from(stats.names) };
}

async function fetchMatches(profileId: string, leaderboardId?: string) {
    try {
        const pages = [1, 2, 3];
        const allResults = await Promise.all(pages.map(async (page) => {
            const url = `https://data.aoe2companion.com/api/matches?profile_ids=${profileId}&per_page=100&page=${page}${leaderboardId ? `&leaderboard_ids=${leaderboardId}` : ''}`;
            const res = await fetch(url, { headers: { "User-Agent": "WololoArena/1.0" } });
            if (res.ok) {
                const data = await res.json();
                return data.matches || [];
            }
            return [];
        }));
        return allResults.flat();
    } catch (e) {
        return [];
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const profileRes = await fetch(`https://data.aoe2companion.com/api/profiles/${id}`, { headers: { "User-Agent": "WololoArena/1.0" } });
    let profileData: any = {};
    if (profileRes.ok) profileData = await profileRes.json();

    const [m1, mTeam, mUn, mAll] = await Promise.all([ 
        fetchMatches(id, "rm_1v1"), 
        fetchMatches(id, "rm_team"), 
        fetchMatches(id, "unranked"),
        fetchMatches(id) 
    ]);

    const combined = [...m1, ...mTeam, ...mUn, ...mAll];
    const uniqueMatches = Array.from(new Map(combined.map(m => [m.matchId || m.match_id, m])).values());

    // CRITICAL FIX: SORT BY DATE DESCENDING BEFORE PROCESSING
    uniqueMatches.sort((a, b) => {
        const dateA = new Date(a.started || a.finished || 0).getTime();
        const dateB = new Date(b.started || b.finished || 0).getTime();
        return dateB - dateA;
    });

    const result: any = { profileId: id, name: profileData.name || "Unknown Player", country: profileData.country, clan: profileData.clan, modes: {}, ratingHistory: profileData.ratings || [], nameHistory: [] };
    const allNames = new Set<string>();

    for (const key of ["rm_1v1", "rm_team", "unranked"]) {
      const calculated = calculateStats(uniqueMatches, id, key);
      calculated.names.forEach(n => allNames.add(n));
      const lbData = profileData.leaderboards?.find((l: any) => l.leaderboardId === key) || {};
      result.modes[key] = { rating: lbData.rating || 0, maxRating: lbData.maxRating || lbData.rating || 0, rank: lbData.rank || 0, ...calculated, games: lbData.games || calculated.games, wins: lbData.wins || calculated.wins, losses: lbData.losses || calculated.losses };
    }

    result.nameHistory = Array.from(allNames).filter(n => n.toLowerCase() !== result.name.toLowerCase()).slice(0, 3);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
