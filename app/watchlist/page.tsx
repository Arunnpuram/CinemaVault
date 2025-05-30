"use client"

import { useState, useEffect } from "react"
import { Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import MovieCard from "@/components/movie-card"
import TVShowCard from "@/components/tv-show-card"

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([])

  useEffect(() => {
    // Load watchlist from localStorage
    const saved = localStorage.getItem("cinemavault-watchlist")
    if (saved) {
      setWatchlist(JSON.parse(saved))
    }
  }, [])

  const clearWatchlist = () => {
    setWatchlist([])
    localStorage.removeItem("cinemavault-watchlist")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">My Watchlist</h1>
              <p className="text-gray-400 text-lg">Your saved movies and TV shows</p>
            </div>
            {watchlist.length > 0 && (
              <Button
                onClick={clearWatchlist}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          {watchlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {watchlist.map((item) => {
                const isTV = "name" in item
                return isTV ? (
                  <TVShowCard key={`tv-${item.id}`} show={item} />
                ) : (
                  <MovieCard key={`movie-${item.id}`} movie={item} />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Your watchlist is empty</h3>
              <p className="text-gray-400 mb-6">
                Start adding movies and TV shows to keep track of what you want to watch
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">Browse Content</Button>
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
