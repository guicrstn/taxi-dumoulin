export const metadata = {
  title: "Contact | Taxi Conventionné dans l'Ain",
  description:
    "Contactez Taxi Dumoulin pour vos réservations et demandes d'information. Service disponible 7j/7 dans l'Ain.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Taxi Conventionné dans l'Ain",
    description:
      "Contactez Taxi Dumoulin pour vos réservations et demandes d'information. Service disponible 7j/7 dans l'Ain.",
    url: "/contact",
    images: [
      {
        url: "/images/taxi-hero-bg.png",
        width: 800,
        height: 600,
        alt: "Contact Taxi Dumoulin",
      },
    ],
  },
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/taxi-contact-bg.png"
            alt="Contact taxi"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container relative z-10 py-12 md:py-16 lg:py-24 px-4">
          <div className="max-w-2xl space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">Contactez-nous</h1>
            <p className="text-lg md:text-xl text-gray-200">
              Nous sommes à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Informations de contact</h2>

              <div className="grid gap-4 md:gap-6">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-base md:text-lg">Téléphone</h3>
                        <p className="text-gray-600 mb-2 text-sm md:text-base">Disponible 7j/7</p>
                        <a
                          href="tel:+33474751078"
                          className="text-primary hover:underline font-medium text-sm md:text-base"
                        >
                          04 74 75 10 78
                        </a>
                        <br />
                        <a
                          href="tel:+33474750253"
                          className="text-primary hover:underline font-medium text-sm md:text-base"
                        >
                          04 74 75 02 53
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-base md:text-lg">Email</h3>
                        <p className="text-gray-600 mb-2 text-sm md:text-base">Réponse sous 24h</p>
                        <a
                          href="mailto:dumoulin.taxi@orange.fr"
                          className="text-primary hover:underline font-medium text-sm md:text-base break-all"
                        >
                          dumoulin.taxi@orange.fr
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-base md:text-lg">Adresse</h3>
                        <p className="text-gray-600 mb-2 text-sm md:text-base">Siège social</p>
                        <address className="not-italic text-gray-800 text-sm md:text-base">
                          7 route de Genève
                          <br />
                          01130 Nantua
                          <br />
                          France
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-base md:text-lg">Horaires</h3>
                        <p className="text-gray-600 mb-2 text-sm md:text-base">Service de taxi</p>
                        <div className="grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-1 text-xs md:text-sm">
                          <div className="text-gray-800">Lundi - Vendredi:</div>
                          <div className="text-gray-800">24h/24</div>
                          <div className="text-gray-800">Samedi:</div>
                          <div className="text-gray-800">24h/24</div>
                          <div className="text-gray-800">Dimanche:</div>
                          <div className="text-gray-800">24h/24</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Besoin d'un taxi rapidement ?</h2>
            <p className="text-lg md:text-xl">
              Réservez directement en ligne ou appelez-nous pour un service immédiat.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/rendez-vous">Réserver en ligne</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="tel:+33474751078">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler maintenant
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
