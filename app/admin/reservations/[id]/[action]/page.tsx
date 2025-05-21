"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, X, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ReservationActionPage({
  params,
}: {
  params: { id: string; action: string }
}) {
  const { id, action } = params
  const router = useRouter()
  const [adminNotes, setAdminNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservation, setReservation] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isAccept = action === "accept"
  const actionText = isAccept ? "Accepter" : "Refuser"
  const actionColor = isAccept ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"

  // Récupérer les détails de la réservation
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setIsLoading(true)
        console.log(`Récupération des détails de la réservation: ${id}`)
        const response = await fetch(`/api/reservations/${id}`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log("Données de réservation reçues:", data)

        if (!data.reservation) {
          throw new Error("Format de réponse invalide: reservation manquante")
        }

        setReservation(data.reservation)
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error)
        setError(
          `Erreur lors de la récupération des détails de la réservation: ${error instanceof Error ? error.message : String(error)}`,
        )
      } finally {
        setIsLoading(false)
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
      console.log("Données envoyées:", { adminNotes })

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
        throw new Error(data.message || `Erreur HTTP: ${response.status}`)
      }

      setSuccess(true)

      // Rediriger vers la page des réservations après 2 secondes
      setTimeout(() => {
        router.push("/admin/reservations")
        router.refresh() // Forcer le rafraîchissement des données
      }, 2000)
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      setError(error instanceof Error ? error.message : String(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Chargement des détails de la réservation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium mb-2">Informations de débogage</h3>
              <p className="text-xs text-gray-500 mb-2">ID: {id}</p>
              <p className="text-xs text-gray-500 mb-2">Action: {action}</p>
            </div>
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
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Impossible de charger les détails de la réservation. Veuillez réessayer.</p>
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

            <div className="flex flex-wrap gap-4 mt-6">
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
    </div>
  )
}
