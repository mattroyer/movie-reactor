'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTaste } from "@/context/TasteContext"
import { tmdb } from "@/lib/tmdb"
import { Movie } from "@/lib/types"
import MovieGrid from "@/components/MovieGrid"

export default function LikedMoviesPage() {
  const { taste } = useTaste()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!taste.likedMovieIds.length) {
        setMovies([])
        setLoading(false)
        return
      }

      const data = await tmdb.getMoviesByIds(taste.likedMovieIds)
      setMovies(data)
      setLoading(false)
    }

    load()
  }, [taste.likedMovieIds])

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <Link
        href="/"
        className="flex items-center gap-2 mb-4 text-lg text-gray-400 hover:text-white"
      >
        <span className="text-3xl relative bottom-[4px]">⬅︎</span>
        <span>Back to Movies</span>
      </Link>

      <h1 className="text-2xl font-bold text-white mb-4">
        Liked Movies
      </h1>

      <MovieGrid movies={movies} />
    </main>
  )
}
