import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { createEmailTemplate } from "@/lib/email-templates"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // S'assurer que le logo est copié à la racine
    const sourcePath = path.join(process.cwd(), "public", "images", "taxi-dumoulin-logo.png")
    const destPath = path.join(process.cwd(), "public", "logo.png")

    if (!fs.existsSync(destPath) && fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath)
      console.log("Logo copié avec succès pour le test d'email")
    }

    // Récupérer l'email de test depuis les paramètres d'URL
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email") || process.env.ADMIN_EMAIL

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucune adresse email spécifiée pour le test",
        },
        { status: 400 },
      )
    }

    // Créer un template d'email de test avec le logo
    const content = `
      <h1>Test d'email avec logo</h1>
      <p>Ceci est un email de test pour vérifier que le logo s'affiche correctement.</p>
      <p>Date et heure du test: ${new Date().toLocaleString()}</p>
    `

    const html = createEmailTemplate(content, "Test Logo - Taxi Dumoulin")

    // Envoyer l'email de test
    const result = await sendEmail({
      to: email,
      subject: "Test d'email avec logo - Taxi Dumoulin",
      text: "Ceci est un email de test pour vérifier que le logo s'affiche correctement.",
      html,
    })

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Email de test avec logo envoyé avec succès" : "Échec de l'envoi de l'email",
      details: result,
      logoPath: "/logo.png",
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    const err = error as Error
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi de l'email de test",
        error: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
