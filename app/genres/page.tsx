import Link from "next/link"
import { Film, Tv } from "lucide-react"
import Navigation from "@/components/navigation"

const movieGenres = [
  { id: 28, name: "Action", color: "from-red-500 to-orange-500" },
  { id: 12, name: "Adventure", color: "from-green-500 to-teal-500" },
  { id: 16, name: "Animation", color: "from-purple-500 to-pink-500" },
  { id: 35, name: "Comedy", color: "from-yellow-500 to-orange-500" },
  { id: 80, name: "Crime", color: "from-gray-700 to-gray-900" },
  { id: 99, name: "Documentary", color: "from-blue-500 to-indigo-500" },
  { id: 18, name: "Drama", color: "from-indigo-500 to-purple-500" },
  { id: 10751, name: "Family", color: "from-pink-500 to-rose-500" },
  { id: 14, name: "Fantasy", color: "from-purple-600 to-indigo-600" },
  { id: 36, name: "History", color: "from-amber-600 to-orange-600" },
  { id: 27, name: "Horror", color: "from-red-800 to-black" },
  { id: 10402, name: "Music", color: "from-cyan-500 to-blue-500" },
  { id: 9648, name: "Mystery", color: "from-slate-600 to-slate-800" },
  { id: 10749, name: "Romance", color: "from-rose-500 to-pink-500" },
  { id: 878, name: "Science Fiction", color: "from-blue-600 to-cyan-600" },
  { id: 10770, name: "TV Movie", color: "from-violet-500 to-purple-500" },
  { id: 53, name: "Thriller", color: "from-red-600 to-red-800" },
  { id: 10752, name: "War", color: "from-gray-600 to-gray-800" },
  { id: 37, name: "Western", color: "from-yellow-700 to-orange-700" },
]

const tvGenres = [
  { id: 10759, name: "Action & Adventure", color: "from-red-500 to-orange-500" },
  { id: 16, name: "Animation", color: "from-purple-500 to-pink-500" },
  { id: 35, name: "Comedy", color: "from-yellow-500 to-orange-500" },
  { id: 80, name: "Crime", color: "from-gray-700 to-gray-900" },
  { id: 99, name: "Documentary", color: "from-blue-500 to-indigo-500" },
  { id: 18, name: "Drama", color: "from-indigo-500 to-purple-500" },
  { id: 10751, name: "Family", color: "from-pink-500 to-rose-500" },
  { id: 10762, name: "Kids", color: "from-green-400 to-blue-400" },
  { id: 9648, name: "Mystery", color: "from-slate-600 to-slate-800" },
  { id: 10763, name: "News", color: "from-blue-600 to-indigo-600" },
  { id: 10764, name: "Reality", color: "from-orange-500 to-red-500" },
  { id: 10765, name: "Sci-Fi & Fantasy", color: "from-blue-600 to-cyan-600" },
  { id: 10766, name: "Soap", color: "from-rose-400 to-pink-400" },
  { id: 10767, name: "Talk", color: "from-teal-500 to-cyan-500" },
  { id: 10768, name: "War & Politics", color: "from-gray-600 to-gray-800" },
  { id: 37, name: "Western", color: "from-yellow-700 to-orange-700" },
]

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Browse by Genre</h1>
            <p className="text-gray-400 text-lg">Discover content by your favorite genres</p>
          </div>

          {/* Movie Genres */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Film className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Movie Genres</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movieGenres.map((genre) => (
                <Link key={genre.id} href={`/movies/genre/${genre.id}`}>
                  <div
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${genre.color} p-6 h-32 flex items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <h3 className="relative text-white font-bold text-lg z-10">{genre.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* TV Show Genres */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Tv className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">TV Show Genres</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tvGenres.map((genre) => (
                <Link key={genre.id} href={`/tv-shows/genre/${genre.id}`}>
                  <div
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${genre.color} p-6 h-32 flex items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <h3 className="relative text-white font-bold text-lg z-10">{genre.name}</h3>
                  </div>
                </Link>
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
