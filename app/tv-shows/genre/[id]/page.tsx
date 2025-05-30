import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import TVShowCard from "@/components/tv-show-card"
import Navigation from "@/components/navigation"
import { fetchFromTMDB, type TVShow } from "@/lib/tmdb"
import Link from "next/link"

const genreNames: Record<number, string> = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
}

export default async function TVGenrePage({ params }: { params: { id: string } }) {
  const genreId = Number.parseInt(params.id)
  const genreName = genreNames[genreId] || "Unknown Genre"

  try {
    const data = await fetchFromTMDB<TVShow>("discover/tv", { with_genres: genreId.toString() })
    const shows = data.results

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Navigation />

        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex items-center gap-4">
              <Link href="/genres">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Genres
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{genreName} TV Shows</h1>
                <p className="text-gray-400 text-lg">Discover the best {genreName.toLowerCase()} TV shows</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {shows.map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
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
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Genre Not Found</h1>
          <p className="text-gray-400 mb-6">Sorry, we couldn't load TV shows for this genre.</p>
          <Link href="/genres">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Genres
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
