"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      // Rediriger vers la page de login
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="h-5 w-5 mr-3" />
      {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
    </Button>
  )
}
