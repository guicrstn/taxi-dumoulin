import { NextResponse } from "next/server"
import { getReservationById, updateReservationStatus } from "@/app/admin/lib/reservations"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // Récupérer l'ID et l'action depuis les paramètres d'URL
    const url = new URL(request.url)
    const { searchParams } = url
    const id = searchParams.get("id")
    const action = searchParams.get("action")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de réservation manquant",
        },
        { status: 400 },
      )
    }

    if (!action || (action !== "accept" && action !== "reject")) {
      return NextResponse.json(
        {
          success: false,
          message: "Action invalide. Utilisez 'accept' ou 'reject'",
        },
        { status: 400 },
      )
    }

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

    // Mettre à jour le statut
    const status = action === "accept" ? "accepted" : "rejected"
    const adminNotes = "Test de mise à jour via l'API de débogage"

    const updatedReservation = await updateReservationStatus(id, status, adminNotes)

    // Vérifier le fichier de données
    const dataDir = path.join(process.cwd(), "data")
    const dataFilePath = path.join(dataDir, "reservations.json")

    let fileStats = null
    let fileContent = null

    if (fs.existsSync(dataFilePath)) {
      fileStats = fs.statSync(dataFilePath)
      // Lire seulement si le fichier n'est pas trop grand
      if (fileStats.size < 1000000) {
        fileContent = JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
      }
    }

    return NextResponse.json({
      success: !!updatedReservation,
      message: updatedReservation
        ? `Réservation ${status === "accepted" ? "acceptée" : "refusée"} avec succès`
        : "Échec de la mise à jour",
      originalReservation: reservation,
      updatedReservation: updatedReservation,
      fileInfo: {
        exists: fs.existsSync(dataFilePath),
        stats: fileStats,
        path: dataFilePath,
      },
      reservationsCount: fileContent ? fileContent.length : null,
      updatedReservationInFile: fileContent ? fileContent.find((r: any) => r.id === id) : null,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du test de mise à jour",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
