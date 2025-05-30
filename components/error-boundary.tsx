"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        We're sorry, but we encountered an error while loading this content. Please try again later.
      </p>
      <Button onClick={reset} className="bg-purple-600 hover:bg-purple-700">
        Try again
      </Button>
    </div>
  )
}
