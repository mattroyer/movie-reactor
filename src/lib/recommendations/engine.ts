import { Interaction, Recommendation } from "./types";
import { scoreMovie } from "./scoring";
import { getRecommendationReasons } from "./reasons";

export function generateRecommendations({
  movies,
  interactions,
}: {
  movies: any[]
  interactions: Interaction[]
}): Recommendation[] {
  if (!interactions.length) {
    return movies.slice(0, 10).map(movie => ({
      movieId: movie.id,
      score: 0.5,
      reasons: ["popular"],
      confidence: 0.2,
    }))
  }

  return movies
    .map(movie => {
      const score = scoreMovie({ movie, interactions })

      return {
        movieId: movie.id,
        score,
        reasons: getRecommendationReasons(movie, interactions),
        confidence: Math.min(1, interactions.length / 8),
      }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
}

