import fs from "fs"
import path from "path"

// Chemin vers le fichier de configuration
const CONFIG_FILE = path.join(process.cwd(), "data", "email-config.json")

// Fonction pour s'assurer que le répertoire data existe
export function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction pour lire la configuration
export async function readConfig() {
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
export async function writeConfig(config: any) {
  ensureDataDirectoryExists()
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8")
}

// Assurons-nous que la fonction getFullUrl est correctement implémentée pour générer des URLs absolues

// Fonction pour obtenir l'URL complète
export async function getFullUrl(path: string): Promise<string> {
  const config = await readConfig()

  if (config.baseUrl) {
    // S'assurer que l'URL de base se termine par un slash
    const baseWithSlash = config.baseUrl.endsWith("/") ? config.baseUrl : `${config.baseUrl}/`
    // S'assurer que le chemin ne commence pas par un slash pour éviter les doubles slashes
    const cleanPath = path.startsWith("/") ? path.substring(1) : path
    return `${baseWithSlash}${cleanPath}`
  }

  // Si aucune URL de base n'est configurée, retourner un chemin relatif
  return path
}
