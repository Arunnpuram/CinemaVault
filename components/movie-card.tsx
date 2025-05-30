import Image from "next/image"
import Link from "next/link"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl, type Movie } from "@/lib/tmdb"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

  return (
    <div className="group cursor-pointer">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden rounded-xl bg-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
          <div className="relative aspect-[2/3]">
            <Image
              src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Actions */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button size="icon" className="bg-white text-black hover:bg-gray-200 rounded-full h-12 w-12 shadow-lg">
                <Play className="h-5 w-5 fill-current" />
              </Button>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-white font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>

            {/* Type Badge */}
            <div className="absolute top-3 left-3 bg-purple-600/80 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs text-white font-medium uppercase tracking-wide">Movie</span>
            </div>
          </div>

          {/* Movie Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <h3 className="text-white font-semibold text-lg line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-sm">{year}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
