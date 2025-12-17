import { Interaction, RecommendationReason } from "./types";

export function getRecommendationReasons(
  movie: any,
  interactions: Interaction[]
): RecommendationReason[] {
  const reasons: RecommendationReason[] = []

  const viewedIds = new Set(interactions.map(i => i.movieId))

  if (viewedIds.has(movie.id)) {
    reasons.push("recently_viewed")
  }

  if (movie.vote_average >= 7.5) {
    reasons.push("rating_match")
  }

  if (movie.vote_count > 5000) {
    reasons.push("popular")
  }

  return reasons.slice(0, 2)
}

export const REASON_COPY: Record<RecommendationReason, string> = {
  genre_overlap: "Because it shares themes you explore",
  recently_viewed: "Related to something you viewed",
  popular: "Popular with similar viewers",
  trending: "Trending right now",
  rating_match: "Matches movies you rate highly",
}
