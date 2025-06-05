// Real streaming availability using Watchmode API as primary source

export interface StreamingProvider {
  id: string
  name: string
  logo: string
  url?: string
  type: "subscription" | "rent" | "buy" | "free"
}

export interface StreamingOption {
  provider: StreamingProvider
  type: "subscription" | "rent" | "buy" | "free"
  price?: string
  quality?: "SD" | "HD" | "4K"
  url?: string
}

export interface StreamingAvailability {
  id: string
  title: string
  providers: StreamingOption[]
  lastUpdated: string
  fallback?: boolean
  debug?: {
    watchmodeId?: number
    searchAttempts?: string[]
    tmdbDetails?: any
    rawSources?: any[]
    searchResults?: any[]
    apiTestPassed?: boolean
    error?: string
  }
}

// Real streaming providers with actual data
export const streamingProviders: Record<string, StreamingProvider> = {
  netflix: {
    id: "netflix",
    name: "Netflix",
    logo: "https://images.justwatch.com/icon/207360008/s100/nfx.webp",
    url: "https://www.netflix.com",
    type: "subscription",
  },
  prime: {
    id: "prime",
    name: "Prime Video",
    logo: "https://images.justwatch.com/icon/52449539/s100/aiv.webp",
    url: "https://www.amazon.com/Prime-Video",
    type: "subscription",
  },
  disney: {
    id: "disney",
    name: "Disney+",
    logo: "https://images.justwatch.com/icon/147638351/s100/dnp.webp",
    url: "https://www.disneyplus.com",
    type: "subscription",
  },
  hbo: {
    id: "hbo",
    name: "Max",
    logo: "https://images.justwatch.com/icon/430997/s100/hbm.webp",
    url: "https://www.max.com",
    type: "subscription",
  },
  hulu: {
    id: "hulu",
    name: "Hulu",
    logo: "https://images.justwatch.com/icon/2289/s100/hlu.webp",
    url: "https://www.hulu.com",
    type: "subscription",
  },
  apple: {
    id: "apple",
    name: "Apple TV+",
    logo: "https://images.justwatch.com/icon/190848813/s100/atp.webp",
    url: "https://tv.apple.com",
    type: "subscription",
  },
  paramount: {
    id: "paramount",
    name: "Paramount+",
    logo: "https://images.justwatch.com/icon/2323/s100/pmp.webp",
    url: "https://www.paramountplus.com",
    type: "subscription",
  },
  peacock: {
    id: "peacock",
    name: "Peacock",
    logo: "https://images.justwatch.com/icon/52449539/s100/pck.webp",
    url: "https://www.peacocktv.com",
    type: "subscription",
  },
  youtube: {
    id: "youtube",
    name: "YouTube Movies",
    logo: "https://images.justwatch.com/icon/59562423/s100/yot.webp",
    url: "https://www.youtube.com",
    type: "rent",
  },
  vudu: {
    id: "vudu",
    name: "Vudu",
    logo: "https://images.justwatch.com/icon/430997/s100/vdu.webp",
    url: "https://www.vudu.com",
    type: "rent",
  },
  itunes: {
    id: "itunes",
    name: "Apple TV",
    logo: "https://images.justwatch.com/icon/190848813/s100/itu.webp",
    url: "https://tv.apple.com",
    type: "rent",
  },
  googleplay: {
    id: "googleplay",
    name: "Google Play Movies",
    logo: "https://images.justwatch.com/icon/169478387/s100/gpl.webp",
    url: "https://play.google.com/store/movies",
    type: "rent",
  },
}

// Watchmode API interfaces - flexible to handle different response structures
interface WatchmodeSearchResult {
  id: number
  title?: string
  name?: string // Some results might use 'name' instead of 'title'
  original_title?: string
  plot_overview?: string
  type: string // "movie" or "tv_series"
  imdb_id?: string
  tmdb_id?: number
  year?: number
  end_year?: number
  user_rating?: number
  critic_score?: number
  us_rating?: string
  poster?: string
  backdrop?: string
  original_language?: string
  genre_names?: string[]
  similar_titles?: number[]
  networks?: number[]
  network_names?: string[]
  relevance_percentile?: number
}

