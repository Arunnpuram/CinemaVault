import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar, Film, ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMovieDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = Number.parseInt(params.id)

  try {
    const movie = await getMovieDetails(movieId)

    const getTrailerUrl = () => {
      if (!movie?.videos?.results) return null

      const trailer = movie.videos.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")

      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
    }

    const trailerUrl = getTrailerUrl()

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="relative">
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <Image
              src={getBackdropUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 z-10">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-white hover:bg-black/30">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="container mx-auto px-6 relative -mt-72">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-64 h-96 mx-auto md:mx-0 flex-shrink-0">
                <Image
                  src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>

              <div className="space-y-6 mt-6 md:mt-0">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{movie.title}</h1>

                {movie.tagline && <p className="text-xl text-purple-400 italic">"{movie.tagline}"</p>}

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-5 w-5 fill-yellow-400" />
                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  {movie.runtime && (
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>{movie.runtime} min</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-300">
                    <Film className="h-4 w-4" />
                    <span>{movie.genres?.map((g: any) => g.name).join(", ")}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-3 text-white">Synopsis</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                </div>

                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-xl font-semibold mb-3 text-white">Production</h3>
                    <p className="text-gray-300">{movie.production_companies.map((c: any) => c.name).join(", ")}</p>
                  </div>
                )}

                <div className="pt-6 flex gap-4">
                  {trailerUrl ? (
                    <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        Watch Trailer
                      </Button>
                    </a>
                  ) : null}
                  <Button variant="ghost" className="text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movie.credits.cast.slice(0, 12).map((actor: any, index: number) => (
                <div key={`${actor.id}-${index}`} className="group">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 mb-3">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                          : "/placeholder.svg?height=450&width=300&text=No+Photo"
                      }
                      alt={actor.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{actor.name}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Crew Section */}
        {movie.credits?.crew && movie.credits.crew.length > 0 && (
          <section className="container mx-auto px-6 pb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Key Crew</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movie.credits.crew
                .filter((person: any) =>
                  [
                    "Director",
                    "Producer",
                    "Executive Producer",
                    "Screenplay",
                    "Writer",
                    "Director of Photography",
                    "Music",
                  ].includes(person.job),
                )
                .slice(0, 8)
                .map((person: any, index: number) => (
                  <div key={`${person.id}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 overflow-hidden rounded-full bg-gray-700 flex-shrink-0">
                        <Image
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : "/placeholder.svg?height=48&width=48&text=?"
                          }
                          alt={person.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm line-clamp-1">{person.name}</h3>
                        <p className="text-gray-400 text-xs line-clamp-1">{person.job}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

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
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <p className="text-gray-400 mb-6">Sorry, we couldn't find the movie you're looking for.</p>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
