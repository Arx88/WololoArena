import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500 opacity-20" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 animate-pulse">
          Synchronizing Archives
        </p>
      </div>
    </div>
  )
}
