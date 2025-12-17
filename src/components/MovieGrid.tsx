import { Movie } from "@/lib/types"
import MovieCard from "./MovieCard"

type MovieGridProps = {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const uniqueMovies = Array.from(
    new Map(movies.map(m => [m.id, m])).values()
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {uniqueMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
