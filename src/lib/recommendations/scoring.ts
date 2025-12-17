import { Interaction } from "./types"

type MovieWithGenres = {
  genre_ids?: number[]
  genres?: { id: number; name: string }[]
  vote_average?: number
  vote_count?: number
}

export function scoreMovie({
  movie,
  interactions,
}: {
  movie: MovieWithGenres
  interactions: Interaction[]
}): number {
  let score = 0

  const positiveInteractions = interactions.filter(
    i => i.type !== "dislike"
  )

  const viewedGenres = new Set<number>(
    positiveInteractions.flatMap(i =>
      i.movie?.genre_ids ??
      i.movie?.genres?.map(g => g.id) ??
      []
    )
  )

  const movieGenreIds =
    movie.genre_ids ??
    movie.genres?.map(g => g.id) ??
    []

  const sharedGenres = movieGenreIds.filter(g =>
    viewedGenres.has(g)
  ).length

  if (sharedGenres > 0) {
    score += sharedGenres * 0.4
  }

  if ((movie.vote_average ?? 0) >= 7) {
    score += 0.3
  }

  if (movie.vote_count) {
    score += Math.log(movie.vote_count) / 20
  }

  return score
}
