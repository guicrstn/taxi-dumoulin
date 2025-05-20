import { NextResponse } from "next/server"
import { getAllClients, createClient } from "@/app/admin/lib/clients"

// GET - Récupérer tous les clients
export async function GET() {
  try {
    const clients = await getAllClients()
    return NextResponse.json({
      success: true,
      clients,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des clients",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

// POST - Créer un nouveau client
export async function POST(request: Request) {
  try {
    console.log("[API] POST /api/clients - Début de la requête")

    const data = await request.json()
    console.log("[API] Données reçues:", data)

    const { name, email, phone, address } = data

    // Validation des données
    if (!name || !email || !phone) {
      console.log("[API] Validation échouée: données manquantes")
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez fournir un nom, un email et un numéro de téléphone",
        },
        { status: 400 },
      )
    }

    // Créer le client
    console.log("[API] Création du client...")
    const newClient = await createClient({
      name,
      email,
      phone,
      address: address || "",
    })

    console.log("[API] Client créé avec succès:", newClient.id)
    return NextResponse.json({
      success: true,
      message: "Client créé avec succès",
      client: newClient,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error("[API] Erreur lors de la création du client:", {
      message: errorMessage,
      stack: errorStack,
    })

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création du client",
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    )
  }
}
