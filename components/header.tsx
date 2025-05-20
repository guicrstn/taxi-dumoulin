"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image src="/logo.JPG" alt="Taxi Dumoulin" width={140} height={50} />
          </Link>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-24">
              <Link href="/" className="text-gray-800 hover:text-blue-600 font-medium text-xl">
                Accueil
              </Link>
              <Link href="/services" className="text-gray-800 hover:text-blue-600 font-medium text-xl">
                Services
              </Link>
              <Link href="/tarifs" className="text-gray-800 hover:text-blue-600 font-medium text-xl">
                Tarifs
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-blue-600 font-medium text-xl">
                Contact
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Numéros de téléphone (visible uniquement sur desktop) */}
            <div className="hidden md:flex flex-col md:flex-row items-center space-x-4">
              <Link href="tel:0474751078" className="flex items-center text-blue-600 font-bold">
                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                <span className="text-blue-600">04 74 75 10 78</span>
              </Link>
              <Link href="tel:0474750253" className="flex items-center text-blue-600 font-bold">
                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                <span className="text-blue-600">04 74 75 02 53</span>
              </Link>
            </div>

            {/* Bouton Réserver (visible sur tous les écrans) */}
            <Link href="/rendez-vous">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Réserver</Button>
            </Link>

            {/* Bouton menu hamburger pour mobile */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
              aria-label="Menu principal"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/tarifs"
                className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 py-2">
                <Link href="tel:0474751078" className="flex items-center text-blue-600 font-bold">
                  <Phone className="mr-2 h-5 w-5 text-blue-600" />
                  <span>04 74 75 10 78</span>
                </Link>
                <Link href="tel:0474750253" className="flex items-center text-blue-600 font-bold">
                  <Phone className="mr-2 h-5 w-5 text-blue-600" />
                  <span>04 74 75 02 53</span>
                </Link>
              </div>
              <Link href="/rendez-vous" className="py-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Réserver</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
