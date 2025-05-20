"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { LayoutDashboard, CalendarClock, Users, Settings, RefreshCw, Home, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/logout-button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        const data = await response.json()

        if (!data.authenticated && pathname !== "/admin/login") {
          router.push("/admin/login")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  // Si nous sommes sur la page de login, afficher directement le contenu
  if (pathname === "/admin/login") {
    return children
  }

  // Afficher un écran de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-4">
            <h1 className="text-xl font-bold">Taxi Dumoulin</h1>
            <p className="text-gray-400 text-sm">Espace administration</p>
          </div>
          <nav className="mt-6">
            <div className="px-4 py-2 text-xs text-gray-400 uppercase">Principal</div>
            <Link
              href="/admin"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Tableau de bord
            </Link>
            <Link
              href="/admin/reservations"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <CalendarClock className="h-5 w-5 mr-3" />
              Demandes de course
            </Link>
            <Link
              href="/admin/clients"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Users className="h-5 w-5 mr-3" />
              Clients
            </Link>

            <div className="px-4 py-2 mt-6 text-xs text-gray-400 uppercase">Paramètres</div>
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Settings className="h-5 w-5 mr-3" />
              Paramètres
            </Link>
            <Link href="/" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Home className="h-5 w-5 mr-3" />
              Retour au site
            </Link>
          </nav>

          <div className="px-4 mt-6 space-y-4">
            {/* Bouton d'actualisation intégré directement */}
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  await fetch("/admin/refresh")
                  window.location.reload()
                } catch (error) {
                  console.error("Erreur lors du rafraîchissement:", error)
                }
              }}
              className="w-full flex items-center justify-center gap-2 text-white bg-gray-700 hover:bg-gray-600"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <LogoutButton />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
