import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin, Phone, Calendar, Car, Briefcase, Hospital } from "lucide-react"
import ScrollRevealSection from "@/components/scroll-reveal-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/taxi-hero-bg.png"
            alt="Taxi en service"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-primary hover:bg-primary/90 text-white">Taxi Conventionné</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Votre service de taxi de confiance
            </h1>
            <p className="text-xl text-gray-200">
              Transport médical, aéroport, gare et longue distance. Disponible 7j/7 pour tous vos déplacements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/rendez-vous">Réserver maintenant</Link>
              </Button>
              <div className="relative group">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <a href="tel:0474751078" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      04 74 75 10 78
                    </a>
                    <a href="tel:0474750253" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      04 74 75 02 53
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Avec révélation uniquement au défilement de la molette */}
      <ScrollRevealSection className="py-16 bg-white" onlyOnScroll={false}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Nos Services</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Nous proposons une gamme complète de services de transport pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <Hospital className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Transport médical</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Transport conventionné pour vos rendez-vous médicaux. Prise en charge par l'assurance maladie avec
                  prescription médicale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Transport professionnel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Service de transport pour vos déplacements professionnels. Ponctualité et confort garantis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Car className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Longue distance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Transport pour vos trajets longue distance. Tarifs fixes et transparents.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </ScrollRevealSection>

      {/* Why Choose Us - Avec révélation au défilement */}
      <ScrollRevealSection className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Pourquoi nous choisir</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Notre engagement est de vous offrir un service de qualité, fiable et professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollRevealSection delay={100}>
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="font-medium text-lg mb-2">Conventionné</h3>
                <p className="text-gray-600">
                  Transport médical pris en charge par l'assurance maladie avec prescription.
                </p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-2">Disponible 7j/7</h3>
                <p className="text-gray-600">Service disponible tous les jours de la semaine pour vos déplacements.</p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={300}>
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-2">Toutes distances</h3>
                <p className="text-gray-600">Transport local et longue distance pour tous vos besoins.</p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection delay={400}>
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-2">Réservation facile</h3>
                <p className="text-gray-600">Réservez en ligne ou par téléphone selon votre préférence.</p>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </ScrollRevealSection>

      {/* CTA Section - Avec révélation au défilement */}
      <ScrollRevealSection className="py-16 bg-primary text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold">Besoin d'un taxi ?</h2>
              <p className="mt-4 text-lg">
                Réservez dès maintenant ou appelez-nous pour un service immédiat. Nous sommes disponibles 7j/7 pour tous
                vos déplacements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/rendez-vous">Réserver en ligne</Link>
              </Button>
              <div className="relative group">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <a href="tel:0474751078" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      04 74 75 10 78
                    </a>
                    <a href="tel:0474750253" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      04 74 75 02 53
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
    </div>
  )
}
