import nodemailer from "nodemailer"

// Interface pour typer les erreurs nodemailer
interface NodemailerError extends Error {
  code?: string
  command?: string
  response?: string
  responseCode?: number
}

// Configuration du transporteur Gmail avec plus d'options de débogage
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false pour le port 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  // Ajout d'options supplémentaires pour le débogage
  logger: true, // Active les logs détaillés
  debug: true, // Active le mode debug
  tls: {
    // Ne pas échouer en cas de certificat invalide
    rejectUnauthorized: false,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  try {
    console.log("Tentative d'envoi d'email avec les paramètres suivants:", {
      from: process.env.GMAIL_USER,
      to,
      subject,
      textLength: text?.length,
      htmlLength: html?.length,
    })

    // Vérifier que les variables d'environnement sont définies
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Variables d'environnement manquantes pour l'envoi d'email:", {
        GMAIL_USER: !!process.env.GMAIL_USER,
        GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
      })
      return {
        success: false,
        error: "Configuration email incomplète. Variables d'environnement manquantes.",
      }
    }

    const info = await transporter.sendMail({
      from: `"Taxi Dumoulin" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })

    console.log("Email envoyé avec succès:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: unknown) {
    // Typer l'erreur comme NodemailerError
    const emailError = error as NodemailerError

    console.error("Erreur détaillée d'envoi d'email:", {
      error: emailError.message,
      code: emailError.code,
      command: emailError.command,
      response: emailError.response,
      responseCode: emailError.responseCode,
      stack: emailError.stack,
    })

    return {
      success: false,
      error: emailError.message,
      errorDetails: {
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode,
      },
    }
  }
}

// Fonction pour convertir le texte en HTML simple
export function textToHtml(text: string): string {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
}
