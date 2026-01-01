"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Swords,
  Shield,
  Crown,
  Ban,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Home,
  Lightbulb,
  Target,
  Users,
  Map,
  Dices,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { MAPS } from "@/lib/data/maps"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

// Mock data for tutorial
const SAMPLE_CIVS = CIVILIZATIONS.slice(0, 12)
const SAMPLE_MAPS = MAPS && MAPS.length > 0 ? MAPS.slice(0, 6) : []
const GAME_MODES_LIST = ["1v1 Random Map", "Empire Wars", "Regicide", "King of the Hill", "Sudden Death", "Treaty"]

export default function TutorialPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [hostBans, setHostBans] = useState<string[]>([])
  const [guestBans, setGuestBans] = useState<string[]>([])
  const [hostPick, setHostPick] = useState<string | null>(null)
  const [guestPick, setGuestPick] = useState<string | null>(null)
  const [mapHostBans, setMapHostBans] = useState<string[]>([])
  const [mapGuestBans, setMapGuestBans] = useState<string[]>([])
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [gameMode, setGameMode] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [waitingForAction, setWaitingForAction] = useState(false)

  // Tutorial steps definition moved inside to use t()
  const TUTORIAL_STEPS = useMemo(() => [
    {
      id: "welcome",
      phase: "intro",
      title: t("tutorialTitle"),
      description: t("tutorialWelcome"),
      icon: Lightbulb,
    },
    {
      id: "overview",
      phase: "intro",
      title: t("overview") || "Overview",
      description: t("tutorialWhatIs"),
      icon: Target,
    },
    {
      id: "civ-ban-host",
      phase: "civ_ban",
      title: t("tutorialStep1Title"),
      description: t("tutorialStep1Desc"),
      icon: Ban,
      action: "ban",
      player: "host",
      highlight: "civs",
    },
    {
      id: "civ-ban-guest",
      phase: "civ_ban",
      title: t("tutorialStep2Title"),
      description: t("tutorialStep2Desc"),
      icon: Ban,
      action: "simulate",
      player: "guest",
    },
    {
      id: "civ-ban-continue",
      phase: "civ_ban",
      title: t("tutorialStep3Title"),
      description: t("tutorialStep3Desc"),
      icon: Ban,
      action: "auto",
    },
    {
      id: "civ-pick-intro",
      phase: "civ_pick",
      title: t("tutorialStep4Title"),
      description: t("tutorialStep4Desc"),
      icon: Crown,
      action: "pick",
      player: "host",
      highlight: "civs",
    },
    {
      id: "civ-pick-guest",
      phase: "civ_pick",
      title: t("opponent") || "Opponent",
      description: t("tutorialStep2Desc"), // Reusing desc for opponent action
      icon: Crown,
      action: "simulate",
      player: "guest",
    },
    {
      id: "map-ban-intro",
      phase: "map_ban",
      title: t("tutorialStep5Title"),
      description: t("tutorialStep5Desc"),
      icon: Map,
      action: "ban",
      player: "host",
      highlight: "maps",
    },
    {
      id: "map-ban-continue",
      phase: "map_ban",
      title: t("mapBanning"),
      description: t("tutorialStep3Desc"), // Reusing alternating turns desc
      icon: Map,
      action: "auto",
    },
    {
      id: "map-pick-intro",
      phase: "map_pick",
      title: t("tutorialStep6Title"),
      description: t("tutorialStep6Desc"),
      icon: Map,
      action: "pick",
      player: "host",
      highlight: "maps",
    },
    {
      id: "game-mode",
      phase: "game_mode",
      title: t("tutorialStep7Title"),
      description: t("tutorialStep7Desc"),
      icon: Dices,
      action: "random",
    },
    {
      id: "complete",
      phase: "complete",
      title: t("tutorialCompleteTitle"),
      description: t("tutorialCompleteDesc"),
      icon: Swords,
    },
  ], [t])

  const step = TUTORIAL_STEPS[currentStep]
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      handleStepAction(TUTORIAL_STEPS[currentStep + 1])
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepAction = (nextStep: (typeof TUTORIAL_STEPS)[0]) => {
    if (nextStep.action === "simulate") {
      setIsAnimating(true)
      setTimeout(() => {
        if (nextStep.phase === "civ_ban") {
          const availableCivs = SAMPLE_CIVS.filter((c) => !hostBans.includes(c.id) && !guestBans.includes(c.id))
          if (availableCivs.length > 0) {
            const randomCiv = availableCivs[Math.floor(Math.random() * availableCivs.length)]
            setGuestBans((prev) => {
              const newBans = [...prev, randomCiv.id];
              return newBans;
            })
          }
        } else if (nextStep.phase === "civ_pick") {
          const availableCivs = SAMPLE_CIVS.filter(
            (c) => !hostBans.includes(c.id) && !guestBans.includes(c.id) && c.id !== hostPick,
          )
          if (availableCivs.length > 0) {
            const randomCiv = availableCivs[Math.floor(Math.random() * availableCivs.length)]
            setGuestPick(randomCiv.id)
          }
        }
        setIsAnimating(false)
      }, 1500)
    } else if (nextStep.action === "auto") {
      setIsAnimating(true)
      const interval = setInterval(() => {
        if (nextStep.phase === "civ_ban") {
          setHostBans((prev) => {
            if (prev.length >= 3) {
              clearInterval(interval)
              setIsAnimating(false)
              return prev
            }
            const availableCivs = SAMPLE_CIVS.filter((c) => !prev.includes(c.id) && !guestBans.includes(c.id))
            if (availableCivs.length > 0) {
              const randomCiv = availableCivs[Math.floor(Math.random() * availableCivs.length)]
              return [...prev, randomCiv.id]
            }
            return prev
          })
          setGuestBans((prev) => {
            if (prev.length >= 3) return prev
            const availableCivs = SAMPLE_CIVS.filter((c) => !hostBans.includes(c.id) && !prev.includes(c.id))
            if (availableCivs.length > 0) {
              const randomCiv = availableCivs[Math.floor(Math.random() * availableCivs.length)]
              return [...prev, randomCiv.id]
            }
            return prev
          })
        } else if (nextStep.phase === "map_ban") {
          setMapHostBans((prev) => {
            if (prev.length >= 2) {
              clearInterval(interval)
              setIsAnimating(false)
              return prev
            }
            const availableMaps = SAMPLE_MAPS.filter((m) => !prev.includes(m.id) && !mapGuestBans.includes(m.id))
            if (availableMaps.length > 0) {
              const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)]
              return [...prev, randomMap.id]
            }
            return prev
          })
          setMapGuestBans((prev) => {
            if (prev.length >= 2) return prev
            const availableMaps = SAMPLE_MAPS.filter((m) => !mapHostBans.includes(m.id) && !prev.includes(m.id))
            if (availableMaps.length > 0) {
              const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)]
              return [...prev, randomMap.id]
            }
            return prev
          })
        }
      }, 800)
    } else if (nextStep.action === "random") {
      setIsAnimating(true)
      let count = 0
      const interval = setInterval(() => {
        setGameMode(GAME_MODES_LIST[Math.floor(Math.random() * GAME_MODES_LIST.length)])
        count++
        if (count > 10) {
          clearInterval(interval)
          setGameMode(GAME_MODES_LIST[Math.floor(Math.random() * GAME_MODES_LIST.length)])
          setIsAnimating(false)
        }
      }, 100)
    } else if (nextStep.action === "ban" || nextStep.action === "pick") {
      setWaitingForAction(true)
    }
  }

  const handleCivClick = (civId: string) => {
    if (!waitingForAction) return

    const civ = SAMPLE_CIVS.find((c) => c.id === civId)
    if (!civ) return

    if (hostBans.includes(civId) || guestBans.includes(civId)) return
    if (civId === hostPick || civId === guestPick) return

    if (step.action === "ban" && step.phase === "civ_ban") {
      setHostBans((prev) => [...prev, civId])
      setWaitingForAction(false)
    } else if (step.action === "pick" && step.phase === "civ_pick") {
      setHostPick(civId)
      setWaitingForAction(false)
    }
  }

  const handleMapClick = (mapId: string) => {
    if (!waitingForAction) return

    if (mapHostBans.includes(mapId) || mapGuestBans.includes(mapId)) return
    if (mapId === selectedMap) return

    if (step.action === "ban" && step.phase === "map_ban") {
      setMapHostBans((prev) => [...prev, mapId])
      setWaitingForAction(false)
    } else if (step.action === "pick" && step.phase === "map_pick") {
      setSelectedMap(mapId)
      setWaitingForAction(false)
    }
  }

  const resetTutorial = () => {
    setCurrentStep(0)
    setHostBans([])
    setGuestBans([])
    setHostPick(null)
    setGuestPick(null)
    setMapHostBans([])
    setMapGuestBans([])
    setSelectedMap(null)
    setGameMode(null)
    setIsAnimating(false)
    setWaitingForAction(false)
  }

  const isCivBanned = (civId: string) => hostBans.includes(civId) || guestBans.includes(civId)
  const isCivPicked = (civId: string) => civId === hostPick || civId === guestPick
  const isMapBanned = (mapId: string) => mapHostBans.includes(mapId) || mapGuestBans.includes(mapId)

  const StepIcon = step.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{t("tutorialTitle")}</h1>
                <p className="text-sm text-muted-foreground">{t("tutorialWelcome").slice(0, 30)}...</p>
              </div>
            </div>
            <Button variant="outline" onClick={resetTutorial} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              {t("tutorialRestart")}
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t("progress") || "Tutorial Progress"}</span>
              <span className="font-medium">
                {currentStep + 1} / {TUTORIAL_STEPS.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Tutorial instruction panel */}
          <div className="lg:col-span-1">
            <Card
              className={cn(
                "sticky top-32 transition-all duration-300",
                waitingForAction && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            >
              <CardContent className="p-6">
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full",
                      step.phase === "intro" && "bg-blue-500/20 text-blue-500",
                      step.phase === "civ_ban" && "bg-red-500/20 text-red-500",
                      step.phase === "civ_pick" && "bg-green-500/20 text-green-500",
                      step.phase === "map_ban" && "bg-orange-500/20 text-orange-500",
                      step.phase === "map_pick" && "bg-purple-500/20 text-purple-500",
                      step.phase === "game_mode" && "bg-yellow-500/20 text-yellow-500",
                      step.phase === "complete" && "bg-primary/20 text-primary",
                    )}
                  >
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      {t("tutorialStepLabel", { current: currentStep + 1 })}
                    </Badge>
                    <h2 className="text-lg font-bold">{step.title}</h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

                {/* Action indicator */}
                {waitingForAction && (
                  <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      {step.action === "ban" ? t("clickToBan") : t("clickToPick")}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.highlight === "civs" ? t("selectACivilization") : t("selectAMap")}
                    </p>
                  </div>
                )}

                {/* Simulating indicator */}
                {isAnimating && (
                  <div className="mb-6 p-4 rounded-lg bg-muted border border-border">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-muted-foreground">{t("tutorialSimulating")}</span>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0 || isAnimating}
                    className="flex-1 gap-2 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t("previous")}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === TUTORIAL_STEPS.length - 1 || isAnimating || waitingForAction}
                    className="flex-1 gap-2"
                  >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Complete action */}
                {step.phase === "complete" && (
                  <div className="mt-6 space-y-3">
                    <Link href="/auth/sign-up" className="block">
                      <Button className="w-full gap-2" size="lg">
                        <Shield className="h-5 w-5" />
                        {t("createAccountAndStart")}
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full bg-transparent" onClick={resetTutorial}>
                      {t("repeatTutorial")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Draft simulation area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-blue-500/50 bg-blue-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("hostYou")}</p>
                      <p className="text-sm text-muted-foreground">{t("player1")}</p>
                    </div>
                  </div>
                  {hostPick && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">{t("civPicked")}</p>
                      <Badge className="bg-blue-500">{SAMPLE_CIVS.find((c) => c.id === hostPick)?.name}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-red-500/50 bg-red-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("guestOpponent")}</p>
                      <p className="text-sm text-muted-foreground">{t("player2")}</p>
                    </div>
                  </div>
                  {guestPick && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">{t("civPicked")}</p>
                      <Badge className="bg-red-500">{SAMPLE_CIVS.find((c) => c.id === guestPick)?.name}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Civilizations grid */}
            <Card
              className={cn(
                "transition-all duration-300",
                step.highlight === "civs" && waitingForAction && "ring-2 ring-primary",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    {t("civilizations")}
                  </h3>
                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                      {t("banCount", { current: hostBans.length + guestBans.length, total: 6 })}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {SAMPLE_CIVS.map((civ) => {
                    const banned = isCivBanned(civ.id)
                    const picked = isCivPicked(civ.id)
                    const isHostBan = hostBans.includes(civ.id)
                    const isGuestBan = guestBans.includes(civ.id)
                    const isHostPick = civ.id === hostPick
                    const isGuestPick = civ.id === guestPick
                    const clickable = waitingForAction && step.highlight === "civs" && !banned && !picked

                    return (
                      <button
                        key={civ.id}
                        onClick={() => handleCivClick(civ.id)}
                        disabled={!clickable}
                        className={cn(
                          "relative flex flex-col items-center p-3 rounded-lg border transition-all",
                          banned && "opacity-40 bg-muted",
                          isHostBan && "border-blue-500/50 bg-blue-500/10",
                          isGuestBan && "border-red-500/50 bg-red-500/10",
                          isHostPick && "border-blue-500 bg-blue-500/20 ring-2 ring-blue-500",
                          isGuestPick && "border-red-500 bg-red-500/20 ring-2 ring-red-500",
                          !banned && !picked && "border-border hover:border-primary/50 hover:bg-primary/5",
                          clickable && "cursor-pointer animate-pulse ring-1 ring-primary/50",
                          !clickable && !banned && !picked && "cursor-default",
                        )}
                      >
                        <div className="relative h-12 w-12 mb-2">
                          <Image
                            src={civ.icon || `/placeholder.svg?height=48&width=48&query=${civ.name} civilization icon`}
                            alt={civ.name}
                            fill
                            className={cn("object-contain", banned && "grayscale")}
                          />
                          {banned && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Ban className="h-8 w-8 text-red-500" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-center line-clamp-1">{civ.name}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Maps grid */}
            <Card
              className={cn(
                "transition-all duration-300",
                step.highlight === "maps" && waitingForAction && "ring-2 ring-primary",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    {t("maps")}
                  </h3>
                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">
                      {t("banCount", { current: mapHostBans.length + mapGuestBans.length, total: 4 })}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {SAMPLE_MAPS.map((map) => {
                    const banned = isMapBanned(map.id)
                    const selected = map.id === selectedMap
                    const clickable = waitingForAction && step.highlight === "maps" && !banned && !selected

                    return (
                      <button
                        key={map.id}
                        onClick={() => handleMapClick(map.id)}
                        disabled={!clickable}
                        className={cn(
                          "relative rounded-lg border overflow-hidden transition-all",
                          banned && "opacity-40",
                          selected && "ring-2 ring-primary",
                          !banned && !selected && "hover:border-primary/50",
                          clickable && "cursor-pointer animate-pulse ring-1 ring-primary/50",
                        )}
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={map.image || `/placeholder.svg?height=120&width=200&query=${map.name} map`}
                            alt={map.name}
                            fill
                            className={cn("object-cover", banned && "grayscale")}
                          />
                          {banned && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Ban className="h-10 w-10 text-red-500" />
                            </div>
                          )}
                          {selected && (
                            <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                              <Shield className="h-10 w-10 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-2 bg-card">
                          <span className="text-sm font-medium">{map.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Game mode */}
            {(step.phase === "game_mode" || step.phase === "complete") && (
              <Card className={cn("transition-all duration-300", step.phase === "game_mode" && "ring-2 ring-primary")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Dices className="h-5 w-5 text-primary" />
                      {t("gameMode")}
                    </h3>
                  </div>

                  <div className={cn("text-center py-8", isAnimating && "animate-pulse")}>
                    {gameMode ? (
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-primary">{gameMode}</p>
                        <p className="text-muted-foreground">{t("randomlySelected")}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{t("randomModeSelection")}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}