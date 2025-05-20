import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { AUTH_COOKIE } from "@/middleware"

// Configuration d'authentification
const ADMIN_USER = "admin"
const ADMIN_PASSWORD = "taxi2023"
const SESSION_EXPIRY = 1000 * 60 * 60 * 24 // 24 heures

// Fonction pour vérifier les identifiants
function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASSWORD
}

// Fonction pour créer une session
function createSession(username: string) {
  return {
    username,
    expiresAt: Date.now() + SESSION_EXPIRY,
  }
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Vérifier les identifiants
    if (!checkCredentials(username, password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Nom d'utilisateur ou mot de passe incorrect",
        },
        { status: 401 },
      )
    }

    // Créer une session
    const session = createSession(username)

    // Définir le cookie de session
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTH_COOKIE,
      value: JSON.stringify(session),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 heures
      sameSite: "strict",
    })

    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
    })
  } catch (error) {
    console.error("Erreur de connexion:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la connexion",
      },
      { status: 500 },
    )
  }
}
