"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchMovies, searchTVShows, getImageUrl, type Movie, type TVShow } from "@/lib/tmdb"
import Image from "next/image"
import Link from "next/link"

interface SearchComponentProps {
  onClose?: () => void
}

export default function SearchComponent({ onClose }: SearchComponentProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<(Movie | TVShow)[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchContent = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const [movieResults, tvResults] = await Promise.all([searchMovies(query), searchTVShows(query)])

        const combined = [...movieResults.slice(0, 5), ...tvResults.slice(0, 5)].sort(
          (a, b) => b.vote_average - a.vote_average,
        )

        setResults(combined.slice(0, 8))
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchContent, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsOpen(true)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    onClose?.()
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search movies, TV shows..."
          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((item) => {
                const isTV = "name" in item
                const title = isTV ? item.name : item.title
                const year = isTV
                  ? item.first_air_date
                    ? new Date(item.first_air_date).getFullYear()
                    : "N/A"
                  : item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : "N/A"

                return (
                  <Link
                    key={`${isTV ? "tv" : "movie"}-${item.id}`}
                    href={`/${isTV ? "tv" : "movie"}/${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="relative w-12 h-16 flex-shrink-0">
                      <Image
                        src={getImageUrl(item.poster_path, "w92") || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{year}</span>
                        <span>•</span>
                        <span>{isTV ? "TV Show" : "Movie"}</span>
                        <span>•</span>
                        <span>★ {item.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-400">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  )
}
