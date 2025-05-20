// lib/email.ts

import nodemailer from "nodemailer"

interface EmailParams {
  to: string
  subject: string
  text?: string
  html?: string
}

interface EmailResult {
  success: boolean
  error?: string
}

function validateEmailConfig() {
  const requiredVars = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "ADMIN_EMAIL"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error(`[email] Variables d'environnement manquantes: ${missingVars.join(", ")}`)
    return false
  }
  return true
}

export async function sendEmail({ to, subject, text, html }: EmailParams): Promise<EmailResult> {
  console.log(`[email] Tentative d'envoi d'email à ${to}`)

  // Valider la configuration
  if (!validateEmailConfig()) {
    return {
      success: false,
      error: "Configuration d'email incomplète. Variables d'environnement manquantes.",
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: html,
    }

    await transporter.sendMail(mailOptions)

    console.log(`[email] Email envoyé avec succès à ${to}`)
    return { success: true }
  } catch (error: any) {
    console.error(`[email] Erreur lors de l'envoi de l'email à ${to}:`, error)
    return { success: false, error: error.message }
  }
}