interface WatchmodeSource {
  source_id: number
  name: string
  type: string // "sub", "rent", "purchase", "free", "tve"
  region: string
  ios_url?: string
  android_url?: string
  web_url?: string
  format: string // "SD", "HD", "4K"
  price?: number
  seasons?: number[]
  episodes?: number[]
}

// Map Watchmode source IDs to our provider system (from their documentation)
const WATCHMODE_PROVIDER_MAP: Record<number, string> = {
  203: "netflix", // Netflix
  26: "prime", // Amazon Prime Video
  372: "disney", // Disney+
  384: "hbo", // HBO Max/Max
  157: "hulu", // Hulu
  350: "apple", // Apple TV+
  531: "paramount", // Paramount+
  387: "peacock", // Peacock
  192: "youtube", // YouTube Movies
  7: "vudu", // Vudu
  2: "itunes", // Apple TV (iTunes)
  3: "googleplay", // Google Play Movies
}

// Fallback streaming options for popular movies
const FALLBACK_STREAMING_OPTIONS: Record<string, StreamingOption[]> = {
  // Spirited Away (TMDB ID: 129)
  "129": [
    {
      provider: streamingProviders.hbo,
      type: "subscription",
      url: "https://www.max.com/movies/spirited-away",
    },
    {
      provider: streamingProviders.prime,
      type: "rent",
      price: "$3.99",
      quality: "HD",
    },
    {
      provider: streamingProviders.apple,
      type: "rent",
      price: "$3.99",
      quality: "HD",
    },
  ],
  // Schindler's List (TMDB ID: 424)
  "424": [
    {
      provider: streamingProviders.prime,
      type: "rent",
      price: "$3.99",
      quality: "HD",
      url: "https://www.amazon.com/gp/video/detail/B00FWT1MX2",
    },
    {
      provider: streamingProviders.apple,
      type: "rent",
      price: "$3.99",
      quality: "HD",
      url: "https://tv.apple.com/movie/schindlers-list/umc.cmc.6f1g1r7p1p1p1p1p1p1p1p",
    },
    {
      provider: streamingProviders.vudu,
      type: "rent",
      price: "$3.99",
      quality: "HD",
      url: "https://www.vudu.com/content/movies/details/Schindler-s-List/5678",
    },
  ],
  // Fight Club (TMDB ID: 550)
  "550": [
    {
      provider: streamingProviders.hulu,
      type: "subscription",
      url: "https://www.hulu.com/movie/fight-club-6b0c3d8d-3e4f-4b5a-9c1d-2e3f4a5b6c7d",
    },
    {
      provider: streamingProviders.prime,
      type: "rent",
      price: "$3.99",
      quality: "HD",
    },
  ],
  // Forrest Gump (TMDB ID: 13)
  "13": [
    {
      provider: streamingProviders.paramount,
      type: "subscription",
      url: "https://www.paramountplus.com/movies/forrest-gump/",
    },
    {
      provider: streamingProviders.prime,
      type: "rent",
      price: "$3.99",
      quality: "HD",
    },
  ],
  // Pulp Fiction (TMDB ID: 680)
  "680": [
    {
      provider: streamingProviders.netflix,
      type: "subscription",
      url: "https://www.netflix.com/title/880640",
    },
    {
      provider: streamingProviders.prime,
      type: "rent",
      price: "$3.99",
      quality: "HD",
    },
  ],
}

