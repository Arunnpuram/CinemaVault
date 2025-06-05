"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Loader2, AlertCircle, Tv, DollarSign, Info } from "lucide-react"
import { formatPrice, type StreamingAvailability, type StreamingOption } from "@/lib/streaming-services"

interface StreamingAvailabilityProps {
  id: string | number
  type: "movie" | "tv"
  title: string
}

export default function StreamingAvailabilitySection({ id, type, title }: StreamingAvailabilityProps) {
  const [availability, setAvailability] = useState<StreamingAvailability | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setLoading(true)
        setError(null)

        console.log(`Fetching streaming data for ${type} ${id}`)
        const response = await fetch(`/api/streaming?id=${id}&type=${type}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Streaming data received:", data)
        setAvailability(data)
      } catch (err) {
        console.error("Failed to fetch streaming availability:", err)
        setError(err instanceof Error ? err.message : "Unable to load streaming availability")
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [id, type])

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Tv className="mr-3 h-6 w-6" />
          Where to Watch
        </h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
          <span className="ml-3 text-gray-400">Checking streaming availability...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Tv className="mr-3 h-6 w-6" />
          Where to Watch
        </h3>
        <div className="flex items-center justify-center py-8 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
          <div>
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-gray-400 text-sm mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  if (!availability || availability.providers.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Tv className="mr-3 h-6 w-6" />
          Where to Watch
        </h3>

        <div className="text-center py-8">
          <div className="bg-gray-800/50 rounded-lg p-6 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No streaming options currently available</p>
            <p className="text-gray-500 text-sm mb-4">
              "{title}" may not be available for streaming right now, but check back later as availability changes
              frequently.
            </p>

            <div className="mt-4 text-xs text-gray-500">
              <p>Try these popular movies that should have streaming options:</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                <a href="/movie/424" className="text-purple-400 hover:text-purple-300 underline">
                  Schindler's List
                </a>
                <a href="/movie/550" className="text-purple-400 hover:text-purple-300 underline">
                  Fight Club
                </a>
                <a href="/movie/13" className="text-purple-400 hover:text-purple-300 underline">
                  Forrest Gump
                </a>
                <a href="/movie/680" className="text-purple-400 hover:text-purple-300 underline">
                  Pulp Fiction
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Group providers by type
  const freeProviders = availability.providers.filter((p) => p.type === "free")
  const subscriptionProviders = availability.providers.filter((p) => p.type === "subscription")
  const rentProviders = availability.providers.filter((p) => p.type === "rent")
  const buyProviders = availability.providers.filter((p) => p.type === "buy")

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Tv className="mr-3 h-6 w-6" />
          Where to Watch
        </h3>
        <div className="flex items-center gap-2">
          {availability.lastUpdated && (
            <p className="text-xs text-gray-500">Updated {new Date(availability.lastUpdated).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      {/* Success message when providers are found */}
      <div className="mb-6 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
        <div className="flex items-center text-green-400 text-sm">
          <Info className="h-4 w-4 mr-2" />
          <span>
            Found {availability.providers.length} streaming option{availability.providers.length !== 1 ? "s" : ""} for "
            {title}"{availability.fallback && " (using fallback data)"}
          </span>
        </div>
      </div>

      {freeProviders.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-2">FREE</span>
            Watch Free with Ads
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {freeProviders.map((option, index) => (
              <ProviderCard key={`free-${option.provider.id}-${index}`} option={option} />
            ))}
          </div>
        </div>
      )}

      {subscriptionProviders.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">Stream with Subscription</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subscriptionProviders.map((option, index) => (
              <ProviderCard key={`sub-${option.provider.id}-${index}`} option={option} />
            ))}
          </div>
        </div>
      )}

      {rentProviders.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Rent
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {rentProviders.map((option, index) => (
              <ProviderCard key={`rent-${option.provider.id}-${index}`} option={option} />
            ))}
          </div>
        </div>
      )}

      {buyProviders.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-orange-400 mb-3 flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Buy
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {buyProviders.map((option, index) => (
              <ProviderCard key={`buy-${option.provider.id}-${index}`} option={option} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-400 border-t border-white/10 pt-4">
        <p className="flex items-center justify-center mb-1">
          <span>Streaming data powered by</span>
          <a
            href="https://api.watchmode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-purple-400 hover:text-purple-300 underline"
          >
            Watchmode API
          </a>
        </p>
        <p>Prices and availability are subject to change and may vary by region.</p>
      </div>
    </div>
  )
}

function ProviderCard({ option }: { option: StreamingOption }) {
  const { provider, price, quality, url, type } = option

  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else if (provider.url) {
      window.open(provider.url, "_blank", "noopener,noreferrer")
    }
  }

  const displayPrice = formatPrice(price, type)

  return (
    <button
      onClick={handleClick}
      className="bg-black/40 hover:bg-black/60 rounded-lg p-4 flex flex-col items-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent group"
    >
      <div className="relative w-12 h-12 mb-3">
        <Image
          src={provider.logo || "/placeholder.svg"}
          alt={provider.name}
          width={48}
          height={48}
          className="rounded-lg object-contain group-hover:scale-110 transition-transform duration-200"
          onError={(e) => {
            // Fallback to placeholder if logo fails to load
            const target = e.target as HTMLImageElement
            target.src = `/placeholder.svg?height=48&width=48&text=${provider.name.substring(0, 2)}`
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-white text-sm font-medium mb-1 line-clamp-2">{provider.name}</p>
        <div className="space-y-1">
          {displayPrice && <p className="text-gray-300 text-xs font-medium">{displayPrice}</p>}
          {quality && quality !== "SD" && <p className="text-purple-400 text-xs font-bold">{quality}</p>}
        </div>
        <div className="flex items-center justify-center text-purple-400 text-xs mt-2 group-hover:text-purple-300 transition-colors">
          <span>Watch Now</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </div>
      </div>
    </button>
  )
}
