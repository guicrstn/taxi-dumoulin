import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // Chemin source du logo
    const sourcePath = path.join(process.cwd(), "public", "images", "taxi-dumoulin-logo.png")

    // Chemin de destination (racine public)
    const destPath = path.join(process.cwd(), "public", "logo.png")

    // Vérifier si le fichier source existe
    if (!fs.existsSync(sourcePath)) {
      return NextResponse.json(
        {
          success: false,
          message: "Le fichier source n'existe pas",
          sourcePath,
        },
        { status: 404 },
      )
    }

    // Copier le fichier
    fs.copyFileSync(sourcePath, destPath)

    return NextResponse.json({
      success: true,
      message: "Logo copié avec succès",
      sourcePath,
      destPath,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la copie du logo",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
