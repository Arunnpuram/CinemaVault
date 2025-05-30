import { Film, Users, Star, Globe } from "lucide-react"
import Navigation from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">About CinemaVault</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Your ultimate destination for discovering movies and TV shows. We're passionate about bringing you the
                best entertainment content from around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Comprehensive Database</h3>
                    <p className="text-gray-400">
                      Access to thousands of movies and TV shows with detailed information
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Quality Content</h3>
                    <p className="text-gray-400">Curated recommendations and trending content updated daily</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Community Driven</h3>
                    <p className="text-gray-400">Built for movie and TV enthusiasts by entertainment lovers</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Global Content</h3>
                    <p className="text-gray-400">Discover content from different countries and cultures</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  At CinemaVault, we believe that great entertainment should be accessible to everyone. Our mission is
                  to help you discover your next favorite movie or TV show through our intuitive platform and
                  comprehensive database.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We're powered by The Movie Database (TMDB) API, ensuring you get the most up-to-date and accurate
                  information about your favorite content.
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Join Our Community</h3>
              <p className="text-gray-300 text-lg mb-6">
                Start building your watchlist and discover amazing content today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">10K+</div>
                  <div className="text-gray-300">Movies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">5K+</div>
                  <div className="text-gray-300">TV Shows</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">Daily</div>
                  <div className="text-gray-300">Updates</div>
                </div>
              </div>
            </div>
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
}