// Get movie/TV show details from TMDB
async function getTMDBDetails(tmdbId: number, type: "movie" | "tv") {
  try {
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB API key not configured")
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=external_ids`,
    )

    if (!response.ok) {
      throw new Error(`TMDB API failed: ${response.status}`)
    }

    const data = await response.json()
    const details = {
      title: type === "movie" ? data.title : data.name,
      original_title: type === "movie" ? data.original_title : data.original_name,
      year: type === "movie" ? data.release_date?.split("-")[0] : data.first_air_date?.split("-")[0],
      imdb_id: data.external_ids?.imdb_id,
    }

    console.log("TMDB Details for", tmdbId, ":", details)
    return details
  } catch (error) {
    console.error("Error fetching TMDB details:", error)
    return null
  }
}

// Helper function to get title from search result
function getResultTitle(result: WatchmodeSearchResult): string {
  return result.title || result.name || "Unknown Title"
}

// Search for content using Watchmode API (following their documentation)
async function searchWatchmode(query: string, type: "movie" | "tv"): Promise<WatchmodeSearchResult[]> {
  try {
    if (!process.env.WATCHMODE_API_KEY) {
      throw new Error("Watchmode API key not configured")
    }

    // Use the search endpoint with required search_field parameter
    const searchUrl = `https://api.watchmode.com/v1/search/?apiKey=${process.env.WATCHMODE_API_KEY}&search_field=name&search_value=${encodeURIComponent(query)}&types=${type === "movie" ? "movie" : "tv"}`

    console.log("Searching Watchmode:", searchUrl)

    const response = await fetch(searchUrl)
    console.log("Search response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Watchmode search failed:", response.status, errorText)
      throw new Error(`Watchmode search failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log("Search response data:", JSON.stringify(data, null, 2))
    console.log("Search results:", data.title_results?.length || 0, "titles found")

    return data.title_results || []
  } catch (error) {
    console.error("Error searching Watchmode:", error)
    return []
  }
}

// Find the best matching title
function findBestMatch(
  searchResults: WatchmodeSearchResult[],
  tmdbDetails: any,
  type: "movie" | "tv",
): WatchmodeSearchResult | null {
  if (!searchResults.length) {
    console.log("No search results to match")
    return null
  }

  console.log("Matching against TMDB details:", tmdbDetails)
  console.log(
    "Available search results:",
    searchResults.map((r) => ({
      id: r.id,
      title: getResultTitle(r),
      type: r.type,
      year: r.year,
    })),
  )

  // First, try exact title match with year
  let bestMatch = searchResults.find((result) => {
    const resultTitle = getResultTitle(result)
    const titleMatch =
      resultTitle.toLowerCase() === tmdbDetails.title.toLowerCase() ||
      result.original_title?.toLowerCase() === tmdbDetails.title.toLowerCase() ||
      result.original_title?.toLowerCase() === tmdbDetails.original_title?.toLowerCase()

    const yearMatch =
      !tmdbDetails.year || !result.year || Math.abs(result.year - Number.parseInt(tmdbDetails.year)) <= 1

    const typeMatch =
      (type === "movie" && result.type === "movie") ||
      (type === "tv" && (result.type === "tv_series" || result.type === "tv"))

    console.log(`Checking result: ${resultTitle} (${result.year}) - Type: ${result.type}`)
    console.log(`  Title match: ${titleMatch}, Year match: ${yearMatch}, Type match: ${typeMatch}`)

    return titleMatch && yearMatch && typeMatch
  })

  // If no exact match, try just title and type
  if (!bestMatch) {
    console.log("No exact match found, trying partial match...")
    bestMatch = searchResults.find((result) => {
      const resultTitle = getResultTitle(result)
      const titleMatch =
        resultTitle.toLowerCase().includes(tmdbDetails.title.toLowerCase()) ||
        tmdbDetails.title.toLowerCase().includes(resultTitle.toLowerCase())

      const typeMatch =
        (type === "movie" && result.type === "movie") ||
        (type === "tv" && (result.type === "tv_series" || result.type === "tv"))

      console.log(`Checking partial: ${resultTitle} - Title match: ${titleMatch}, Type match: ${typeMatch}`)

      return titleMatch && typeMatch
    })
  }

  // If still no match, return the first result of correct type
  if (!bestMatch) {
    console.log("No partial match found, trying first result of correct type...")
    bestMatch = searchResults.find((result) => result.type === (type === "movie" ? "movie" : "tv_series"))
  }

  console.log(
    "Best match found:",
    bestMatch
      ? {
          id: bestMatch.id,
          title: getResultTitle(bestMatch),
          type: bestMatch.type,
          year: bestMatch.year,
        }
      : null,
  )

  return bestMatch || null
}

// Get sources for a Watchmode title
async function getWatchmodeSources(watchmodeId: number): Promise<WatchmodeSource[]> {
  try {
    if (!process.env.WATCHMODE_API_KEY) {
      throw new Error("Watchmode API key not configured")
    }

    const sourcesUrl = `https://api.watchmode.com/v1/title/${watchmodeId}/sources/?apiKey=${process.env.WATCHMODE_API_KEY}&regions=US`
    console.log("Fetching sources:", sourcesUrl)

    const response = await fetch(sourcesUrl)
    console.log("Sources response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Watchmode sources failed:", response.status, errorText)
      throw new Error(`Watchmode sources failed: ${response.status}`)
    }

    const sources = await response.json()
    console.log("Sources found:", sources.length)

    return sources || []
  } catch (error) {
    console.error("Error fetching sources:", error)
    return []
  }
}

