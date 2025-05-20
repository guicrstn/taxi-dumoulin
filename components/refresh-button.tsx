"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      // Appeler la route d'invalidation du cache
      await fetch("/admin/refresh")

      // Rafraîchir la page
      router.refresh()
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
      {isRefreshing ? "Actualisation..." : "Actualiser"}
    </Button>
  )
}
