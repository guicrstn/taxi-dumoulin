import { NextResponse } from "next/server"
import { getAllClients, getClientById } from "@/app/admin/lib/clients"

export async function GET(request: Request) {
  try {
    // Récupérer l'ID depuis les paramètres d'URL
    const url = new URL(request.url)
    const { searchParams } = url
    const id = searchParams.get("id")

    // Récupérer tous les clients
    const clients = await getAllClients()

    if (id) {
      // Si un ID est fourni, essayer de trouver le client correspondant
      const client = await getClientById(id)

      return NextResponse.json({
        success: true,
        clientsCount: clients.length,
        requestedId: id,
        clientFound: !!client,
        client: client,
        allClientIds: clients.map((c) => c.id),
      })
    } else {
      // Sinon, renvoyer tous les clients
      return NextResponse.json({
        success: true,
        clientsCount: clients.length,
        clients: clients.map((client) => ({
          id: client.id,
          name: client.name,
          email: client.email,
        })),
      })
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des clients",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
