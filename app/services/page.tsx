import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hospital, Plane, Train, Briefcase, Car, Users, Clock, MapPin, Package } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/taxi-tarifs-bg.png"
            alt="Services de taxi"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container relative z-10 py-12 md:py-16 lg:py-24 px-4">
          <div className="max-w-2xl space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">Nos Services</h1>
            <p className="text-lg md:text-xl text-gray-200">
              Découvrez notre gamme complète de services de transport adaptés à tous vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Hospital className="h-6 w-6 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport médical conventionné</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Nous sommes conventionnés par l'assurance maladie pour vos transports médicaux. Sur prescription
                  médicale, vos déplacements peuvent être pris en charge.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Ponctualité garantie pour vos rendez-vous médicaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Transport vers tous établissements de santé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Accompagnement personnalisé et assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Plane className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport aéroport</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Service de transport vers et depuis tous les aéroports. Nous suivons les horaires des vols pour
                  assurer votre prise en charge à l'heure.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Suivi des horaires de vol en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Service pour tous les aéroports de la région</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Aide avec les bagages incluse</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Train className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport gare</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Service de transport vers et depuis toutes les gares. Nous assurons votre prise en charge à l'heure
                  pour vos déplacements en train.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Ponctualité garantie pour vos trains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Service pour toutes les gares de la région</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Aide avec les bagages incluse</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-purple-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport professionnel</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Service de transport pour vos déplacements professionnels. Nous garantissons ponctualité et confort
                  pour vos rendez-vous d'affaires.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Ponctualité garantie pour vos rendez-vous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Service pour toutes destinations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Véhicule confortable et bien équipé</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 md:h-8 md:w-8 text-red-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport longue distance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Service de transport pour vos trajets longue distance. Nous proposons des tarifs fixes et transparents
                  pour tous vos déplacements.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Tarifs fixes connus à l'avance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Service pour toute la France</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Confort optimal pour les longs trajets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 md:h-8 md:w-8 text-orange-500 flex-shrink-0" />
                  <CardTitle className="text-lg md:text-xl">Transport colis international</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Service de transport pour vos colis. Nous proposons des tarifs fixes et transparents pour vos envois
                  internationaux.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Tarifs fixes connus à l'avance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Service international</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Rapide, assuré, véhicule équipé</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Besoin d'un service de taxi ?</h2>
            <p className="text-base md:text-lg text-gray-600">
              Contactez-nous dès maintenant pour réserver votre course ou obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Demander un devis</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                <Link href="/rendez-vous">Réserver maintenant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
