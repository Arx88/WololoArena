"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { LobbyHub } from "@/components/lobby/lobby-hub"
import { LobbyRoom } from "@/components/lobby/lobby-room" // New import
import type { Lobby, Draft, Profile } from "@/lib/types/draft" // New import
import { isDemoMode } from "@/lib/demo/auth" // New import
import { createClient } from "@/lib/supabase/client" // New import

function LobbyPageContent() {
  const searchParams = useSearchParams();
  const lobbyId = searchParams.get('id');
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("Player")

  // New state variables for LobbyRoom props
  const [lobby, setLobby] = useState<Lobby | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [hostProfile, setHostProfile] = useState<Profile | null>(null)
  const [guestProfile, setGuestProfile] = useState<Profile | null>(null)
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    const checkAuthAndFetchLobby = async () => {
      setIsLoading(true); // Ensure loading state is true at the start of fetch
      let currentUserId: string | null = null;
      let currentUsername: string = "Player";

      // AUTHENTICATION PART
      const demoModeValue = localStorage.getItem("demo_mode");
      const demoUserValue = localStorage.getItem("demo_user");
      const isDemo = demoModeValue === "true"; // New isDemo variable

      if (isDemo) {
        let demoUser = { id: "demo-user-001", email: "admin@demo.com", username: "Admin" };
        if (demoUserValue) {
          try { demoUser = JSON.parse(demoUserValue); } catch (e) { /* console.error("Error parsing demo user:", e); */ }
        }
        currentUserId = demoUser.id;
        currentUsername = demoUser.username;
        setUserId(demoUser.id);
        setUsername(demoUser.username);
      } else {
        try {
          const supabase = createClient();
          const { data: { user: supaUser } } = await supabase.auth.getUser();
          if (!supaUser) { router.push("/auth/login"); return; }
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", supaUser.id).single();
          currentUserId = supaUser.id;
          currentUsername = profile?.username || `Player_${supaUser.id.slice(0, 8)}`;
          setUserId(currentUserId);
          setUsername(currentUsername);
        } catch (error) {
          // console.error("Supabase auth error:", error);
          router.push("/auth/login"); return;
        }
      }

      // LOBBY DATA FETCHING PART
      if (lobbyId && currentUserId) { // Only fetch lobby if lobbyId and userId are present
        if (isDemo) {
          const demoLobbyData = localStorage.getItem(`demo_lobby_data_${lobbyId}`);
          if (demoLobbyData) {
            const parsedLobby = JSON.parse(demoLobbyData);
            setLobby(parsedLobby);
            const currentIsHost = parsedLobby.host_id === currentUserId;
            setIsHost(currentIsHost);

            // Always set hostProfile and guestProfile for demo mode based on lobby data
            setHostProfile({ id: parsedLobby.host_id, username: parsedLobby.host_id === currentUserId ? currentUsername : "Demo Host" });

            if (parsedLobby.guest_id) {
                setGuestProfile({ id: parsedLobby.guest_id, username: parsedLobby.guest_id === currentUserId ? currentUsername : "Demo Guest" });
            } else {
                // If no guest is explicitly set in demo lobby data, create a placeholder if current user is host
                if (currentIsHost) {
                    setGuestProfile({ id: "demo-guest-001", username: "Simulated Guest" });
                } else {
                    // If current user is guest but no guest_id on lobby, means they are waiting for host to become guest.
                    // Or if current user is not host and no guest_id, then there is no guest.
                    setGuestProfile(null); // Explicitly null if no guest in demo data
                }
            }
          } else {
            // If no demo lobby data, redirect to main lobby page
            router.push("/lobby");
            return;
          }
        } else {
          // Fetch from Supabase
          try {
            const supabase = createClient();
            const { data: fetchedLobby, error: lobbyError } = await supabase.from("lobbies").select(`
              *,
              host_profile:profiles!host_id (username),
              guest_profile:profiles!guest_id (username)
            `).eq("id", lobbyId).single();

            if (lobbyError || !fetchedLobby) {
              // console.error("Error fetching lobby:", lobbyError?.message);
              router.push("/lobby"); // Redirect if lobby not found
              return;
            }

            setLobby(fetchedLobby);
            setIsHost(fetchedLobby.host_id === currentUserId);
            // Set host and guest profiles
            if (fetchedLobby.host_profile) { setHostProfile(fetchedLobby.host_profile); }
            if (fetchedLobby.guest_profile) { setGuestProfile(fetchedLobby.guest_profile); }

            // Fetch draft if exists
            const { data: fetchedDraft } = await supabase.from("drafts").select("*").eq("lobby_id", lobbyId).single();
            setDraft(fetchedDraft);

          } catch (error) {
            // console.error("Supabase lobby fetch error:", error);
            router.push("/lobby");
            return;
          }
        }
      } else if (lobbyId && !currentUserId) {
        // lobbyId present but userId not found yet, wait for auth
        // This case implies that auth is still pending; the useEffect will re-run when userId is set.
        return;
      } else if (!lobbyId) {
        // No lobbyId, so we are in the main LobbyHub view, no specific lobby to load.
        // This path is now the default for /lobby
      }

      setIsLoading(false); // Set loading to false once all data is fetched or determined
    };

    checkAuthAndFetchLobby();
  }, [lobbyId, userId, router]); // Dependencies: re-run when lobbyId or userId changes

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!userId) {
    // Redirect to login if userId is null after loading is complete
    if (!isLoading && typeof window !== 'undefined') {
      router.push("/auth/login");
    }
    return null; // Or a loading spinner if auth check is still ongoing
  }

  // If a specific lobby is requested via lobbyId and loaded
  if (lobbyId && lobby && hostProfile) { // Ensure hostProfile is loaded for LobbyRoom
    return (
      <LobbyRoom
        lobby={lobby}
        draft={draft}
        userId={userId}
        username={username}
        hostProfile={hostProfile}
        guestProfile={guestProfile} // guestProfile can be null initially
        isHost={isHost}
      />
    );
  }

  // If no lobbyId, render the main LobbyHub for creating/joining
  return (
    <div className="h-screen w-full bg-[#020202] text-white overflow-hidden flex flex-col relative">
      <Navbar />
      
      <main className="flex-1 relative z-10 w-full flex items-center justify-center px-6 pt-32 pb-10">
        <div className="w-full max-w-4xl">
          <LobbyHub userId={userId} username={username} />
        </div>
      </main>
    </div>
  );
}

export default function LobbyPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <LobbyPageContent />
    </Suspense>
  )
}
