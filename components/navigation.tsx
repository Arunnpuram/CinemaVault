"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchComponent from "@/components/search-component"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              CinemaVault
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`${isActive("/") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className={`${isActive("/movies") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Movies
              </Link>
              <Link
                href="/tv-shows"
                className={`${isActive("/tv-shows") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                TV Shows
              </Link>
              <Link
                href="/genres"
                className={`${isActive("/genres") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Genres
              </Link>
              <Link
                href="/trending"
                className={`${isActive("/trending") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Trending
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center">
              <SearchComponent />
            </div>

            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-white/10 lg:hidden"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="/"
                className={`${isActive("/") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className={`${isActive("/movies") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Movies
              </Link>
              <Link
                href="/tv-shows"
                className={`${isActive("/tv-shows") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                TV Shows
              </Link>
              <Link
                href="/genres"
                className={`${isActive("/genres") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Genres
              </Link>
              <Link
                href="/trending"
                className={`${isActive("/trending") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Trending
              </Link>
              <Link
                href="/search"
                className={`${isActive("/search") ? "text-purple-400" : "text-gray-300"} hover:text-purple-400 transition-colors font-medium`}
              >
                Search
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
