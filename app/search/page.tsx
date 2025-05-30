"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import MovieCard from "@/components/movie-card"
import TVShowCard from "@/components/tv-show-card"
import { searchMovies, searchTVShows, type Movie, type TVShow } from "@/lib/tmdb"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTVShows] = useState<TVShow[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "movies" | "tv">("all")

  useEffect(() => {
    const searchContent = async () => {
      if (query.trim().length < 2) {
        setMovies([])
        setTVShows([])
        return
      }

      setLoading(true)
      try {
        const [movieResults, tvResults] = await Promise.all([searchMovies(query), searchTVShows(query)])

        setMovies(movieResults)
        setTVShows(tvResults)
      } catch (error) {
        console.error("Search error:", error)
        setMovies([])
        setTVShows([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchContent, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const totalResults = movies.length + tvShows.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
            <p className="text-gray-400 text-lg">Find your favorite movies and TV shows</p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, TV shows..."
                className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
              variant={activeTab === "all" ? "default" : "outline"}
            >
              All ({totalResults})
            </Button>
            <Button
              onClick={() => setActiveTab("movies")}
              className={activeTab === "movies" ? "bg-purple-600 hover:bg-purple-700" : ""}
              variant={activeTab === "movies" ? "default" : "outline"}
            >
              Movies ({movies.length})
            </Button>
            <Button
              onClick={() => setActiveTab("tv")}
              className={activeTab === "tv" ? "bg-purple-600 hover:bg-purple-700" : ""}
              variant={activeTab === "tv" ? "default" : "outline"}
            >
              TV Shows ({tvShows.length})
            </Button>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div>
              {(activeTab === "all" || activeTab === "movies") && movies.length > 0 && (
                <section className="mb-12">
                  {activeTab === "all" && <h2 className="text-2xl font-bold text-white mb-6">Movies</h2>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {movies.slice(0, activeTab === "all" ? 12 : 24).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              )}

              {(activeTab === "all" || activeTab === "tv") && tvShows.length > 0 && (
                <section>
                  {activeTab === "all" && <h2 className="text-2xl font-bold text-white mb-6">TV Shows</h2>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {tvShows.slice(0, activeTab === "all" ? 12 : 24).map((show) => (
                      <TVShowCard key={show.id} show={show} />
                    ))}
                  </div>
                </section>
              )}

              {totalResults === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                  <p className="text-gray-400">Try searching with different keywords</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">Start searching</h3>
              <p className="text-gray-400">Enter at least 2 characters to search for movies and TV shows</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CinemaVault. All rights reserved.</p>
          <p className="mt-2 text-sm">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </footer>
    </div>
  )
}
