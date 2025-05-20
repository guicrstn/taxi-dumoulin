import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  try {
    // Vérifier les permissions et l'existence des répertoires
    const rootDir = process.cwd()
    const dataDir = path.join(rootDir, "data")

    // Créer le répertoire data s'il n'existe pas
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Tester l'écriture dans le répertoire data
    const testFile = path.join(dataDir, "test-write.txt")
    fs.writeFileSync(testFile, "Test d'écriture: " + new Date().toISOString(), "utf8")

    // Lister les fichiers dans le répertoire data
    const files = fs.existsSync(dataDir) ? fs.readdirSync(dataDir) : []

    // Vérifier les fichiers clients.json et reservations.json
    const clientsFile = path.join(dataDir, "clients.json")
    const reservationsFile = path.join(dataDir, "reservations.json")

    const clientsFileExists = fs.existsSync(clientsFile)
    const reservationsFileExists = fs.existsSync(reservationsFile)

    // Créer les fichiers s'ils n'existent pas
    if (!clientsFileExists) {
      fs.writeFileSync(clientsFile, JSON.stringify([]), "utf8")
    }

    if (!reservationsFileExists) {
      fs.writeFileSync(reservationsFile, JSON.stringify([]), "utf8")
    }

    return NextResponse.json({
      success: true,
      filesystem: {
        cwd: rootDir,
        dataDir: {
          path: dataDir,
          exists: fs.existsSync(dataDir),
          isDirectory: fs.existsSync(dataDir) ? fs.statSync(dataDir).isDirectory() : false,
          writable: true, // Si on a pu écrire le fichier test, c'est que c'est writable
          files: files,
        },
        clientsFile: {
          path: clientsFile,
          exists: fs.existsSync(clientsFile),
          size: fs.existsSync(clientsFile) ? fs.statSync(clientsFile).size : 0,
          content: fs.existsSync(clientsFile) ? fs.readFileSync(clientsFile, "utf8") : null,
        },
        reservationsFile: {
          path: reservationsFile,
          exists: fs.existsSync(reservationsFile),
          size: fs.existsSync(reservationsFile) ? fs.statSync(reservationsFile).size : 0,
        },
        testWrite: {
          path: testFile,
          success: fs.existsSync(testFile),
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du diagnostic du système de fichiers",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
