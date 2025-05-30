interface LoadingMovieRowProps {
  title: string
}

export default function LoadingMovieRow({ title }: LoadingMovieRowProps) {
  return (
    <div className="relative group px-6">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-48 animate-pulse">
            <div className="relative aspect-[2/3] bg-gray-800 rounded-lg"></div>
            <div className="mt-2 h-4 bg-gray-800 rounded w-3/4"></div>
            <div className="mt-2 h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
