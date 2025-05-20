import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Server, Globe, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-500" />
              Emails
            </CardTitle>
            <CardDescription>Configurer les paramètres d'email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Gérez les templates d'email, les paramètres d'envoi et testez les emails.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/settings/email" className="w-full">
              <Button variant="outline" className="w-full">
                Configurer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-green-500" />
              Serveur
            </CardTitle>
            <CardDescription>Paramètres du serveur</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Configurez les paramètres du serveur, les ports et les options de déploiement.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Configurer
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-500" />
              Site web
            </CardTitle>
            <CardDescription>Paramètres du site web</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Modifiez les informations de contact, les horaires et autres informations du site.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Configurer
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-500" />
              Sécurité
            </CardTitle>
            <CardDescription>Paramètres de sécurité</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Gérez les utilisateurs, les mots de passe et les paramètres de sécurité.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Configurer
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-amber-500" />
              Base de données
            </CardTitle>
            <CardDescription>Gestion des données</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Sauvegardez, restaurez ou exportez les données de l'application.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Configurer
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
