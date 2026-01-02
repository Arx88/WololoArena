async function checkProfileDetail() {
  const url = "https://data.aoe2companion.com/api/profiles/196240";
  try {
      const res = await fetch(url, { headers: { "User-Agent": "Wololo" }});
      const data = await res.json();
      console.log("Has leaderboards?", !!data.leaderboards);
      if (data.leaderboards) {
          console.log(JSON.stringify(data.leaderboards, null, 2));
      } else {
          console.log("Keys:", Object.keys(data));
      }
  } catch(e) { console.log(e); }
}
checkProfileDetail();
