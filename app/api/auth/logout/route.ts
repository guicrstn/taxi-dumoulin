import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { AUTH_COOKIE } from "@/middleware"

export async function POST() {
  // Supprimer le cookie de session
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)

  return NextResponse.json({
    success: true,
    message: "Déconnexion réussie",
  })
}
