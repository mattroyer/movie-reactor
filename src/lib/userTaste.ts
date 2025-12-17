const STORAGE_KEY = 'movie-taste'

export type UserTaste ={
  likedMovieIds: number[]
  dislikedMovieIds: number[]
  watchlistIds: number[]
}

export function loadUserTaste(): UserTaste {
  if (typeof window === 'undefined') {
    return { likedMovieIds: [], dislikedMovieIds: [], watchlistIds: [] }
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { likedMovieIds: [], dislikedMovieIds: [], watchlistIds: [] }

  try {
    return JSON.parse(raw)
  } catch {
    return { likedMovieIds: [], dislikedMovieIds: [], watchlistIds: [] }
  }
}

export function saveUserTaste(taste: UserTaste) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taste))
}
