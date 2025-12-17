'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { loadUserTaste, saveUserTaste } from "@/lib/userTaste"

const TasteContext = createContext<ReturnType<typeof useTasteStore> | null>(null)

function useTasteStore() {
  const [taste, setTaste] = useState(loadUserTaste)

  useEffect(() => {
    saveUserTaste(taste)
  }, [taste])

  function likeMovie(id: number) {
    setTaste(t => {
      const alreadyLiked = t.likedMovieIds.includes(id)

      return {
        ...t,
        likedMovieIds: alreadyLiked
          ? t.likedMovieIds.filter(l => l !== id)
          : [...t.likedMovieIds, id],
          dislikedMovieIds: t.dislikedMovieIds.filter(d => d !== id),
      }
    })
  }

  function dislikeMovie(id: number) {
    setTaste(t => {
      const alreadyDisliked = t.dislikedMovieIds.includes(id)

      return {
        ...t,
        dislikedMovieIds: alreadyDisliked
          ? t.dislikedMovieIds.filter(d => d !== id)
          : [...t.dislikedMovieIds, id],
        likedMovieIds: t.likedMovieIds.filter(l => l !== id),
      }
    })
  }

  function toggleWatchlist(id: number) {
    setTaste(t => ({
      ...t,
      watchlistIds: t.watchlistIds.includes(id)
        ? t.watchlistIds.filter(w => w !== id)
        : [...t.watchlistIds, id],
    }))
  }

  return { taste, likeMovie, dislikeMovie, toggleWatchlist }
}

export function TasteProvider({ children }: { children: React.ReactNode }) {
  return (
    <TasteContext.Provider value={useTasteStore()}>
      {children}
    </TasteContext.Provider>
  )
}

export function useTaste() {
  const ctx = useContext(TasteContext)
  if (!ctx) throw new Error("useTaste must be used inside TasteProvider")
  return ctx
}
