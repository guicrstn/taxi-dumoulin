"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Loader2, Calendar, Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { TimePickerDemo } from "../components/time-picker"

export default function ReservationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    pickup: "",
    dropoff: "",
    passengers: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")

  // Formatage du numéro de téléphone
  const formatPhoneNumber = (value: string) => {
    // Supprimer tous les caractères non numériques
    const numbers = value.replace(/\D/g, "")

    // Limiter à 10 chiffres
    const limitedNumbers = numbers.slice(0, 10)

    // Formater avec des points (XX.XX.XX.XX.XX)
    let formattedPhone = ""
    for (let i = 0; i < limitedNumbers.length; i++) {
      if (i > 0 && i % 2 === 0 && i < 10) {
        formattedPhone += "."
      }
      formattedPhone += limitedNumbers[i]
    }

    return formattedPhone
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formattedPhone }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Mettre à jour la date lorsque l'utilisateur sélectionne une date et une heure
  const updateDateTime = () => {
    if (selectedDate) {
      let dateTimeString = format(selectedDate, "dd/MM/yyyy", { locale: fr })

      if (selectedTime) {
        dateTimeString += ` à ${selectedTime}`
      }

      setFormData((prev) => ({ ...prev, date: dateTimeString }))
    }
  }

  // Mettre à jour la date lorsque l'utilisateur sélectionne une date
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      updateDateTime()
    }
  }

  // Mettre à jour l'heure lorsque l'utilisateur sélectionne une heure
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    updateDateTime()
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    // Validation de l'email
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "L'email n'est pas valide"
      }
    }

    // Validation du téléphone
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis"
    } else if (formData.phone.replace(/\./g, "").length < 10) {
      newErrors.phone = "Le numéro de téléphone doit contenir 10 chiffres"
    }

    // Validation des adresses
    if (!formData.pickup.trim()) {
      newErrors.pickup = "L'adresse de départ est requise"
    }

    if (!formData.dropoff.trim()) {
      newErrors.dropoff = "L'adresse d'arrivée est requise"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Ajouter des logs supplémentaires pour déboguer le problème d'envoi de formulaire

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Valider le formulaire
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Envoi du formulaire de réservation avec les données:", formData)

      // Vérifier que les champs obligatoires sont présents
      if (!formData.name || !formData.phone || !formData.pickup || !formData.dropoff) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Utiliser fetch avec gestion d'erreur améliorée
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      })

      // Vérifier si la réponse est OK avant de la parser
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erreur de réponse:", response.status, errorText)
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Réponse reçue:", data)

      setIsSuccess(true)
      toast({
        title: "Demande envoyée !",
        description: "Votre demande de réservation a été envoyée avec succès.",
        variant: "default",
      })

      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          pickup: "",
          dropoff: "",
          passengers: "",
          message: "",
        })
        setSelectedDate(undefined)
        setSelectedTime("")
        router.refresh()
      }, 3000)
    } catch (error) {
      console.error("Exception lors de l'envoi du formulaire:", error)
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demande de réservation</CardTitle>
        <CardDescription>Remplissez ce formulaire pour réserver un taxi</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Demande envoyée avec succès !</h3>
            <p className="text-gray-500 max-w-md">
              Nous avons bien reçu votre demande de réservation. Un email de confirmation vous a été envoyé. Nous vous
              contacterons rapidement pour confirmer votre réservation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="06.12.34.56.78"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date et heure</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedTime && "text-muted-foreground",
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {selectedTime || "Heure"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <TimePickerDemo onTimeChange={handleTimeSelect} />
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Date et heure souhaitées"
                  className="hidden"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup">Lieu de prise en charge *</Label>
                <Input
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  placeholder="Adresse de départ"
                  className={errors.pickup ? "border-red-500" : ""}
                />
                {errors.pickup && <p className="text-red-500 text-xs">{errors.pickup}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff">Destination *</Label>
                <Input
                  id="dropoff"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleChange}
                  placeholder="Adresse d'arrivée"
                  className={errors.dropoff ? "border-red-500" : ""}
                />
                {errors.dropoff && <p className="text-red-500 text-xs">{errors.dropoff}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers">Nombre de passagers</Label>
                <Input
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  placeholder="Nombre de personnes"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (facultatif)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Informations complémentaires"
                rows={4}
              />
            </div>
            <div className="text-sm text-gray-500">* Champs obligatoires</div>
          </form>
        )}
      </CardContent>
      <CardFooter>
        {!isSuccess && (
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
