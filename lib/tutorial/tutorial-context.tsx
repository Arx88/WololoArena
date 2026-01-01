"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface TutorialStep {
  id: string
  target: string // CSS selector for the element to highlight
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
  action?: "click" | "hover" | "none"
  actionText?: string
}

interface TutorialContextType {
  isActive: boolean
  currentStep: number
  steps: TutorialStep[]
  startTutorial: (steps: TutorialStep[]) => void
  nextStep: () => void
  prevStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  getCurrentStep: () => TutorialStep | null
}

const TutorialContext = createContext<TutorialContextType | null>(null)

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<TutorialStep[]>([])

  const startTutorial = useCallback((tutorialSteps: TutorialStep[]) => {
    console.log("[v0] Tutorial started with", tutorialSteps.length, "steps")
    setSteps(tutorialSteps)
    setCurrentStep(0)
    setIsActive(true)
  }, [])

  const nextStep = useCallback(() => {
    console.log("[v0] Next step, current:", currentStep, "total:", steps.length)
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsActive(false)
      setCurrentStep(0)
    }
  }, [currentStep, steps.length])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const skipTutorial = useCallback(() => {
    console.log("[v0] Tutorial skipped")
    setIsActive(false)
    setCurrentStep(0)
  }, [])

  const completeTutorial = useCallback(() => {
    console.log("[v0] Tutorial completed")
    setIsActive(false)
    setCurrentStep(0)
  }, [])

  const getCurrentStep = useCallback(() => {
    return steps[currentStep] || null
  }, [steps, currentStep])

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps,
        startTutorial,
        nextStep,
        prevStep,
        skipTutorial,
        completeTutorial,
        getCurrentStep,
      }}
    >
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (!context) {
    throw new Error("useTutorial must be used within a TutorialProvider")
  }
  return context
}
