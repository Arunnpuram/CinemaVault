import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CinemaVault - Discover Movies & TV Shows",
  description: "Explore the latest movies and TV shows with CinemaVault, your ultimate entertainment guide.",
  keywords: "movies, tv shows, cinema, entertainment, film database, streaming",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
