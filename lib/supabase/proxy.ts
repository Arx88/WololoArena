import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  const demoModeCookie = request.cookies.get("demo_mode")
  const isDemoMode = demoModeCookie?.value === "true"

  if (isDemoMode) {
    return supabaseResponse
  }

  // Look for Supabase auth cookies - these are set by Supabase when a user logs in
  const hasAuthCookies = request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("sb-") && cookie.name.includes("-auth-token"))

  // Protected routes that require authentication
  const protectedPaths = ["/lobby", "/draft", "/profile"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if accessing protected route without auth cookies
  if (isProtectedPath && !hasAuthCookies) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
