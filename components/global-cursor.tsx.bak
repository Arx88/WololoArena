"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updatePosition = () => {
      // 0.9 for faster response, less delay
      currentX += (mouseX - currentX) * 0.9
      currentY += (mouseY - currentY) * 0.9
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
      requestAnimationFrame(updatePosition)
    }

    const handleDown = () => setIsClicked(true)
    const handleUp = () => setIsClicked(false)

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    
    const animationId = requestAnimationFrame(updatePosition)
    
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (!mounted) return null

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" 
      style={{ 
        willChange: "transform",
        backfaceVisibility: "hidden",
        // This is key: ensure the cursor doesn't trigger any hover/paint calculations itself
        pointerEvents: "none"
      }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 border border-yellow-500/50"
        animate={{
          rotate: isClicked ? 225 : 45,
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
    </div>
  )
}
