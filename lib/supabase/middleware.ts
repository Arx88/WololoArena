import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  // Protected routes - redirect to login if not authenticated
  const protectedPaths = ["/profile", "/admin", "/lobby", "/draft"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Check for demo mode cookie
  const isDemo = request.cookies.get("demo_mode")?.value === "true"

  if (isProtectedPath && !isDemo) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
