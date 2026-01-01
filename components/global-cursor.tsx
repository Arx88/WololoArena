"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function GlobalCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isClicked, setIsClicked] = useState(false)
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; y: number }[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    const handleDown = (e: MouseEvent) => {
      setIsClicked(true)
      const id = Math.random() 
      setClickSparks(prev => [...prev, { id, x: e.clientX, y: e.clientY }].slice(-3))
      setTimeout(() => {
        setClickSparks(prev => prev.filter(s => s.id !== id))
      }, 800)
    }
    
    const handleUp = () => setIsClicked(false)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
    }
  }, []) // Constant dependency array to prevent hydration and loop errors

  if (!mounted) return null

  return (
    <>
      {/* 1. THE CUSTOM TACTICAL CURSOR */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" 
        style={{ 
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          willChange: "transform"
        }}
      >
        {/* Outer Rotating Diamond */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 border border-yellow-500/50"
          animate={{
            rotate: isClicked ? 225 : 45,
            scale: isClicked ? 0.8 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
        {/* Inner Static Diamond */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-yellow-500 mix-blend-difference"
          style={{ rotate: 45 }}
          animate={{
            scale: isClicked ? 1.5 : 1,
            backgroundColor: isClicked ? "#f97316" : "#eab308"
          }}
        />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-500/5 blur-lg rounded-full" />
      </div>

      {/* 2. PERSISTENT & CLICK PARTICLES */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {/* Continuous Trail */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              x: [mousePos.x, mousePos.x + (Math.random() - 0.5) * 150],
              y: [mousePos.y, mousePos.y - 200],
              opacity: [0, 0.3, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            className="absolute w-1 h-1 bg-orange-600 rounded-full blur-[1px]"
          />
        ))}

        {/* Click Burst */}
        <AnimatePresence>
          {clickSparks.map(spark => (
            <div key={spark.id} className="absolute" style={{ left: spark.x, top: spark.y }}>
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ scale: 0, opacity: 1 }}
                   animate={{ 
                     x: (Math.random() - 0.5) * 250, 
                     y: (Math.random() - 0.5) * 250,
                     scale: [1.5, 0],
                     opacity: [1, 0]
                   }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="absolute w-1 h-1 bg-orange-500 rounded-full blur-[1.5px] shadow-[0_0_8px_#f97316]"
                 />
               ))}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
