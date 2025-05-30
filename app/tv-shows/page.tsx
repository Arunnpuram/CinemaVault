import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import TVShowCard from "@/components/tv-show-card"
import Navigation from "@/components/navigation"
import { getPopularTVShows, fetchFromTMDB, type TVShow } from "@/lib/tmdb"

export default async function TVShowsPage() {
  const [popularShows, topRatedShows, trendingShows] = await Promise.all([
    getPopularTVShows(),
    fetchFromTMDB<TVShow>("tv/top_rated").then((data) => data.results),
    fetchFromTMDB<TVShow>("trending/tv/week").then((data) => data.results),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">TV Shows</h1>
            <p className="text-gray-400 text-lg">Explore the best television series</p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button className="bg-purple-600 hover:bg-purple-700">Popular</Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              Top Rated
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              On Air
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              Airing Today
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Trending TV Shows Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Trending This Week</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingShows.slice(0, 12).map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          </section>

          {/* Popular TV Shows Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Popular TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {popularShows.slice(0, 12).map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          </section>

          {/* Top Rated TV Shows Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Top Rated TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {topRatedShows.slice(0, 12).map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          </section>
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
