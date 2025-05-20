import { NextResponse } from "next/server"
import { sendEmail, textToHtml } from "@/lib/email"

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const data = await request.json()

    // Validation des données
    if (!data.name || !data.email || !data.phone || !data.pickup || !data.destination) {
      return NextResponse.json(
        { success: false, error: "Veuillez remplir tous les champs obligatoires" },
        { status: 400 },
      )
    }

    // Enregistrement en base de données (à implémenter plus tard)
    console.log("Nouvelle demande de course:", data)

    // Préparer le contenu de l'email pour l'administrateur
    const adminEmailText = `
Nouvelle demande de course

Client: ${data.name}
Téléphone: ${data.phone}
Email: ${data.email}
Adresse de départ: ${data.pickup}
Destination: ${data.destination}
Type de transport: ${data.type || "Standard"}
Informations complémentaires: ${data.notes || "Aucune"}
    `

    // Préparer le contenu de l'email pour le client
    const clientEmailText = `
Bonjour ${data.name},

Nous avons bien reçu votre demande de course et nous vous contacterons dans les plus brefs délais pour la confirmer.

Détails de votre demande:
- Adresse de départ: ${data.pickup}
- Destination: ${data.destination}
- Type de transport: ${data.type || "Standard"}

Si vous avez des questions, n'hésitez pas à nous contacter au 06 00 00 00 00.

Merci de votre confiance,
L'équipe Taxi Dumoulin
    `

    // Envoyer l'email à l'administrateur
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || "contact@taxi-dumoulin.fr",
      subject: "Nouvelle demande de course - Taxi Dumoulin",
      text: adminEmailText,
      html: textToHtml(adminEmailText),
    })

    // Envoyer l'email de confirmation au client
    const clientEmailResult = await sendEmail({
      to: data.email,
      subject: "Confirmation de votre demande de course - Taxi Dumoulin",
      text: clientEmailText,
      html: textToHtml(clientEmailText),
    })

    // Vérifier si les emails ont été envoyés avec succès
    if (!adminEmailResult.success || !clientEmailResult.success) {
      console.error("Erreur d'envoi d'email:", {
        admin: adminEmailResult,
        client: clientEmailResult,
      })

      // On continue quand même pour ne pas bloquer l'utilisateur
      // mais on enregistre l'erreur
    }

    return NextResponse.json({
      success: true,
      emailSent: adminEmailResult.success && clientEmailResult.success,
    })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande" },
      { status: 500 },
    )
  }
}
