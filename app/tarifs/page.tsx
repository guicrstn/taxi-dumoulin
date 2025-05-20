export const metadata = {
  title: "Nos Tarifs | Taxi Conventionné dans l'Ain",
  description:
    "Consultez nos tarifs standard pour tous vos déplacements en taxi et informations sur le transport médical conventionné.",
  alternates: {
    canonical: "/tarifs",
  },
  openGraph: {
    title: "Nos Tarifs | Taxi Conventionné dans l'Ain",
    description:
      "Consultez nos tarifs standard pour tous vos déplacements en taxi et informations sur le transport médical conventionné.",
    url: "/tarifs",
    images: [
      {
        url: "/taxi-services-bg.png",
        width: 800,
        height: 600,
        alt: "Tarifs de Taxi Dumoulin",
      },
    ],
  },
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Info } from "lucide-react"

export default function TarifsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/taxi-services-bg.png"
            alt="Tarifs taxi"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Nos Tarifs</h1>
            <p className="text-xl text-gray-200">
              Des tarifs transparents et sans surprise pour tous vos déplacements.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Tarifs standard</CardTitle>
                <CardDescription>Tarifs réglementés applicables pour vos courses de taxi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type de tarif</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Prix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Prise en charge</TableCell>
                      <TableCell>Tarif de base pour toute course</TableCell>
                      <TableCell className="text-right">2,50 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tarif A (jour)</TableCell>
                      <TableCell>Tarif kilométrique de jour (8h-19h)</TableCell>
                      <TableCell className="text-right">1,10 €/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tarif B (nuit)</TableCell>
                      <TableCell>Tarif kilométrique de nuit (19h-8h)</TableCell>
                      <TableCell className="text-right">1,50 €/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tarif horaire</TableCell>
                      <TableCell>Tarif d'attente ou de marche lente</TableCell>
                      <TableCell className="text-right">30 €/h</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bagage</TableCell>
                      <TableCell>Supplément par bagage volumineux</TableCell>
                      <TableCell className="text-right">2,00 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex gap-3">
                  <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Information importante</p>
                    <p>
                      Les tarifs sont réglementés et peuvent varier selon les conditions (jours fériés, etc.). Le prix
                      final est calculé par le compteur horokilométrique.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">Transport médical conventionné</h2>
              <p className="text-gray-600">
                Pour les transports médicaux conventionnés, sur prescription médicale, vos déplacements peuvent être
                pris en charge par l'assurance maladie. Contactez-nous pour plus d'informations sur les conditions de
                prise en charge.
              </p>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">
                  Documents nécessaires pour le transport conventionné :
                </h3>
                <ul className="list-disc pl-5 text-green-800 space-y-1">
                  <li>Prescription médicale de transport</li>
                  <li>Carte Vitale</li>
                  <li>Carte de mutuelle (si applicable)</li>
                  <li>Attestation de droits à jour</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Besoin d'un devis personnalisé ?</h2>
            <p className="text-lg text-gray-600">
              Contactez-nous pour obtenir un devis adapté à vos besoins spécifiques de transport.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Demander un devis</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/rendez-vous">Réserver maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
