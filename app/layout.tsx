import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SchemaOrg from "@/components/schema-org"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Taxi Dumoulin - Service de taxi conventionné dans l'Ain",
    template: "%s | Taxi Dumoulin",
  },
  description:
    "Service de taxi conventionné disponible 7j/7 pour tous vos déplacements : transport médical, aéroport, gare et longue distance.",
  keywords: "taxi, Ain, transport médical, conventionné, aéroport, gare, Nantua",
  authors: [{ name: "Taxi Dumoulin" }],
  creator: "Taxi Dumoulin",
  publisher: "Taxi Dumoulin",
  // Mise à jour de l'URL de base pour utiliser le domaine au lieu de l'IP
  metadataBase: new URL(process.env.BASE_URL || "https://taxi-dumoulin.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taxi Dumoulin - Service de taxi conventionné dans l'Ain",
    description:
      "Service de taxi conventionné disponible 7j/7 pour tous vos déplacements : transport médical, aéroport, gare et longue distance.",
    // Mise à jour de l'URL pour utiliser le domaine au lieu de l'IP
    url: process.env.BASE_URL || "https://taxi-dumoulin.com",
    siteName: "Taxi Dumoulin",
    images: [
      {
        url: "/images/taxi-dumoulin-logo.png",
        width: 800,
        height: 600,
        alt: "Logo Taxi Dumoulin",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Dumoulin - Service de taxi conventionné dans l'Ain",
    description:
      "Service de taxi conventionné disponible 7j/7 pour tous vos déplacements : transport médical, aéroport, gare et longue distance.",
    images: ["/images/taxi-dumoulin-logo.png"],
  },
  // Ajout de la vérification Google Search Console avec votre code
  verification: {
    google: "nZJdvoSw-C70Y87hsYPsBMuCf-qoX5FMF33x3GYbVbQ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <SchemaOrg />
      </body>
    </html>
  )
}
