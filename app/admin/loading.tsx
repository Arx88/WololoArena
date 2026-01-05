
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020202]">
      <main className="flex-1 pt-32 container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
           <Skeleton className="h-10 w-48 bg-white/5 rounded-lg" />
           <Skeleton className="h-10 w-32 bg-white/5 rounded-lg" />
        </div>
        <div className="grid gap-6">
           <Skeleton className="h-[200px] w-full bg-white/5 rounded-2xl" />
           <Skeleton className="h-[200px] w-full bg-white/5 rounded-2xl" />
        </div>
      </main>
    </div>
  )
}
