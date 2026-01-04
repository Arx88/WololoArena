import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ p1: string, p2: string }> }) {
  const { p1, p2 } = await params;

  try {
    const pages = [1, 2, 3, 4, 5]; 
    const allMatches: any[] = [];

    await Promise.all(pages.map(async (page) => {
        const url = `https://data.aoe2companion.com/api/matches?profile_ids=${p1},${p2}&per_page=100&page=${page}`;
        const res = await fetch(url, { 
            headers: { "User-Agent": "WololoArena/1.0" },
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (res.ok) {
            const data = await res.json();
            if (data.matches) allMatches.push(...data.matches);
        }
    }));

    const versusMatches = allMatches.filter(m => {
        const players = m.players || m.teams?.flatMap((t: any) => t.players) || [];
        const hasP1 = players.some((pl: any) => (pl.profileId || pl.profile_id)?.toString() === p1);
        const hasP2 = players.some((pl: any) => (pl.profileId || pl.profile_id)?.toString() === p2);
        return hasP1 && hasP2;
    });

    const uniqueVersus = Array.from(new Map(versusMatches.map(m => [m.matchId || m.match_id, m])).values());

    uniqueVersus.sort((a, b) => {
        const dateA = new Date(a.started || a.finished || 0).getTime();
        const dateB = new Date(b.started || b.finished || 0).getTime();
        return dateB - dateA;
    });

    const formatted = uniqueVersus.map(m => {
        const players = m.players || m.teams?.flatMap((t: any) => t.players) || [];
        const p1Data = players.find((pl: any) => (pl.profileId || pl.profile_id)?.toString() === p1);
        const p2Data = players.find((pl: any) => (pl.profileId || pl.profile_id)?.toString() === p2);

        // Calcular duración
        let duration = "??:??";
        if (m.started && m.finished) {
            const start = new Date(m.started).getTime();
            const end = new Date(m.finished).getTime();
            const diff = Math.floor((end - start) / 1000);
            const mins = Math.floor(diff / 60);
            const secs = diff % 60;
            duration = `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        return {
            matchId: m.matchId || m.match_id,
            map: m.mapName || m.mapname || "Unknown Map",
            date: m.started || m.finished,
            duration,
            won: p1Data?.won === true || p1Data?.won === "true" || p1Data?.outcome === 1,
            p1Civ: p1Data?.civ || p1Data?.civilization_id,
            p2Civ: p2Data?.civ || p2Data?.civilization_id,
            mode: m.leaderboardId || "unranked"
        };
    });

    return NextResponse.json({
        p1,
        p2,
        totalGames: formatted.length,
        matches: formatted
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}