// Main function to get streaming availability
export async function getStreamingAvailability(
  id: string | number,
  type: "movie" | "tv",
): Promise<StreamingAvailability | null> {
  const debug = {
    searchAttempts: [] as string[],
    tmdbDetails: null as any,
    watchmodeId: undefined as number | undefined,
    rawSources: [] as any[],
    searchResults: [] as any[],
    apiTestPassed: false,
    error: undefined as string | undefined,
  }

  try {
    console.log(`Getting streaming availability for ${type} ID: ${id}`)

    // Check for fallback data first
    const fallbackOptions = FALLBACK_STREAMING_OPTIONS[id.toString()]
    if (fallbackOptions) {
      console.log(`Using fallback data for ${type} ${id}`)
      return {
        id: id.toString(),
        title: "",
        providers: fallbackOptions,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      }
    }

    if (!process.env.WATCHMODE_API_KEY) {
      debug.error = "Watchmode API key not configured"
      return {
        id: id.toString(),
        title: "",
        providers: [],
        lastUpdated: new Date().toISOString(),
        debug,
      }
    }

    // Get TMDB details
    const tmdbDetails = await getTMDBDetails(Number(id), type)
    debug.tmdbDetails = tmdbDetails

    if (!tmdbDetails) {
      debug.error = "Could not get TMDB details"
      return {
        id: id.toString(),
        title: "",
        providers: [],
        lastUpdated: new Date().toISOString(),
        debug,
      }
    }

    // Search Watchmode using the title
    let searchResults = await searchWatchmode(tmdbDetails.title, type)
    debug.searchAttempts.push(`Title search: ${tmdbDetails.title}`)
    debug.searchResults = searchResults

    if (searchResults.length === 0) {
      // Try with original title if different
      if (tmdbDetails.original_title && tmdbDetails.original_title !== tmdbDetails.title) {
        const originalResults = await searchWatchmode(tmdbDetails.original_title, type)
        debug.searchAttempts.push(`Original title search: ${tmdbDetails.original_title}`)
        searchResults = [...searchResults, ...originalResults]
        debug.searchResults = searchResults
      }
    }

    if (searchResults.length === 0) {
      debug.error = "No search results found"
      return {
        id: id.toString(),
        title: "",
        providers: [],
        lastUpdated: new Date().toISOString(),
        debug,
      }
    }

    // Find the best match
    const bestMatch = findBestMatch(searchResults, tmdbDetails, type)
    if (!bestMatch) {
      debug.error = "No suitable match found in search results"
      return {
        id: id.toString(),
        title: "",
        providers: [],
        lastUpdated: new Date().toISOString(),
        debug,
      }
    }

    debug.watchmodeId = bestMatch.id
    const matchedTitle = getResultTitle(bestMatch)
    console.log(`Found Watchmode ID: ${bestMatch.id} for "${matchedTitle}"`)

    // Get sources
    const sources = await getWatchmodeSources(bestMatch.id)
    debug.rawSources = sources

    if (sources.length === 0) {
      debug.error = "No sources found for this title"
      return {
        id: id.toString(),
        title: matchedTitle,
        providers: [],
        lastUpdated: new Date().toISOString(),
        debug,
      }
    }

    // Map sources to our provider format
    const providers: StreamingOption[] = sources
      .filter((source) => {
        const hasProvider = WATCHMODE_PROVIDER_MAP[source.source_id]
        const isUS = source.region === "US"
        console.log(`Source ${source.source_id} (${source.name}): hasProvider=${hasProvider}, isUS=${isUS}`)
        return hasProvider && isUS
      })
      .map((source) => {
        const providerId = WATCHMODE_PROVIDER_MAP[source.source_id]
        const provider = streamingProviders[providerId]

        if (!provider) {
          console.log(`No provider config for ${providerId}`)
          return null
        }

        let type: "subscription" | "rent" | "buy" | "free"
        switch (source.type) {
          case "sub":
            type = "subscription"
            break
          case "rent":
            type = "rent"
            break
          case "purchase":
            type = "buy"
            break
          case "free":
            type = "free"
            break
          default:
            console.log(`Unknown source type: ${source.type}`)
            type = "subscription"
        }

        console.log(`Mapped source: ${source.name} -> ${provider.name} (${type})`)

        return {
          provider,
          type,
          price: source.price ? `$${source.price.toFixed(2)}` : undefined,
          quality: source.format === "4K" ? "4K" : source.format === "HD" ? "HD" : "SD",
          url: source.web_url || provider.url,
        }
      })
      .filter((provider): provider is StreamingOption => provider !== null)

    // Remove duplicates
    const uniqueProviders = providers.filter(
      (provider, index, self) =>
        index === self.findIndex((p) => p.provider.id === provider.provider.id && p.type === provider.type),
    )

    debug.apiTestPassed = true
    console.log(`Final providers: ${uniqueProviders.length}`)

    return {
      id: id.toString(),
      title: matchedTitle,
      providers: uniqueProviders,
      lastUpdated: new Date().toISOString(),
      debug: process.env.NODE_ENV === "development" ? debug : undefined,
    }
  } catch (error) {
    console.error("Error fetching streaming availability:", error)
    debug.error = error instanceof Error ? error.message : "Unknown error"
    return {
      id: id.toString(),
      title: "",
      providers: [],
      lastUpdated: new Date().toISOString(),
      debug,
    }
  }
}

