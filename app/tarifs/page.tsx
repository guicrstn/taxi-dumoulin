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
        url: "/images/taxi-tarifs-bg.png",
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
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
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
        <div className="container relative z-10 py-12 md:py-16 lg:py-24 px-4">
          <div className="max-w-2xl space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">Nos Tarifs</h1>
            <p className="text-lg md:text-xl text-gray-200">
              Des tarifs transparents et sans surprise pour tous vos déplacements.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Tarifs standard</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Tarifs réglementés applicables pour vos courses de taxi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs md:text-sm">Type de tarif</TableHead>
                        <TableHead className="text-xs md:text-sm">Description</TableHead>
                        <TableHead className="text-right text-xs md:text-sm">Prix</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-xs md:text-sm">Prise en charge</TableCell>
                        <TableCell className="text-xs md:text-sm">Tarif de base pour toute course</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">2,50 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs md:text-sm">Tarif A (jour)</TableCell>
                        <TableCell className="text-xs md:text-sm">Tarif kilométrique de jour (8h-19h)</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">1,10 €/km</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs md:text-sm">Tarif B (nuit)</TableCell>
                        <TableCell className="text-xs md:text-sm">Tarif kilométrique de nuit (19h-8h)</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">1,50 €/km</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs md:text-sm">Tarif horaire</TableCell>
                        <TableCell className="text-xs md:text-sm">Tarif d'attente ou de marche lente</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">30 €/h</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-xs md:text-sm">Bagage</TableCell>
                        <TableCell className="text-xs md:text-sm">Supplément par bagage volumineux</TableCell>
                        <TableCell className="text-right text-xs md:text-sm">2,00 €</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex gap-2 md:gap-3">
                  <Info className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm text-yellow-800">
                    <p className="font-medium">Information importante</p>
                    <p>
                      Les tarifs sont réglementés et peuvent varier selon les conditions (jours fériés, etc.). Le prix
                      final est calculé par le compteur horokilométrique.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-bold">Transport médical conventionné</h2>
              <p className="text-gray-600 text-sm md:text-base">
                Pour les transports médicaux conventionnés, sur prescription médicale, vos déplacements peuvent être
                pris en charge par l'assurance maladie. Contactez-nous pour plus d'informations sur les conditions de
                prise en charge.
              </p>

              <div className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2 text-sm md:text-base">
                  Documents nécessaires pour le transport conventionné :
                </h3>
                <ul className="list-disc pl-4 md:pl-5 text-green-800 space-y-1 text-xs md:text-sm">
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
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Besoin d'un devis personnalisé ?</h2>
            <p className="text-base md:text-lg text-gray-600">
              Contactez-nous pour obtenir un devis adapté à vos besoins spécifiques de transport.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
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
