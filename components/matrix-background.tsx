"use client"

import { useMemo, useRef, useEffect, useState, memo } from "react"
import { CIVILIZATIONS } from "@/lib/data/civilizations"

// Memoized to prevent re-renders unless explicitly needed
const MatrixBackground = memo(function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  
  const allIcons = useMemo(() => CIVILIZATIONS.map(c => c.icon).filter(Boolean), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black antialiased"
      style={{ contain: 'strict' } as any}
    >
      <div className="absolute inset-0 bg-black antialiased" />
      
      {isVisible && (
        <div className="absolute inset-0 flex justify-between opacity-10 md:opacity-15 mask-gradient-vertical transform -skew-x-6 scale-110">
          {[...Array(6)].map((_, i) => {
            const rotatedIcons = [...allIcons.slice(i * 5), ...allIcons.slice(0, i * 5)].slice(0, 8)
            return (
              <div 
                key={i} 
                className="flex flex-col animate-infinite-scroll" 
                style={{ 
                  animationDuration: `${40 + i * 10}s`, 
                  animationDelay: `-${i * 3}s`,
                  willChange: 'transform',
                  transform: 'translate3d(0,0,0)' 
                }}
              >
                <div className="flex flex-col gap-24 py-10">
                  {rotatedIcons.map((icon, j) => (
                    <div key={`a-${j}`} className="relative w-10 h-10 grayscale brightness-50 opacity-40">
                      <img src={icon || ""} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-24 py-10">
                  {rotatedIcons.map((icon, j) => (
                    <div key={`b-${j}`} className="relative w-10 h-10 grayscale brightness-50 opacity-40">
                      <img src={icon || ""} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      <style jsx global>{`
        @keyframes infinite-scroll { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, -50%, 0); } }
        .animate-infinite-scroll { animation-name: infinite-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }
        .mask-gradient-vertical { mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
      `}</style>
    </div>
  )
})

export default MatrixBackground