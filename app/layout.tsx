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

  const NavLinks = () => (
    <>
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
    </>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-lg font-bold">Taxi Dumoulin</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-200",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white z-50 md:hidden transition-transform duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-lg font-bold">Menu Admin</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <NavLinks />
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
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <LogoutButton />
          </div>
        </nav>
      </div>

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-gray-900 text-white fixed h-full overflow-y-auto">
          <div className="p-4">
            <h1 className="text-xl font-bold">Taxi Dumoulin</h1>
            <p className="text-gray-400 text-sm">Espace administration</p>
          </div>
          <nav className="mt-6">
            <NavLinks />
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
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <LogoutButton />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
