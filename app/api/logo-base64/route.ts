import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Chemin vers le logo
    const logoPath = path.join(process.cwd(), "public", "images", "taxi-dumoulin-logo.png")

    // Vérifier si le fichier existe
    if (!fs.existsSync(logoPath)) {
      return NextResponse.json(
        {
          success: false,
          message: "Le fichier logo n'existe pas",
        },
        { status: 404 },
      )
    }

    // Lire le fichier
    const logoData = fs.readFileSync(logoPath)

    // Convertir en base64
    const base64Logo = Buffer.from(logoData).toString("base64")

    // Déterminer le type MIME
    const mimeType = "image/png" // Pour un fichier PNG

    // Créer l'URL data
    const dataUrl = `data:${mimeType};base64,${base64Logo}`

    return NextResponse.json({
      success: true,
      dataUrl,
      size: logoData.length,
    })
  } catch (error) {
    console.error("Erreur lors de la conversion du logo en base64:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la conversion du logo en base64",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
