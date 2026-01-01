"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

export interface ChatMessage {
  id: string
  draft_id: string
  user_id: string
  message: string
  message_type: "text" | "emoji" | "system"
  created_at: string
  username?: string
  avatar_url?: string
}

interface UseDraftChatProps {
  draftId: string
  userId: string
  username: string
  avatarUrl?: string | null
  isDemo?: boolean
  canSendMessages?: boolean
}

// Quick emoji reactions
export const QUICK_EMOJIS = ["👍", "👎", "😂", "😮", "🔥", "💀", "🎯", "⚔️"]

export function useDraftChat({
  draftId,
  userId,
  username,
  avatarUrl,
  isDemo = false,
  canSendMessages = true,
}: UseDraftChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const supabaseRef = useRef(createClient())
  const isMountedRef = useRef(true)

  // Demo messages for testing
  const demoMessages: ChatMessage[] = [
    {
      id: "demo-1",
      draft_id: draftId,
      user_id: "demo-opponent",
      message: "GLHF!",
      message_type: "text",
      created_at: new Date(Date.now() - 60000).toISOString(),
      username: "Oponente Demo",
    },
    {
      id: "demo-2",
      draft_id: draftId,
      user_id: "demo-opponent",
      message: "🔥",
      message_type: "emoji",
      created_at: new Date(Date.now() - 30000).toISOString(),
      username: "Oponente Demo",
    },
  ]

  // Load initial messages
  useEffect(() => {
    isMountedRef.current = true
    const supabase = supabaseRef.current

    if (isDemo) {
      // Try to load from session storage first
      const savedMessages = sessionStorage.getItem(`demo_messages_${draftId}`)
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
        setIsLoading(false)
      } else {
        setMessages([])
        setIsLoading(false)
        
        // Automatic Greeting from Bot after 3 seconds if no messages exist
        const greetingTimer = setTimeout(() => {
          if (!isMountedRef.current) return;
          const greeting: ChatMessage = {
            id: `demo-greeting-${Date.now()}`,
            draft_id: draftId,
            user_id: "demo-opponent",
            message: "GL HF!",
            message_type: "text",
            created_at: new Date().toISOString(),
            username: "Oponente Demo",
          };
          setMessages(prev => {
            const updated = [...prev, greeting];
            sessionStorage.setItem(`demo_messages_${draftId}`, JSON.stringify(updated));
            return updated;
          });
        }, 3000);

        return () => clearTimeout(greetingTimer);
      }
      return () => { isMountedRef.current = false; }
    }

    const loadMessages = async () => {
      if (!isMountedRef.current) return
      setIsLoading(true)

      try {
        const { data, error } = await supabase
          .from("draft_messages")
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .eq("draft_id", draftId)
          .order("created_at", { ascending: true })
          .limit(100)

        if (!isMountedRef.current) return

        if (error) {
          if (error.code === "42501" || error.message?.includes("permission")) {
            setPermissionError("You don't have permission to view this chat")
            setMessages([])
          } else {
            console.error("Error loading chat:", error)
          }
        } else {
          const formattedMessages: ChatMessage[] = (data || []).map((msg: any) => ({
            id: msg.id,
            draft_id: msg.draft_id,
            user_id: msg.user_id,
            message: msg.message,
            message_type: msg.message_type || "text",
            created_at: msg.created_at,
            username: msg.profiles?.username || "Usuario",
            avatar_url: msg.profiles?.avatar_url,
          }))

          setMessages(formattedMessages)
        }
      } catch (error) {
        console.error("Error loading chat messages:", error)
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMountedRef.current = false
    }
  }, [draftId, isDemo])

  // Subscribe to realtime messages
  useEffect(() => {
    if (isDemo || permissionError) return

    const supabase = supabaseRef.current

    const channelName = `draft-chat-${draftId}-${Date.now()}`

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "draft_messages",
          filter: `draft_id=eq.${draftId}`,
        },
        async (payload) => {
          if (!isMountedRef.current) return

          const newMessage = payload.new as any

          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) {
              return prev
            }

            // Fetch profile for the new message
            supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("id", newMessage.user_id)
              .single()
              .then(({ data: profile }) => {
                if (!isMountedRef.current) return

                setMessages((current) =>
                  current.map((m) =>
                    m.id === newMessage.id
                      ? {
                          ...m,
                          username: profile?.username || "Usuario",
                          avatar_url: profile?.avatar_url,
                        }
                      : m,
                  ),
                )
              })

            const formattedMessage: ChatMessage = {
              id: newMessage.id,
              draft_id: newMessage.draft_id,
              user_id: newMessage.user_id,
              message: newMessage.message,
              message_type: newMessage.message_type || "text",
              created_at: newMessage.created_at,
              username: newMessage.user_id === userId ? username : "Usuario",
              avatar_url: newMessage.user_id === userId ? avatarUrl || undefined : undefined,
            }

            return [...prev, formattedMessage]
          })
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[v0] Chat channel subscribed successfully")
        } else if (status === "CHANNEL_ERROR") {
          console.error("[v0] Chat channel error")
        }
      })

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [draftId, isDemo, permissionError, userId, username, avatarUrl])

  // Send message
  const sendMessage = useCallback(
    async (message: string, type: "text" | "emoji" = "text") => {
      if (!message.trim() || isSending) return

      if (!canSendMessages) {
        setPermissionError("You don't have permission to send messages in this chat")
        return
      }

      setIsSending(true)
      setPermissionError(null)

      const supabase = supabaseRef.current

      if (isDemo) {
        // Demo mode: add message locally
        const newMessage: ChatMessage = {
          id: `demo-${Date.now()}`,
          draft_id: draftId,
          user_id: userId,
          message: message.trim(),
          message_type: type,
          created_at: new Date().toISOString(),
          username,
          avatar_url: avatarUrl || undefined,
        }
        setMessages((prev) => {
          const updated = [...prev, newMessage];
          sessionStorage.setItem(`demo_messages_${draftId}`, JSON.stringify(updated));
          return updated;
        })

        // Simulate opponent response for demo
        if (Math.random() > 0.5) {
          setTimeout(
            () => {
              if (!isMountedRef.current) return
              const responses = ["Nice pick! 👍", "🔥", "GG", "😂", "Interesting...", "⚔️"]
              const randomResponse = responses[Math.floor(Math.random() * responses.length)]
              const opponentMessage: ChatMessage = {
                id: `demo-response-${Date.now()}`,
                draft_id: draftId,
                user_id: "demo-opponent",
                message: randomResponse,
                message_type: randomResponse.length <= 2 ? "emoji" : "text",
                created_at: new Date().toISOString(),
                username: "Oponente Demo",
              }
              setMessages((prev) => {
                const updated = [...prev, opponentMessage];
                sessionStorage.setItem(`demo_messages_${draftId}`, JSON.stringify(updated));
                return updated;
              })
            },
            1500 + Math.random() * 2000,
          )
        }

        setIsSending(false)
        return
      }

      try {
        const optimisticId = `optimistic-${Date.now()}`
        const optimisticMessage: ChatMessage = {
          id: optimisticId,
          draft_id: draftId,
          user_id: userId,
          message: message.trim(),
          message_type: type,
          created_at: new Date().toISOString(),
          username,
          avatar_url: avatarUrl || undefined,
        }

        setMessages((prev) => [...prev, optimisticMessage])

        const { data, error } = await supabase
          .from("draft_messages")
          .insert({
            draft_id: draftId,
            user_id: userId,
            message: message.trim(),
            message_type: type,
          })
          .select()
          .single()

        if (error) {
          setMessages((prev) => prev.filter((m) => m.id !== optimisticId))

          if (error.code === "42501" || error.message?.includes("permission") || error.message?.includes("policy")) {
            setPermissionError("You don't have permission to send messages. Only draft participants can chat.")
          } else {
            console.error("Error sending message:", error)
          }
        } else if (data) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === optimisticId
                ? {
                    ...m,
                    id: data.id,
                    created_at: data.created_at,
                  }
                : m,
            ),
          )
        }
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setIsSending(false)
      }
    },
    [draftId, userId, username, avatarUrl, isDemo, isSending, canSendMessages],
  )

  // Send quick emoji
  const sendEmoji = useCallback(
    (emoji: string) => {
      sendMessage(emoji, "emoji")
    },
    [sendMessage],
  )

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    sendEmoji,
    permissionError,
    canSendMessages,
  }
}
