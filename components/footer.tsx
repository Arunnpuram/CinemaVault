import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              CinemaVault
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your ultimate destination for discovering movies and TV shows. Powered by TMDB.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Browse</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/movies" className="hover:text-purple-400 transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="hover:text-purple-400 transition-colors">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/genres" className="hover:text-purple-400 transition-colors">
                  Genres
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-purple-400 transition-colors">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/search" className="hover:text-purple-400 transition-colors">
                  Advanced Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">
                  About CinemaVault
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  TMDB API
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CinemaVault. All rights reserved.</p>
          <p className="mt-2 text-sm">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  )
}
