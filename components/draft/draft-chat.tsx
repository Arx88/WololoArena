"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { useDraftChat, QUICK_EMOJIS, type ChatMessage } from "@/hooks/use-draft-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, ShieldAlert, Crown, Swords, Info, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DraftChatProps {
  draftId: string
  userId: string
  username: string
  avatarUrl?: string | null
  isDemo?: boolean
  isHost: boolean
  isParticipant?: boolean
}

export function DraftChat({
  draftId,
  userId,
  username,
  avatarUrl,
  isDemo = false,
  isHost,
  isParticipant = true,
}: DraftChatProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastSeenCountRef = useRef(0)

  const { messages, isLoading, isSending, sendMessage, sendEmoji } = useDraftChat({
    draftId, userId, username, avatarUrl, isDemo, canSendMessages: isParticipant,
  })

  useEffect(() => {
    const saved = sessionStorage.getItem(`chat_last_seen_${draftId}`)
    if (saved) lastSeenCountRef.current = parseInt(saved)
  }, [draftId])

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      lastSeenCountRef.current = messages.length
      sessionStorage.setItem(`chat_last_seen_${draftId}`, messages.length.toString())
      setUnreadCount(0)
    }
  }, [messages, isOpen, isMinimized, scrollToBottom, draftId])

  useEffect(() => {
    if (!isOpen || isMinimized) {
      const unread = Math.max(0, messages.length - lastSeenCountRef.current)
      setUnreadCount(unread)
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = () => {
    if (inputValue.trim() && isParticipant) {
      sendMessage(inputValue.trim())
      setInputValue("")
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all hover:scale-110 active:scale-95 group relative border-4 border-[#020202]"
        >
          <MessageSquare className="h-7 w-7" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white text-xs font-black border-2 border-[#020202] animate-bounce shadow-lg">
              {unreadCount}
            </span>
          )}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border border-yellow-500/30 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none rounded-lg backdrop-blur-md translate-x-2 group-hover:translate-x-0">
            DRAFT CHAT
          </div>
        </Button>
      </div>
    )
  }

  return (
    <Card className={cn(
      "fixed bottom-6 right-6 z-50 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-300 border-white/10 bg-[#0a0a0b]/95 backdrop-blur-3xl flex flex-col overflow-hidden rounded-2xl",
      isMinimized ? "w-64 h-14" : "w-85 sm:w-[400px] h-[500px]"
    )}>
      {/* Premium Header */}
      <CardHeader className="p-4 border-b border-white/10 bg-gradient-to-r from-black/60 to-black/20 flex flex-row items-center justify-between space-y-0 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
            <MessageSquare className="h-4 w-4 text-yellow-500" />
          </div>
          <div>
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Battle Comms</CardTitle>
            <p className="text-[8px] text-yellow-500/60 uppercase font-bold tracking-widest">Secure Channel Encrypted</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-white hover:bg-white/5" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-red-500 hover:bg-red-500/10" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col flex-1 min-h-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />
          
          {/* Messages List */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative z-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <div className="h-4 w-4 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Syncing Comms...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-10 italic text-[10px] text-center px-12 uppercase tracking-widest">
                <Info className="h-8 w-8 mb-4" />
                <p>No transmissions detected on this frequency.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-300", msg.user_id === userId ? "items-end" : "items-start")}>
                  {/* Message Meta */}
                  <div className={cn("flex items-center gap-2 px-1", msg.user_id === userId && "flex-row-reverse")}>
                    <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded shadow-sm">
                      {msg.user_id === "demo-opponent" ? <Swords className="h-3 w-3 text-red-500" /> : <Crown className="h-3 w-3 text-yellow-500" />}
                      <span className={cn("text-[9px] font-black uppercase tracking-tighter", msg.user_id === "demo-opponent" ? "text-red-400" : "text-yellow-500")}>
                        {msg.username}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-white/20 uppercase">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  
                  {/* Message Body */}
                  <div className={cn(
                    "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm transition-all duration-300 relative group",
                    msg.message_type === 'emoji' ? "bg-transparent text-4xl p-0 shadow-none border-0" :
                    msg.user_id === userId 
                      ? "bg-gradient-to-br from-yellow-600/20 to-yellow-900/40 text-yellow-100 border border-yellow-500/30 rounded-tr-none shadow-[0_4px_15px_rgba(0,0,0,0.3)]" 
                      : "bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-white/90 border border-white/10 rounded-tl-none"
                  )}>
                    {msg.message}
                    {msg.user_id === userId && msg.message_type !== 'emoji' && <div className="absolute inset-0 bg-yellow-500/5 blur-xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls */}
          <div className="shrink-0 bg-black/40 border-t border-white/10 p-4 space-y-4 backdrop-blur-xl relative z-20">
            {/* Emoji Tray */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar custom-scrollbar">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  disabled={isSending}
                  className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-yellow-600/20 hover:text-yellow-500 transition-all text-xl shrink-0 border border-white/5 active:scale-90"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Text Input */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Transmit tactical data..."
                  className="bg-black/60 border-white/10 text-white placeholder:text-white/20 h-12 text-xs focus-visible:ring-yellow-500 rounded-xl px-4 border-2 transition-all group-hover:border-white/20"
                  disabled={!isParticipant || isSending}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                   <span className="text-[8px] font-black bg-white/10 px-1.5 py-0.5 rounded text-white border border-white/20 uppercase">Enter</span>
                </div>
              </div>
              <Button 
                onClick={handleSend} 
                className="h-12 w-12 bg-yellow-600 hover:bg-yellow-500 text-black rounded-xl shadow-lg active:scale-95 transition-all" 
                disabled={!inputValue.trim() || isSending}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}