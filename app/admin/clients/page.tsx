import { getAllClients } from "../lib/clients"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Search, Calendar, User, Plus, Trash2, Pencil } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  const clients = await getAllClients()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      <div className="flex justify-between items-center mb-6">
        <div>
          <Badge variant="outline" className="mr-2">
            Total: {clients.length}
          </Badge>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Rechercher un client..." className="pl-8 w-[250px]" />
          </div>
          <Link href="/admin/clients/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un client
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} data-id={client.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  {client.name}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/clients/${client.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/clients/${encodeURIComponent(client.id)}/delete`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{client.phone}</span>
                </li>
                {client.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{client.email}</span>
                  </li>
                )}
                {client.address && (
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{client.address}</span>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Client depuis {new Date(client.createdAt).toLocaleDateString()}</span>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Réservations:</span>
                  <span className="font-medium">{client.reservationCount}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Dernière réservation:</span>
                  <span className="font-medium">
                    {client.lastReservation ? new Date(client.lastReservation).toLocaleDateString() : "Aucune"}
                  </span>
                </div>
              </div>

              <Link href={`/admin/clients/${client.id}`}>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Voir les détails
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}

        {clients.length === 0 && (
          <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Aucun client enregistré</p>
            <Link href="/admin/clients/new">
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un client
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
