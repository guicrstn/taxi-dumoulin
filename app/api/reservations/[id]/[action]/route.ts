import { NextResponse } from "next/server"
import { approveReservation, rejectReservation } from "@/app/admin/lib/reservations"

export async function POST(request: Request, { params }: { params: { id: string; action: string } }) {
  const { id, action } = params

  if (action === "approve") {
    try {
      await approveReservation(id)
      return NextResponse.json({ message: "Reservation approved" }, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  } else if (action === "reject") {
    try {
      await rejectReservation(id)
      return NextResponse.json({ message: "Reservation rejected" }, { status: 200 })
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  }
}
