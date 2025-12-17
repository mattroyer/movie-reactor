export type Movie = {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  vote_count: number
  release_date: string
  adult: boolean
  genres: {
    id: number
    name: string
  }[]
  genre_ids: number[]
}

export type TMDBResponse = {
  results: Movie[]
  page: number
  total_pages: number,
  total_results: number
}
