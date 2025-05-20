import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { createContactEmailTemplate, createClientConfirmationTemplate } from "@/lib/email-templates"
import fs from "fs"
import path from "path"

// Fonction pour vérifier si le logo existe
function ensureLogo() {
  const publicDir = path.join(process.cwd(), "public")
  const logoPath = path.join(publicDir, "logo.png")
  const originalLogoPath = path.join(publicDir, "images", "taxi-dumoulin-logo.png")

  try {
    // Vérifier si le logo existe déjà
    if (!fs.existsSync(logoPath) && fs.existsSync(originalLogoPath)) {
      // Copier le logo original vers la racine du dossier public
      fs.copyFileSync(originalLogoPath, logoPath)
      console.log("[api/contact] Logo copié avec succès")
    }
    return true
  } catch (error) {
    console.error("[api/contact] Erreur lors de la vérification/copie du logo:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    console.log("[api/contact] Début du traitement de la requête")

    // Vérifier et copier le logo si nécessaire
    ensureLogo()

    const data = await request.json()
    console.log("[api/contact] Données reçues:", data)
    const { name, email, phone, message } = data

    // Validation des données
    if (!name || !email || !message) {
      console.log("[api/contact] Validation échouée: données manquantes")
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez remplir tous les champs obligatoires",
        },
        { status: 400 },
      )
    }

    // Vérifier les variables d'environnement
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.error("[api/contact] Variables d'environnement manquantes pour l'envoi d'email")
      return NextResponse.json(
        {
          success: false,
          message: "Configuration d'email incomplète. Veuillez contacter l'administrateur.",
          error: "Variables d'environnement manquantes",
        },
        { status: 500 },
      )
    }

    // Création du contenu de l'email pour l'administrateur
    const text = `
Nouveau message de contact:
---------------------------
Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non fourni"}
---------------------------
Message:
${message}
---------------------------
`

    // Utilisation du modèle d'email pour l'administrateur
    const html = createContactEmailTemplate({
      name,
      email,
      phone,
      message,
    })

    console.log("[api/contact] Préparation de l'envoi d'email à l'administrateur")

    // Envoi de l'email à l'administrateur
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL || "",
      subject: `Nouveau message de contact - ${name}`,
      text,
      html,
    })

    console.log("[api/contact] Résultat de l'envoi d'email à l'administrateur:", result)

    // Si l'email à l'administrateur a été envoyé avec succès, envoyer une confirmation au client
    if (result.success) {
      console.log("[api/contact] Préparation de l'email de confirmation au client")

      // Email de confirmation au client
      const clientText = `
Bonjour ${name},

Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.

Si vous avez besoin d'une réponse urgente, n'hésitez pas à nous appeler directement au 04 74 75 10 78.

Cordialement,
L'équipe Taxi Dumoulin
`

      const clientHtml = createClientConfirmationTemplate({
        name,
        type: "contact",
        details: `Votre message: "${message}"`,
      })

      // Envoi de l'email de confirmation au client
      console.log("[api/contact] Envoi de l'email de confirmation au client:", email)

      const clientResult = await sendEmail({
        to: email,
        subject: "Confirmation de réception de votre message - Taxi Dumoulin",
        text: clientText,
        html: clientHtml,
      })

      console.log("[api/contact] Résultat de l'envoi d'email au client:", clientResult)

      return NextResponse.json({
        success: true,
        message: "Votre message a été envoyé avec succès",
      })
    } else {
      console.error("[api/contact] Erreur lors de l'envoi de l'email:", result.error)
      return NextResponse.json(
        {
          success: false,
          message: "Une erreur est survenue lors de l'envoi de votre message",
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[api/contact] Erreur dans la route /api/contact:", error)
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
