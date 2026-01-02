import { test, expect } from '@playwright/test';

test('Verify APIs are responsive', async ({ request }) => {
  // Test Search API
  const searchRes = await request.get('http://localhost:3000/api/aoe2/search?name=TheViper');
  console.log(`Search API Status: ${searchRes.status()}`);
  expect(searchRes.ok()).toBe(true);
  
  const searchData = await searchRes.json();
  expect(searchData.length).toBeGreaterThan(0);
  const profileId = searchData[0].profileId;

  // Test Profile API
  const profileRes = await request.get(`http://localhost:3000/api/aoe2/profile/${profileId}`);
  console.log(`Profile API Status: ${profileRes.status()}`);
  expect(profileRes.ok()).toBe(true);
  
  const profileData = await profileRes.json();
  expect(profileData.name).toBeDefined();
  console.log(`Profile Data Name: ${profileData.name}`);
});
