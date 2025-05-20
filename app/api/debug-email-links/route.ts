import { NextResponse } from "next/server"
import { createReservationEmailTemplate } from "@/lib/email-templates"

export async function GET(request: Request) {
  try {
    // Récupérer l'ID de réservation depuis les paramètres d'URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "test_reservation_123"
    const baseUrl = searchParams.get("baseUrl") || "http://5.196.29.27:3001"

    // Créer un template d'email de test
    const emailHtml = createReservationEmailTemplate({
      name: "Client Test",
      email: "test@example.com",
      phone: "06.12.34.56.78",
      date: "25 mai 2025 à 14h30",
      pickup: "7 route Genève, 01130 Nantua",
      dropoff: "Gare de Lyon-Part-Dieu",
      passengers: "2",
      message: "Ceci est un test des liens dans les emails.",
      id: id,
    })

    // Extraire les liens du template
    const linkRegex = /href="([^"]+)"/g
    const links: string[] = []
    let match

    while ((match = linkRegex.exec(emailHtml)) !== null) {
      links.push(match[1])
    }

    // Extraire les liens d'action spécifiques
    const acceptLink = links.find((link) => link.includes(`/admin/reservations/${id}/accept`))
    const rejectLink = links.find((link) => link.includes(`/admin/reservations/${id}/reject`))

    // Extraire les images
    const imgRegex = /src="([^"]+)"/g
    const images: string[] = []

    while ((match = imgRegex.exec(emailHtml)) !== null) {
      images.push(match[1])
    }

    return NextResponse.json({
      success: true,
      id,
      baseUrl,
      links: {
        all: links,
        accept: acceptLink,
        reject: rejectLink,
      },
      images,
      html: emailHtml.substring(0, 1000) + "...", // Afficher le début du HTML pour débogage
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du débogage des liens d'email",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
