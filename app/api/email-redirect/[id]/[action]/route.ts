import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params
    console.log(`[email-redirect] Redirection pour id=${id}, action=${action}`)

    // Vérifier que l'action est valide
    if (action !== "accept" && action !== "reject") {
      console.error(`[email-redirect] Action invalide: ${action}`)
      return NextResponse.json(
        {
          success: false,
          message: "Action non valide",
        },
        { status: 400 },
      )
    }

    // Obtenir l'origine de la requête
    const requestUrl = new URL(request.url)
    const origin = requestUrl.origin

    console.log(`[email-redirect] URL de la requête: ${request.url}`)
    console.log(`[email-redirect] Origine détectée: ${origin}`)

    // Construire l'URL de redirection complète
    // Utiliser l'origine de la requête comme base
    const redirectUrl = `${origin}/admin/reservations/${id}/${action}`

    console.log(`[email-redirect] URL de redirection: ${redirectUrl}`)

    // Rediriger vers la page d'action
    return NextResponse.redirect(redirectUrl)
  } catch (error: any) {
    console.error("[email-redirect] Erreur:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la redirection",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
