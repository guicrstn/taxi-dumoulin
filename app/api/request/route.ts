import { NextResponse } from "next/server"
import { getAllReservations, createReservation } from "@/app/admin/lib/reservations" // Updated import

export async function GET() {
  try {
    const reservations = await getAllReservations()
    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reservationData = await request.json()
    const newReservation = await createReservation(reservationData)
    return NextResponse.json(newReservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}
