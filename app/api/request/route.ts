import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { sendEmail } from "@/lib/email"
import { createClientReservationTemplate, createReservationEmailTemplate } from "@/lib/email-templates"
import { createClient, getClientByEmail } from "@/app/admin/lib/clients"

// Fonction pour générer un ID unique pour la réservation
function generateReservationId(): string {
  return `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
}

// Fonction pour sauvegarder une réservation
async function saveReservation(reservationData: any): Promise<any> {
  try {
    // Chemin vers le fichier de réservations
    const dataDir = path.join(process.cwd(), "data")
    const reservationsFile = path.join(dataDir, "reservations.json")

    // Créer le répertoire data s'il n'existe pas
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Lire les réservations existantes ou initialiser un tableau vide
    let reservations = []
    if (fs.existsSync(reservationsFile)) {
      const fileContent = fs.readFileSync(reservationsFile, "utf-8")
      reservations = JSON.parse(fileContent)
    }

    // Ajouter la nouvelle réservation
    reservations.push(reservationData)

    // Écrire le fichier mis à jour
    fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2))

    return reservationData
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la réservation:", error)
    throw error
  }
}

// Fonction pour vérifier si un client existe par téléphone
async function getClientByPhone(phone: string): Promise<any | null> {
  try {
    // Récupérer tous les clients
    const clients = await getAllClients()

    // Rechercher un client avec le même numéro de téléphone
    return clients.find((client) => client.phone === phone) || null
  } catch (error) {
    console.error("Erreur lors de la recherche du client par téléphone:", error)
    return null
  }
}

// Fonction pour récupérer tous les clients
async function getAllClients(): Promise<any[]> {
  try {
    // Chemin vers le fichier clients
    const dataDir = path.join(process.cwd(), "data")
    const clientsFile = path.join(dataDir, "clients.json")

    // Vérifier si le fichier existe
    if (!fs.existsSync(clientsFile)) {
      return []
    }

    // Lire le fichier
    const fileContent = fs.readFileSync(clientsFile, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error)
    return []
  }
}

// Fonction pour créer automatiquement un client s'il n'existe pas déjà
async function createClientIfNotExists(data: any): Promise<string | null> {
  try {
    // Vérifier si le client existe déjà par email
    if (data.email) {
      const existingClientByEmail = await getClientByEmail(data.email)
      if (existingClientByEmail) {
        console.log(`Client existant trouvé par email: ${existingClientByEmail.id}`)
        return existingClientByEmail.id
      }
    }

    // Vérifier si le client existe déjà par téléphone
    if (data.phone) {
      const existingClientByPhone = await getClientByPhone(data.phone)
      if (existingClientByPhone) {
        console.log(`Client existant trouvé par téléphone: ${existingClientByPhone.id}`)
        return existingClientByPhone.id
      }
    }

    // Si le client n'existe pas, le créer
    if (data.name && (data.email || data.phone)) {
      const newClient = {
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        address: "",
      }

      const savedClient = await createClient(newClient)
      console.log(`Nouveau client créé: ${savedClient.id}`)
      return savedClient.id
    }

    return null
  } catch (error) {
    console.error("Erreur lors de la création automatique du client:", error)
    return null
  }
}

export async function POST(request: Request) {
  try {
    console.log("[api/request] Début du traitement de la requête")

    // Récupérer les données de la requête
    const data = await request.json()
    console.log("[api/request] Données reçues:", data)

    // Validation des données
    if (!data.name || !data.phone || !data.pickup || !data.dropoff) {
      console.log("[api/request] Validation échouée: données manquantes")
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez remplir tous les champs obligatoires",
        },
        { status: 400 },
      )
    }

    // Créer automatiquement un client s'il n'existe pas déjà
    const clientId = await createClientIfNotExists(data)
    console.log(`[api/request] Client ID: ${clientId || "Aucun client créé"}`)

    // Générer un ID unique pour la réservation
    const reservationId = generateReservationId()

    // Préparer les données de la réservation
    const reservationData = {
      id: reservationId,
      clientId: clientId, // Associer le client à la réservation
      name: data.name,
      email: data.email || "",
      phone: data.phone,
      date: data.date || "",
      time: data.time || "",
      pickup: data.pickup,
      dropoff: data.dropoff,
      passengers: data.passengers || "",
      message: data.message || "",
      status: "pending",
      adminNotes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Sauvegarder la réservation
    const savedReservation = await saveReservation(reservationData)
    console.log("[api/request] Réservation sauvegardée:", savedReservation.id)

    // Vérifier les variables d'environnement pour l'envoi d'email
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.error("[api/request] Variables d'environnement manquantes pour l'envoi d'email")
      return NextResponse.json(
        {
          success: true,
          message: "Votre demande a été enregistrée, mais l'email de confirmation n'a pas pu être envoyé",
          reservation: savedReservation,
        },
        { status: 200 },
      )
    }

    // Préparer l'email pour l'administrateur
    const adminEmailTemplate = createReservationEmailTemplate({
      name: data.name,
      email: data.email || "Non fourni",
      phone: data.phone,
      date: data.date || "Non spécifié",
      time: data.time || "Non spécifié",
      pickup: data.pickup,
      destination: data.dropoff,
      passengers: data.passengers || "Non spécifié",
      message: data.message || "Aucun",
      id: reservationId,
    })

    // Envoyer l'email à l'administrateur
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Nouvelle demande de réservation - ${data.name}`,
      text: `Nouvelle demande de réservation de ${data.name}. Consultez l'interface d'administration pour plus de détails.`,
      html: adminEmailTemplate,
    })

    console.log("[api/request] Résultat de l'envoi d'email à l'administrateur:", adminEmailResult)

    // Si l'email du client est fourni, lui envoyer une confirmation
    if (data.email) {
      // Obtenir l'URL de base pour les liens dans l'email
      const baseUrl = process.env.EMAIL_BASE_URL || `${request.headers.get("origin") || ""}`

      // Préparer l'email pour le client
      const clientEmailTemplate = createClientReservationTemplate(
        {
          id: reservationId,
          name: data.name,
          date: data.date || "Non spécifié",
          time: data.time || "Non spécifié",
          pickup: data.pickup,
          destination: data.dropoff,
          passengers: data.passengers || "Non spécifié",
        },
        baseUrl,
      )

      // Envoyer l'email au client
      const clientEmailResult = await sendEmail({
        to: data.email,
        subject: "Confirmation de votre demande de réservation - Taxi Dumoulin",
        text: `Bonjour ${data.name}, nous avons bien reçu votre demande de réservation et nous vous remercions de votre confiance.`,
        html: clientEmailTemplate,
      })

      console.log("[api/request] Résultat de l'envoi d'email au client:", clientEmailResult)
    }

    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: "Votre demande a été enregistrée avec succès",
      reservation: savedReservation,
    })
  } catch (error) {
    console.error("[api/request] Erreur dans la route /api/request:", error)
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
