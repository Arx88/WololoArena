"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { UNIVERSITY_LEVELS, MOCK_QUESTIONS } from "@/lib/data/university-data"
import { 
  Timer as TimerIcon, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Trophy, 
  Zap, 
  ChevronRight, 
  Crown, 
  Shield, 
  Megaphone,
  X 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"

const TIME_PER_QUESTION = 20

function QuizResults({ level, score, total }: { level: any, score: number, total: number }) {
  const percentage = Math.round((score / total) * 100)
  const isPassed = percentage >= level.requiredScore
  const { playSound } = useSoundEffects()

  useEffect(() => {
    if (isPassed) playSound("turn_start")
    else playSound("lock")
  }, [isPassed, playSound])

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 pt-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,#020202_100%)] opacity-50" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className="bg-[#0a0a0b]/95 border-white/5 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden">
          <CardContent className="p-10 text-center flex flex-col items-center">
            
            <div className="relative mb-8">
               <div className={cn("absolute inset-0 blur-[80px] opacity-30", isPassed ? "bg-emerald-500" : "bg-red-500")} />
               <motion.div 
                 animate={isPassed ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : { x: [-5, 5, -5, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className={cn(
                   "relative h-32 w-32 rounded-[2rem] border-4 flex items-center justify-center shadow-2xl",
                   isPassed ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20" : "border-red-500 bg-red-500/10 text-red-500 shadow-red-500/20"
                 )}
               >
                 {isPassed ? <Crown className="h-16 w-16" /> : <AlertCircle className="h-16 w-16" />}
               </motion.div>
            </div>

            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-8 bg-white/10" />
               <Badge variant="outline" className="border-white/10 text-white/40 px-6 py-1 uppercase tracking-[0.4em] text-[9px] font-black font-mono">Final Report</Badge>
               <div className="h-px w-8 bg-white/10" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-2 leading-none font-cinzel">
              {isPassed ? "Elite Access Granted" : "Trial Refused"}
            </h2>
            <p className={cn("font-black uppercase tracking-[0.3em] text-xs mb-10", isPassed ? "text-emerald-500" : "text-red-500")}>
              {level.title} // Session Logged
            </p>

            <div className="grid grid-cols-3 gap-4 w-full mb-10">
               <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest font-mono">Accuracy</span>
                  <span className="text-3xl font-black italic text-white leading-none font-cinzel">{percentage}%</span>
               </div>
               <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest font-mono">Score</span>
                  <span className="text-3xl font-black italic text-primary leading-none font-cinzel">{score}<span className="text-white/20 text-lg">/{total}</span></span>
               </div>
               <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                  <span className="block text-[9px] font-black text-white/20 uppercase mb-2 tracking-widest font-mono">Status</span>
                  <span className={cn("text-lg font-black italic uppercase leading-none font-cinzel", isPassed ? "text-emerald-500" : "text-red-500")}>{isPassed ? "Certified" : "Denied"}</span>
               </div>
            </div>

            <div className="flex gap-4 w-full">
               <Button asChild variant="outline" className="flex-1 h-16 rounded-xl border-2 border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all">
                  <Link href="/university">Back to Academy</Link>
               </Button>
               {!isPassed ? (
                 <Button onClick={() => window.location.reload()} className="flex-1 h-16 rounded-xl bg-red-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-red-500 transition-all shadow-lg shadow-red-900/20">
                    Retry Protocol
                 </Button>
               ) : (
                 <Button asChild className="flex-1 h-16 rounded-xl bg-yellow-600 text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-600/20">
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

  const currentQuestion = questions[currentQuestionIdx]

  useEffect(() => {
    if (isComplete || isAnswered) return
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    if (timeLeft < 6) playSound("tick")
    const timer = setInterval(() => { setTimeLeft(prev => prev - 1) }, 1000)
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
        <Button onClick={() => router.push("/university")} className="mt-8 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest px-10 h-14 rounded-xl">Return to Academy</Button>
      </div>
    )
  }

  if (isComplete) {
    return <QuizResults level={level} score={score} total={questions.length} />
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none" />

      <main className="flex-1 flex flex-col pt-40 pb-6 px-6 relative z-10 h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
          
          <div className="flex items-center justify-between mb-12">
            <Button variant="ghost" onClick={() => router.push("/university")} className="text-white/20 hover:text-white hover:bg-transparent gap-3 group uppercase text-[10px] font-black tracking-widest px-0">
              <div className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all">
                <X className="h-4 w-4" />
              </div>
              Abort Session
            </Button>
            
            <div className="flex items-center gap-10">
               <div className="flex flex-col items-end font-cinzel">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">Session Node</span>
                  <span className="text-2xl font-black text-white italic tracking-tighter">
                    {String(currentQuestionIdx + 1).padStart(2, '0')} <span className="text-white/20">/ {questions.length}</span>
                  </span>
               </div>
               
               <div className="relative h-16 w-16">
                  <svg className="h-full w-full transform -rotate-90">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                    <motion.circle 
                      cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray="188.5"
                      animate={{ strokeDashoffset: 188.5 - (188.5 * timeLeft) / TIME_PER_QUESTION }}
                      className={cn(timeLeft < 6 ? "text-red-500" : "text-primary")}
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
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="flex-1 flex flex-col"
            >
              <div className="relative p-8 rounded-[2.5rem] bg-[#0a0a0b]/80 border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden mb-6 flex-1 flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 text-[120px] font-black text-white/[0.01] italic select-none pointer-events-none uppercase leading-none">
                  #{currentQuestionIdx + 1}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black tracking-widest px-4 py-1.5 uppercase">
                    {currentQuestion.category} analysis
                  </Badge>
                  <div className="h-px w-12 bg-white/10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.95] mb-8 relative z-10 max-w-4xl font-cinzel">
                  {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx
                    const isCorrect = idx === currentQuestion.correctAnswer
                    const showCorrect = isAnswered && isCorrect
                    const showWrong = isAnswered && isSelected && !isCorrect

                    return (
                      <motion.button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        whileHover={!isAnswered ? { scale: 1.02, x: 10 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        className={cn(
                          "group relative flex items-center p-4 rounded-xl border-2 transition-all duration-300 text-left min-h-[4rem] overflow-hidden",
                          !isAnswered && "border-white/5 bg-white/[0.02] hover:border-primary/40",
                          isAnswered && !isCorrect && !isSelected && "opacity-20 border-white/5 grayscale",
                          showCorrect && "border-emerald-500 bg-emerald-500/10 z-20 shadow-[0_0_50px_rgba(16,185,129,0.3)]",
                          showWrong && "border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                        )}
                      >
                        {isSelected && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.4 }}
                            className={cn(
                              "absolute inset-0 z-0",
                              isCorrect ? "bg-emerald-500/20" : "bg-red-500/20"
                            )}
                          />
                        )}

                        <div className="flex items-center gap-6 relative z-10">
                          <motion.div 
                            animate={showCorrect ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                            className={cn(
                              "h-12 w-12 rounded-xl flex items-center justify-center border-2 font-mono font-black text-lg transition-all shadow-lg",
                              !isAnswered && "bg-white/5 border-white/10 text-white/20 group-hover:border-primary group-hover:text-primary",
                              showCorrect && "bg-emerald-500 border-emerald-400 text-black",
                              showWrong && "bg-red-500 border-red-400 text-white"
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </motion.div>
                          <span className={cn(
                            "text-xl font-black uppercase tracking-tight transition-all italic font-cinzel",
                            showCorrect ? "text-emerald-400" : showWrong ? "text-red-400" : "text-white/60 group-hover:text-white"
                          )}>
                            {option}
                          </span>
                        </div>
                        
                        {showCorrect && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-6">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                          </motion.div>
                        )}
                        {showWrong && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-6">
                            <XCircle className="h-8 w-8 text-red-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="absolute bottom-6 left-0 right-0 z-50 px-6"
                  >
                    <div className={cn(
                      "p-1 rounded-[2rem] bg-gradient-to-r shadow-2xl backdrop-blur-md",
                      selectedOption === currentQuestion.correctAnswer ? "from-emerald-500/40 via-black/80 to-black/80" : "from-red-500/40 via-black/80 to-black/80"
                    )}>
                      <div className="p-5 rounded-[1.9rem] bg-[#050506]/90 flex items-center justify-between gap-6 border-t border-white/10">
                        <div className="flex items-center gap-5 flex-1 min-w-0">
                          <div className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                            selectedOption === currentQuestion.correctAnswer ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? <Trophy className="h-7 w-7" /> : <Shield className="h-7 w-7" />}
                          </div>
                          <div className="space-y-1 min-w-0">
                            <h4 className="text-[10px] font-black uppercase text-primary tracking-[0.3em] flex items-center gap-2">Analysis <span className="h-1 w-6 bg-primary/20 rounded-full" /></h4>
                            <p className="text-sm md:text-base text-white/90 italic font-medium leading-tight font-cinzel line-clamp-2">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                        <Button onClick={handleNext} className="h-14 px-8 rounded-xl bg-primary text-black font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all hover:scale-105 shadow-xl shrink-0">
                          Next <ChevronRight className="ml-2 h-4 w-4" />
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
