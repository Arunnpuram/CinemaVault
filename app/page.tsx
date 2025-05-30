import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import MovieRow from "@/components/movie-row"
import LoadingMovieRow from "@/components/loading-movie-row"

export const metadata = {
  title: "CinemaVault - Home",
  description: "Discover the latest and greatest movies and TV shows on CinemaVault.",
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative">
        <HeroSection />

        <div className="relative z-10 -mt-32 space-y-12 pb-20">
          <Suspense fallback={<LoadingMovieRow title="Trending Now" />}>
            <MovieRow title="Trending Now" category="trending" />
          </Suspense>

          <Suspense fallback={<LoadingMovieRow title="Popular Movies" />}>
            <MovieRow title="Popular Movies" category="popular" />
          </Suspense>

          <Suspense fallback={<LoadingMovieRow title="Top Rated Movies" />}>
            <MovieRow title="Top Rated Movies" category="top-rated" />
          </Suspense>

          <Suspense fallback={<LoadingMovieRow title="Popular TV Shows" />}>
            <MovieRow title="Popular TV Shows" category="tv-popular" />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
