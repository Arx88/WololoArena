import { NextResponse } from "next/server"

const profileCache = new Map();

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

  matches.forEach((m) => {
    if (targetMode === "rm_1v1" && m.leaderboardId !== "rm_1v1") return;
    if (targetMode === "rm_team" && m.leaderboardId !== "rm_team") return;
    if (targetMode === "unranked" && m.leaderboardId !== "unranked") return;

    let p = m.players?.find((pl: any) => (pl.profile_id || pl.profileId)?.toString() === playerId);
    
    if (!p && m.teams) {
        for (const team of m.teams) {
            const found = team.players?.find((pl: any) => (pl.profile_id || pl.profileId)?.toString() === playerId);
            if (found) { p = found; break; }
        }
    }

    if (!p) return;

    if (p.name) stats.names.add(p.name);

    stats.games++;
    const won = p.won === true || p.won === "true" || p.outcome === 1;
    if (won) stats.wins++; else stats.losses++;

    const myTeamId = p.team?.toString() || p.team_id?.toString();
    const myTeam: any[] = [];
    const opponentTeam: any[] = [];
    
    if (m.teams) {
        m.teams.forEach((t: any) => {
            const teamId = t.teamId?.toString() || t.team_id?.toString() || t.team?.toString();
            const players = t.players?.map((pl: any) => ({
                name: pl.name,
                civ: pl.civ || pl.civilization_id || pl.civilizationId,
                rating: pl.rating || 0
            })) || [];
            if (teamId === myTeamId) {
                myTeam.push(...players);
            } else {
                opponentTeam.push(...players);
            }
        });
    } else if (m.players) {
        m.players.forEach((pl: any) => {
            const teamId = pl.team?.toString() || pl.team_id?.toString();
            const playerInfo = {
                name: pl.name,
                civ: pl.civ || pl.civilization_id || pl.civilizationId,
                rating: pl.rating || 0
            };
            if (teamId === myTeamId) {
                myTeam.push(playerInfo);
            } else {
                opponentTeam.push(playerInfo);
            }
        });
    }

    // Determine MVP for each side (Highest rating)
    const myTeamMvp = [...myTeam].sort((a, b) => b.rating - a.rating)[0];
    const opponentTeamMvp = [...opponentTeam].sort((a, b) => b.rating - a.rating)[0];

    if (stats.recentMatches.length < 3) {
        const modeLabel = (myTeam.length + opponentTeam.length) <= 2 ? "1v1" : `${myTeam.length}v${opponentTeam.length}`;

        stats.recentMatches.push({
            matchId: m.matchId || m.match_id,
            map: m.mapName || m.mapname || m.map_type || "Unknown",
            won,
            date: m.started || m.finished,
            myTeam,
            opponentTeam,
            modeLabel,
            myTeamMvpName: myTeamMvp?.name || null,
            opponentTeamMvpName: opponentTeamMvp?.name || null
        });
    }

    if (!won) {
        opponentTeam.forEach(op => {
            if (op.civ) stats.opponents[op.civ] = (stats.opponents[op.civ] || 0) + 1;
        });
    }

    const civId = p.civ || p.civilization_id || p.civilizationId;
    if (civId) {
      if (!stats.civs[civId]) stats.civs[civId] = { wins: 0, games: 0 };
      stats.civs[civId].games++;
      if (won) stats.civs[civId].wins++;
    }

    const mapName = m.mapName || m.mapname || m.map_type || "Unknown";
    if (mapName) {
      if (!stats.maps[mapName]) stats.maps[mapName] = { wins: 0, games: 0 };
      stats.maps[mapName].games++;
      if (won) stats.maps[mapName].wins++;
    }
  });

  const worstCiv = Object.entries(stats.opponents)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const topCivs = Object.entries(stats.civs)
    .map(([id, data]) => ({ 
        id: id, 
        ...data, 
        winRate: Math.round((data.wins/data.games)*100),
        masterScore: data.games * (data.wins/data.games)
    }))
    .sort((a, b) => b.masterScore - a.masterScore || b.games - a.games)
    .slice(0, 5);

  const topMaps = Object.entries(stats.maps)
    .map(([name, data]) => ({ 
        name, 
        ...data, 
        winRate: Math.round((data.wins/data.games)*100),
        masterScore: data.games * (data.wins/data.games)
    }))
    .sort((a, b) => b.masterScore - a.masterScore || b.games - a.games)
    .slice(0, 5);

  return { 
    wins: stats.wins, 
    losses: stats.losses, 
    games: stats.games, 
    topCivs, 
    topMaps, 
    worstCiv,
    recentMatches: stats.recentMatches,
    names: Array.from(stats.names) 
  };
}

async function fetchMatches(profileId: string, leaderboardId?: string) {
    try {
        const url = `https://data.aoe2companion.com/api/matches?profile_ids=${profileId}&per_page=100${leaderboardId ? `&leaderboard_ids=${leaderboardId}` : ''}`;
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (res.ok) {
            const data = await res.json();
            return data.matches || data || [];
        }
    } catch (e) {
        console.error(`Fetch matches failed for ${leaderboardId}`, e);
    }
    return [];
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const cached = profileCache.get(id);
  if (cached && (Date.now() - cached.timestamp < 600000)) {
      return NextResponse.json(cached.data);
  }

  try {
    const profileRes = await fetch(`https://data.aoe2companion.com/api/profiles/${id}`, {
      headers: { "User-Agent": "WololoArena/1.0" }
    });
    
    let profileData: any = {};
    if (profileRes.ok) {
        profileData = await profileRes.json();
    }

    const [matches1v1, matchesTeam, matchesUnranked] = await Promise.all([
        fetchMatches(id, "rm_1v1"),
        fetchMatches(id, "rm_team"),
        fetchMatches(id, "unranked")
    ]);

    const result: any = {
      profileId: id,
      name: profileData.name || "Unknown Player",
      country: profileData.country,
      clan: profileData.clan,
      modes: {},
      ratingHistory: profileData.ratings || [],
      nameHistory: []
    };

    const modeDataMap: Record<string, any[]> = {
        "rm_1v1": matches1v1,
        "rm_team": matchesTeam,
        "unranked": matchesUnranked
    };

    const allNames = new Set<string>();
    const modes = ["rm_1v1", "rm_team", "unranked"];

    for (const key of modes) {
      const lbData = profileData.leaderboards?.find((l: any) => l.leaderboardId === key) || {};
      const matches = modeDataMap[key];
      const calculated = calculateStats(matches, id, key);

      calculated.names.forEach(n => allNames.add(n));

      result.modes[key] = {
        rating: lbData.rating || 0,
        maxRating: lbData.maxRating || lbData.rating || 0,
        rank: lbData.rank || 0,
        ...calculated,
        games: lbData.games || calculated.games,
        wins: lbData.wins || calculated.wins,
        losses: lbData.losses || calculated.losses
      };
    }

    const history = Array.from(allNames).filter(n => n.toLowerCase() !== result.name.toLowerCase()).slice(0, 3);
    result.nameHistory = history;

    profileCache.set(id, { timestamp: Date.now(), data: result });
    return NextResponse.json(result);

  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}
