"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react"

export default function ContactForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "L'email n'est pas valide"
      }
    }

    // Validation du téléphone (facultatif mais doit être valide s'il est fourni)
    if (formData.phone && formData.phone.replace(/\./g, "").length < 10) {
      newErrors.phone = "Le numéro de téléphone doit contenir 10 chiffres"
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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
      console.log("Envoi du formulaire de contact avec les données:", formData)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("Réponse reçue:", data)

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Message envoyé !",
          description: "Votre message a été envoyé avec succès.",
          variant: "default",
        })

        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setIsSuccess(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          })
          router.refresh()
        }, 3000)
      } else {
        console.error("Erreur lors de l'envoi du formulaire:", data)
        toast({
          title: "Erreur",
          description: data.message || "Une erreur est survenue lors de l'envoi de votre message.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Exception lors de l'envoi du formulaire:", error)
      // Amélioration de la gestion des erreurs
      let errorMessage = "Une erreur est survenue lors de l'envoi de votre message."
      if (error instanceof Error) {
        errorMessage += ` Détails: ${error.message}`
        console.error("Stack trace:", error.stack)
      }
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message envoyé avec succès !</h3>
          <p className="text-gray-500 max-w-md">
            Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais. Un email de
            confirmation vous a été envoyé.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Téléphone</Label>
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
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              rows={6}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
          </div>
          <div className="text-sm text-gray-500">* Champs obligatoires</div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer mon message"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
