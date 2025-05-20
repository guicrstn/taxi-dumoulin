import { NextResponse } from "next/server"
import { getReservationById, updateReservationStatus } from "@/app/admin/lib/reservations"

export async function GET(request: Request, { params }: { params: { id: string; action: string } }) {
  const { id, action } = params

  try {
    const reservation = await getReservationById(id)

    if (!reservation) {
      return new NextResponse(JSON.stringify({ message: "Reservation not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    let newStatus = reservation.status

    if (action === "confirm") {
      newStatus = "confirmed"
    } else if (action === "cancel") {
      newStatus = "cancelled"
    } else {
      return new NextResponse(JSON.stringify({ message: "Invalid action" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    if (reservation.status === newStatus) {
      return new NextResponse(JSON.stringify({ message: `Reservation already ${newStatus}` }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    await updateReservationStatus(id, newStatus)

    return new NextResponse(JSON.stringify({ message: `Reservation ${id} ${action}ed successfully` }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    console.error("Error processing reservation action:", error)
    return new NextResponse(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
