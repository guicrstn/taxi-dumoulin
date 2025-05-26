import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image src="/logo.JPG" alt="Taxi Dumoulin" width={160} height={60} className="mb-4" />
            <p className="text-gray-400 mb-4">
              Service de taxi conventionné dans l'Ain, disponible 7j/7 pour tous vos déplacements.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Nos services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Transport médical
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Gares et aéroports
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Longue distance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Transport de colis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="text-gray-400 hover:text-white">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/rendez-vous" className="text-gray-400 hover:text-white">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <Link href="tel:0474751078" className="text-gray-400 hover:text-white">
                    04 74 75 10 78
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <Link href="mailto:dumoulin.taxi@orange.fr" className="text-gray-400 hover:text-white">
                    dumoulin.taxi@orange.fr
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-400">7 route Genève, 01130 Nantua</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-gray-400">Disponible 24h/24, 7j/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taxi Dumoulin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
