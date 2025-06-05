import { NextResponse } from "next/server"
import { getCachedStreamingAvailability } from "@/lib/streaming-services"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type") as "movie" | "tv"

  if (!id || !type) {
    return NextResponse.json({ error: "Missing id or type parameter" }, { status: 400 })
  }

  if (!process.env.WATCHMODE_API_KEY) {
    return NextResponse.json({ error: "Watchmode API key not configured" }, { status: 500 })
  }

  try {
    console.log(`API Route: Fetching streaming data for ${type} ID: ${id}`)
    const availability = await getCachedStreamingAvailability(id, type)

    // Add debug info to response
    const response = {
      ...availability,
      debug:
        process.env.NODE_ENV === "development"
          ? {
              tmdbId: id,
              type,
              apiKeyConfigured: !!process.env.WATCHMODE_API_KEY,
              timestamp: new Date().toISOString(),
            }
          : undefined,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Streaming API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch streaming data",
        debug:
          process.env.NODE_ENV === "development"
            ? {
                errorMessage: error instanceof Error ? error.message : "Unknown error",
                tmdbId: id,
                type,
              }
            : undefined,
      },
      { status: 500 },
    )
  }
}
