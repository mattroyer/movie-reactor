'use client'

import Link from 'next/link'
import { Heart, ThumbsDown, Bookmark } from 'lucide-react'

import { Movie } from '@/lib/types'
import { tmdb } from '@/lib/tmdb'
import { useTaste } from '@/context/TasteContext'
import TasteButton from './TasteButton'
import NoPoster from './NoPoster'

type MovieCardProps = {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const {
    taste,
    likeMovie,
    dislikeMovie,
    toggleWatchlist,
  } = useTaste()

  const isLiked = taste.likedMovieIds.includes(movie.id)
  const isDisliked = taste.dislikedMovieIds.includes(movie.id)
  const isWatchlisted = taste.watchlistIds.includes(movie.id)


  const posterUrl = tmdb.getPosterUrl(movie.poster_path)
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  const rating = movie.vote_average.toFixed(1)

  return (
    <div className='group relative rounded-lg overflow-hidden bg-zinc-900'>
      <Link
        href={`/movie/${movie.id}`}
        className="block bg-gray-800"
      >
        {movie.poster_path ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
          />
        ) : (
          <NoPoster title={movie.title} variant='colorful' />
        )}

        <div className="p-4">
          <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{year}</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className='flex justify-between items-center px-3 py-2 border-t border-zinc-800'>
        <TasteButton
          title="Like"
          active={isLiked}
          activeColor='red'
          onClick={() => likeMovie(movie.id)}
          icon={<Heart size={18} />}
        />

        <TasteButton
          title="Not for me"
          active={isDisliked}
          activeColor='blue'
          onClick={() => dislikeMovie(movie.id)}
          icon={<ThumbsDown size={18} />}
        />

        <TasteButton
          title="Watchlist"
          active={isWatchlisted}
          activeColor='yellow'
          onClick={() => toggleWatchlist(movie.id)}
          icon={<Bookmark size={18} />}
        />
      </div>
    </div>
  )
}
