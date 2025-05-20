"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, CalendarDays, Clock, MapPin, Users, CheckCircle, XCircle } from "lucide-react"

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Données fictives pour les rendez-vous
  const appointments = [
    {
      id: 1,
      client: "Jean Dupont",
      date: "14/05/2025",
      time: "09:00",
      pickup: "123 Rue de Paris",
      destination: "Hôpital Saint-Antoine",
      status: "confirmed",
      type: "medical",
    },
    {
      id: 2,
      client: "Marie Martin",
      date: "14/05/2025",
      time: "11:30",
      pickup: "45 Avenue Victor Hugo",
      destination: "Aéroport Charles de Gaulle",
      status: "confirmed",
      type: "standard",
    },
    {
      id: 3,
      client: "Pierre Durand",
      date: "14/05/2025",
      time: "14:15",
      pickup: "8 Boulevard Haussmann",
      destination: "Gare de Lyon",
      status: "pending",
      type: "standard",
    },
    {
      id: 4,
      client: "Sophie Leroy",
      date: "15/05/2025",
      time: "10:00",
      pickup: "27 Rue Saint-Denis",
      destination: "Clinique des Lilas",
      status: "confirmed",
      type: "medical",
    },
    {
      id: 5,
      client: "Thomas Bernard",
      date: "15/05/2025",
      time: "16:45",
      pickup: "92 Rue de Rivoli",
      destination: "Tour Eiffel",
      status: "cancelled",
      type: "standard",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Annulé</Badge>
      default:
        return <Badge>Inconnu</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "medical":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Médical
          </Badge>
        )
      case "standard":
        return <Badge variant="outline">Standard</Badge>
      default:
        return <Badge variant="outline">Autre</Badge>
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600">Gérez vos réservations et suivez votre activité</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>En ligne</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/diverse-group.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Réservations aujourd'hui</CardTitle>
            <CardDescription>Total des courses du jour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">5</div>
              <CalendarDays className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Clients actifs</CardTitle>
            <CardDescription>Clients avec réservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <Users className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taux de confirmation</CardTitle>
            <CardDescription>Réservations confirmées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">85%</div>
              <BarChart className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="appointments">Réservations</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Réservations à venir</CardTitle>
              <CardDescription>Gérez les réservations de vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead className="hidden md:table-cell">Départ</TableHead>
                      <TableHead className="hidden md:table-cell">Destination</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.client}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[150px] truncate" title={appointment.pickup}>
                          {appointment.pickup}
                        </TableCell>
                        <TableCell
                          className="hidden md:table-cell max-w-[150px] truncate"
                          title={appointment.destination}
                        >
                          {appointment.destination}
                        </TableCell>
                        <TableCell>{getTypeBadge(appointment.type)}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Confirmer</span>
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Annuler</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des réservations</CardTitle>
              <CardDescription>Vue d'ensemble de vos réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-4">
                    Réservations du{" "}
                    {date?.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </h3>

                  <div className="space-y-4">
                    {appointments
                      .filter((a) => a.date === "14/05/2025") // Filtrer par date sélectionnée
                      .map((appointment) => (
                        <div key={appointment.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{appointment.client}</div>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="truncate">{appointment.pickup}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="truncate">{appointment.destination}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                    {appointments.filter((a) => a.date === "14/05/2025").length === 0 && (
                      <div className="text-center py-8 text-gray-500">Aucune réservation pour cette date</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
