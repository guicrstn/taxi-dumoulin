import { type NextRequest, NextResponse } from "next/server"
import { getReservationById, updateReservationStatus } from "@/app/admin/lib/reservations"

export async function GET(request: NextRequest, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params

    if (action === "details") {
      const reservation = await getReservationById(id)
      if (!reservation) {
        return NextResponse.json({ message: "Reservation not found" }, { status: 404 })
      }
      return NextResponse.json(reservation)
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string; action: string } }) {
  try {
    const { id, action } = params
    const body = await request.json()

    if (action === "updateStatus") {
      const { status } = body

      if (!status) {
        return NextResponse.json({ message: "Status is required" }, { status: 400 })
      }

      const updatedReservation = await updateReservationStatus(id, status)

      if (!updatedReservation) {
        return NextResponse.json({ message: "Reservation not found" }, { status: 404 })
      }

      return NextResponse.json(updatedReservation)
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
