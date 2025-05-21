"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { LayoutDashboard, CalendarClock, Users, Settings, RefreshCw, Home, Loader2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/logout-button"
import { cn } from "@/lib/utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-lg font-bold">Taxi Dumoulin</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-800"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white z-50 md:hidden transition-transform duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-lg font-bold">Menu Admin</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800"
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Principal</div>
          <Link
            href="/admin"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={closeMobileMenu}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/reservations"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={closeMobileMenu}
          >
            <CalendarClock className="h-5 w-5 mr-3" />
            Demandes de course
          </Link>
          <Link
            href="/admin/clients"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={closeMobileMenu}
          >
            <Users className="h-5 w-5 mr-3" />
            Clients
          </Link>

          <div className="px-4 py-2 mt-6 text-xs text-gray-400 uppercase">Paramètres</div>
          <Link
            href="/admin/settings"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={closeMobileMenu}
          >
            <Settings className="h-5 w-5 mr-3" />
            Paramètres
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={closeMobileMenu}
          >
            <Home className="h-5 w-5 mr-3" />
            Retour au site
          </Link>

          <div className="px-4 mt-6 space-y-4">
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
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <LogoutButton />
          </div>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Desktop Sidebar - Fixed position */}
        <aside className="hidden md:block w-64 bg-gray-900 text-white">
          <div className="p-4 sticky top-0">
            <h1 className="text-xl font-bold">Taxi Dumoulin</h1>
            <p className="text-gray-400 text-sm">Espace administration</p>
          </div>
          <nav className="mt-6 sticky top-20">
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

            <div className="px-4 mt-6 space-y-4">
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
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4" />
                Actualiser
              </Button>
              <LogoutButton />
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 md:ml-0">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
