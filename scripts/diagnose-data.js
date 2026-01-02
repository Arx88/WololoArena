async function diagnose() {
  const id = "196240"; // TheViper
  const url = `http://localhost:3000/api/aoe2/profile/${id}`;
  
  console.log("Checking Profile API for TheViper...");
  try {
      const res = await fetch(`https://data.aoe2companion.com/api/profiles/${id}`);
      const profile = await res.json();
      console.log("Profile Name:", profile.name);
      
      const relicUrl = `https://aoe-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=nm&profile_id=${id}`;
      const matchesRes = await fetch(relicUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
      const matchesData = await matchesRes.json();
      console.log("Recent Matches Count:", matchesData.matchHistoryStats?.length);
      
      if (matchesData.matchHistoryStats?.length > 0) {
          const first = matchesData.matchHistoryStats[0];
          console.log("Sample Match Map:", first.mapname);
          console.log("Sample Match Players:", first.matchHistoryMember?.length);
      }
  } catch (e) {
      console.error("Diagnosis failed:", e.message);
  }
}
diagnose();
