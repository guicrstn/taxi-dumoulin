import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Users, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { getAllReservations } from "./lib/reservations"
import { getClientStats } from "./lib/clients"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Force le rendu dynamique et désactive le cache
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboard() {
  // Récupérer les réservations avec un timestamp pour éviter le cache
  const timestamp = new Date().getTime()
  const reservations = await getAllReservations()
  const clientStats = await getClientStats()

  console.log(`[AdminDashboard] Loaded ${reservations.length} reservations at ${timestamp}`)

  // Calculer les statistiques
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Réservations aujourd'hui
  const todayReservations = reservations.filter((res) => {
    const resDate = new Date(res.createdAt)
    resDate.setHours(0, 0, 0, 0)
    return resDate.getTime() === today.getTime()
  })

  // Clients actifs (avec au moins une réservation)
  const activeClients = new Set(reservations.map((res) => res.email)).size

  // Taux de confirmation
  const confirmedReservations = reservations.filter((res) => res.status === "accepted")
  const confirmationRate =
    reservations.length > 0 ? Math.round((confirmedReservations.length / reservations.length) * 100) : 0

  // Réservations en attente
  const pendingReservations = reservations.filter((res) => res.status === "pending")

  // Réservations récentes (7 derniers jours)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentReservations = reservations.filter((res) => new Date(res.createdAt) >= sevenDaysAgo)

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Tableau de bord</h1>
        <Link href="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
        </Link>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Réservations aujourd'hui</CardTitle>
            <CalendarClock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayReservations.length}</div>
            <p className="text-xs text-gray-500">Total des courses du jour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-gray-500">Clients avec réservations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de confirmation</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmationRate}%</div>
            <p className="text-xs text-gray-500">Réservations confirmées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations.length}</div>
            <p className="text-xs text-gray-500">Demandes à traiter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Réservations récentes</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentReservations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune réservation récente</p>
            ) : (
              <div className="space-y-4">
                {recentReservations.slice(0, 5).map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 border-b pb-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        reservation.status === "accepted"
                          ? "bg-green-500"
                          : reservation.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{reservation.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {new Date(reservation.createdAt).toLocaleDateString()} - {reservation.pickup} →{" "}
                        {reservation.dropoff}
                      </p>
                    </div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded-full mt-1 sm:mt-0 ${
                        reservation.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : reservation.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {reservation.status === "accepted"
                        ? "Confirmée"
                        : reservation.status === "rejected"
                          ? "Refusée"
                          : "En attente"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Taux de confirmation</p>
                  <p className="text-sm font-medium">{confirmationRate}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${confirmationRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Réservations traitées</p>
                  <p className="text-sm font-medium">
                    {reservations.length - pendingReservations.length}/{reservations.length}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${reservations.length > 0 ? ((reservations.length - pendingReservations.length) / reservations.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Répartition des statuts</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Confirmées</p>
                    <p className="text-lg font-bold text-green-600">{confirmedReservations.length}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">En attente</p>
                    <p className="text-lg font-bold text-yellow-600">{pendingReservations.length}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Refusées</p>
                    <p className="text-lg font-bold text-red-600">
                      {reservations.filter((res) => res.status === "rejected").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
