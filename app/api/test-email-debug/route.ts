import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { createEmailTemplate } from "@/lib/email-templates"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // Vérifier les variables d'environnement
    const envVars = {
      GMAIL_USER: process.env.GMAIL_USER || "Non défini",
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "Défini" : "Non défini",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "Non défini",
      EMAIL_BASE_URL: process.env.EMAIL_BASE_URL || "Non défini",
      NODE_ENV: process.env.NODE_ENV || "Non défini",
    }

    // Vérifier l'existence du logo
    const publicDir = path.join(process.cwd(), "public")
    const logoPath = path.join(publicDir, "logo.png")
    const originalLogoPath = path.join(publicDir, "images", "taxi-dumoulin-logo.png")

    const logoExists = fs.existsSync(logoPath)
    const originalLogoExists = fs.existsSync(originalLogoPath)

    // Si le logo n'existe pas, essayer de le copier
    let copyResult = "Non tenté"
    if (!logoExists && originalLogoExists) {
      try {
        fs.copyFileSync(originalLogoPath, logoPath)
        copyResult = "Succès"
      } catch (error) {
        copyResult = `Échec: ${error instanceof Error ? error.message : String(error)}`
      }
    }

    // Créer un contenu HTML de test
    const html = createEmailTemplate({
      title: "Test de diagnostic d'email",
      content: `
        <p>Ceci est un email de test pour diagnostiquer les problèmes d'envoi.</p>
        <p>Date et heure: ${new Date().toLocaleString()}</p>
      `,
    })

    // Envoyer un email de test si l'adresse admin est définie
    let emailResult = "Non tenté"
    if (process.env.ADMIN_EMAIL) {
      try {
        const result = await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "Test de diagnostic d'email",
          text: "Ceci est un email de test pour diagnostiquer les problèmes d'envoi.",
          html,
        })
        emailResult = result.success ? "Succès" : `Échec: ${result.error}`
      } catch (error) {
        emailResult = `Exception: ${error instanceof Error ? error.message : String(error)}`
      }
    }

    // Retourner les résultats du diagnostic
    return NextResponse.json({
      success: true,
      environment: envVars,
      files: {
        logoExists,
        originalLogoExists,
        logoCopyResult: copyResult,
      },
      emailTest: emailResult,
      htmlPreview: html,
    })
  } catch (error) {
    console.error("[api/test-email-debug] Erreur:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
