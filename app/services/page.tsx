import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hospital, Plane, Train, Briefcase, Car, Users, Clock, MapPin } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/taxi-services-bg.png"
            alt="Services de taxi"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Nos Services</h1>
            <p className="text-xl text-gray-200">
              Découvrez notre gamme complète de services de transport adaptés à tous vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Hospital className="h-8 w-8 text-blue-500" />
                  <CardTitle>Transport médical conventionné</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nous sommes conventionnés par l'assurance maladie pour vos transports médicaux. Sur prescription
                  médicale, vos déplacements peuvent être pris en charge.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ponctualité garantie pour vos rendez-vous médicaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Transport vers tous établissements de santé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Accompagnement personnalisé et assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Plane className="h-8 w-8 text-yellow-500" />
                  <CardTitle>Transport aéroport</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Service de transport vers et depuis tous les aéroports. Nous suivons les horaires des vols pour
                  assurer votre prise en charge à l'heure.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Suivi des horaires de vol en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service pour tous les aéroports de la région</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Aide avec les bagages incluse</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Train className="h-8 w-8 text-green-500" />
                  <CardTitle>Transport gare</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Service de transport vers et depuis toutes les gares. Nous assurons votre prise en charge à l'heure
                  pour vos déplacements en train.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ponctualité garantie pour vos trains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service pour toutes les gares de la région</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Aide avec les bagages incluse</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-purple-500" />
                  <CardTitle>Transport professionnel</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Service de transport pour vos déplacements professionnels. Nous garantissons ponctualité et confort
                  pour vos rendez-vous d'affaires.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ponctualité garantie pour vos rendez-vous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service pour toutes destinations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Véhicules confortables et bien équipés</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Car className="h-8 w-8 text-red-500" />
                  <CardTitle>Transport longue distance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Service de transport pour vos trajets longue distance. Nous proposons des tarifs fixes et transparents
                  pour tous vos déplacements.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Tarifs fixes connus à l'avance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service international</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Confort optimal pour les longs trajets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
              <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Car className="h-8 w-8 text-orange-500" />
                  <CardTitle>Transport de colis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Service de transport colis toutes distance. Nous proposons des tarifs fixes et transparents.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Tarifs fixes connus à l'avance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service international</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Rapidité assurée, service professionnel, véhicule adapté</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Besoin d'un service de taxi ?</h2>
            <p className="text-lg text-gray-600">
              Contactez-nous dès maintenant pour réserver votre course ou obtenir un devis personnalisé.
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
