import React from "react"
import { cn } from "@/lib/utils"

interface MedievalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stone" | "wood" | "parchment" | "glass-framed"
  decoration?: "none" | "corners" | "simple"
}

export function MedievalPanel({ 
  children, 
  className, 
  variant = "stone", 
  decoration = "simple",
  ...props 
}: MedievalPanelProps) {
  
  const variants = {
    stone: "bg-card border-2 border-border shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]",
    wood: "bg-[#2a231d] border-2 border-[#5c4033] shadow-lg",
    parchment: "bg-[#e3dcd2] text-black border border-[#d4c5b0] paper-texture",
    "glass-framed": "bg-background/80 backdrop-blur-sm border-2 border-primary/30 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
  }

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-sm transition-all",
        variants[variant],
        className
      )} 
      {...props}
    >
      {/* Decorative Borders/Corners */}
      {decoration === "corners" && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-md" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-md" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-md" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-md" />
        </>
      )}
      
      {decoration === "simple" && (
        <div className="absolute inset-[3px] border border-white/5 pointer-events-none rounded-sm" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
