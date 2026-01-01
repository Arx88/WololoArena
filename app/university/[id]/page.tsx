"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { UNIVERSITY_LEVELS, MOCK_QUESTIONS, Question } from "@/lib/data/university-data"
import { Timer as TimerIcon, ArrowLeft, CheckCircle2, XCircle, AlertCircle, Trophy, Zap, Info, ChevronRight, GraduationCap, X, Swords, Shield, Target, Crown, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useSoundEffects } from "@/hooks/use-sound-effects"

const TIME_PER_QUESTION = 20

export default function QuizPage() {
  const { id } = useParams()
  const router = useRouter()
  const { playSound } = useSoundEffects()
  
  const level = UNIVERSITY_LEVELS.find(l => l.id === id)
  const questions = MOCK_QUESTIONS[id as string] || []

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<{ qIdx: number, isCorrect: boolean }[]>([])

  const currentQuestion = questions[currentQuestionIdx]

  // Timer & Sound Sync
  useEffect(() => {
    if (isComplete || isAnswered) return

    if (timeLeft <= 0) {
      handleAnswer(-1)
      return
    }

    if (timeLeft < 6) {
      playSound("tick")
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isComplete, isAnswered, playSound])

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return
    
    setSelectedOption(optionIdx)
    setIsAnswered(true)
    
    const isCorrect = optionIdx === currentQuestion?.correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
      playSound("success")
    } else {
      playSound("error")
    }
    
    setResults(prev => [...prev, { qIdx: currentQuestionIdx, isCorrect }])
  }

  const handleNext = () => {
    playSound("click")
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setTimeLeft(TIME_PER_QUESTION)
    } else {
      setIsComplete(true)
    }
  }

  if (!level || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mb-6 opacity-20" />
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Level Not Found</h2>
        <p className="text-white/40 uppercase font-bold tracking-widest mt-2">The training module is currently offline.</p>
        <Button onClick={() => router.push("/university")} className="mt-8 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest px-10 h-14 rounded-xl shadow-xl">Return to Academy</Button>
      </div>
    )
  }

  if (isComplete) {
    return <QuizResults level={level} score={score} total={questions.length} results={results} />
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none" />
      <Navbar />

      <main className="flex-1 flex flex-col pt-28 pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          
          {/* Header Dashboard */}
          <div className="flex items-center justify-between mb-12">
            <Button variant="ghost" onClick={() => router.push("/university")} className="text-white/20 hover:text-white gap-3 group uppercase text-[10px] font-black tracking-widest">
              <div className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
                <X className="h-4 w-4" />
              </div>
              Abort Session
            </Button>
            
            <div className="flex items-center gap-10">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">Module Sync</span>
                  <span className="text-2xl font-black text-white italic tracking-tighter">
                    {String(currentQuestionIdx + 1).padStart(2, '0')} <span className="text-white/20">/ {questions.length}</span>
                  </span>
               </div>
               
               {/* Cyber Timer */}
               <div className="relative h-16 w-16">
                  <svg className="h-full w-full transform -rotate-90">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                    <motion.circle 
                      cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray="188.5"
                      animate={{ strokeDashoffset: 188.5 - (188.5 * timeLeft) / TIME_PER_QUESTION }}
                      className={cn(timeLeft < 6 ? "text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "text-primary")}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn("text-xl font-black font-mono", timeLeft < 6 && "text-red-500 animate-pulse")}>{timeLeft}</span>
                  </div>
               </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIdx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex-1 flex flex-col"
            >
              {/* Question Card */}
              <div className="relative p-12 rounded-[3rem] bg-[#0a0a0b]/80 border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden mb-10">
                <div className="absolute top-0 right-0 p-12 text-[160px] font-black text-white/[0.01] italic select-none pointer-events-none leading-none">
                  #{currentQuestionIdx + 1}
                </div>
                
                <div className="flex items-center gap-4 mb-10">
                  <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black tracking-widest px-4 py-1.5 uppercase">
                    {currentQuestion.category} analysis
                  </Badge>
                  <div className="h-px w-12 bg-white/10" />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">Priority Alpha-7</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-16 relative z-10 max-w-3xl">
                  {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx
                    const isCorrect = idx === currentQuestion.correctAnswer
                    const showCorrect = isAnswered && isCorrect
                    const showWrong = isAnswered && isSelected && !isCorrect

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={cn(
                          "group relative flex items-center p-6 rounded-2xl border-2 transition-all duration-500 text-left h-24 overflow-hidden",
                          !isAnswered && "border-white/5 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/5 hover:translate-x-2",
                          isAnswered && !isCorrect && !isSelected && "opacity-20 border-white/5 grayscale",
                          showCorrect && "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-[1.02] z-20",
                          showWrong && "border-red-500/50 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.2)] scale-[0.98]"
                        )}
                      >
                        <div className="flex items-center gap-6 relative z-10">
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center border-2 font-mono font-black text-lg transition-all",
                            !isAnswered && "bg-white/5 border-white/10 text-white/20 group-hover:border-primary group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]",
                            showCorrect && "bg-emerald-500 border-emerald-400 text-black",
                            showWrong && "bg-red-500 border-red-400 text-white"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn(
                            "text-xl font-black uppercase tracking-tight transition-all italic",
                            showCorrect ? "text-emerald-400" : showWrong ? "text-red-400" : "text-white/60 group-hover:text-white"
                          )}>
                            {option}
                          </span>
                        </div>
                        
                        {/* Background Reveal Effect */}
                        <div className={cn(
                          "absolute inset-0 opacity-0 transition-opacity duration-500",
                          showCorrect && "bg-gradient-to-r from-emerald-500/20 to-transparent opacity-100",
                          showWrong && "bg-gradient-to-r from-red-500/20 to-transparent opacity-100"
                        )} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Advanced Feedback Section */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group"
                  >
                    <div className={cn(
                      "p-1 rounded-[2.5rem] bg-gradient-to-r transition-all duration-1000 shadow-2xl",
                      selectedOption === currentQuestion.correctAnswer ? "from-emerald-500/40 to-transparent" : "from-red-500/40 to-transparent"
                    )}>
                      <div className="p-8 md:p-10 rounded-[2.4rem] bg-[#050506] flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-8">
                          <div className={cn(
                            "h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl transition-all duration-700",
                            selectedOption === currentQuestion.correctAnswer ? "bg-emerald-500/10 text-emerald-500 rotate-12" : "bg-red-500/10 text-red-500 -rotate-12"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? <Trophy className="h-10 w-10" /> : <Shield className="h-10 w-10" />}
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-[11px] font-black uppercase text-primary tracking-[0.4em] flex items-center gap-2">
                              Tactical Debriefing <span className="h-1 w-8 bg-primary/20 rounded-full" />
                            </h4>
                            <p className="text-xl text-white/80 italic font-medium leading-relaxed max-w-2xl">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleNext} 
                          className="h-20 px-12 rounded-none bg-primary text-black font-black uppercase text-sm tracking-[0.3em] hover:bg-white transition-all border-r-8 border-black/20 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(var(--primary),0.3)]"
                        >
                          Next Protocol <ChevronRight className="ml-4 h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

function QuizResults({ level, score, total, results }: { level: any, score: number, total: number, results: any[] }) {
  const percentage = Math.round((score / total) * 100)
  const isPassed = percentage >= level.requiredScore
  const router = useRouter()
  const { playSound } = useSoundEffects()

  useEffect(() => {
    if (isPassed) playSound("turn_start")
    else playSound("lock")
  }, [isPassed, playSound])

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,#020202_100%)] opacity-50" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="max-w-3xl w-full relative z-10"
      >
        <Card className="bg-[#0a0a0b]/95 border-white/5 backdrop-blur-3xl rounded-[4rem] shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden">
          <CardContent className="p-16 text-center flex flex-col items-center">
            
            <div className="relative mb-12">
               <div className={cn("absolute inset-0 blur-[80px] opacity-30", isPassed ? "bg-emerald-500" : "bg-red-500")} />
               <motion.div 
                 animate={isPassed ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : { x: [-5, 5, -5, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className={cn(
                   "relative h-40 w-40 rounded-[3rem] border-4 flex items-center justify-center shadow-2xl",
                   isPassed ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-red-500 bg-red-500/10 text-red-500"
                 )}
               >
                 {isPassed ? <Crown className="h-20 w-20" /> : <AlertCircle className="h-20 w-20" />}
               </motion.div>
            </div>

            <div className="flex items-center gap-4 mb-8">
               <div className="h-px w-8 bg-white/10" />
               <Badge variant="outline" className="border-white/10 text-white/40 px-8 py-1.5 uppercase tracking-[0.5em] text-[10px] font-black">Final Report</Badge>
               <div className="h-px w-8 bg-white/10" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none">
              {isPassed ? "Elite Access Granted" : "Trial Refused"}
            </h2>
            <p className={cn("font-black uppercase tracking-[0.4em] text-sm mb-16", isPassed ? "text-emerald-500" : "text-red-500")}>
              {level.title} // Session Logged
            </p>

            <div className="grid grid-cols-3 gap-6 w-full mb-16">
               <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[10px] font-black text-white/20 uppercase mb-3 tracking-widest">Accuracy</span>
                  <span className="text-4xl font-black italic text-white leading-none">{percentage}%</span>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[10px] font-black text-white/20 uppercase mb-3 tracking-widest">Score</span>
                  <span className="text-4xl font-black italic text-primary leading-none">{score}<span className="text-white/20 text-xl">/{total}</span></span>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[10px] font-black text-white/20 uppercase mb-3 tracking-widest">Status</span>
                  <span className={cn("text-xl font-black italic uppercase leading-none", isPassed ? "text-emerald-500" : "text-red-500")}>{isPassed ? "Certified" : "Denied"}</span>
               </div>
            </div>

            <div className="flex gap-6 w-full">
               <Button asChild variant="outline" className="flex-1 h-20 rounded-none border-2 border-white/10 text-white font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  <Link href="/university">Back to Academy</Link>
               </Button>
               {!isPassed ? (
                 <Button onClick={() => window.location.reload()} className="flex-1 h-20 rounded-none bg-red-600 text-white font-black uppercase tracking-[0.3em] hover:bg-red-500 transition-all border-r-8 border-black/20">
                    Retry Protocol
                 </Button>
               ) : (
                 <Button asChild className="flex-1 h-20 rounded-none bg-yellow-600 text-black font-black uppercase tracking-[0.3em] hover:bg-yellow-500 transition-all border-r-8 border-black/20 shadow-[0_0_50px_rgba(var(--primary),0.3)]">
                    <Link href="/profile">Collect Diploma</Link>
                 </Button>
               )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}