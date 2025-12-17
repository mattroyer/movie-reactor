import { UserTaste } from "@/lib/userTaste"
import { Interaction } from "./types";

export function interactionsFromTaste(
  taste: UserTaste | undefined,
  viewedMovieId?: number
): Interaction[] {
  if (!taste) return []

  const now = Date.now()

  return [
    ...taste.likedMovieIds.map(id => ({
      movieId: id,
      type: "like" as const,
      timestamp: now,
    })),
    ...taste.dislikedMovieIds.map(id => ({
      movieId: id,
      type: "dislike" as const,
      timestamp: now,
    })),
    ...(viewedMovieId
      ? [{
        movieId: viewedMovieId,
        type: "view_details" as const,
        timestamp: now,
      }]
    : [])
  ]
}
