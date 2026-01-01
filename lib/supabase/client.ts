import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not configured - running in demo mode")
    // Return a mock client that doesn't throw errors
    return createMockClient()
  }

  if (typeof window === "undefined") {
    // Server-side: always create new client
    try {
      return createBrowserClient(supabaseUrl, supabaseAnonKey)
    } catch (e) {
      console.warn("[v0] Failed to create Supabase client:", e)
      return createMockClient()
    }
  }

  // Client-side: use singleton pattern
  if (!supabaseClient) {
    try {
      supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
    } catch (e) {
      console.warn("[v0] Failed to create Supabase client:", e)
      return createMockClient()
    }
  }

  return supabaseClient
}

// Mock client for demo mode when Supabase is not available
function createMockClient(): any {
  const mockResponse = { data: null, error: null }
  const mockAuthResponse = { data: { user: null, session: null }, error: null }

  const chainableMock = (): any => ({
    select: () => chainableMock(),
    insert: () => chainableMock(),
    update: () => chainableMock(),
    delete: () => chainableMock(),
    eq: () => chainableMock(),
    in: () => chainableMock(),
    single: () => Promise.resolve(mockResponse),
    order: () => chainableMock(),
    limit: () => chainableMock(),
    then: (resolve: any) => resolve(mockResponse),
  })

  return {
    auth: {
      getUser: () => Promise.resolve(mockAuthResponse),
      getSession: () => Promise.resolve(mockAuthResponse),
      signUp: () => Promise.resolve(mockAuthResponse),
      signInWithPassword: () => Promise.resolve(mockAuthResponse),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => chainableMock(),
    channel: () => ({
      on: () => ({ subscribe: () => ({}) }),
      subscribe: () => ({}),
    }),
    removeChannel: () => {},
  }
}

export function getSupabaseClient() {
  return createClient()
}
