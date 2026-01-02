"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface NewsItem {
  id: string
  message: string
  description?: string
  imageUrl?: string
  active: boolean
  priority: number // Higher number = active/shown first
  link?: string
}

interface NewsContextType {
  news: NewsItem[]
  addNews: (message: string, link?: string, description?: string, imageUrl?: string, priority?: number) => void
  removeNews: (id: string) => void
  updateNews: (id: string, updates: Partial<NewsItem>) => void
  toggleActive: (id: string) => void
  moveNews: (id: string, direction: "up" | "down") => void
  setNews: (news: NewsItem[]) => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

const DEFAULT_NEWS: NewsItem[] = [
  { 
    id: "1", 
    message: "Master the Draft: New Strategy Engine", 
    description: "Our core drafting engine has been refined to offer better counter-pick suggestions and historical matchup data. Analyze civilizations like never before and dominate the ranked ladder with precision intel.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
    active: true, 
    priority: 10 
  },
  { 
    id: "2", 
    message: "Team Builder 2.0: Pocket & Flank Sinergies", 
    description: "The Team Game section now features an advanced calculator for 2v2, 3v3, and 4v4 matches. Find the ultimate balance between heavy cavalry in the pocket and archer power on the flanks to crush your opponents.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    active: true, 
    priority: 5, 
    link: "/team-builder" 
  },
  { 
    id: "3", 
    message: "Official Tournament Hub is Live", 
    description: "Wololo Arena is now the central hub for competitive AoE2 drafting events. Create your own tournaments, manage brackets, and use our synchronized drafting system to ensure a fair and exciting competitive experience.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    active: true, 
    priority: 8, 
    link: "/tournaments" 
  },
]

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("wololo-news-v8")
    if (saved) {
      try {
        setNews(JSON.parse(saved))
      } catch (e) {
        setNews(DEFAULT_NEWS)
      }
    } else {
      setNews(DEFAULT_NEWS)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wololo-news-v8", JSON.stringify(news))
    }
  }, [news, isLoaded])

  const addNews = (message: string, link?: string, description?: string, imageUrl?: string, priority: number = 0) => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      message,
      link,
      description,
      imageUrl,
      active: true,
      priority,
    }
    setNews((prev) => [newItem, ...prev])
  }

  const removeNews = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id))
  }

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    setNews((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const toggleActive = (id: string) => {
    setNews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    )
  }

  const moveNews = (id: string, direction: "up" | "down") => {
    setNews((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      if (index === -1) return prev
      if (direction === "up" && index === 0) return prev
      if (direction === "down" && index === prev.length - 1) return prev

      const newNews = [...prev]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      const temp = newNews[index]
      newNews[index] = newNews[targetIndex]
      newNews[targetIndex] = temp
      return newNews
    })
  }

  const setNewsData = (newNews: NewsItem[]) => {
    setNews(newNews)
  }

  return (
    <NewsContext.Provider value={{ news, addNews, removeNews, updateNews, toggleActive, moveNews, setNews: setNewsData }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}