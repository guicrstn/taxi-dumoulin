import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, CheckCircle } from "lucide-react"
import SectionTitle from "@/components/section-title"

export const metadata = {
  title: "Nos Services de Transport | Taxi Conventionné",
  description:
    "Découvrez nos services de transport médical conventionné, transferts aéroport/gare et longue distance. Disponible 7j/7 dans l'Ain.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Nos Services de Transport | Taxi Conventionné",
    description:
      "Découvrez nos services de transport médical conventionné, transferts aéroport/gare et longue distance. Disponible 7j/7 dans l'Ain.",
    url: "/services",
    images: [
      {
        url: "/images/taxi-services.png",
        width: 800,
        height: 600,
        alt: "Services de Taxi Dumoulin",
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-100">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/images/taxi-services-bg.png" alt="Services de taxi" fill className="object-cover" />
        </div>
        <div className="container relative z-10">
          <SectionTitle
            title="Nos Services"
            description="Découvrez notre gamme complète de services de transport adaptés à tous vos besoins."
            textColor="text-gray-900"
          />
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-12">
            {/* Transport médical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-4">Transport médical conventionné</h3>
                <p className="text-gray-600 mb-6">
                  Nous sommes conventionnés par l'assurance maladie pour vos transports médicaux. Sur prescription
                  médicale, vos déplacements peuvent être pris en charge.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Ponctualité garantie pour vos rendez-vous médicaux</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Transport vers tous établissements de santé</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Accompagnement personnalisé et assistance</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="/images/medical-transport.png"
                  alt="Transport médical"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Transport aéroport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/airport-transport.png"
                  alt="Transport aéroport"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Transport aéroport</h3>
                <p className="text-gray-600 mb-6">
                  Service de transport vers et depuis tous les aéroports. Nous suivons les horaires des vols pour
                  assurer votre prise en charge à l'heure.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Suivi des horaires de vol en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Service pour tous les aéroports de la région</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Aide avec les bagages incluse</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Transport gare */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-4">Transport gare</h3>
                <p className="text-gray-600 mb-6">
                  Service de transport vers et depuis toutes les gares. Nous vous accompagnons jusqu'à votre train ou
                  vous attendons à votre arrivée.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Ponctualité garantie pour vos départs et arrivées</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Service pour toutes les gares de la région</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Assistance avec vos bagages</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="/images/train-station-transport.png"
                  alt="Transport gare"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Transport professionnel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/business-transport.png"
                  alt="Transport professionnel"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Transport professionnel</h3>
                <p className="text-gray-600 mb-6">
                  Service de transport pour vos déplacements professionnels. Ponctualité et confort garantis pour vos
                  rendez-vous d'affaires.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Ponctualité garantie pour vos rendez-vous professionnels</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Service pour tous vos déplacements d'affaires</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span>Confort et discrétion assurés</span>
                  </li>
                </ul>
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
              <h2 className="text-4xl font-bold mb-4">Besoin d'un taxi ?</h2>
              <p className="text-xl">
                Réservez dès maintenant ou appelez-nous pour un service immédiat. Nous sommes disponibles 7j/7 pour tous
                vos déplacements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/rendez-vous">Réserver en ligne</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="tel:+33474751078">04 74 75 10 78</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
