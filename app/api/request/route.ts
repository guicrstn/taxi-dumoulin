import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { createReservationEmailTemplate, createClientConfirmationTemplate } from "@/lib/email-templates"
import { createReservation } from "@/app/admin/lib/reservations"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    console.log("[api/request] Début du traitement de la requête")

    // Vérifier que le corps de la requête est valide
    let data
    try {
      data = await request.json()
    } catch (error) {
      console.error("[api/request] Erreur lors du parsing du JSON:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Format de requête invalide",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 400 },
      )
    }

    console.log("[api/request] Données reçues:", data)
    const { name, email, phone, date, pickup, dropoff, passengers, message } = data

    // Validation des données
    if (!name || !phone || !pickup || !dropoff) {
      console.log("[api/request] Validation échouée: données manquantes")
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez remplir tous les champs obligatoires",
          missingFields: {
            name: !name,
            phone: !phone,
            pickup: !pickup,
            dropoff: !dropoff,
          },
        },
        { status: 400 },
      )
    }

    // Vérifier que les variables d'environnement nécessaires sont définies
    if (!process.env.ADMIN_EMAIL) {
      console.error("[api/request] Variable d'environnement ADMIN_EMAIL non définie")
      return NextResponse.json(
        {
          success: false,
          message: "Configuration du serveur incomplète. Veuillez contacter l'administrateur.",
          error: "ADMIN_EMAIL not defined",
        },
        { status: 500 },
      )
    }

    // Log pour le débogage
    console.log("[api/request] Création d'une nouvelle réservation avec les données:", {
      name,
      email,
      phone,
      date,
      pickup,
      dropoff,
      passengers,
    })

    // Enregistrer la réservation dans notre système
    let reservation
    try {
      reservation = await createReservation({
        name,
        email: email || "",
        phone,
        date,
        pickup,
        dropoff,
        passengers,
        message,
      })
      console.log("[api/request] Réservation créée avec succès:", reservation.id)
    } catch (error) {
      console.error("[api/request] Erreur lors de la création de la réservation:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de l'enregistrement de la réservation",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }

    // Création du contenu de l'email pour l'administrateur
    const text = `
Nouvelle demande de réservation:
-------------------------------
ID: ${reservation.id}
Nom: ${name}
Email: ${email || "Non fourni"}
Téléphone: ${phone}
Date: ${date || "Non précisée"}
Lieu de prise en charge: ${pickup}
Destination: ${dropoff}
Nombre de passagers: ${passengers || "Non précisé"}
-------------------------------
Message:
${message || "Aucun message supplémentaire"}
-------------------------------
`

    // Utilisation du modèle d'email pour l'administrateur avec les boutons d'action
    let html
    try {
      html = await createReservationEmailTemplate({
        name,
        email,
        phone,
        date,
        pickup,
        dropoff,
        passengers,
        message,
        id: reservation.id, // Inclure l'ID pour les boutons d'action
      })
    } catch (error) {
      console.error("[api/request] Erreur lors de la création du template d'email:", error)
      html = `<h1>Nouvelle demande de réservation</h1><pre>${text}</pre>`
    }

    console.log("[api/request] Préparation de l'envoi d'email à l'administrateur")

    // Envoi de l'email à l'administrateur
    try {
      const result = await sendEmail({
        to: process.env.ADMIN_EMAIL || "",
        subject: `Nouvelle demande de réservation - ${name}`,
        text,
        html,
      })

      console.log("[api/request] Résultat de l'envoi d'email à l'administrateur:", result)

      // Si l'email à l'administrateur a été envoyé avec succès, envoyer une confirmation au client
      if (result.success && email) {
        console.log("[api/request] Préparation de l'email de confirmation au client")

        // Email de confirmation au client
        const clientText = `
Bonjour ${name},

Nous avons bien reçu votre demande de réservation et nous vous contacterons rapidement pour la confirmer.

Récapitulatif de votre demande:
- Lieu de prise en charge: ${pickup}
- Destination: ${dropoff}
${date ? `- Date: ${date}` : ""}
${passengers ? `- Nombre de passagers: ${passengers}` : ""}

Si vous avez besoin d'une réponse urgente, n'hésitez pas à nous appeler directement au 04 74 75 10 78.

Cordialement,
L'équipe Taxi Dumoulin
`

        const clientDetails = `
Lieu de prise en charge: ${pickup}
Destination: ${dropoff}
${date ? `Date: ${date}` : ""}
${passengers ? `Nombre de passagers: ${passengers}` : ""}
`

        let clientHtml
        try {
          clientHtml = createClientConfirmationTemplate({
            name,
            type: "reservation",
            details: clientDetails,
          })
        } catch (error) {
          console.error("[api/request] Erreur lors de la création du template client:", error)
          clientHtml = `<h1>Confirmation de votre demande de réservation</h1><pre>${clientText}</pre>`
        }

        // Envoi de l'email de confirmation au client
        if (email) {
          console.log("[api/request] Envoi de l'email de confirmation au client:", email)

          try {
            const clientResult = await sendEmail({
              to: email,
              subject: "Confirmation de votre demande de réservation - Taxi Dumoulin",
              text: clientText,
              html: clientHtml,
            })

            console.log("[api/request] Résultat de l'envoi d'email au client:", clientResult)
          } catch (error) {
            console.error("[api/request] Erreur lors de l'envoi de l'email au client:", error)
          }
        }
      } else if (!result.success) {
        console.error("[api/request] Échec de l'envoi d'email à l'administrateur:", result.error)
      }

      // Retourner une réponse de succès même si l'email n'a pas été envoyé
      // car la réservation a été enregistrée avec succès
      return NextResponse.json({
        success: true,
        message: "Votre demande de réservation a été envoyée avec succès",
        reservationId: reservation.id,
        emailSent: result.success,
      })
    } catch (error) {
      console.error("[api/request] Erreur lors de l'envoi de l'email:", error)

      // Retourner une réponse de succès partiel car la réservation a été enregistrée
      return NextResponse.json({
        success: true,
        message: "Votre demande de réservation a été enregistrée, mais l'email n'a pas pu être envoyé",
        reservationId: reservation.id,
        emailSent: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  } catch (error) {
    // Journalisation détaillée de l'erreur
    console.error("[api/request] Erreur dans la route /api/request:", error)

    // Retourner une réponse d'erreur avec des détails utiles
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors du traitement de votre demande",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

// Route de test pour vérifier si l'API fonctionne correctement
export async function GET() {
  try {
    // Vérifier que les variables d'environnement nécessaires sont définies
    const envStatus = {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "Configuré ✅" : "Non configuré ❌",
      GMAIL_USER: process.env.GMAIL_USER ? "Configuré ✅" : "Non configuré ❌",
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "Configuré ✅" : "Non configuré ❌",
    }

    // Vérifier que le répertoire data existe
    const dataDir = path.join(process.cwd(), ".data")
    const dataExists = fs.existsSync(dataDir)

    // Vérifier que le fichier reservations.json existe
    const reservationsFile = path.join(dataDir, "reservations.json")
    const reservationsFileExists = fs.existsSync(reservationsFile)

    return NextResponse.json({
      success: true,
      message: "API de réservation fonctionnelle",
      environment: envStatus,
      filesystem: {
        dataDirectory: {
          path: dataDir,
          exists: dataExists,
        },
        reservationsFile: {
          path: reservationsFile,
          exists: reservationsFileExists,
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du test de l'API",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
