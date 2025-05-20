import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Vérifier si le logo existe à la racine du dossier public
    const publicDir = path.join(process.cwd(), "public")
    const logoPath = path.join(publicDir, "logo.png")
    const originalLogoPath = path.join(publicDir, "images", "taxi-dumoulin-logo.png")

    // Si le logo n'existe pas à la racine, le copier depuis le dossier images
    if (!fs.existsSync(logoPath) && fs.existsSync(originalLogoPath)) {
      fs.copyFileSync(originalLogoPath, logoPath)
    }

    // Vérifier si la copie a réussi
    const success = fs.existsSync(logoPath)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Logo initialisé avec succès",
        logoPath: "/logo.png",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Impossible d'initialiser le logo",
          error: "Le fichier source n'existe pas ou la copie a échoué",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation du logo:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'initialisation du logo",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
