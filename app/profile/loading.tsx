
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"

export default function ProfileLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020202]">
      <main className="flex-1">
        {/* Cinematic Header Skeleton */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-white/10 pt-20">
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10 w-full flex flex-col items-center">
            <Skeleton className="h-8 w-24 mb-6 rounded-full bg-white/5" />
            <Skeleton className="h-20 w-3/4 mb-4 rounded-xl bg-white/5" />
            <Skeleton className="h-4 w-1/2 rounded-lg bg-white/5" />
          </div>
        </section>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
           <div className="grid gap-8">
              <Skeleton className="h-[400px] w-full rounded-3xl bg-white/5" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Skeleton className="h-[300px] rounded-3xl bg-white/5" />
                 <Skeleton className="h-[300px] rounded-3xl bg-white/5" />
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
