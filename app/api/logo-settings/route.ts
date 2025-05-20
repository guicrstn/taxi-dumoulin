import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Chemin du fichier de configuration
const configPath = path.join(process.cwd(), "config")
const logoConfigPath = path.join(configPath, "logo-config.json")

// Fonction pour s'assurer que le répertoire de configuration existe
const ensureConfigDir = () => {
  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath, { recursive: true })
  }
}

// Fonction pour lire la configuration du logo
const readLogoConfig = () => {
  ensureConfigDir()

  if (!fs.existsSync(logoConfigPath)) {
    // Configuration par défaut
    const defaultConfig = {
      logoUrl: "/images/taxi-dumoulin-logo.png",
      absoluteLogoUrl: "",
      lastUpdated: new Date().toISOString(),
    }

    fs.writeFileSync(logoConfigPath, JSON.stringify(defaultConfig, null, 2))
    return defaultConfig
  }

  try {
    const configData = fs.readFileSync(logoConfigPath, "utf-8")
    return JSON.parse(configData)
  } catch (error) {
    console.error("Erreur lors de la lecture de la configuration du logo:", error)
    return {
      logoUrl: "/images/taxi-dumoulin-logo.png",
      absoluteLogoUrl: "",
      lastUpdated: new Date().toISOString(),
    }
  }
}

// Fonction pour écrire la configuration du logo
const writeLogoConfig = (config: any) => {
  ensureConfigDir()

  try {
    fs.writeFileSync(
      logoConfigPath,
      JSON.stringify(
        {
          ...config,
          lastUpdated: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
    return true
  } catch (error) {
    console.error("Erreur lors de l'écriture de la configuration du logo:", error)
    return false
  }
}

// Route GET pour récupérer la configuration du logo
export async function GET() {
  try {
    const config = readLogoConfig()

    return NextResponse.json({
      success: true,
      logoUrl: config.logoUrl,
      absoluteLogoUrl: config.absoluteLogoUrl,
      lastUpdated: config.lastUpdated,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération de la configuration du logo:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération de la configuration du logo" },
      { status: 500 },
    )
  }
}

// Route POST pour mettre à jour la configuration du logo
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation des données
    if (!data.logoUrl && !data.absoluteLogoUrl) {
      return NextResponse.json(
        { success: false, message: "Au moins un des paramètres logoUrl ou absoluteLogoUrl doit être fourni" },
        { status: 400 },
      )
    }

    // Lire la configuration actuelle
    const currentConfig = readLogoConfig()

    // Mettre à jour la configuration
    const newConfig = {
      ...currentConfig,
      ...(data.logoUrl && { logoUrl: data.logoUrl }),
      ...(data.absoluteLogoUrl && { absoluteLogoUrl: data.absoluteLogoUrl }),
    }

    // Écrire la nouvelle configuration
    const success = writeLogoConfig(newConfig)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Configuration du logo mise à jour avec succès",
        config: newConfig,
      })
    } else {
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'écriture de la configuration du logo" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la configuration du logo:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour de la configuration du logo" },
      { status: 500 },
    )
  }
}
