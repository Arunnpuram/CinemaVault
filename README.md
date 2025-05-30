# 🎬 CinemaVault

A modern, responsive movie and TV show discovery platform built with Next.js 15 and powered by The Movie Database (TMDB) API.

![CinemaVault Preview](https://via.placeholder.com/1200x600/1a1a2e/ffffff?text=CinemaVault+Preview)

## ✨ Features

- **🔥 Trending Content** - Discover what's hot this week
- **🎭 Comprehensive Database** - Browse thousands of movies and TV shows
- **🔍 Advanced Search** - Find content with real-time search functionality
- **🎨 Genre Exploration** - Browse content by specific genres
- **📱 Responsive Design** - Optimized for all devices
- **🎪 Cast & Crew Info** - Detailed information about actors and production teams
- **🎥 Trailer Integration** - Watch trailers directly on YouTube
- **⭐ Ratings & Reviews** - See TMDB ratings and user scores
- **🌙 Dark Theme** - Beautiful dark interface optimized for viewing

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A TMDB API key (free registration required)

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/cinemavault.git
   cd cinemavault
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   TMDB_API_KEY=your_tmdb_api_key_here
   \`\`\`

   To get your TMDB API key:
   - Visit [TMDB](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings > API
   - Request an API key

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
cinemavault/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── movie/[id]/        # Movie detail pages
│   ├── tv/[id]/           # TV show detail pages
│   ├── movies/            # Movies listing page
│   ├── tv-shows/          # TV shows listing page
│   ├── genres/            # Genre browsing pages
│   ├── search/            # Search functionality
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   ├── hero-section.tsx  # Homepage hero
│   ├── movie-row.tsx     # Content carousels
│   └── ...
├── lib/                  # Utility functions
│   └── tmdb.ts          # TMDB API integration
└── public/              # Static assets
\`\`\`

## 🎯 Key Features Explained

### 🏠 Homepage
- Dynamic hero section with trending movies
- Curated content rows (Trending, Popular, Top Rated)
- Smooth carousel navigation

### 🔍 Search
- Real-time search with debouncing
- Search across movies and TV shows
- Tabbed results interface

### 🎭 Content Pages
- Detailed movie/TV show information
- Cast and crew sections with photos
- Trailer integration
- Production details

### 🎨 Genre Browsing
- Visual genre cards
- Separate movie and TV show genres
- Filtered content listings

## 🌐 API Integration

This project uses the TMDB API v3 for all content data:

- **Movies**: Popular, trending, top-rated, by genre
- **TV Shows**: Popular, trending, top-rated, by genre
- **Search**: Multi-search across all content types
- **Details**: Full movie/TV show information with cast & crew
- **Images**: High-quality posters and backdrops

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
