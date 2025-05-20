"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function DeleteClientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Utiliser React.use pour déballer les paramètres
  const unwrappedParams = use(params)
  const { id } = unwrappedParams

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Charger les informations du client pour affichage
  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        // Tester d'abord avec l'API de débogage pour voir si le client existe
        const debugResponse = await fetch(`/api/debug-clients?id=${encodeURIComponent(id)}`)
        const debugData = await debugResponse.json()
        console.log("Résultat du débogage:", debugData)

        if (debugData.clientFound) {
          setClientInfo(debugData.client)
        } else {
          setError(`Client non trouvé (ID: ${id}). Vérifiez les logs de débogage.`)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des infos client:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientInfo()
  }, [id])

  const handleDelete = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log(`Tentative de suppression du client avec l'ID: ${id}`)

      const response = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      console.log("Réponse de l'API:", data)

      if (!response.ok) {
        throw new Error(data.message || data.error || "Une erreur est survenue")
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

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mb-6">
              <p className="font-medium">Erreur :</p>
              <p>{error}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Informations de débogage :</p>
                <p className="text-sm">ID du client : {id}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-6">
                <p className="font-medium">Attention :</p>
                <p>
                  La suppression d'un client entraînera également la suppression de toutes ses réservations. Cette
                  action est définitive et ne peut pas être annulée.
                </p>
              </div>

              {clientInfo && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Informations du client :</h3>
                  <p>
                    <strong>Nom :</strong> {clientInfo.name}
                  </p>
                  <p>
                    <strong>Email :</strong> {clientInfo.email}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {clientInfo.phone}
                  </p>
                  <p>
                    <strong>ID :</strong> {clientInfo.id}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/clients">
            <Button variant="outline" type="button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Annuler
            </Button>
          </Link>

          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting || !!error}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Supprimer définitivement
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
