import { NextResponse } from "next/server"

const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")
  const query = searchParams.get("query")
  const append_to_response = searchParams.get("append_to_response")

  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json({ error: "TMDB API key not configured" }, { status: 500 })
  }

  try {
    let url = `${TMDB_BASE_URL}/${endpoint}?api_key=${process.env.TMDB_API_KEY}`

    if (query) {
      url += `&query=${encodeURIComponent(query)}`
    }

    if (append_to_response) {
      url += `&append_to_response=${encodeURIComponent(append_to_response)}`
    }

    console.log("TMDB API URL:", url) // Debug log

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data = await response.json()

    console.log("TMDB API Response:", data) // Debug log

    // Add image URLs to the response
    if (data.results) {
      data.results = data.results.map((item: any) => ({
        ...item,
        poster_url: item.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}` : null,
        backdrop_url: item.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${item.backdrop_path}` : null,
      }))
    } else {
      // For individual movie/TV show details
      data.poster_url = data.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}` : null
      data.backdrop_url = data.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/w1280${data.backdrop_path}` : null
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("TMDB API Error:", error)
    return NextResponse.json({ error: "Failed to fetch data from TMDB" }, { status: 500 })
  }
}
