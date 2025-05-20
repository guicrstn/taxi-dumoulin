import { NextResponse } from "next/server"
import { getReservationById } from "@/app/admin/lib/reservations"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = (await params).id

    // Récupérer la réservation
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

    return NextResponse.json({
      success: true,
      reservation,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la récupération de la réservation",
      },
      { status: 500 },
    )
  }
}
