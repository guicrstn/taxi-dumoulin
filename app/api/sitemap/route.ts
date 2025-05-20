import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Lire le fichier sitemap.xml
    const filePath = path.join(process.cwd(), "public", "sitemap.xml")
    const sitemapContent = fs.readFileSync(filePath, "utf8")

    // Retourner le contenu avec le bon type MIME
    return new NextResponse(sitemapContent, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Erreur lors de la lecture du sitemap:", error)
    return new NextResponse("Erreur lors de la génération du sitemap", { status: 500 })
  }
}
