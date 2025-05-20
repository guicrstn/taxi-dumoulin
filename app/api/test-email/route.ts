import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import {
  createContactEmailTemplate,
  createReservationEmailTemplate,
  createClientConfirmationTemplate,
  createReservationAcceptedTemplate,
  createReservationRejectedTemplate,
} from "@/lib/email-templates"

export async function GET(request: Request) {
  try {
    // Récupérer le type d'email à tester depuis les paramètres d'URL
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "all"
    const email = searchParams.get("email") || process.env.ADMIN_EMAIL

    const logoUrl = searchParams.get("logoUrl") || "http://5.196.29.27:3001/images/taxi-dumoulin-logo.png"

    console.log(`[test-email-templates] Utilisation du logo: ${logoUrl}`)

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucune adresse email spécifiée pour le test",
        },
        { status: 400 },
      )
    }

    const results = []

    // Données de test
    const contactData = {
      name: "Jean Dupont",
      email: "test@example.com",
      phone: "06 12 34 56 78",
      message: "Bonjour,\n\nJe souhaiterais réserver un taxi pour demain matin.\n\nCordialement,\nJean",
    }

    const reservationData = {
      name: "Marie Martin",
      email: "test@example.com",
      phone: "06 98 76 54 32",
      date: "25 mai 2025 à 14h30",
      pickup: "7 route Genève, 01130 Nantua",
      dropoff: "Gare de Lyon-Part-Dieu",
      passengers: "2",
      message: "Merci de prévoir un véhicule avec un grand coffre pour nos bagages.",
      id: "res_test_123",
    }

    // Tester le modèle d'email de contact
    if (type === "contact" || type === "all") {
      const html = createContactEmailTemplate(contactData)

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Nouveau message de contact - Jean Dupont",
        text: "Ceci est un test du modèle d'email de contact.",
        html,
      })

      results.push({
        type: "contact",
        success: result.success,
        details: result,
      })
    }

    // Tester le modèle d'email de réservation
    if (type === "reservation" || type === "all") {
      const html = createReservationEmailTemplate(reservationData)

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Nouvelle demande de réservation - Marie Martin",
        text: "Ceci est un test du modèle d'email de réservation.",
        html,
      })

      results.push({
        type: "reservation",
        success: result.success,
        details: result,
      })
    }

    // Tester le modèle d'email de confirmation client (contact)
    if (type === "client-contact" || type === "all") {
      const html = createClientConfirmationTemplate({
        name: contactData.name,
        type: "contact",
        details: `Votre message: "${contactData.message}"`,
      })

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Confirmation de réception de votre message - Taxi Dumoulin",
        text: "Ceci est un test du modèle d'email de confirmation client (contact).",
        html,
      })

      results.push({
        type: "client-contact",
        success: result.success,
        details: result,
      })
    }

    // Tester le modèle d'email de confirmation client (réservation)
    if (type === "client-reservation" || type === "all") {
      const clientDetails = `
Lieu de prise en charge: ${reservationData.pickup}
Destination: ${reservationData.dropoff}
Date: ${reservationData.date}
Nombre de passagers: ${reservationData.passengers}
`

      const html = createClientConfirmationTemplate({
        name: reservationData.name,
        type: "reservation",
        details: clientDetails,
      })

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Confirmation de votre demande de réservation - Taxi Dumoulin",
        text: "Ceci est un test du modèle d'email de confirmation client (réservation).",
        html,
      })

      results.push({
        type: "client-reservation",
        success: result.success,
        details: result,
      })
    }

    // Tester le modèle d'email de réservation acceptée
    if (type === "accepted" || type === "all") {
      const html = createReservationAcceptedTemplate({
        name: reservationData.name,
        date: reservationData.date,
        pickup: reservationData.pickup,
        dropoff: reservationData.dropoff,
        passengers: reservationData.passengers,
        adminNotes:
          "Nous vous confirmons que votre réservation a été acceptée. Le chauffeur vous contactera 15 minutes avant l'heure prévue.",
      })

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Votre réservation a été confirmée - Taxi Dumoulin",
        text: "Ceci est un test du modèle d'email de réservation acceptée.",
        html,
      })

      results.push({
        type: "accepted",
        success: result.success,
        details: result,
      })
    }

    // Tester le modèle d'email de réservation refusée
    if (type === "rejected" || type === "all") {
      const html = createReservationRejectedTemplate({
        name: reservationData.name,
        date: reservationData.date,
        pickup: reservationData.pickup,
        dropoff: reservationData.dropoff,
        adminNotes:
          "Nous sommes désolés, mais ce créneau est déjà réservé. Pourriez-vous envisager un départ 1 heure plus tôt ou plus tard ?",
      })

      const result = await sendEmail({
        to: email,
        subject: "[TEST] Information sur votre demande de réservation - Taxi Dumoulin",
        text: "Ceci est un test du modèle d'email de réservation refusée.",
        html,
      })

      results.push({
        type: "rejected",
        success: result.success,
        details: result,
      })
    }

    return NextResponse.json({
      success: true,
      message: `${results.length} email(s) de test envoyé(s)`,
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    const err = error as Error
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi des emails de test",
        error: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
