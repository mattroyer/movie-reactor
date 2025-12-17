import { Movie, TMDBResponse } from '@/lib/types'

const _siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)

if (typeof window === 'undefined' && !_siteUrl) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_SITE_URL. Set this to the public origin (for example https://example.com) so server-side code can call the internal API route.'
    )
  }

  // eslint-disable-next-line no-console
  console.warn(
    'Warning: NEXT_PUBLIC_SITE_URL is not set. Falling back to http://localhost:3000 for server-side API requests. Set NEXT_PUBLIC_SITE_URL to the public origin to avoid this.'
  )
}

const API_BASE_URL =
  typeof window === 'undefined'
    ? `${(_siteUrl || 'http://localhost:3000').replace(/\/$/, '')}/api/tmdb`
    : '/api/tmdb'


export const tmdb = {
  getPopular: async (page = 1): Promise<TMDBResponse> => {
    const res = await fetch(
      `${API_BASE_URL}?endpoint=/movie/popular&include_adult=false&page=${page}`
    )

    if (!res.ok) throw new Error('Failed to fetch movies')

    return res.json()
  },

  getPosterUrl: (path: string | null, size = 'w500'): string => {
    return `https://image.tmdb.org/t/p/${size}${path}`
  },

  getMovie: async (id: number): Promise<Movie> => {
    const res = await fetch(
      `${API_BASE_URL}?endpoint=/movie/${id}`
    )

    if (!res.ok) throw new Error('Failed to fetch movie')

    return res.json()
  },

  getSimilarMovies: async (id: number): Promise<TMDBResponse> => {
    const res = await fetch(
      `${API_BASE_URL}?endpoint=/movie/${id}/similar?include_adult=false&certification_country=US&certification.lte=PG-13`
    )

    if (!res.ok) throw new Error("Failed to fetch movies")

    return res.json()
  },

  getMoviesByIds(ids: number[]) {
    return Promise.all(
      ids.map(id => this.getMovie(id))
    )
  },

  discover: async (filters: {
    minRating?: number
    maxPopularity?: number
    genres?: number[]
    year?: number
  }): Promise<TMDBResponse> => {
    const params = new URLSearchParams({
      endpoint: '/discover/movie',
      sort_by: 'vote_average.desc',
      'vote_count.gte': '100',
    })

    if (filters.minRating) {
      params.append('vote_average.gte', filters.minRating.toString())
    }
    if (filters.year) {
      params.append('primary_release_year', filters.year.toString())
    }
    if (filters.genres && filters.genres.length > 0) {
      params.append('with_genres', filters.genres.join(','))
    }

    const res = await fetch(`${API_BASE_URL}?${params}`)
    if (!res.ok) throw new Error('Failed to discover movies')
    return res.json()
  }
}
