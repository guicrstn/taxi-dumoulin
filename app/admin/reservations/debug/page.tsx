"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export default function DebugPage() {
  const [reservationId, setReservationId] = useState("")
  const [action, setAction] = useState("accept")
  const [adminNotes, setAdminNotes] = useState("Test de débogage")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [reservations, setReservations] = useState<any[]>([])
  const [loadingReservations, setLoadingReservations] = useState(false)

  // Charger les réservations au chargement de la page
  useEffect(() => {
    const fetchReservations = async () => {
      setLoadingReservations(true)
      try {
        const response = await fetch("/api/debug-reservations")
        const data = await response.json()
        if (data.reservations) {
          setReservations(data.reservations)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error)
      } finally {
        setLoadingReservations(false)
      }
    }

    fetchReservations()
  }, [])

  const handleTestDirectUpdate = async () => {
    if (!reservationId) {
      alert("Veuillez sélectionner une réservation")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/debug-update-reservation?id=${reservationId}&action=${action}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Erreur:", error)
      setResult({ error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  const handleTestApiRoute = async () => {
    if (!reservationId) {
      alert("Veuillez sélectionner une réservation")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/reservations/${reservationId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminNotes }),
        cache: "no-store",
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Erreur:", error)
      setResult({ error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Page de débogage des réservations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sélectionner une réservation</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingReservations ? (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reservation">Réservation</Label>
                  <select
                    id="reservation"
                    className="w-full p-2 border rounded-md"
                    value={reservationId}
                    onChange={(e) => setReservationId(e.target.value)}
                  >
                    <option value="">Sélectionner une réservation</option>
                    {reservations.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.name} - {res.pickup} → {res.dropoff} ({res.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <select
                    id="action"
                    className="w-full p-2 border rounded-md"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  >
                    <option value="accept">Accepter</option>
                    <option value="reject">Refuser</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminNotes">Notes administrateur</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Notes pour le test"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions de test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={handleTestDirectUpdate} disabled={loading || !reservationId} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Tester la mise à jour directe
              </Button>

              <Button onClick={handleTestApiRoute} disabled={loading || !reservationId} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Tester la route API
              </Button>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">URLs de test:</p>
                {reservationId && (
                  <>
                    <p className="text-xs text-gray-600 mb-1">
                      API:{" "}
                      <code className="bg-gray-100 p-1 rounded">
                        /api/reservations/{reservationId}/{action}
                      </code>
                    </p>
                    <p className="text-xs text-gray-600">
                      Debug:{" "}
                      <code className="bg-gray-100 p-1 rounded">
                        /api/debug-update-reservation?id={reservationId}&action={action}
                      </code>
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Résultat</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
