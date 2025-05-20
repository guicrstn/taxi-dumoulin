"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientSelector } from "@/components/client-selector"

const ReservationForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [passengers, setPassengers] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Si un client est sélectionné, utiliser ses informations
      const formData = {
        name: selectedClient ? selectedClient.name : name,
        email: selectedClient ? selectedClient.email : email,
        phone: selectedClient ? selectedClient.phone : phone,
        date: date ? `${date}${time ? " " + time : ""}` : "",
        pickup,
        dropoff,
        passengers,
        message,
      }

      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi de votre demande.")
      }

      setSuccess(true)
      // Réinitialiser le formulaire
      setName("")
      setEmail("")
      setPhone("")
      setDate(undefined)
      setTime("")
      setPickup("")
      setDropoff("")
      setPassengers("")
      setMessage("")
      setSelectedClient(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Client existant</h3>
        <ClientSelector
          onSelect={(client) => {
            setSelectedClient(client)
            if (client) {
              setName(client.name)
              setEmail(client.email)
              setPhone(client.phone)
            }
          }}
          disabled={isSubmitting}
        />
        <p className="text-sm text-gray-500 mt-2">
          Sélectionnez un client existant ou remplissez les informations ci-dessous.
        </p>
      </div>
      <div className="mb-4">
        <Label htmlFor="name">Nom complet *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting || !!selectedClient}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || !!selectedClient}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting || !!selectedClient}
        />
      </div>

      <div className="mb-4">
        <Label>Date et heure de prise en charge *</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} disabled={isSubmitting} initialFocus />
            </PopoverContent>
          </Popover>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} disabled={isSubmitting} />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="pickup">Lieu de prise en charge *</Label>
        <Input
          id="pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="dropoff">Lieu de dépose *</Label>
        <Input
          id="dropoff"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="passengers">Nombre de passagers *</Label>
        <Select onValueChange={setPassengers} defaultValue={passengers}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nombre de passagers" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <Label htmlFor="message">Message (facultatif)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Votre demande a été envoyée avec succès!</div>}

      <Button disabled={isSubmitting}>{isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}</Button>
    </form>
  )
}

export default ReservationForm
