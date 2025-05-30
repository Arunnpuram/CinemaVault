"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getMoviesByGenre,
  fetchFromTMDB,
  getImageUrl,
  type Movie,
  type TVShow,
} from "@/lib/tmdb"

interface MovieRowProps {
  title: string
  category: string
}

export default function MovieRow({ title, category }: MovieRowProps) {
  const [content, setContent] = useState<(Movie | TVShow)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        let data: (Movie | TVShow)[] = []

        switch (category) {
          case "trending":
            data = await getTrendingMovies()
            break
          case "popular":
            data = await getPopularMovies()
            break
          case "top-rated":
            data = await getTopRatedMovies()
            break
          case "tv-popular":
            data = await getPopularTVShows()
            break
          case "action":
            data = await getMoviesByGenre(28) // Action genre ID
            break
          case "horror":
            data = await getMoviesByGenre(27) // Horror genre ID
            break
          case "tv-drama":
            // Get TV shows with drama genre
            const tvDramaData = await fetchFromTMDB<TVShow>("discover/tv", {
              with_genres: "18", // Drama genre ID
              sort_by: "popularity.desc",
            })
            data = tvDramaData.results
            break
          default:
            data = await getPopularMovies()
        }

        setContent(data.slice(0, 15)) // Limit to 15 items for better performance
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load content"))
        console.error(`Failed to load ${category} content:`, err)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [category])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount * 3 : currentScroll + scrollAmount * 3

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  if (error) {
    return (
      <div className="relative group px-6">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-center">
          <p className="text-red-400">Failed to load content. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="relative group px-6">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 animate-pulse">
              <div className="relative aspect-[2/3] bg-gray-800 rounded-lg"></div>
              <div className="mt-2 h-4 bg-gray-800 rounded w-3/4"></div>
              <div className="mt-2 h-3 bg-gray-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (content.length === 0) {
    return (
      <div className="relative group px-6">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-gray-400">No content available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group px-6">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Movie Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="region"
          aria-label={`${title} content carousel`}
        >
          {content.map((item) => {
            const isTV = "name" in item
            const title = isTV ? item.name : item.title
            const releaseDate = isTV ? item.first_air_date : item.release_date
            const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A"

            return (
              <div key={item.id} className="flex-shrink-0 w-48 group/card cursor-pointer">
                <Link href={`/${isTV ? "tv" : "movie"}/${item.id}`}>
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover/card:scale-105 group-hover/card:z-10">
                    <div className="relative aspect-[2/3] bg-gray-800">
                      <Image
                        src={getImageUrl(item.poster_path) || "/placeholder.svg"}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 33vw, 192px"
                        className="object-cover transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button size="icon" className="bg-white text-black hover:bg-gray-200 rounded-full h-10 w-10">
                            <Play className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white font-medium">{item.vote_average.toFixed(1)}</span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs text-white font-medium uppercase tracking-wide">
                          {isTV ? "TV" : "Movie"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-white font-medium text-sm line-clamp-2 group-hover/card:text-purple-400 transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1">{year}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
