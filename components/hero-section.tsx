"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTrendingMovies, getBackdropUrl, getMovieDetails, type Movie } from "@/lib/tmdb"
import Link from "next/link"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroMovies, setHeroMovies] = useState<Movie[]>([])
  const [movieDetails, setMovieDetails] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHeroMovies() {
      try {
        const movies = await getTrendingMovies()
        const topMovies = movies.slice(0, 5)
        setHeroMovies(topMovies)

        // Load detailed info for each movie to get trailers
        const detailsPromises = topMovies.map((movie) => getMovieDetails(movie.id))
        const details = await Promise.all(detailsPromises)
        setMovieDetails(details)
      } catch (error) {
        console.error("Failed to load hero movies:", error)
      } finally {
        setLoading(false)
      }
    }

    loadHeroMovies()
  }, [])

  useEffect(() => {
    if (heroMovies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [heroMovies.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length)
  }

  const getTrailerUrl = (movieDetail: any) => {
    if (!movieDetail?.videos?.results) return null

    const trailer = movieDetail.videos.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube",
    )

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
  }

  if (loading || heroMovies.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    )
  }

  const currentMovie = heroMovies[currentSlide]
  const currentMovieDetail = movieDetails[currentSlide]
  const trailerUrl = getTrailerUrl(currentMovieDetail)

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(currentMovie.backdrop_path, "original") || "/placeholder.svg"}
          alt={currentMovie.title}
          fill
          priority
          className="object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl space-y-6">
            {/* Movie Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">{currentMovie.title}</h1>

            {/* Movie Info */}
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                ★ {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">{new Date(currentMovie.release_date).getFullYear()}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Movie</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
              {currentMovie.overview.length > 200
                ? `${currentMovie.overview.substring(0, 200)}...`
                : currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              {trailerUrl ? (
                <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105">
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Watch Trailer
                  </Button>
                </a>
              ) : null}
              <Link href={`/movie/${currentMovie.id}`}>
                <Button
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg font-semibold rounded-lg"
                >
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-14 w-14 backdrop-blur-sm z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-14 w-14 backdrop-blur-sm z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
