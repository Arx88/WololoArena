import { NextResponse } from "next/server"
import https from "https"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    // Usamos el mirror de aoe2.se que es el más estable para historial de partidas
    // Agente de HTTPS para ignorar problemas de certificado en este mirror comunitario si ocurren
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    const apiUrl = `https://api.aoe2.se/player/matches?profile_id=${id}&count=50`;
    console.log(`[AOE2 PROFILE] Fetching history: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      // @ts-ignore - node-fetch / next fetch soporta agent en algunos entornos o simplemente ignoramos el error de cert en la config del fetch
      agent: agent, 
      headers: { "User-Agent": "WololoArena/1.0" }
    })

    if (!response.ok) return NextResponse.json(null)

    const data = await response.json()
    // La estructura de aoe2.net/aoe2.se es un array directo de matches
    const history = Array.isArray(data) ? data : []
    
    const civCount: Record<number, number> = {}
    
    history.forEach((match: any) => {
      const myPlayer = match.players?.find((p: any) => p.profile_id?.toString() === id)
      if (myPlayer?.civ) {
        civCount[myPlayer.civ] = (civCount[myPlayer.civ] || 0) + 1
      }
    })

    const sortedCivs = Object.entries(civCount)
      .map(([civId, count]) => ({
        id: parseInt(civId),
        count: count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return NextResponse.json({
      profileId: id,
      matchesCount: history.length,
      topCivs: sortedCivs
    })
  } catch (error) {
    console.error("Profile API error:", error)
    return NextResponse.json(null)
  }
}
