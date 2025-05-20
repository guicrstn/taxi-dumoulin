"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function DebugClientsPage() {
  const [clientId, setClientId] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [loadingClients, setLoadingClients] = useState(false)

  // Charger les clients au chargement de la page
  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true)
      try {
        const response = await fetch("/api/debug-clients")
        const data = await response.json()
        if (data.clients) {
          setClients(data.clients)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des clients:", error)
      } finally {
        setLoadingClients(false)
      }
    }

    fetchClients()
  }, [])

  const handleTestClient = async () => {
    if (!clientId) {
      alert("Veuillez saisir un ID de client")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/debug-clients?id=${encodeURIComponent(clientId)}`)
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
      <h1 className="text-3xl font-bold mb-6">Page de débogage des clients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sélectionner un client</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingClients ? (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <select
                    id="client"
                    className="w-full p-2 border rounded-md"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.email} (ID: {client.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientId">ID du client</Label>
                  <Input
                    id="clientId"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="ID du client à tester"
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
              <Button onClick={handleTestClient} disabled={loading || !clientId} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Tester la récupération du client
              </Button>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-2">URL de test:</p>
                {clientId && (
                  <p className="text-xs text-gray-600 mb-1">
                    API:{" "}
                    <code className="bg-gray-100 p-1 rounded">
                      /api/debug-clients?id={encodeURIComponent(clientId)}
                    </code>
                  </p>
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
