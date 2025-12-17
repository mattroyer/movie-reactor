import Link from "next/link"
import { tmdb } from "@/lib/tmdb"
import NoPoster from "@/components/NoPoster"
import MovieRecommendations from "@/components/MovieRecommendations"
import { generateRecommendations, Recommendation } from "@/lib/recommendations"
import { Movie } from "@/lib/types"

type MoviePageProps = {
  params: Promise<{
    id: number
  }>
}

export default async function MovePage({ params }: MoviePageProps) {
  const { id } = await params
  const movie = await tmdb.getMovie(id)
  const { results: similar } = await tmdb.getSimilarMovies(id)
  const posterUrl = tmdb.getPosterUrl(movie.poster_path)

  const interactions = [
    {
      movieId: movie.id,
      movie: movie,
      type: "view_details" as any,
      timestamp: Date.now()
    }
  ]

  const recommendations = generateRecommendations({
    movies: similar,
    interactions,
  })

  type RecommendedMovie = Movie & { recommendation: Recommendation }

  const recommendedMovies: RecommendedMovie[] = recommendations
    .map(rec => {
      const movie = similar.find(m => m.id === rec.movieId)
      if (!movie) return null

      return {
        ...movie,
        recommendation: rec,
      }
    })
    .filter((m): m is RecommendedMovie => m !== null)

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg text-gray-400 hover:text-white mb-2"
      >
        <span className="text-3xl relative bottom-[4px]">⬅︎</span>
        <span>Back to Movies</span>
      </Link>

      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {movie.poster_path ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full max-w-xs md:max-w-sm rounded-lg border ring-1 ring-white/50"
              />
            ) : (
              <NoPoster title={movie.title} variant='colorful' />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 leading-relaxed mb-2">
              {movie.title}
            </h1>

            <p className="text-gray-400 mb-4">
              ⭐ {movie.vote_average} • {movie.release_date.slice(0, 4)}
            </p>

            <div className="flex gap-2 flex-wrap mb-4">
              {movie.genres.map((g: { id: number; name: string }) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-sm bg-gray-800 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <MovieRecommendations currentMovie={movie} similarMovies={recommendedMovies} />
    </main>
  )
}
