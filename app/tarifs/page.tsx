import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Info, Phone } from "lucide-react"
import SectionTitle from "@/components/section-title"

export default function TarifsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-100">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/taxi-tarifs-bg.png" alt="Tarifs taxi" fill className="object-cover" />
        </div>
        <div className="container relative z-10">
          <SectionTitle
            title="Nos Tarifs"
            description="Des tarifs transparents pour tous vos déplacements"
            textColor="text-gray-900"
          />
        </div>
      </section>

      {/* Tarifs standards */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Tarifs réglementés</h2>
              <p className="text-gray-600">
                Nos tarifs sont réglementés par la préfecture de l'Ain et sont calculés selon les critères suivants :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    Prise en charge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 mb-2">2,10 €</p>
                  <p className="text-gray-600">
                    Tarif de base appliqué au démarrage de la course, incluant les premiers mètres.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    Tarif kilométrique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">Tarif A : 1,03 € / km</p>
                      <p className="text-gray-600">Jour (7h à 19h)</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">Tarif B : 1,54 € / km</p>
                      <p className="text-gray-600">Nuit (19h à 7h), dimanches et jours fériés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    Tarif horaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-gray-900 mb-2">28,60 € / h</p>
                  <p className="text-gray-600">
                    Appliqué en cas d'attente demandée par le client ou de circulation très lente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    Suppléments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Bagage (par unité)</span>
                      <span className="font-bold">2,00 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>4ème personne</span>
                      <span className="font-bold">2,50 €</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Animal</span>
                      <span className="font-bold">2,00 €</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">Informations importantes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <p>
                    Les tarifs affichés sont donnés à titre indicatif et peuvent être soumis à des modifications selon
                    la réglementation préfectorale en vigueur.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <p>
                    Pour les trajets longue distance (au-delà de 50 km), un devis peut être établi avant la course. Le
                    prix est alors fixé forfaitairement.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <p>
                    Pour les transports médicaux conventionnés, la prise en charge par l'assurance maladie nécessite une
                    prescription médicale.
                  </p>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Pour obtenir un devis personnalisé ou des informations complémentaires sur nos tarifs, n'hésitez pas à
                nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/rendez-vous">Réserver maintenant</Link>
                </Button>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 border border-gray-300">
                  <Link href="tel:0474751078">
                    <span className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      04 74 75 10 78
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">Besoin d'un devis ?</h2>
              <p className="text-xl">
                Contactez-nous pour obtenir un devis personnalisé pour vos trajets longue distance ou vos besoins
                spécifiques.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/contact">Demander un devis</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="tel:0474751078">
                  <span className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    04 74 75 10 78
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
