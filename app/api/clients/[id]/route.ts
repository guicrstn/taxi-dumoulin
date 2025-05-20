import { NextResponse } from "next/server"
import { getClientById, updateClient, deleteClient } from "@/app/admin/lib/clients"

// GET - Récupérer un client par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = decodeURIComponent(params.id)
    console.log(`[API] GET /api/clients/${id}`)

    const client = await getClientById(id)

    if (!client) {
      console.log(`[API] Client non trouvé: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Client non trouvé",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      client,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[API] Erreur GET /api/clients/${params.id}:`, errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération du client",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

// PUT - Mettre à jour un client
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = decodeURIComponent(params.id)
    console.log(`[API] PUT /api/clients/${id}`)

    const data = await request.json()
    const { name, email, phone, address } = data

    // Validation des données
    if (!name && !email && !phone && !address) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucune donnée fournie pour la mise à jour",
        },
        { status: 400 },
      )
    }

    // Mettre à jour le client
    const updatedClient = await updateClient(id, {
      name,
      email,
      phone,
      address,
    })

    if (!updatedClient) {
      console.log(`[API] Client non trouvé pour mise à jour: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Client non trouvé",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Client mis à jour avec succès",
      client: updatedClient,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[API] Erreur PUT /api/clients/${params.id}:`, errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour du client",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

// DELETE - Supprimer un client
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = decodeURIComponent(params.id)
    console.log(`[API] DELETE /api/clients/${id}`)

    // Vérifier d'abord si le client existe
    const client = await getClientById(id)
    if (!client) {
      console.log(`[API] Client non trouvé pour suppression: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Client non trouvé",
          requestedId: id,
        },
        { status: 404 },
      )
    }

    console.log(`[API] Client trouvé, tentative de suppression: ${client.id} (${client.name})`)

    const success = await deleteClient(id)

    if (!success) {
      console.log(`[API] Échec de la suppression du client: ${id}`)
      return NextResponse.json(
        {
          success: false,
          message: "Échec de la suppression du client",
        },
        { status: 500 },
      )
    }

    console.log(`[API] Client supprimé avec succès: ${id}`)
    return NextResponse.json({
      success: true,
      message: "Client supprimé avec succès",
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[API] Erreur DELETE /api/clients/${params.id}:`, errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression du client",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
