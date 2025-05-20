import { getReservationById } from "../../lib/reservations"
import { getClientByEmail } from "../../lib/clients"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  User,
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export default async function ReservationDetailsPage({ params }: { params: { id: string } }) {
  const reservation = await getReservationById(params.id)

  if (!reservation) {
    return (
      <div className="container py-10">
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h2 className="text-red-800 text-lg font-medium mb-2">Réservation non trouvée</h2>
          <p className="text-red-700">La réservation avec l'identifiant {params.id} n'existe pas.</p>
          <Link href="/admin/reservations">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux réservations
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Récupérer les informations du client si disponible
  const client = reservation.email ? await getClientByEmail(reservation.email) : null

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Détails de la réservation</h1>
        <Link href="/admin/reservations">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          className={`
          ${
            reservation.status === "pending"
              ? "border-l-4 border-l-yellow-500"
              : reservation.status === "accepted"
                ? "border-l-4 border-l-green-500"
                : "border-l-4 border-l-red-500"
          }
        `}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>Statut de la réservation</CardTitle>
              <Badge
                className={`
                  ${
                    reservation.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : reservation.status === "accepted"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                `}
              >
                {reservation.status === "pending"
                  ? "En attente"
                  : reservation.status === "accepted"
                    ? "Acceptée"
                    : "Refusée"}
              </Badge>
            </div>
            <CardDescription>
              Créée {formatDistanceToNow(new Date(reservation.createdAt), { addSuffix: true, locale: fr })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span>
                  Créée le {new Date(reservation.createdAt).toLocaleDateString()} à{" "}
                  {new Date(reservation.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span>
                  Mise à jour le {new Date(reservation.updatedAt).toLocaleDateString()} à{" "}
                  {new Date(reservation.updatedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {reservation.status === "pending" ? (
              <div className="flex gap-2">
                <Link href={`/admin/reservations/${reservation.id}/accept`}>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accepter
                  </Button>
                </Link>
                <Link href={`/admin/reservations/${reservation.id}/reject`}>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Refuser
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {reservation.status === "accepted"
                  ? "Cette réservation a été acceptée"
                  : "Cette réservation a été refusée"}
              </div>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
            {client && <CardDescription>Client enregistré</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <span>{reservation.name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span>{reservation.phone}</span>
              </div>
              {reservation.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{reservation.email}</span>
                </div>
              )}
            </div>
            {client && (
              <div className="mt-4 pt-4 border-t">
                <Link href={`/admin/clients/${client.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir la fiche client
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails du trajet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservation.date && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Date: {reservation.date}</span>
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span>De: {reservation.pickup}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span>À: {reservation.dropoff}</span>
              </div>
              {reservation.passengers && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{reservation.passengers} passager(s)</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {(reservation.message || reservation.adminNotes) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reservation.message && (
            <Card>
              <CardHeader>
                <CardTitle>Message du client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                  <p className="text-gray-600 whitespace-pre-line">{reservation.message}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {reservation.adminNotes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes administrateur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600 whitespace-pre-line">{reservation.adminNotes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Link href="/admin/reservations">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>
        <Link href={`/admin/reservations/${reservation.id}/delete`}>
          <Button variant="destructive">Supprimer cette réservation</Button>
        </Link>
      </div>
    </div>
  )
}
