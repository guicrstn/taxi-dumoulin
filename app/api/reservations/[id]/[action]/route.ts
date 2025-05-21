import { NextResponse } from "next/server"
import { getReservationById, updateReservationStatus } from "@/app/admin/lib/reservations"
import { sendEmail } from "@/lib/email"
import { createReservationAcceptedTemplate, createReservationRejectedTemplate } from "@/lib/email-templates"

export async function POST(request: Request, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params
    console.log(`Traitement de l'action ${action} pour la réservation ${id}`)

    // Vérifier que l'action est valide
    if (action !== "accept" && action !== "reject") {
      console.error(`Action invalide: ${action}`)
      return NextResponse.json(
        {
          success: false,
          message: "Action non valide",
          details: `L'action '${action}' n'est pas reconnue. Utilisez 'accept' ou 'reject'.`,
        },
        { status: 400 },
      )
    }

    // Récupérer les données de la requête
    let adminNotes = ""
    try {
      const data = await request.json()
      adminNotes = data?.adminNotes || ""
    } catch (e) {
      console.log("Pas de données JSON dans la requête ou format invalide")
    }

    // Récupérer la réservation
    const reservation = await getReservationById(id)
    if (!reservation) {
      console.error(`Réservation non trouvée: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Réservation non trouvée",
        },
        { status: 404 },
      )
    }

    console.log(`Réservation trouvée: ${id}, statut actuel: ${reservation.status}`)

    // Mettre à jour le statut de la réservation
    const status = action === "accept" ? "accepted" : "rejected"
    console.log(`Mise à jour du statut: ${status}, notes: ${adminNotes}`)

    const updatedReservation = await updateReservationStatus(id, status, adminNotes)

    if (!updatedReservation) {
      console.error(`Échec de la mise à jour de la réservation: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de la mise à jour de la réservation",
        },
        { status: 500 },
      )
    }

    console.log(`Réservation mise à jour avec succès: ${id}, nouveau statut: ${updatedReservation.status}`)

    // Si le client a fourni un email, lui envoyer une notification
    if (updatedReservation.email) {
      console.log(`Préparation de l'email pour: ${updatedReservation.email}`)
      let emailTemplate, emailSubject, emailText

      if (status === "accepted") {
        // Email d'acceptation
        emailSubject = "Votre réservation a été confirmée - Taxi Dumoulin"
        emailText = `
Bonjour ${updatedReservation.name},

Nous avons le plaisir de vous informer que votre demande de réservation a été acceptée.

Détails de votre réservation:
- Lieu de prise en charge: ${updatedReservation.pickup}
- Destination: ${updatedReservation.dropoff}
${updatedReservation.date ? `- Date: ${updatedReservation.date}` : ""}
${updatedReservation.passengers ? `- Nombre de passagers: ${updatedReservation.passengers}` : ""}

${adminNotes ? `Note du chauffeur: ${adminNotes}` : ""}

Nous vous remercions pour votre confiance et nous nous réjouissons de vous accueillir prochainement.

Si vous avez des questions ou besoin de modifier votre réservation, n'hésitez pas à nous contacter au 04 74 75 10 78.

Cordialement,
L'équipe Taxi Dumoulin
`

        emailTemplate = createReservationAcceptedTemplate({
          name: updatedReservation.name,
          date: updatedReservation.date,
          pickup: updatedReservation.pickup,
          dropoff: updatedReservation.dropoff,
          passengers: updatedReservation.passengers,
          adminNotes,
        })
      } else {
        // Email de refus
        emailSubject = "Information sur votre demande de réservation - Taxi Dumoulin"
        emailText = `
Bonjour ${updatedReservation.name},

Nous vous informons que nous ne sommes malheureusement pas en mesure de confirmer votre demande de réservation pour le trajet suivant :

- Lieu de prise en charge: ${updatedReservation.pickup}
- Destination: ${updatedReservation.dropoff}
${updatedReservation.date ? `- Date: ${updatedReservation.date}` : ""}

Motif : Créneau déjà réservé

${adminNotes ? `Message du chauffeur: ${adminNotes}` : ""}

Nous vous invitons à nous contacter pour trouver un autre créneau qui pourrait vous convenir.

Nous vous prions de nous excuser pour ce désagrément et espérons pouvoir vous servir prochainement.

Cordialement,
L'équipe Taxi Dumoulin
`

        emailTemplate = createReservationRejectedTemplate({
          name: updatedReservation.name,
          date: updatedReservation.date,
          pickup: updatedReservation.pickup,
          dropoff: updatedReservation.dropoff,
          adminNotes,
        })
      }

      try {
        // Envoyer l'email au client
        console.log(`Envoi de l'email à: ${updatedReservation.email}`)
        await sendEmail({
          to: updatedReservation.email,
          subject: emailSubject,
          text: emailText,
          html: emailTemplate,
        })
        console.log(`Email envoyé avec succès à: ${updatedReservation.email}`)
      } catch (emailError) {
        console.error(`Erreur lors de l'envoi de l'email:`, emailError)
        // On continue même si l'email échoue
      }
    }

    return NextResponse.json({
      success: true,
      message: `Réservation ${status === "accepted" ? "acceptée" : "refusée"} avec succès`,
      reservation: updatedReservation,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error(`Erreur lors du traitement de l'action:`, {
      error: errorMessage,
      stack: errorStack,
    })

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors du traitement de la demande",
        error: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    )
  }
}
