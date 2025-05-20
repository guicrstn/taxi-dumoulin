import { type NextRequest, NextResponse } from "next/server"

// Configuration d'authentification
const ADMIN_USER = "admin"
const ADMIN_PASSWORD = "taxi2023"
const SESSION_EXPIRY = 1000 * 60 * 60 * 24 // 24 heures

// Clé du cookie de session
export const AUTH_COOKIE = "taxi_admin_session"

// Type pour la session
interface Session {
  username: string
  expiresAt: number
}

// Fonction pour vérifier si une session est valide
function isValidSession(session: Session): boolean {
  return session.expiresAt > Date.now()
}

export function middleware(request: NextRequest) {
  // Obtenir le cookie de session
  const session = request.cookies.get(AUTH_COOKIE)

  // Vérifier si la route demandée fait partie de l'espace admin (mais pas la page de login)
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginRoute = request.nextUrl.pathname === "/admin/login"
  const isApiAuthRoute = request.nextUrl.pathname.startsWith("/api/auth")

  // Si c'est une route admin (sauf login) et qu'il n'y a pas de session, rediriger vers la page de login
  if (isAdminRoute && !isLoginRoute && !session) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si c'est la page de login et qu'il y a une session, rediriger vers le dashboard admin
  if (isLoginRoute && session) {
    try {
      // Vérifier si la session est valide
      const sessionData = JSON.parse(session.value) as Session
      if (isValidSession(sessionData)) {
        const dashboardUrl = new URL("/admin", request.url)
        return NextResponse.redirect(dashboardUrl)
      }
    } catch (e) {
      // Si le cookie est invalide, le laisser continuer vers la page de login
    }
  }

  // Laisser passer les requêtes API d'authentification
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
}
