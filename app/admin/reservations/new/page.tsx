import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import AdminReservationForm from "@/components/admin-reservation-form"

export const metadata: Metadata = {
  title: "Nouvelle réservation | Administration",
  description: "Créer une nouvelle réservation",
}

export default function NewReservationPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Nouvelle réservation</h1>
        <Link href="/admin/reservations">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Créer une réservation</CardTitle>
          <CardDescription>
            Remplissez ce formulaire pour créer une nouvelle réservation. Vous pouvez sélectionner un client existant ou
            saisir les informations manuellement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminReservationForm />
        </CardContent>
      </Card>
    </div>
  )
}
