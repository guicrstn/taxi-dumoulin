import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function GET(request: Request) {
  try {
    // Récupérer l'adresse email de destination depuis les paramètres d'URL
    const { searchParams } = new URL(request.url)
    const to = searchParams.get("to") || process.env.ADMIN_EMAIL || ""

    console.log(`[test-email] Tentative d'envoi d'email à: ${to}`)
    console.log(`[test-email] Variables d'environnement:`, {
      GMAIL_USER: process.env.GMAIL_USER ? "Défini" : "Non défini",
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "Défini" : "Non défini",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "Défini" : "Non défini",
    })

    if (!to) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucune adresse email spécifiée et ADMIN_EMAIL non configuré",
        },
        { status: 400 },
      )
    }

    const result = await sendEmail({
      to,
      subject: "Test d'email - Taxi Dumoulin",
      text: "Ceci est un email de test pour vérifier la configuration de l'envoi d'emails.",
      html: `
        <h1>Test d'email</h1>
        <p>Ceci est un email de test pour vérifier la configuration de l'envoi d'emails.</p>
        <p>Date et heure du test: ${new Date().toLocaleString()}</p>
      `,
    })

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Email de test envoyé avec succès" : "Échec de l'envoi de l'email",
      details: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    const err = error as Error
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi de l'email de test",
        error: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
