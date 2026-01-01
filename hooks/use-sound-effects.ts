"use client"

import { useCallback } from "react"

export function useSoundEffects() {
  const playSound = useCallback((type: "click" | "hover" | "turn_start" | "lock" | "tick" | "coin_land" | "success" | "error") => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return

    const ctx = new AudioContext()
    const now = ctx.currentTime

    const createEnvelope = (gain: any, duration: number, peak: number) => {
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(peak, now + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    }

    switch (type) {
      case "success": {
        // Bright Ascending Chord (Maj7 style)
        [523.25, 659.25, 783.99, 987.77].forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = "sine"
          osc.frequency.setValueAtTime(freq, now + (i * 0.05))
          createEnvelope(g, 0.6, 0.05)
          osc.connect(g).connect(ctx.destination)
          osc.start(now + (i * 0.05))
          osc.stop(now + 0.6 + (i * 0.05))
        })
        break
      }

      case "error": {
        // Low Dissonant Growl
        [110, 115, 123].forEach((freq) => {
          const osc = ctx.createOscillator()
          const g = ctx.createGain()
          osc.type = "sawtooth"
          osc.frequency.setValueAtTime(freq, now)
          osc.frequency.linearRampToValueAtTime(freq - 20, now + 0.3)
          createEnvelope(g, 0.4, 0.05)
          osc.connect(g).connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.4)
        })
        break
      }

      case "click": {
        // Organic Wood/Parchment Snap
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(1200, now)
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05)
        createEnvelope(g, 0.05, 0.1)
        osc.connect(g).connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
        
        // Add a bit of "thump"
        const osc2 = ctx.createOscillator()
        const g2 = ctx.createGain()
        osc2.type = "triangle"
        osc2.frequency.setValueAtTime(150, now)
        createEnvelope(g2, 0.1, 0.05)
        osc2.connect(g2).connect(ctx.destination)
        osc2.start(now)
        osc2.stop(now + 0.1)
        break
      }

      case "turn_start": {
        // Premium Notification Chime (Glassy/Ethereal)
        const fundamental = 523.25; // C5
        [1, 1.5, 2, 2.5].forEach((ratio, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(fundamental * ratio, now);
            
            // Smoother attack, longer release
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.05 / (i + 1), now + 0.1); 
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

            osc.connect(gain).connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 2.0);
        });
        break
      }
        
      case "lock": {
        // Heavy Cinematic Impact (Low thud + metallic ring)
        const oscLow = ctx.createOscillator();
        const gainLow = ctx.createGain();
        oscLow.type = "triangle";
        oscLow.frequency.setValueAtTime(80, now);
        oscLow.frequency.exponentialRampToValueAtTime(30, now + 0.3);
        
        gainLow.gain.setValueAtTime(0, now);
        gainLow.gain.linearRampToValueAtTime(0.4, now + 0.02);
        gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        oscLow.connect(gainLow).connect(ctx.destination);
        oscLow.start(now);
        oscLow.stop(now + 0.5);

        // Metallic overtone
        const oscMetal = ctx.createOscillator();
        const gainMetal = ctx.createGain();
        oscMetal.type = "sine";
        oscMetal.frequency.setValueAtTime(400, now);
        // Frequency modulation for metallic clang
        oscMetal.frequency.linearRampToValueAtTime(200, now + 0.1); 
        
        gainMetal.gain.setValueAtTime(0, now);
        gainMetal.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gainMetal.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        oscMetal.connect(gainMetal).connect(ctx.destination);
        oscMetal.start(now);
        oscMetal.stop(now + 0.3);
        break
      }

      case "tick": {
        // Professional Mechanical Tick
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = "sine"
        o.frequency.setValueAtTime(2000, now)
        createEnvelope(g, 0.02, 0.02)
        o.connect(g).connect(ctx.destination)
        o.start(now)
        o.stop(now + 0.02)
        break
      }

      case "coin_land": {
        // Metallic Clink
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = "sine"
        o.frequency.setValueAtTime(2500, now)
        o.frequency.exponentialRampToValueAtTime(1500, now + 0.1)
        createEnvelope(g, 0.2, 0.05)
        o.connect(g).connect(ctx.destination)
        o.start(now)
        o.stop(now + 0.2)
        break
      }
    }
  }, [])

  return { playSound }
}