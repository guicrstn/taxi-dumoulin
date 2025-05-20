import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { AUTH_COOKIE } from "@/middleware"

export async function GET() {
  // Vérifier si l'utilisateur est authentifié
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(AUTH_COOKIE)

  if (!sessionCookie?.value) {
    return NextResponse.json({
      authenticated: false,
    })
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    const isValid = session.expiresAt > Date.now()

    return NextResponse.json({
      authenticated: isValid,
      username: isValid ? session.username : null,
    })
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      error: "Session invalide",
    })
  }
}
