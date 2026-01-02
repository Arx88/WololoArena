async function getRealData() {
  try {
    console.log("Authenticating with Microsoft PlayFab...");
    const loginRes = await fetch("https://20cca.playfabapi.com/Client/LoginWithCustomID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CustomId: "WololoArenaUser", CreateAccount: true, TitleId: "20CCA" })
    });
    const loginData = await loginRes.json();
    const sessionTicket = loginData.data.SessionTicket;

    console.log("Fetching Official Leaderboard...");
    const lbRes = await fetch("https://20cca.playfabapi.com/Client/GetLeaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Authorization": sessionTicket },
      body: JSON.stringify({ MaxResultsCount: 5, StatisticName: "RM_1v1" })
    });
    const lbData = await lbRes.json();
    
    if (lbData.data.Leaderboard) {
      console.log("SUCCESS_OFFICIAL_DATA_FOUND");
      console.log("Top Player:", lbData.data.Leaderboard[0].DisplayName);
      console.log("ELO:", lbData.data.Leaderboard[0].StatValue);
    }
  } catch (e) {
    console.log("FAILED:", e.message);
  }
}
getRealData();
