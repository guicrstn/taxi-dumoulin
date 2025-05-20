"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, AlertCircle, Globe, ExternalLink } from "lucide-react"

export default function EmailSettingsPage() {
  const [baseUrl, setBaseUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [configMessage, setConfigMessage] = useState<string | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const [emailType, setEmailType] = useState("reservation")
  const [testEmail, setTestEmail] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")

  // Charger l'URL de base au chargement de la page
  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch("/api/email-base-url")
        const data = await response.json()

        if (response.ok && data.baseUrl) {
          setBaseUrl(data.baseUrl)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'URL de base:", error)
      }
    }

    fetchBaseUrl()

    // Récupérer l'URL actuelle pour suggestion
    if (typeof window !== "undefined") {
      const url = window.location.origin
      setCurrentUrl(url)
    }
  }, [])

  const handleTestEmail = async () => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const url = `/api/test-email-templates?type=${emailType}${testEmail ? `&email=${testEmail}` : ""}`
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.message || "Une erreur est survenue lors du test d'email")
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la communication avec le serveur")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveConfig = async () => {
    setIsSaving(true)
    setConfigMessage(null)
    setConfigError(null)

    try {
      const response = await fetch("/api/email-base-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baseUrl }),
      })

      const data = await response.json()

      if (response.ok) {
        setConfigMessage("Configuration enregistrée avec succès")
      } else {
        setConfigError(data.message || "Une erreur est survenue lors de l'enregistrement de la configuration")
      }
    } catch (error) {
      setConfigError("Une erreur est survenue lors de la communication avec le serveur")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const useCurrentUrl = () => {
    setBaseUrl(currentUrl)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Paramètres d'email</h1>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="test">Tester les emails</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configuration des emails
              </CardTitle>
              <CardDescription>Configurez les paramètres d'envoi d'emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-4">
                <p className="font-medium">Important !</p>
                <p className="text-sm mt-1">
                  Les boutons dans les emails ne fonctionneront pas correctement tant que vous n'aurez pas configuré
                  l'URL de base ci-dessous.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL de base du site</Label>
                <div className="flex gap-2">
                  <Input
                    id="baseUrl"
                    placeholder="https://votredomaine.com"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="flex-1"
                  />
                  {currentUrl && (
                    <Button type="button" variant="outline" onClick={useCurrentUrl} className="whitespace-nowrap">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Utiliser l'URL actuelle
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Cette URL sera utilisée pour les liens dans les emails. Par exemple:{" "}
                  {currentUrl || "https://votredomaine.com"} ou http://votre-ip:port.{" "}
                  <strong>
                    Cette configuration est essentielle pour que les boutons dans les emails fonctionnent correctement.
                  </strong>
                </p>
              </div>

              {configMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{configMessage}</p>
                  </div>
                </div>
              )}

              {configError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Erreur</p>
                    <p className="text-sm mt-1">{configError}</p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
                <p className="font-medium">Information</p>
                <p className="text-sm mt-1">
                  Si vous ne spécifiez pas d'URL de base, les liens dans les emails seront relatifs. Cela peut
                  fonctionner si l'utilisateur est déjà connecté au site, mais peut causer des problèmes si l'email est
                  ouvert dans un client de messagerie externe.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enregistrer les paramètres"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Tester les templates d'email</CardTitle>
              <CardDescription>
                Envoyez des emails de test pour vérifier que les templates fonctionnent correctement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailType">Type d'email</Label>
                <select
                  id="emailType"
                  className="w-full p-2 border rounded-md"
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                >
                  <option value="reservation">Nouvelle réservation</option>
                  <option value="contact">Nouveau message de contact</option>
                  <option value="client-reservation">Confirmation de réservation (client)</option>
                  <option value="client-contact">Confirmation de message (client)</option>
                  <option value="accepted">Réservation acceptée</option>
                  <option value="rejected">Réservation refusée</option>
                  <option value="all">Tous les types</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testEmail">Email de test (facultatif)</Label>
                <Input
                  id="testEmail"
                  type="email"
                  placeholder="Laissez vide pour utiliser l'email d'administrateur"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
              </div>

              {result && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email(s) envoyé(s) avec succès</p>
                    <p className="text-sm mt-1">
                      {result.message} à {testEmail || "l'email d'administrateur"}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Erreur</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleTestEmail} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Envoyer un email de test"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
