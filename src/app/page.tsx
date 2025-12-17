'use client'

import { useState, useEffect, useRef } from "react"
import { Movie } from '@/lib/types'
import { tmdb } from '@/lib/tmdb'
import MovieGrid from '@/components/MovieGrid'

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const observerTarget = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)

  const fetchMovies = async (pageNum: number) => {
    if (isFetchingRef.current) return

    try {
      isFetchingRef.current = true

      if (pageNum === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const { results, total_pages } = await tmdb.getPopular(pageNum)

      if (pageNum === 1) {
        const filteredResults = results.filter(item => !item.adult);
        setMovies(filteredResults)
      } else {
        const filteredResults = results.filter(item => !item.adult);
        setMovies(prev => [...prev, ...filteredResults])
      }

      setHasMore(pageNum < total_pages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
      setLoadingMore(false)
      isFetchingRef.current = false
    }
  }

  useEffect(() => {
    fetchMovies(page)
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          setPage(prevPage => {
            if (!isFetchingRef.current && hasMore) {
              return prevPage + 1
            }
            return prevPage
          })
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loadingMore, loading])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 sm:px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight flex items-center justify-center gap-2 sm:justify-start">
              <span>🎬</span>
              <span className="whitespace-nowrap">Movie Discovery</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-400 mt-1">Find hidden gems you'll love</p>
          </div>

          <div className="flex justify-center items-center gap-2 text-xs opacity-70 sm:justify-start text-gray-400">
            <span>Powered by</span>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="The Movie Database"
              className="h-4"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-20">
            <div className="text-xl">Loading movies...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-200">Error: {error}</p>
            <p className="text-red-300 text-sm mt-2">
              Make sure you've added your TMDB API key!
            </p>
          </div>
        )}

        {!loading && !error && movies && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Popular Right Now</h2>
              <p className="text-gray-400">
                {movies.length} movies loaded • Page {page}
              </p>
            </div>
            <MovieGrid movies={movies} />

            {/* Sentinel element for infinite scroll */}
            <div ref={observerTarget} className="h-20" />

            {loadingMore && (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-4-transparent"></div>
                <p className="text-gray-400 mt-2">Loading more movies...</p>
              </div>
            )}

            {!hasMore && (
              <p className="text-center text-gray-500 py-8">
                No more movies to load
              </p>
            )}
          </>
        )}
      </main>
    </div>
  )
}
