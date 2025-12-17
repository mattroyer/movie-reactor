export type InteractionType =
  | "like"
  | "dislike"
  | "view_details"
  | "search"
  | "filter"
  | "bookmark"

export type Interaction = {
  movieId: number,
  movie?: {
    genre_ids?: number[]
    genres?: { id: number; name: string }[]
  }
  type: InteractionType
  timestamp: number
}

export type RecommendationReason =
  | "genre_overlap"
  | "recently_viewed"
  | "popular"
  | "trending"
  | "rating_match"

export type Recommendation = {
  movieId: number
  score: number
  reasons: RecommendationReason[]
  confidence: number
}
