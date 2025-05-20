import { NextResponse } from "next/server"
import { getReservationById, deleteReservation } from "@/app/admin/lib/reservations"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    console.log(`[deleteReservation API] Suppression de la réservation ${id}`)

    // Vérifier que la réservation existe
    const reservation = await getReservationById(id)
    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "Réservation non trouvée",
        },
        { status: 404 },
      )
    }

    // Supprimer la réservation
    const success = await deleteReservation(id)
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur lors de la suppression de la réservation",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Réservation supprimée avec succès",
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[deleteReservation API] Error:", errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la suppression de la réservation",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
