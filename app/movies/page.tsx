import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import Navigation from "@/components/navigation"
import { getPopularMovies, getTopRatedMovies, getMoviesByGenre } from "@/lib/tmdb"

export default async function MoviesPage() {
  const [popularMovies, topRatedMovies, actionMovies] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getMoviesByGenre(28), // Action genre
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Movies</h1>
            <p className="text-gray-400 text-lg">Discover the latest and greatest movies</p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button className="bg-purple-600 hover:bg-purple-700">Popular</Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              Top Rated
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              Now Playing
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              Upcoming
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Popular Movies Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {popularMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Top Rated Movies Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Top Rated Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {topRatedMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Action Movies Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Action Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {actionMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
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
