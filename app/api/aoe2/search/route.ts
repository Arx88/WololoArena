import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")

  if (!name || name.length < 2) return NextResponse.json([])

  try {
    // 1. Buscar perfiles básicos
    const searchUrl = `https://data.aoe2companion.com/api/profiles?search=${encodeURIComponent(name)}&page=1`;
    console.log(`[AOE2 API] Fetching Search: ${searchUrl}`);

    const searchResponse = await fetch(searchUrl, {
      headers: { "User-Agent": "WololoArena/1.0" }
    })

    if (!searchResponse.ok) return NextResponse.json([])
    const searchData = await searchResponse.json()
    if (!searchData.profiles) return NextResponse.json([])

    // 2. Obtener detalles completos (ELO) para cada resultado (limitado a top 5 para velocidad)
    const topProfiles = searchData.profiles.slice(0, 5);
    
    const detailedPlayers = await Promise.all(topProfiles.map(async (p: any) => {
        try {
            const detailUrl = `https://data.aoe2companion.com/api/profiles/${p.profileId}`;
            const detailResponse = await fetch(detailUrl, { headers: { "User-Agent": "WololoArena/1.0" } });
            
            if (!detailResponse.ok) return { ...p, rating: 0, rank: 0 };
            
            const detailData = await detailResponse.json();
            // Buscar leaderboard 1v1 RM (leaderboardId "rm_1v1" o 3)
            const rm1v1 = detailData.leaderboards?.find((l: any) => l.leaderboardId === "rm_1v1" || l.leaderboardId === 3) || {};

            return {
                profileId: p.profileId?.toString(),
                name: p.name,
                country: p.country,
                rating: rm1v1.rating || 0,
                rank: rm1v1.rank || 0,
                games: rm1v1.games || p.games || 0,
                wins: rm1v1.wins || 0,
                losses: rm1v1.losses || 0,
                lastMatch: p.lastMatch // Timestamp
            }
        } catch (e) {
            console.error(`Failed to fetch detail for ${p.profileId}`, e);
            return { ...p, rating: 0 };
        }
    }));

    // Filtrar solo los que tienen rating > 0 para relevancia, o devolver todos
    return NextResponse.json(detailedPlayers)
  } catch (error) {
    console.error("Search API exception:", error)
    return NextResponse.json([])
  }
}
