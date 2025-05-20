// Ce fichier redirige vers le nouveau chemin pour maintenir la compatibilité
import {
    getAllReservations,
    getReservationById,
    updateReservationStatus,
    approveReservation,
    rejectReservation,
  } from "@/app/admin/lib/reservations"
  
  // Réexporter les fonctions existantes
  export { getAllReservations, getReservationById, updateReservationStatus, approveReservation, rejectReservation }
  
  // Ajouter les fonctions manquantes
  export const getReservation = getReservationById
  
  export async function deleteReservation(id: string): Promise<boolean> {
    try {
      const reservations = await getAllReservations()
      const filteredReservations = reservations.filter((r) => r.id !== id)
  
      // Si aucune réservation n'a été supprimée, retourner false
      if (filteredReservations.length === reservations.length) {
        return false
      }
  
      // Écrire les réservations filtrées dans le fichier
      // Nous devons implémenter cette fonction ici car elle n'est pas exportée
      const fs = require("fs")
      const path = require("path")
      const DATA_FILE = path.join(process.cwd(), "data", "reservations.json")
      fs.writeFileSync(DATA_FILE, JSON.stringify(filteredReservations, null, 2), "utf8")
  
      return true
    } catch (error) {
      console.error(`[deleteReservation] Erreur lors de la suppression de la réservation ${id}:`, error)
      return false
    }
  }
  
  export async function createReservation(data: any): Promise<any> {
    try {
      // Générer un ID unique pour la réservation
      const id = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  
      // Préparer les données de la réservation
      const newReservation = {
        ...data,
        id,
        status: data.status || "pending",
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
  
      // Récupérer toutes les réservations existantes
      const reservations = await getAllReservations()
  
      // Ajouter la nouvelle réservation
      reservations.push(newReservation)
  
      // Écrire les réservations mises à jour dans le fichier
      const fs = require("fs")
      const path = require("path")
      const DATA_FILE = path.join(process.cwd(), "data", "reservations.json")
      fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8")
  
      return newReservation
    } catch (error) {
      console.error("[createReservation] Erreur lors de la création de la réservation:", error)
      throw error
    }
  }
  
  export async function getAllReservationsByEmail(email: string): Promise<any[]> {
    const reservations = await getAllReservations()
    return reservations.filter((r) => r.email === email)
  }
  
  export async function deleteReservationsByEmail(email: string): Promise<boolean> {
    try {
      const reservations = await getAllReservations()
      const filteredReservations = reservations.filter((r) => r.email !== email)
  
      // Si aucune réservation n'a été supprimée, retourner true (rien à faire)
      if (filteredReservations.length === reservations.length) {
        return true
      }
  
      // Écrire les réservations filtrées dans le fichier
      const fs = require("fs")
      const path = require("path")
      const DATA_FILE = path.join(process.cwd(), "data", "reservations.json")
      fs.writeFileSync(DATA_FILE, JSON.stringify(filteredReservations, null, 2), "utf8")
  
      return true
    } catch (error) {
      console.error(
        `[deleteReservationsByEmail] Erreur lors de la suppression des réservations pour l'email ${email}:`,
        error,
      )
      return false
    }
  }
  