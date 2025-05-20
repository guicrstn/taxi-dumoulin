import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contactez-nous</h1>
            <p className="text-xl text-gray-200">
              Nous sommes à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Téléphone</h3>
                        <p className="text-gray-600 mb-2">Disponible 7j/7</p>
                        <a href="tel:+33474751078" className="text-primary hover:underline font-medium">
                        04 74 75 10 78
                        </a><br></br>
                        <a href="tel:+33474750253" className="text-primary hover:underline font-medium">
                        04 74 75 02 53
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Email</h3>
                        <p className="text-gray-600 mb-2">Réponse sous 24h</p>
                        <a
                          href="mailto:contact@taxi-conventionne.fr"
                          className="text-primary hover:underline font-medium"
                        >
                          dumoulin.taxi@orange.fr
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Adresse</h3>
                        <p className="text-gray-600 mb-2">Siège social</p>
                        <address className="not-italic text-gray-800">
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
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Horaires</h3>
                        <p className="text-gray-600 mb-2">Service de taxi</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
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
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Besoin d'un taxi rapidement ?</h2>
            <p className="text-xl">Réservez directement en ligne ou appelez-nous pour un service immédiat.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/rendez-vous">Réserver en ligne</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="tel:+33600000000">
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
