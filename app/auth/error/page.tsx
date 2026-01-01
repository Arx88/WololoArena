import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image
              src="/images/wololo-icon.png"
              alt="AOE2 Wololo Arena"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-primary">AOE2 Wololo Arena</h1>
        </div>

        <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Something Went Wrong</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {params?.error ? (
              <p className="mb-6 text-sm text-muted-foreground">Error: {params.error}</p>
            ) : (
              <p className="mb-6 text-sm text-muted-foreground">An unspecified error occurred during authentication.</p>
            )}
            <Link href="/auth/login">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Try Again</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

