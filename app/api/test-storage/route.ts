import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { createReservation } from "@/app/admin/lib/reservations"

export async function GET(request: Request) {
  try {
    // Vérifier si le dossier data existe
    const dataDir = path.join(process.cwd(), "data")
    const dataFileExists = fs.existsSync(path.join(dataDir, "reservations.json"))

    // Créer une réservation de test
    const testReservation = await createReservation({
      name: "Test Client",
      email: "test@example.com",
      phone: "0123456789",
      pickup: "Test Pickup Location",
      dropoff: "Test Destination",
      date: "2023-05-20",
      passengers: "2",
      message: "This is a test reservation created via the test-storage API route.",
    })

    // Lire le contenu du fichier pour vérification
    let fileContent = "File not found"
    if (dataFileExists) {
      fileContent = fs.readFileSync(path.join(dataDir, "reservations.json"), "utf8")
    }

    return NextResponse.json({
      success: true,
      message: "Test storage route executed",
      dataDirectoryExists: fs.existsSync(dataDir),
      dataFileExists: dataFileExists,
      testReservation: testReservation,
      fileContent: fileContent ? "File has content" : "File is empty",
      filePath: path.join(dataDir, "reservations.json"),
      currentWorkingDirectory: process.cwd(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error in test storage route",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
