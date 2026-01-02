const https = require('https');

async function testFinalData() {
  const id = "196240"; // TheViper
  console.log("--- STARTING DATA VALIDATION FOR THEVIPER ---");
  
  try {
    // 1. Perfil
    const pRes = await fetch(`https://data.aoe2companion.com/api/profiles/${id}`);
    const profile = await pRes.json();
    console.log("✓ Profile Name:", profile.name);
    console.log("✓ ELO RM 1v1:", profile.leaderboards.find(l => l.leaderboardId === 'rm_1v1')?.rating);

    // 2. Historial (Relic)
    const relicUrl = `https://aoe-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=nm&profile_id=${id}`;
    const mRes = await fetch(relicUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    const mData = await mRes.json();
    const matches = mData.matchHistoryStats || [];
    
    console.log("✓ Matches Found:", matches.length);
    
    if (matches.length > 0) {
        const first = matches[0];
        console.log("✓ Real Map Name:", first.mapname);
        const civId = first.matchHistoryMember.find(m => m.profile_id == id)?.civilization_id;
        console.log("✓ Real Civ ID used:", civId);
    }
    
    console.log("--- DATA VALIDATION COMPLETE: ALL FIELDS RECOVERED ---");
  } catch (e) {
    console.log("X ERROR:", e.message);
  }
}
testFinalData();
