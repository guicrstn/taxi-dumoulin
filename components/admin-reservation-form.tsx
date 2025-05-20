"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientSelector } from "@/components/client-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminReservationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    pickup: "",
    dropoff: "",
    passengers: "",
    message: "",
    status: "pending",
    adminNotes: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")

  const handleClientSelect = (client: any) => {
    setSelectedClient(client)
    if (client) {
      setFormData((prev) => ({
        ...prev,
        name: client.name,
        email: client.email,
        phone: client.phone,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy", { locale: fr })
      const dateTimeString = selectedTime ? `${formattedDate} à ${selectedTime}` : formattedDate
      setFormData((prev) => ({ ...prev, date: dateTimeString }))
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value
    setSelectedTime(time)
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd/MM/yyyy", { locale: fr })
      const dateTimeString = time ? `${formattedDate} à ${time}` : formattedDate
      setFormData((prev) => ({ ...prev, date: dateTimeString }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Une erreur est survenue")
      }

      toast({
        title: "Réservation créée",
        description: "La réservation a été créée avec succès.",
      })

      // Rediriger vers la liste des réservations
      router.push("/admin/reservations")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-800">Sélection du client</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientSelector onSelect={handleClientSelect} disabled={isSubmitting} />
          {selectedClient ? (
            <div className="mt-4 p-4 bg-blue-100 rounded-md">
              <p className="text-blue-800 font-medium">Client sélectionné: {selectedClient.name}</p>
              <p className="text-blue-700">
                {selectedClient.email} | {selectedClient.phone}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                onClick={() => handleClientSelect(null)}
              >
                Changer de client
              </Button>
            </div>
          ) : (
            <p className="text-sm text-blue-700 mt-2">
              Sélectionnez un client existant ou saisissez les informations manuellement ci-dessous.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting || !!selectedClient}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting || !!selectedClient}
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting || !!selectedClient}
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select
              name="status"
              defaultValue={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepted">Acceptée</SelectItem>
                <SelectItem value="rejected">Refusée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Date et heure de prise en charge *</Label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                    disabled={isSubmitting}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={fr}
                    disabled={isSubmitting}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-[140px]"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pickup">Lieu de prise en charge *</Label>
            <Input
              id="pickup"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="dropoff">Destination *</Label>
            <Input
              id="dropoff"
              name="dropoff"
              value={formData.dropoff}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="passengers">Nombre de passagers</Label>
            <Select
              name="passengers"
              defaultValue={formData.passengers}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, passengers: value }))}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="message">Message du client</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="adminNotes">Notes administrateur</Label>
          <Textarea
            id="adminNotes"
            name="adminNotes"
            value={formData.adminNotes}
            onChange={handleChange}
            rows={3}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création en cours...
            </>
          ) : (
            "Créer la réservation"
          )}
        </Button>
      </div>
    </form>
  )
}
