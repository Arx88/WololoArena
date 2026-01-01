// Demo authentication system - allows viewing UI without database
// Use credentials: admin / admin

export interface DemoUser {
  id: string
  email: string
  username: string
}

export const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin",
}

export const DEMO_USER: DemoUser = {
  id: "demo-user-001",
  email: "admin@demo.com",
  username: "Admin",
}

export const DEMO_OPPONENT: DemoUser = {
  id: "demo-user-002",
  email: "opponent@demo.com",
  username: "Opponent",
}

export function isDemoMode(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return localStorage.getItem("demo_mode") === "true"
}

export function getDemoUser(): DemoUser | null {
  if (!isDemoMode()) {
    return null
  }
  const userStr = localStorage.getItem("demo_user")
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return DEMO_USER
    }
  }
  return DEMO_USER
}

export function setDemoMode(enabled: boolean) {
  if (typeof window === "undefined") {
    return
  }

  if (enabled) {
    localStorage.setItem("demo_mode", "true")
    localStorage.setItem("demo_user", JSON.stringify(DEMO_USER))
    document.cookie = "demo_mode=true; path=/; max-age=86400; SameSite=Lax"
  } else {
    localStorage.removeItem("demo_mode")
    localStorage.removeItem("demo_user")
    document.cookie = "demo_mode=; path=/; max-age=0"
  }
}

export function validateDemoCredentials(username: string, password: string): boolean {
  return username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password
}
