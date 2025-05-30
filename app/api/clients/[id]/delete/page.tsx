"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function DeleteClientPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleDelete = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue")
      }

      setSuccess(true)

      // Rediriger vers la page des clients après 1.5 secondes
      setTimeout(() => {
        router.push("/admin/clients")
        router.refresh() // Forcer le rafraîchissement des données
      }, 1500)
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error)
      setError(error.message || "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Succès</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le client a été supprimé avec succès.</p>
            <p className="mt-2 text-gray-500">Redirection en cours...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Supprimer le client</CardTitle>
          <CardDescription>
            Vous êtes sur le point de supprimer définitivement ce client et toutes ses réservations associées. Cette
            action est irréversible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-6">
            <p className="font-medium">Attention :</p>
            <p>
              La suppression d'un client entraînera également la suppression de toutes ses réservations. Cette action
              est définitive et ne peut pas être annulée.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-6">
              <p className="font-medium">Erreur :</p>
              <p>{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/clients">
            <Button variant="outline" type="button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Annuler
            </Button>
          </Link>

          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Supprimer définitivement
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
