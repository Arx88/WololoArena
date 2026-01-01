"use client"

import { useEffect, useState, useRef } from "react"
import { useTutorial } from "@/lib/tutorial/tutorial-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Lightbulb } from "lucide-react"

interface HighlightRect {
  top: number
  left: number
  width: number
  height: number
}

export function TutorialOverlay() {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTutorial, getCurrentStep } = useTutorial()
  const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const step = getCurrentStep()

  useEffect(() => {
    if (!isActive || !step) {
      setHighlightRect(null)
      return
    }

    const updatePosition = () => {
      const element = document.querySelector(step.target)
      console.log("[v0] Looking for element:", step.target, "found:", !!element)

      if (element) {
        const rect = element.getBoundingClientRect()
        const padding = 8

        setHighlightRect({
          top: rect.top - padding + window.scrollY,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        })

        // Calculate tooltip position
        const tooltipWidth = 320
        const tooltipHeight = 200
        let top = 0
        let left = 0

        switch (step.position) {
          case "top":
            top = rect.top + window.scrollY - tooltipHeight - 20
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case "bottom":
            top = rect.bottom + window.scrollY + 20
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case "left":
            top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2
            left = rect.left - tooltipWidth - 20
            break
          case "right":
            top = rect.top + window.scrollY + rect.height / 2 - tooltipHeight / 2
            left = rect.right + 20
            break
        }

        // Keep tooltip in viewport
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipWidth - 20))
        top = Math.max(20, top)

        setTooltipPosition({ top, left })

        // Scroll element into view if needed
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [isActive, step, currentStep])

  if (!isActive || !step) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {highlightRect && (
              <rect
                x={highlightRect.left}
                y={highlightRect.top}
                width={highlightRect.width}
                height={highlightRect.height}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.75)"
          mask="url(#spotlight-mask)"
          onClick={skipTutorial}
        />
      </svg>

      {/* Highlight border animation */}
      {highlightRect && (
        <div
          className="absolute rounded-lg border-2 border-primary animate-pulse pointer-events-none"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute w-80 pointer-events-auto"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary/10 px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{step.title}</span>
            </div>
            <button onClick={skipTutorial} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-muted-foreground leading-relaxed">{step.content}</p>

            {step.actionText && (
              <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                {step.actionText}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="gap-1 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button size="sm" onClick={nextStep} className="gap-1">
                {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
