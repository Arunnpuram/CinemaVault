import { NextResponse } from "next/server"

export async function GET() {
  if (!process.env.WATCHMODE_API_KEY) {
    return NextResponse.json(
      {
        error: "Watchmode API key not configured",
        hasApiKey: false,
      },
      { status: 500 },
    )
  }

  try {
    // Test the search endpoint with required search_field parameter
    const testUrl = `https://api.watchmode.com/v1/search/?apiKey=${process.env.WATCHMODE_API_KEY}&search_field=name&search_value=batman&types=movie`
    console.log("Testing Watchmode API with:", testUrl)

    const response = await fetch(testUrl)
    const responseText = await response.text()

    console.log("API Response Status:", response.status)
    console.log("API Response Headers:", Object.fromEntries(response.headers.entries()))
    console.log("API Response Body:", responseText)

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      data = { raw: responseText }
    }

    // Test a specific title sources if search works
    let sourcesTest = null
    if (response.ok && data.title_results && data.title_results.length > 0) {
      const firstTitle = data.title_results[0]
      try {
        const sourcesUrl = `https://api.watchmode.com/v1/title/${firstTitle.id}/sources/?apiKey=${process.env.WATCHMODE_API_KEY}&regions=US`
        const sourcesResponse = await fetch(sourcesUrl)
        const sourcesData = await sourcesResponse.json()
        sourcesTest = {
          titleId: firstTitle.id,
          titleName: firstTitle.title,
          sourcesCount: sourcesData.length || 0,
          sources: sourcesData.slice(0, 3), // First 3 sources
        }
      } catch (e) {
        sourcesTest = { error: "Failed to test sources" }
      }
    }

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data,
      sourcesTest,
      hasApiKey: true,
      apiKeyLength: process.env.WATCHMODE_API_KEY.length,
      testUrl,
    })
  } catch (error) {
    console.error("API Test Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        hasApiKey: true,
        apiKeyLength: process.env.WATCHMODE_API_KEY?.length || 0,
      },
      { status: 500 },
    )
  }
}
