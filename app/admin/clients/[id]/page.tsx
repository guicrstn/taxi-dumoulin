import { getClientById } from "../../lib/clients"
import { getAllReservationsByEmail } from "../../lib/reservations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export default async function ClientDetailsPage({ params }: { params: { id: string } }) {
  const client = await getClientById(params.id)

  if (!client) {
    return (
      <div className="container py-10">
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h2 className="text-red-800 text-lg font-medium mb-2">Client non trouvé</h2>
          <p className="text-red-700">Le client avec l'identifiant {params.id} n'existe pas.</p>
          <Link href="/admin/clients">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste des clients
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Récupérer toutes les réservations de ce client
  const reservations = await getAllReservationsByEmail(client.email)

  // Calculer les statistiques
  const acceptedReservations = reservations.filter((r) => r.status === "accepted")
  const rejectedReservations = reservations.filter((r) => r.status === "rejected")
  const pendingReservations = reservations.filter((r) => r.status === "pending")

  // Calculer les destinations les plus fréquentes
  const destinations = reservations.reduce(
    (acc, res) => {
      const destination = res.dropoff
      if (!acc[destination]) {
        acc[destination] = 0
      }
      acc[destination]++
      return acc
    },
    {} as Record<string, number>,
  )

  const topDestinations = Object.entries(destinations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Calculer les points de départ les plus fréquents
  const pickups = reservations.reduce(
    (acc, res) => {
      const pickup = res.pickup
      if (!acc[pickup]) {
        acc[pickup] = 0
      }
      acc[pickup]++
      return acc
    },
    {} as Record<string, number>,
  )

  const topPickups = Object.entries(pickups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Détails du client</h1>
        <Link href="/admin/clients">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium w-24">Nom:</span>
                <span>{client.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Email:</span>
                <span>{client.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">Téléphone:</span>
                <span>{client.phone}</span>
              </div>
              {client.address && (
                <div className="flex items-center">
                  <span className="font-medium w-24">Adresse:</span>
                  <span>{client.address}</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="font-medium w-24">Client depuis:</span>
                <span>{new Date(client.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total des courses:</span>
                <Badge variant="outline" className="ml-2">
                  {reservations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Courses acceptées:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-2">
                  {acceptedReservations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Courses refusées:</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-2">
                  {rejectedReservations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">En attente:</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 ml-2">
                  {pendingReservations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Taux d'acceptation:</span>
                <Badge variant="outline" className="ml-2">
                  {reservations.length > 0
                    ? `${Math.round((acceptedReservations.length / reservations.length) * 100)}%`
                    : "N/A"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dernière activité</CardTitle>
          </CardHeader>
          <CardContent>
            {client.lastReservation ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>
                    Dernière réservation{" "}
                    {formatDistanceToNow(new Date(client.lastReservation), { addSuffix: true, locale: fr })}
                  </span>
                </div>
                {reservations.length > 0 && (
                  <>
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Dernière destination:</h3>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{reservations[0].dropoff}</span>
                      </div>
                    </div>
                    <Link href={`/admin/reservations/${reservations[0].id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Voir la dernière réservation
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Aucune réservation</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Destinations fréquentes</CardTitle>
            <CardDescription>Les 5 destinations les plus demandées</CardDescription>
          </CardHeader>
          <CardContent>
            {topDestinations.length > 0 ? (
              <ul className="space-y-2">
                {topDestinations.map(([destination, count]) => (
                  <li key={destination} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{destination}</span>
                    </div>
                    <Badge variant="outline">
                      {count} {count > 1 ? "fois" : "fois"}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">Aucune destination</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points de départ fréquents</CardTitle>
            <CardDescription>Les 5 points de départ les plus utilisés</CardDescription>
          </CardHeader>
          <CardContent>
            {topPickups.length > 0 ? (
              <ul className="space-y-2">
                {topPickups.map(([pickup, count]) => (
                  <li key={pickup} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{pickup}</span>
                    </div>
                    <Badge variant="outline">
                      {count} {count > 1 ? "fois" : "fois"}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">Aucun point de départ</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des réservations</CardTitle>
          <CardDescription>Toutes les réservations de ce client</CardDescription>
        </CardHeader>
        <CardContent>
          {reservations.length > 0 ? (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className={`p-4 rounded-md border ${
                    reservation.status === "accepted"
                      ? "border-l-4 border-l-green-500"
                      : reservation.status === "rejected"
                        ? "border-l-4 border-l-red-500"
                        : "border-l-4 border-l-yellow-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{new Date(reservation.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Badge
                      className={
                        reservation.status === "accepted"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : reservation.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {reservation.status === "accepted"
                        ? "Acceptée"
                        : reservation.status === "rejected"
                          ? "Refusée"
                          : "En attente"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>De: {reservation.pickup}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>À: {reservation.dropoff}</span>
                    </div>
                  </div>
                  {reservation.date && (
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Date: {reservation.date}</span>
                    </div>
                  )}
                  <div className="flex justify-end mt-2">
                    <Link href={`/admin/reservations/${reservation.id}`}>
                      <Button variant="outline" size="sm">
                        Voir les détails
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">Aucune réservation trouvée pour ce client</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
