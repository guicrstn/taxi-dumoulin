"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ImageIcon, Upload, RefreshCw, CheckCircle, AlertCircle, LinkIcon } from "lucide-react"

export default function LogoSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [testLoading, setTestLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState("/images/taxi-dumoulin-logo.png")
  const [absoluteLogoUrl, setAbsoluteLogoUrl] = useState("")
  const [testResult, setTestResult] = useState<any>(null)
  const [currentDomain, setCurrentDomain] = useState("")

  // Simuler le chargement des paramètres
  useEffect(() => {
    // Dans une implémentation réelle, vous chargeriez les données depuis une API
    // fetch('/api/logo-settings').then(...)

    // Récupérer le domaine actuel
    if (typeof window !== "undefined") {
      setCurrentDomain(window.location.origin)
      setAbsoluteLogoUrl(window.location.origin + "/images/taxi-dumoulin-logo.png")
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simuler une sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dans une implémentation réelle, vous enverriez les données à une API
      // await fetch('/api/logo-settings', {
      //   method: 'POST',
      //   body: JSON.stringify({ logoUrl, absoluteLogoUrl })
      // })

      toast({
        title: "Paramètres enregistrés",
        description: "Les paramètres du logo ont été mis à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des paramètres.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestLogo = async () => {
    setTestLoading(true)
    setTestResult(null)

    try {
      // Tester si l'URL du logo est accessible
      const img = new Image()
      img.onload = () => {
        setTestResult({
          success: true,
          message: "Le logo est accessible et s'affiche correctement.",
          dimensions: `${img.width}x${img.height} pixels`,
        })
        setTestLoading(false)
      }
      img.onerror = () => {
        setTestResult({
          success: false,
          message: "Impossible de charger le logo. Vérifiez l'URL et assurez-vous que l'image est accessible.",
        })
        setTestLoading(false)
      }
      img.src = absoluteLogoUrl
    } catch (error) {
      setTestResult({
        success: false,
        message: "Une erreur est survenue lors du test du logo.",
      })
      setTestLoading(false)
    }
  }

  const useCurrentDomain = () => {
    setAbsoluteLogoUrl(currentDomain + logoUrl)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Paramètres du logo</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="email">Logo pour emails</TabsTrigger>
          <TabsTrigger value="upload">Télécharger un logo</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-500" />
                Paramètres généraux du logo
              </CardTitle>
              <CardDescription>Configurez le logo utilisé sur votre site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Chemin du logo (relatif)</Label>
                <Input
                  id="logoUrl"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="/images/logo.png"
                />
                <p className="text-sm text-gray-500">
                  Ce chemin est relatif à la racine de votre site. Par exemple : /images/logo.png
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Aperçu du logo :</p>
                <div className="border p-4 rounded-md bg-white">
                  <img src={logoUrl || "/placeholder.svg"} alt="Logo" className="max-h-20" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
                <p className="font-medium">Conseil</p>
                <p className="text-sm mt-1">
                  Pour de meilleurs résultats, utilisez une image PNG avec un fond transparent et une résolution
                  suffisante.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enregistrer les paramètres"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-green-500" />
                Logo pour les emails
              </CardTitle>
              <CardDescription>Configurez l'URL absolue du logo pour les emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-4">
                <p className="font-medium">Important !</p>
                <p className="text-sm mt-1">
                  Pour que le logo s'affiche correctement dans les emails, vous devez utiliser une URL absolue
                  (commençant par http:// ou https://).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="absoluteLogoUrl">URL absolue du logo</Label>
                <div className="flex gap-2">
                  <Input
                    id="absoluteLogoUrl"
                    value={absoluteLogoUrl}
                    onChange={(e) => setAbsoluteLogoUrl(e.target.value)}
                    placeholder="https://votredomaine.com/images/logo.png"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={useCurrentDomain}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Utiliser le domaine actuel
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Cette URL doit être accessible depuis l'extérieur. Par exemple :
                  https://votredomaine.com/images/logo.png
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Aperçu du logo :</p>
                <div className="border p-4 rounded-md bg-white">
                  <img src={absoluteLogoUrl || "/placeholder.svg"} alt="Logo" className="max-h-20" />
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-4 rounded-md ${
                    testResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  <div className="flex items-start">
                    {testResult.success ? (
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{testResult.success ? "Succès" : "Erreur"}</p>
                      <p className="text-sm mt-1">{testResult.message}</p>
                      {testResult.dimensions && <p className="text-sm">Dimensions : {testResult.dimensions}</p>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTestLogo} disabled={testLoading}>
                {testLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Tester l'URL du logo"}
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enregistrer les paramètres"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-purple-500" />
                Télécharger un nouveau logo
              </CardTitle>
              <CardDescription>Téléchargez un nouveau logo pour votre site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Glissez-déposez votre logo ici, ou{" "}
                    <span className="text-blue-500 cursor-pointer">parcourez vos fichiers</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG ou SVG, max 2MB</p>
                </div>
                <input type="file" className="hidden" accept="image/png,image/jpeg,image/svg+xml" />
              </div>

              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md">
                <p className="font-medium">Recommandations pour le logo</p>
                <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                  <li>Utilisez une image de haute qualité (au moins 200x200 pixels)</li>
                  <li>Préférez le format PNG avec fond transparent</li>
                  <li>Assurez-vous que le logo est lisible même en petit format</li>
                  <li>Évitez les logos trop complexes ou avec trop de détails</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Télécharger le logo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
