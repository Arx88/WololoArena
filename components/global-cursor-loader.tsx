"use client"

import dynamic from "next/dynamic"

export const GlobalCursorLoader = dynamic(
  () => import("@/components/global-cursor").then((mod) => mod.GlobalCursor),
  { ssr: false }
)
