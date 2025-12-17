'use client'

import { useTaste } from "@/context/TasteContext"
import {
  generateRecommendations,
  interactionsFromTaste,
  REASON_COPY,
} from "@/lib/recommendations"
import { Movie } from "@/lib/types"
import MovieGrid from "./MovieGrid"

type RecommendedMovie = Movie & {
  recommendation: {
    score: number
    reasons: string[]
    confidence: number
  }
}

type Props = {
  currentMovie: Movie
  similarMovies: RecommendedMovie[]
}

export default function MovieRecommendations({
  currentMovie,
  similarMovies,
}: Props) {
  const { taste } = useTaste()

  const interactions = interactionsFromTaste(taste, currentMovie.id)

  const recommendations = generateRecommendations({
    movies: similarMovies,
    interactions,
  })

  const moviesWithReasons: RecommendedMovie[] = recommendations
    .map(rec => {
      const movie = similarMovies.find(m => m.id === rec.movieId)
      if (!movie) return null

      return {
        ...movie,
        recommendation: rec,
      }
    })
    .filter(Boolean) as RecommendedMovie[]

  if (!moviesWithReasons.length) return null

  const confidence = moviesWithReasons[0].recommendation.confidence

  const heading =
    confidence > 0.7
      ? "Highly recommended for you"
      : confidence > 0.4
      ? "You might like these"
      : "Worth exploring"

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">
        {heading}
      </h2>

      <p>
        {moviesWithReasons[0].recommendation.reasons
          .map(r => REASON_COPY[r as keyof typeof REASON_COPY])
          .join(" • ")}
      </p>

      <MovieGrid movies={moviesWithReasons} />
    </section>
  )
}