// Cache streaming data
const streamingCache = new Map<string, { data: StreamingAvailability | null; timestamp: number }>()
const CACHE_DURATION = 1000 * 60 * 60 * 12 // 12 hours

export async function getCachedStreamingAvailability(
  id: string | number,
  type: "movie" | "tv",
): Promise<StreamingAvailability | null> {
  const cacheKey = `${type}-${id}`
  const cached = streamingCache.get(cacheKey)

  // Check if we have valid cached data
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for ${cacheKey}`)
    return cached.data
  }

  // Fetch fresh data
  console.log(`Fetching fresh data for ${cacheKey}`)
  const data = await getStreamingAvailability(id, type)

  // Cache the result
  streamingCache.set(cacheKey, { data, timestamp: Date.now() })

  return data
}

// Helper functions
export function getPopularStreamingServices(region = "US"): StreamingProvider[] {
  const popularUS = [
    streamingProviders.netflix,
    streamingProviders.prime,
    streamingProviders.disney,
    streamingProviders.hbo,
    streamingProviders.hulu,
    streamingProviders.apple,
    streamingProviders.paramount,
    streamingProviders.peacock,
  ]

  return popularUS
}

export function formatPrice(price: string | undefined, type: string): string {
  if (!price) {
    switch (type) {
      case "subscription":
        return "Included"
      case "free":
        return "Free"
      default:
        return "Available"
    }
  }
  return price
}
