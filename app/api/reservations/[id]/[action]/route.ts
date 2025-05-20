import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { sendEmail } from "@/lib/email"
import { createReservationAcceptedTemplate, createReservationRejectedTemplate } from "@/lib/email-templates"

// Fonction pour mettre à jour le statut d'une réservation
async function updateReservationStatus(id: string, status: string, adminNotes = ""): Promise<any> {
  try {
    // Chemin vers le fichier de réservations
    const dataDir = path.join(process.cwd(), "data")
    const reservationsFile = path.join(dataDir, "reservations.json")

    // Vérifier si le fichier existe
    if (!fs.existsSync(reservationsFile)) {
      throw new Error("Le fichier de réservations n'existe pas")
    }

    // Lire les réservations existantes
    const fileContent = fs.readFileSync(reservationsFile, "utf-8")
    const reservations = JSON.parse(fileContent)

    // Trouver la réservation à mettre à jour
    const reservationIndex = reservations.findIndex((r: any) => r.id === id)
    if (reservationIndex === -1) {
      throw new Error(`Réservation avec l'ID ${id} non trouvée`)
    }

    // Mettre à jour le statut et les notes
    const updatedReservation = {
      ...reservations[reservationIndex],
      status,
      adminNotes: adminNotes || reservations[reservationIndex].adminNotes,
      updatedAt: new Date().toISOString(),
    }

    // Remplacer la réservation dans le tableau
    reservations[reservationIndex] = updatedReservation

    // Écrire le fichier mis à jour
    fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2))

    return updatedReservation
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la réservation:", error)
    throw error
  }
}

export async function GET(request: Request, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params
    console.log(`[api/reservations/${id}/${action}] Traitement de l'action ${action} pour la réservation ${id}`)

    // Vérifier que l'action est valide
    if (action !== "accept" && action !== "reject") {
      console.error(`[api/reservations/${id}/${action}] Action invalide: ${action}`)
      return NextResponse.json(
        {
          success: false,
          message: "Action non valide",
        },
        { status: 400 },
      )
    }

    // Déterminer le nouveau statut en fonction de l'action
    const newStatus = action === "accept" ? "accepted" : "rejected"

    // Mettre à jour le statut de la réservation
    const updatedReservation = await updateReservationStatus(id, newStatus)
    console.log(`[api/reservations/${id}/${action}] Statut mis à jour: ${newStatus}`)

    // Si l'email du client est fourni, lui envoyer une notification
    if (updatedReservation.email) {
      console.log(`[api/reservations/${id}/${action}] Envoi d'email au client: ${updatedReservation.email}`)

      // Préparer le template d'email en fonction de l'action
      let emailTemplate
      let emailSubject

      if (action === "accept") {
        emailTemplate = createReservationAcceptedTemplate(updatedReservation)
        emailSubject = "Votre réservation a été confirmée - Taxi Dumoulin"
      } else {
        emailTemplate = createReservationRejectedTemplate(updatedReservation)
        emailSubject = "Information concernant votre demande de réservation - Taxi Dumoulin"
      }

      // Envoyer l'email au client
      const emailResult = await sendEmail({
        to: updatedReservation.email,
        subject: emailSubject,
        text: `Bonjour ${updatedReservation.name}, votre réservation a été ${
          action === "accept" ? "acceptée" : "refusée"
        }.`,
        html: emailTemplate,
      })

      console.log(`[api/reservations/${id}/${action}] Résultat de l'envoi d'email: ${emailResult.success}`)
    }

    // Rediriger vers la page de détails de la réservation
    const requestUrl = new URL(request.url)
    const origin = requestUrl.origin
    const redirectUrl = `${origin}/admin/reservations`

    return NextResponse.json({
      success: true,
      message: `La réservation a été ${action === "accept" ? "acceptée" : "refusée"} avec succès`,
      reservation: updatedReservation,
      redirectUrl: redirectUrl,
    })
  } catch (error: any) {
    console.error(`[api/reservations/${params.id}/${params.action}] Erreur:`, error)
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors du traitement de la demande",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params
    console.log(`[api/reservations/${id}/${action}] Traitement de l'action ${action} pour la réservation ${id}`)

    // Vérifier que l'action est valide
    if (action !== "accept" && action !== "reject") {
      console.error(`[api/reservations/${id}/${action}] Action invalide: ${action}`)
      return NextResponse.json(
        {
          success: false,
          message: "Action non valide",
        },
        { status: 400 },
      )
    }

    // Récupérer les données de la requête (notes administrateur)
    const data = await request.json()
    const adminNotes = data.adminNotes || ""

    // Déterminer le nouveau statut en fonction de l'action
    const newStatus = action === "accept" ? "accepted" : "rejected"

    // Mettre à jour le statut de la réservation
    const updatedReservation = await updateReservationStatus(id, newStatus, adminNotes)
    console.log(`[api/reservations/${id}/${action}] Statut mis à jour: ${newStatus}`)

    // Si l'email du client est fourni, lui envoyer une notification
    if (updatedReservation.email) {
      console.log(`[api/reservations/${id}/${action}] Envoi d'email au client: ${updatedReservation.email}`)

      // Préparer le template d'email en fonction de l'action
      let emailTemplate
      let emailSubject

      if (action === "accept") {
        emailTemplate = createReservationAcceptedTemplate(updatedReservation)
        emailSubject = "Votre réservation a été confirmée - Taxi Dumoulin"
      } else {
        emailTemplate = createReservationRejectedTemplate(updatedReservation)
        emailSubject = "Information concernant votre demande de réservation - Taxi Dumoulin"
      }

      // Envoyer l'email au client
      const emailResult = await sendEmail({
        to: updatedReservation.email,
        subject: emailSubject,
        text: `Bonjour ${updatedReservation.name}, votre réservation a été ${
          action === "accept" ? "acceptée" : "refusée"
        }.`,
        html: emailTemplate,
      })

      console.log(`[api/reservations/${id}/${action}] Résultat de l'envoi d'email: ${emailResult.success}`)
    }

    return NextResponse.json({
      success: true,
      message: `La réservation a été ${action === "accept" ? "acceptée" : "refusée"} avec succès`,
      reservation: updatedReservation,
    })
  } catch (error: any) {
    console.error(`[api/reservations/${params.id}/${params.action}] Erreur:`, error)
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors du traitement de la demande",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
