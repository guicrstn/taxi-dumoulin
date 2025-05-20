"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function ReservationActionPage({
  params,
}: {
  params: Promise<{ id: string; action: string }>
}) {
  // Utiliser React.use pour déballer les paramètres
  const unwrappedParams = use(params)
  const { id, action } = unwrappedParams

  const router = useRouter()
  const [adminNotes, setAdminNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservation, setReservation] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isAccept = action === "accept"
  const actionText = isAccept ? "Accepter" : "Refuser"
  const actionColor = isAccept ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"

  // Récupérer les détails de la réservation
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${id}`)
        if (!response.ok) {
          throw new Error("Réservation non trouvée")
        }
        const data = await response.json()
        setReservation(data.reservation)
      } catch (error) {
        setError("Erreur lors de la récupération des détails de la réservation")
      }
    }

    fetchReservation()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      console.log(`Envoi de la requête à /api/reservations/${id}/${action}`)
      const response = await fetch(`/api/reservations/${id}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminNotes }),
        cache: "no-store",
      })

      const data = await response.json()
      console.log("Réponse reçue:", data)

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue")
      }

      setSuccess(true)

      // Rediriger vers la page des réservations après 2 secondes
      setTimeout(() => {
        router.push("/admin/reservations")
        router.refresh() // Forcer le rafraîchissement des données
      }, 2000)
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", error)
      setError(error.message || "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/reservations">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux réservations
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Succès</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              La réservation a été {isAccept ? "acceptée" : "refusée"} avec succès.
              {isAccept
                ? " Un email de confirmation a été envoyé au client."
                : " Un email d'information a été envoyé au client."}
            </p>
            <p className="mt-2 text-gray-500">Redirection en cours...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="container py-10 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>{isAccept ? "Accepter la réservation" : "Refuser la réservation"}</CardTitle>
          <CardDescription>
            {isAccept
              ? "Vous êtes sur le point d'accepter cette réservation. Un email de confirmation sera envoyé au client."
              : "Vous êtes sur le point de refuser cette réservation. Un email d'information sera envoyé au client."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Détails de la réservation</h3>
            <p>
              <strong>Client:</strong> {reservation.name}
            </p>
            <p>
              <strong>Téléphone:</strong> {reservation.phone}
            </p>
            {reservation.email && (
              <p>
                <strong>Email:</strong> {reservation.email}
              </p>
            )}
            {reservation.date && (
              <p>
                <strong>Date:</strong> {reservation.date}
              </p>
            )}
            <p>
              <strong>De:</strong> {reservation.pickup}
            </p>
            <p>
              <strong>À:</strong> {reservation.dropoff}
            </p>
            {reservation.passengers && (
              <p>
                <strong>Passagers:</strong> {reservation.passengers}
              </p>
            )}
            {reservation.message && (
              <>
                <p>
                  <strong>Message:</strong>
                </p>
                <p className="whitespace-pre-line">{reservation.message}</p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="adminNotes" className="block text-sm font-medium mb-1">
                {isAccept ? "Note pour le client (facultatif)" : "Raison du refus (facultatif)"}
              </label>
              <Textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={
                  isAccept
                    ? "Ajoutez des informations supplémentaires pour le client..."
                    : "Expliquez pourquoi la réservation est refusée..."
                }
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                {isAccept
                  ? "Cette note sera incluse dans l'email de confirmation envoyé au client."
                  : "Cette explication sera incluse dans l'email envoyé au client."}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <Button type="submit" className={actionColor} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isAccept ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <X className="mr-2 h-4 w-4" />
                )}
                {actionText} la réservation
              </Button>

              <Link href="/admin/reservations">
                <Button variant="outline" type="button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      {!success && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium mb-2">Débogage</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                const testResponse = await fetch(`/api/reservations/${id}`, {
                  cache: "no-store",
                })
                const testData = await testResponse.json()
                alert(JSON.stringify(testData, null, 2))
              } catch (err) {
                alert("Erreur: " + (err instanceof Error ? err.message : String(err)))
              }
            }}
          >
            Tester l'API
          </Button>
        </div>
      )}
    </div>
  )
}
