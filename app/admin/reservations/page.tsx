import { getAllReservations } from "../lib/reservations"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Phone, Mail, MapPin, Calendar, Users, MessageSquare, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react"

// Force le rendu dynamique et désactive le cache
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ReservationsPage() {
  // Récupérer les réservations avec un timestamp pour éviter le cache
  const timestamp = new Date().getTime()
  const reservations = await getAllReservations()

  console.log(`[ReservationsPage] Loaded ${reservations.length} reservations at ${timestamp}`)

  // Trier les réservations par date de création (les plus récentes d'abord)
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  // Séparer les réservations par statut
  const pendingReservations = sortedReservations.filter((res) => res.status === "pending")
  const acceptedReservations = sortedReservations.filter((res) => res.status === "accepted")
  const rejectedReservations = sortedReservations.filter((res) => res.status === "rejected")

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Demandes de course</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            En attente: {pendingReservations.length}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Confirmées: {acceptedReservations.length}
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Refusées: {rejectedReservations.length}
          </Badge>
        </div>
      </div>

      {/* Afficher un message de débogage */}
      {reservations.length > 0 ? (
        <div className="bg-blue-50 p-4 mb-6 rounded-md">
          <p className="text-blue-800 text-sm sm:text-base">
            {reservations.length} réservation(s) trouvée(s). Dernière mise à jour: {new Date().toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 p-4 mb-6 rounded-md">
          <p className="text-yellow-800 text-sm sm:text-base">
            Aucune réservation trouvée. Dernière mise à jour: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}

      <Tabs defaultValue="pending" className="w-full overflow-x-auto">
        <TabsList className="mb-6 flex w-full overflow-x-auto pb-1">
          <TabsTrigger value="pending" className="flex gap-2 whitespace-nowrap">
            <Clock className="h-4 w-4" />
            En attente ({pendingReservations.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex gap-2 whitespace-nowrap">
            <CheckCircle className="h-4 w-4" />
            Confirmées ({acceptedReservations.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex gap-2 whitespace-nowrap">
            <XCircle className="h-4 w-4" />
            Refusées ({rejectedReservations.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="whitespace-nowrap">
            Toutes ({sortedReservations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ReservationsList reservations={pendingReservations} />
        </TabsContent>

        <TabsContent value="accepted">
          <ReservationsList reservations={acceptedReservations} />
        </TabsContent>

        <TabsContent value="rejected">
          <ReservationsList reservations={rejectedReservations} />
        </TabsContent>

        <TabsContent value="all">
          <ReservationsList reservations={sortedReservations} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReservationsList({ reservations }: { reservations: any[] }) {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucune réservation dans cette catégorie</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {reservations.map((reservation) => (
        <Card
          key={reservation.id}
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
          <CardHeader className="pb-2 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <CardTitle className="text-lg sm:text-xl">{reservation.name}</CardTitle>
                <CardDescription>
                  Créée {formatDistanceToNow(new Date(reservation.createdAt), { addSuffix: true, locale: fr })}
                </CardDescription>
              </div>
              <Badge
                className={`
                self-start sm:self-auto
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
                    ? "Confirmée"
                    : "Refusée"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Informations client</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a href={`tel:${reservation.phone}`} className="truncate hover:underline">
                      {reservation.phone}
                    </a>
                  </li>
                  {reservation.email && (
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${reservation.email}`} className="truncate hover:underline">
                        {reservation.email}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Détails du trajet</h3>
                <ul className="space-y-2">
                  {reservation.date && (
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{reservation.date}</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    <span className="break-words">De: {reservation.pickup}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    <span className="break-words">À: {reservation.dropoff}</span>
                  </li>
                  {reservation.passengers && (
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>{reservation.passengers} passager(s)</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {reservation.message && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                <div className="bg-gray-50 p-3 rounded-md flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 whitespace-pre-line break-words">{reservation.message}</p>
                </div>
              </div>
            )}

            {reservation.adminNotes && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Notes administrateur</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-600 whitespace-pre-line break-words">{reservation.adminNotes}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="text-xs text-gray-500 order-2 sm:order-1">ID: {reservation.id}</div>
            <div className="flex flex-wrap gap-2 order-1 sm:order-2">
              {reservation.status === "pending" ? (
                <>
                  <Link href={`/admin/reservations/${reservation.id}/accept`} prefetch={false}>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accepter
                    </Button>
                  </Link>
                  <Link href={`/admin/reservations/${reservation.id}/reject`} prefetch={false}>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Refuser
                    </Button>
                  </Link>
                </>
              ) : null}

              <Link href={`/admin/reservations/${reservation.id}/delete`} prefetch={false}>
                <Button size="sm" variant="outline" className="border-red-200 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
