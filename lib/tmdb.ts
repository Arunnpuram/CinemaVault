const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  poster_url?: string
  backdrop_url?: string
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  genre_ids: number[]
  poster_url?: string
  backdrop_url?: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Direct TMDB API call for server-side rendering
async function fetchDirectFromTMDB<T>(endpoint: string, params?: Record<string, string>): Promise<TMDBResponse<T>> {
  if (!process.env.TMDB_API_KEY) {
    throw new Error("TMDB API key not configured")
  }

  let url = `${TMDB_BASE_URL}/${endpoint}?api_key=${process.env.TMDB_API_KEY}`

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url += `&${key}=${encodeURIComponent(value)}`
    })
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  const data = await response.json()

  // Add image URLs to the response
  if (data.results) {
    data.results = data.results.map((item: any) => ({
      ...item,
      poster_url: item.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}` : null,
      backdrop_url: item.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${item.backdrop_path}` : null,
    }))
  }

  return data
}

// Client-side API call through our API route
async function fetchFromAPI<T>(endpoint: string, params?: Record<string, string>): Promise<TMDBResponse<T>> {
  const searchParams = new URLSearchParams({
    endpoint,
    ...params,
  })

  const response = await fetch(`/api/tmdb?${searchParams}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch from TMDB: ${response.statusText}`)
  }

  return response.json()
}

// Universal fetch function that works on both client and server
export async function fetchFromTMDB<T>(endpoint: string, params?: Record<string, string>): Promise<TMDBResponse<T>> {
  // Check if we're on the server (during build/SSR) or client
  if (typeof window === "undefined") {
    // Server-side: call TMDB directly
    return fetchDirectFromTMDB<T>(endpoint, params)
  } else {
    // Client-side: use our API route
    return fetchFromAPI<T>(endpoint, params)
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<Movie>("trending/movie/week")
  return data.results
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<Movie>("movie/popular")
  return data.results
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<Movie>("movie/top_rated")
  return data.results
}

export async function getPopularTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB<TVShow>("tv/popular")
  return data.results
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const data = await fetchFromTMDB<Movie>("discover/movie", {
    with_genres: genreId.toString(),
    sort_by: "popularity.desc",
  })
  return data.results
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB<Movie>("search/movie", { query })
  return data.results
}

export async function searchTVShows(query: string): Promise<TVShow[]> {
  const data = await fetchFromTMDB<TVShow>("search/tv", { query })
  return data.results
}

export async function getMovieDetails(id: number) {
  if (typeof window === "undefined") {
    // Server-side: call TMDB directly
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB API key not configured")
    }

    const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      ...data,
      poster_url: data.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}` : null,
      backdrop_url: data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${data.backdrop_path}` : null,
    }
  } else {
    // Client-side: use API route
    const response = await fetch(`/api/tmdb?endpoint=movie/${id}&append_to_response=credits,videos`)
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`)
    }
    return response.json()
  }
}

export async function getTVShowDetails(id: number) {
  if (typeof window === "undefined") {
    // Server-side: call TMDB directly
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB API key not configured")
    }

    const url = `${TMDB_BASE_URL}/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch TV show details: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      ...data,
      poster_url: data.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}` : null,
      backdrop_url: data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${data.backdrop_path}` : null,
    }
  } else {
    // Client-side: use API route
    const response = await fetch(`/api/tmdb?endpoint=tv/${id}&append_to_response=credits,videos`)
    if (!response.ok) {
      throw new Error(`Failed to fetch TV show details: ${response.statusText}`)
    }
    return response.json()
  }
}

export function getImageUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder.svg?height=750&width=500"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getBackdropUrl(path: string | null, size = "w1280"): string {
  if (!path) return "/placeholder.svg?height=720&width=1280"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
