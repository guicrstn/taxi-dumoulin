import fs from "fs"
import path from "path"

// Types pour les réservations
export type ReservationStatus = "pending" | "accepted" | "rejected"

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date?: string
  pickup: string
  dropoff: string
  passengers?: string
  message?: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
  adminNotes?: string
}

// Chemin vers le fichier JSON de stockage
const DATA_FILE = path.join(process.cwd(), "data", "reservations.json")

// Fonction pour s'assurer que le répertoire data existe
function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction pour lire toutes les réservations
export async function getAllReservations(): Promise<Reservation[]> {
  try {
    ensureDataDirectoryExists()

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf8")
      return []
    }

    // Ajouter un timestamp pour éviter le cache
    const timestamp = new Date().getTime()
    console.log(`[getAllReservations] Reading reservations at ${timestamp}`)

    const data = fs.readFileSync(DATA_FILE, "utf8")
    const reservations = JSON.parse(data)

    console.log(`[getAllReservations] Found ${reservations.length} reservations`)

    return reservations
  } catch (error) {
    console.error("[getAllReservations] Error:", error)
    // En cas d'erreur, retourner un tableau vide
    return []
  }
}

// Fonction pour écrire les réservations dans le fichier
export async function writeReservationsFile(reservations: Reservation[]): Promise<void> {
  try {
    ensureDataDirectoryExists()
    fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8")
  } catch (error) {
    console.error("[writeReservationsFile] Error:", error)
    throw error
  }
}

// Fonction pour obtenir une réservation par ID
export async function getReservationById(id: string): Promise<Reservation | null> {
  try {
    const reservations = await getAllReservations()
    return reservations.find((r) => r.id === id) || null
  } catch (error) {
    console.error("[getReservationById] Error:", error)
    return null
  }
}

// Alias pour getReservationById pour compatibilité
export const getReservation = getReservationById

// Fonction pour mettre à jour le statut d'une réservation
export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  adminNotes?: string,
): Promise<Reservation | null> {
  try {
    console.log(`[updateReservationStatus] Mise à jour de la réservation ${id} avec le statut ${status}`)
    ensureDataDirectoryExists()

    const reservations = await getAllReservations()
    console.log(`[updateReservationStatus] ${reservations.length} réservations trouvées`)

    const index = reservations.findIndex((r) => r.id === id)
    console.log(`[updateReservationStatus] Index de la réservation: ${index}`)

    if (index === -1) {
      console.error(`[updateReservationStatus] Réservation non trouvée: ${id}`)
      return null
    }

    // Créer une copie de la réservation mise à jour
    const updatedReservation = {
      ...reservations[index],
      status,
      adminNotes: adminNotes || reservations[index].adminNotes,
      updatedAt: new Date().toISOString(),
    }

    // Mettre à jour la réservation dans le tableau
    reservations[index] = updatedReservation

    // Vérifier que le fichier de données existe
    if (!fs.existsSync(DATA_FILE)) {
      console.log(`[updateReservationStatus] Création du fichier de données: ${DATA_FILE}`)
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf8")
    }

    // Écrire les données mises à jour
    console.log(`[updateReservationStatus] Écriture des données dans: ${DATA_FILE}`)
    fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8")
    console.log(`[updateReservationStatus] Données écrites avec succès`)

    return updatedReservation
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error("[updateReservationStatus] Error:", {
      error: errorMessage,
      stack: errorStack,
      id,
      status,
    })
    return null
  }
}

// Fonctions pour approuver et rejeter des réservations
export async function approveReservation(id: string, adminNotes?: string): Promise<Reservation | null> {
  return updateReservationStatus(id, "accepted", adminNotes)
}

export async function rejectReservation(id: string, adminNotes?: string): Promise<Reservation | null> {
  return updateReservationStatus(id, "rejected", adminNotes)
}

// Fonction pour obtenir toutes les réservations d'un client par email
export async function getAllReservationsByEmail(email: string): Promise<Reservation[]> {
  try {
    const reservations = await getAllReservations()
    // Trier les réservations par date de création (les plus récentes d'abord)
    return reservations
      .filter((r) => r.email === email)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error("[getAllReservationsByEmail] Error:", error)
    return []
  }
}

// Fonction pour supprimer une réservation
export async function deleteReservation(id: string): Promise<boolean> {
  try {
    console.log(`[deleteReservation] Suppression de la réservation ${id}`)
    ensureDataDirectoryExists()

    const reservations = await getAllReservations()
    console.log(`[deleteReservation] ${reservations.length} réservations trouvées`)

    const index = reservations.findIndex((r) => r.id === id)
    console.log(`[deleteReservation] Index de la réservation: ${index}`)

    if (index === -1) {
      console.error(`[deleteReservation] Réservation non trouvée: ${id}`)
      return false
    }

    // Supprimer la réservation du tableau
    reservations.splice(index, 1)

    // Écrire les données mises à jour
    console.log(`[deleteReservation] Écriture des données dans: ${DATA_FILE}`)
    fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8")
    console.log(`[deleteReservation] Données écrites avec succès`)

    return true
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error("[deleteReservation] Error:", {
      error: errorMessage,
      stack: errorStack,
      id,
    })
    return false
  }
}

// Fonction pour supprimer toutes les réservations d'un client par email
export async function deleteReservationsByEmail(email: string): Promise<number> {
  try {
    console.log(`[deleteReservationsByEmail] Suppression des réservations pour l'email ${email}`)
    ensureDataDirectoryExists()

    const reservations = await getAllReservations()
    console.log(`[deleteReservationsByEmail] ${reservations.length} réservations trouvées`)

    // Filtrer les réservations à conserver (celles qui n'ont pas l'email spécifié)
    const initialCount = reservations.length
    const filteredReservations = reservations.filter((r) => r.email !== email)
    const deletedCount = initialCount - filteredReservations.length

    console.log(`[deleteReservationsByEmail] ${deletedCount} réservations à supprimer`)

    // Écrire les données mises à jour
    if (deletedCount > 0) {
      console.log(`[deleteReservationsByEmail] Écriture des données dans: ${DATA_FILE}`)
      fs.writeFileSync(DATA_FILE, JSON.stringify(filteredReservations, null, 2), "utf8")
      console.log(`[deleteReservationsByEmail] Données écrites avec succès`)
    }

    return deletedCount
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[deleteReservationsByEmail] Error:", errorMessage)
    return 0
  }
}

// Fonction pour créer une nouvelle réservation
export async function createReservation(
  data: Omit<Reservation, "id" | "status" | "createdAt" | "updatedAt">,
): Promise<Reservation> {
  try {
    ensureDataDirectoryExists()

    const reservations = await getAllReservations()

    const newReservation: Reservation = {
      ...data,
      id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log(`[createReservation] Creating new reservation with ID: ${newReservation.id}`)

    reservations.push(newReservation)
    fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8")

    console.log(`[createReservation] Reservation created successfully. Total reservations: ${reservations.length}`)

    return newReservation
  } catch (error) {
    console.error("[createReservation] Error:", error)
    throw error
  }
}
