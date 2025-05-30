"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrendingMovies, getBackdropUrl, getImageUrl, type Movie } from "@/lib/tmdb"

export default function TrendingSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        const movies = await getTrendingMovies()
        setTrendingMovies(movies.slice(0, 5)) // Get top 5 trending movies
      } catch (error) {
        console.error("Failed to load trending movies:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTrendingMovies()
  }, [])

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length)
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [trendingMovies.length])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + trendingMovies.length) % trendingMovies.length)
  }

  if (loading || trendingMovies.length === 0) {
    return (
      <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading trending content...</div>
        </div>
      </section>
    )
  }

  const activeMovie = trendingMovies[activeIndex]

  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={getBackdropUrl(activeMovie.backdrop_path, "original") || "/placeholder.svg"}
          alt={activeMovie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-8 max-w-6xl">
              <div className="hidden md:block relative w-64 h-96 flex-shrink-0">
                <Image
                  src={getImageUrl(activeMovie.poster_path, "w500") || "/placeholder.svg"}
                  alt={`${activeMovie.title} poster`}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white">{activeMovie.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-5 w-5 fill-yellow-400" />
                    <span className="font-bold">{activeMovie.vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-300">{new Date(activeMovie.release_date).getFullYear()}</span>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl">
                  {activeMovie.overview.length > 200
                    ? `${activeMovie.overview.substring(0, 200)}...`
                    : activeMovie.overview}
                </p>
                <div className="pt-4 flex gap-4">
                  <Button className="bg-red-600 hover:bg-red-700">More Info</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {trendingMovies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-red-600" : "bg-white/50"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
