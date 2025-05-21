"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/admin/login")
      } else {
        console.error("Erreur lors de la déconnexion")
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full flex items-center justify-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
    </Button>
  )
}
