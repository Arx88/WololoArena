"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

export interface Prediction {
  id: string
  draft_id: string
  session_id: string
  phase: string
  turn_number: number
  predicted_item: string
  actual_item?: string
  is_correct?: boolean
  created_at: string
}

export interface PredictionStats {
  total_predictions: number
  correct_predictions: number
  accuracy: number
}

interface UseSpectatorPredictionsProps {
  draftId: string
  currentPhase: string
  turnNumber: number
  isDemo?: boolean
}

export function useSpectatorPredictions({
  draftId,
  currentPhase,
  turnNumber,
  isDemo = false,
}: UseSpectatorPredictionsProps) {
  const supabase = createClient()
  const [myPrediction, setMyPrediction] = useState<Prediction | null>(null)
  const [allPredictions, setAllPredictions] = useState<Record<string, number>>({}) // item -> count
  const [stats, setStats] = useState<PredictionStats>({ total_predictions: 0, correct_predictions: 0, accuracy: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const sessionIdRef = useRef<string>("")

  useEffect(() => {
    let sessionId = sessionStorage.getItem("spectator_session_id")
    if (!sessionId) {
      sessionId = `spectator-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      sessionStorage.setItem("spectator_session_id", sessionId)
    }
    sessionIdRef.current = sessionId
  }, [])

  // Load predictions for current turn
  useEffect(() => {
    if (isDemo) {
      // Demo mode - use localStorage
      const demoKey = `demo_predictions_${draftId}_${currentPhase}_${turnNumber}`
      const saved = localStorage.getItem(demoKey)
      if (saved) {
        setMyPrediction(JSON.parse(saved))
      } else {
        setMyPrediction(null)
      }
      return
    }

    const loadPredictions = async () => {
      // Get my prediction
      const { data: myPred } = await supabase
        .from("spectator_predictions")
        .select("*")
        .eq("draft_id", draftId)
        .eq("session_id", sessionIdRef.current)
        .eq("phase", currentPhase)
        .eq("turn_number", turnNumber)
        .single()

      setMyPrediction(myPred)

      // Get all predictions aggregated
      const { data: allPreds } = await supabase
        .from("spectator_predictions")
        .select("predicted_item")
        .eq("draft_id", draftId)
        .eq("phase", currentPhase)
        .eq("turn_number", turnNumber)

      if (allPreds) {
        const counts: Record<string, number> = {}
        allPreds.forEach((p) => {
          counts[p.predicted_item] = (counts[p.predicted_item] || 0) + 1
        })
        setAllPredictions(counts)
      }

      // Get my stats
      const { data: myStats } = await supabase
        .from("spectator_predictions")
        .select("is_correct")
        .eq("draft_id", draftId)
        .eq("session_id", sessionIdRef.current)
        .not("is_correct", "is", null)

      if (myStats) {
        const total = myStats.length
        const correct = myStats.filter((s) => s.is_correct).length
        setStats({
          total_predictions: total,
          correct_predictions: correct,
          accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        })
      }
    }

    loadPredictions()
  }, [draftId, currentPhase, turnNumber, isDemo, supabase])

  const makePrediction = useCallback(
    async (itemId: string) => {
      if (myPrediction || !sessionIdRef.current) return

      setIsLoading(true)

      if (isDemo) {
        const demoPrediction: Prediction = {
          id: `demo-pred-${Date.now()}`,
          draft_id: draftId,
          session_id: sessionIdRef.current,
          phase: currentPhase,
          turn_number: turnNumber,
          predicted_item: itemId,
          created_at: new Date().toISOString(),
        }
        const demoKey = `demo_predictions_${draftId}_${currentPhase}_${turnNumber}`
        localStorage.setItem(demoKey, JSON.stringify(demoPrediction))
        setMyPrediction(demoPrediction)
        setAllPredictions((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }))
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("spectator_predictions")
          .insert({
            draft_id: draftId,
            session_id: sessionIdRef.current,
            phase: currentPhase,
            turn_number: turnNumber,
            predicted_item: itemId,
          })
          .select()
          .single()

        if (!error && data) {
          setMyPrediction(data)
          setAllPredictions((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
          }))
        }
      } catch (err) {
        console.error("Error making prediction:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [draftId, currentPhase, turnNumber, myPrediction, isDemo, supabase],
  )

  return {
    myPrediction,
    allPredictions,
    stats,
    isLoading,
    makePrediction,
    hasPredicted: !!myPrediction,
  }
}
