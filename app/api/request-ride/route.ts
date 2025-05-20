import { NextResponse } from "next/server"
import { sendEmail, textToHtml } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, pickup, dropoff, date, time, message } = data

    // Validation des données
    if (!name || !email || !phone || !pickup || !dropoff) {
      return NextResponse.json(
        { success: false, message: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 },
      )
    }

    // Formatage du message pour l'email
    const emailSubject = `Nouvelle demande de course: ${name}`

    const emailText = `
Nouvelle demande de course:
--------------------------
Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Lieu de prise en charge: ${pickup}
Destination: ${dropoff}
${date ? `Date: ${date}` : ""}
${time ? `Heure: ${time}` : ""}
${message ? `Message: ${message}` : ""}
`

    const emailHtml = textToHtml(emailText)

    // Envoi de l'email
    const emailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || "admin@example.com",
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    })

    if (!emailResult.success) {
      console.error("Erreur lors de l'envoi de l'email:", emailResult.error)
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'envoi de la demande. Veuillez réessayer plus tard." },
        { status: 500 },
      )
    }

    // Confirmation
    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.",
    })
  } catch (error) {
    console.error("Erreur lors du traitement de la demande:", error)
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue. Veuillez réessayer plus tard." },
      { status: 500 },
    )
  }
}
