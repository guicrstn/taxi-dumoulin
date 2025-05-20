import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Chemin vers le fichier de configuration
const CONFIG_FILE = path.join(process.cwd(), "data", "email-config.json")

// Fonction pour s'assurer que le répertoire data existe
function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction pour lire la configuration
async function readConfig() {
  ensureDataDirectoryExists()

  if (!fs.existsSync(CONFIG_FILE)) {
    // Créer un fichier de configuration par défaut
    const defaultConfig = {
      baseUrl: "",
      lastUpdated: new Date().toISOString(),
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), "utf8")
    return defaultConfig
  }

  const data = fs.readFileSync(CONFIG_FILE, "utf8")
  return JSON.parse(data)
}

// Fonction pour écrire la configuration
async function writeConfig(config: any) {
  ensureDataDirectoryExists()
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8")
}

// GET - Récupérer l'URL de base actuelle
export async function GET() {
  try {
    const config = await readConfig()

    return NextResponse.json({
      success: true,
      baseUrl: config.baseUrl,
      lastUpdated: config.lastUpdated,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération de l'URL de base",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

// POST - Mettre à jour l'URL de base
export async function POST(request: Request) {
  try {
    const { baseUrl } = await request.json()

    // Valider l'URL
    if (baseUrl && !baseUrl.startsWith("http")) {
      return NextResponse.json(
        {
          success: false,
          message: "L'URL de base doit commencer par http:// ou https://",
        },
        { status: 400 },
      )
    }

    // Mettre à jour la configuration
    const config = await readConfig()
    config.baseUrl = baseUrl
    config.lastUpdated = new Date().toISOString()

    await writeConfig(config)

    return NextResponse.json({
      success: true,
      message: "URL de base mise à jour avec succès",
      baseUrl: config.baseUrl,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour de l'URL de base",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
