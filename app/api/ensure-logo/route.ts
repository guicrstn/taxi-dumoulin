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

    // Vérifier que le fichier a bien été copié
    if (!fs.existsSync(destPath)) {
      return NextResponse.json(
        {
          success: false,
          message: "Échec de la copie du fichier",
          sourcePath,
          destPath,
        },
        { status: 500 },
      )
    }

    // Vérifier les permissions du fichier
    try {
      const stats = fs.statSync(destPath)
      const permissions = stats.mode & 0o777 // Extraire les permissions

      return NextResponse.json({
        success: true,
        message: "Logo copié avec succès",
        sourcePath,
        destPath,
        url: "/logo.png",
        fileExists: true,
        fileSize: stats.size,
        permissions: permissions.toString(8), // Afficher en octal
        lastModified: stats.mtime,
      })
    } catch (statError: any) {
      return NextResponse.json({
        success: true,
        message: "Logo copié mais erreur lors de la vérification",
        error: statError.message,
        sourcePath,
        destPath,
        url: "/logo.png",
      })
    }
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
