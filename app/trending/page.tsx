import Navigation from "@/components/navigation"
import MovieCard from "@/components/movie-card"
import TVShowCard from "@/components/tv-show-card"
import { getTrendingMovies, fetchFromTMDB, type TVShow } from "@/lib/tmdb"

export default async function TrendingPage() {
  const [trendingMovies, trendingTVShows] = await Promise.all([
    getTrendingMovies(),
    fetchFromTMDB<TVShow>("trending/tv/week").then((data) => data.results),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Trending Now</h1>
            <p className="text-gray-400 text-lg">What's popular this week</p>
          </div>

          {/* Trending Movies */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Trending Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Trending TV Shows */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Trending TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingTVShows.slice(0, 12).map((show) => (
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
