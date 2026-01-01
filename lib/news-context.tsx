"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export interface NewsItem {
  id: string
  message: string
  active: boolean
  priority: number // Higher number = active/shown first
  link?: string
}

interface NewsContextType {
  news: NewsItem[]
  addNews: (message: string, link?: string) => void
  removeNews: (id: string) => void
  updateNews: (id: string, updates: Partial<NewsItem>) => void
  toggleActive: (id: string) => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

const DEFAULT_NEWS: NewsItem[] = [
  { id: "1", message: "Welcome to Wololo Arena! The ultimate AOE2 drafting tool.", active: true, priority: 10 },
  { id: "2", message: "New Feature: Team Builder is now live!", active: true, priority: 5, link: "/team-builder" },
  { id: "3", message: "Tournament Registration closes on Sunday.", active: true, priority: 8, link: "/tournaments" },
]

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("wololo-news")
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
      localStorage.setItem("wololo-news", JSON.stringify(news))
    }
  }, [news, isLoaded])

  const addNews = (message: string, link?: string) => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      message,
      link,
      active: true,
      priority: 0,
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

  return (
    <NewsContext.Provider value={{ news, addNews, removeNews, updateNews, toggleActive }}>
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
