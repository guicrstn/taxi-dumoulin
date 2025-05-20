"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function SimplifiedRequestForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Récupérer les données du formulaire
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      pickup: formData.get("pickup") as string,
      destination: formData.get("destination") as string,
      type: formData.get("type") as string,
      notes: formData.get("notes") as string,
    }

    try {
      console.log("Envoi des données:", data)

      // Envoyer les données au serveur
      const response = await fetch("/api/request-ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("Statut de la réponse:", response.status)

      // Récupérer le corps de la réponse pour le débogage
      const responseData = await response.json()
      console.log("Données de réponse:", responseData)

      if (!response.ok) {
        const errorMessage = responseData.error || "Erreur lors de l'envoi de la demande"
        console.error("Erreur API:", errorMessage)
        setError(errorMessage)
        throw new Error(errorMessage)
      }

      toast({
        title: "Demande envoyée",
        description: "Nous vous contacterons rapidement pour confirmer votre course.",
      })

      // Réinitialiser le formulaire
      e.currentTarget.reset()
    } catch (error) {
      console.error("Erreur complète:", error)

      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Un problème est survenu lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickup">Adresse de prise en charge</Label>
        <Input id="pickup" name="pickup" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Adresse de destination</Label>
        <Input id="destination" name="destination" required />
      </div>

      <div className="space-y-2">
        <Label>Type de transport</Label>
        <RadioGroup defaultValue="standard" name="type">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard">Standard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medical" id="medical" />
            <Label htmlFor="medical">Transport médical conventionné</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Informations complémentaires</Label>
        <Textarea id="notes" name="notes" placeholder="Date et heure souhaitées, besoins spécifiques, etc." rows={4} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande de course"
        )}
      </Button>
    </form>
  )
}
