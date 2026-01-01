import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-sm text-muted-foreground">
              Click the link in your email to verify your account and start drafting. The link will expire in 24 hours.
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

