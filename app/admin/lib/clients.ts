import { getAllReservations, type Reservation, deleteReservationsByEmail } from "./reservations"
import fs from "fs"
import path from "path"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  createdAt: string
  reservationCount: number
  lastReservation?: string
}

// Chemin vers le fichier JSON de stockage des clients
const CLIENTS_FILE = path.join(process.cwd(), "data", "clients.json")

// Fonction pour s'assurer que le répertoire data existe
function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Fonction pour lire tous les clients depuis le fichier
export async function readClientsFile(): Promise<Client[]> {
  ensureDataDirectoryExists()

  if (!fs.existsSync(CLIENTS_FILE)) {
    fs.writeFileSync(CLIENTS_FILE, JSON.stringify([]), "utf8")
    return []
  }

  const data = fs.readFileSync(CLIENTS_FILE, "utf8")
  return JSON.parse(data)
}

// Fonction pour écrire les clients dans le fichier
export async function writeClientsFile(clients: Client[]): Promise<void> {
  try {
    ensureDataDirectoryExists()
    const filePath = CLIENTS_FILE
    console.log(`[writeClientsFile] Écriture dans ${filePath}`)

    // Écrire d'abord dans un fichier temporaire
    const tempFile = `${filePath}.tmp`
    fs.writeFileSync(tempFile, JSON.stringify(clients, null, 2), "utf8")

    // Puis renommer pour éviter les problèmes de corruption
    fs.renameSync(tempFile, filePath)

    console.log(`[writeClientsFile] Écriture réussie: ${clients.length} clients`)
  } catch (error) {
    console.error("[writeClientsFile] Erreur lors de l'écriture du fichier clients:", error)
    throw error
  }
}

// Fonction pour obtenir tous les clients
export async function getAllClients(): Promise<Client[]> {
  // D'abord, essayer de lire depuis le fichier clients.json
  let clients = await readClientsFile()

  // Si le fichier est vide, générer les clients à partir des réservations
  if (clients.length === 0) {
    const reservations = await getAllReservations()

    // Créer un Map pour regrouper les réservations par email
    const clientsMap = new Map<string, Client>()

    // Parcourir toutes les réservations pour extraire les informations des clients
    reservations.forEach((reservation: Reservation) => {
      if (!reservation.email) return // Ignorer les réservations sans email

      const existingClient = clientsMap.get(reservation.email)

      if (existingClient) {
        // Mettre à jour le client existant
        existingClient.reservationCount += 1

        // Mettre à jour la date de dernière réservation si plus récente
        const reservationDate = new Date(reservation.createdAt)
        const lastReservationDate = existingClient.lastReservation
          ? new Date(existingClient.lastReservation)
          : new Date(0)

        if (reservationDate > lastReservationDate) {
          existingClient.lastReservation = reservation.createdAt
        }
      } else {
        // Créer un nouveau client
        clientsMap.set(reservation.email, {
          id: `client_${reservation.email.replace(/[^a-zA-Z0-9]/g, "_")}`,
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          createdAt: reservation.createdAt,
          reservationCount: 1,
          lastReservation: reservation.createdAt,
        })
      }
    })

    // Convertir le Map en tableau
    clients = Array.from(clientsMap.values())

    // Sauvegarder les clients dans le fichier
    await writeClientsFile(clients)
  }

  return clients
}

// Fonction pour obtenir un client par ID
export async function getClientById(id: string): Promise<Client | null> {
  try {
    console.log(`[getClientById] Recherche du client avec l'ID: ${id}`)
    const clients = await getAllClients()
    console.log(`[getClientById] ${clients.length} clients trouvés au total`)

    // Essayer de trouver une correspondance exacte d'abord
    let client = clients.find((client) => client.id === id)
    if (client) {
      console.log(`[getClientById] Client trouvé avec correspondance exacte: ${client.id}`)
      return client
    }

    // Si aucune correspondance exacte n'est trouvée, essayer de trouver une correspondance après décodage de l'URI
    const decodedId = decodeURIComponent(id)
    client = clients.find((client) => client.id === decodedId)
    if (client) {
      console.log(`[getClientById] Client trouvé après décodage URI: ${client.id}`)
      return client
    }

    // Si toujours aucune correspondance, essayer de trouver par email encodé dans l'ID
    if (id.startsWith("client_")) {
      // Extraire l'email potentiel de l'ID
      const emailPart = id.substring(7).replace(/_/g, ".")
      client = clients.find((client) => client.email.includes(emailPart))
      if (client) {
        console.log(`[getClientById] Client trouvé par partie d'email: ${client.id}`)
        return client
      }
    }

    // Dernière tentative: recherche partielle d'ID
    client = clients.find((client) => client.id.includes(id) || id.includes(client.id))
    if (client) {
      console.log(`[getClientById] Client trouvé par correspondance partielle d'ID: ${client.id}`)
      return client
    }

    console.log(`[getClientById] Aucun client trouvé avec l'ID: ${id}`)
    console.log(`[getClientById] Liste des IDs disponibles: ${clients.map((c) => c.id).join(", ")}`)
    return null
  } catch (error) {
    console.error(`[getClientById] Erreur lors de la recherche du client ${id}:`, error)
    return null
  }
}

// Fonction pour obtenir un client par email
export async function getClientByEmail(email: string): Promise<Client | null> {
  const clients = await getAllClients()
  return clients.find((client) => client.email === email) || null
}

// Fonction pour créer un nouveau client
export async function createClient(
  clientData: Omit<Client, "id" | "createdAt" | "reservationCount" | "lastReservation">,
): Promise<Client> {
  try {
    console.log("[createClient] Début de la création du client:", clientData)

    // S'assurer que le répertoire data existe
    ensureDataDirectoryExists()

    const clients = await getAllClients()
    console.log(`[createClient] ${clients.length} clients trouvés dans la base de données`)

    // Vérifier si un client avec cet email existe déjà
    const existingClient = clients.find((client) => client.email === clientData.email)
    if (existingClient) {
      console.log(`[createClient] Un client avec l'email ${clientData.email} existe déjà`)
      throw new Error("Un client avec cet email existe déjà")
    }

    // Créer un ID sécurisé pour le client
    const safeId = `client_${clientData.email.replace(/[^a-zA-Z0-9]/g, "_")}`
    console.log(`[createClient] ID généré pour le client: ${safeId}`)

    const newClient: Client = {
      ...clientData,
      id: safeId,
      createdAt: new Date().toISOString(),
      reservationCount: 0,
    }

    clients.push(newClient)

    console.log(`[createClient] Écriture du fichier clients avec ${clients.length} clients`)
    await writeClientsFile(clients)
    console.log(`[createClient] Client créé avec succès: ${newClient.id}`)

    return newClient
  } catch (error) {
    console.error("[createClient] Erreur lors de la création du client:", error)
    throw error
  }
}

// Fonction pour mettre à jour un client
export async function updateClient(
  id: string,
  clientData: Partial<Omit<Client, "id" | "createdAt">>,
): Promise<Client | null> {
  const clients = await getAllClients()
  const index = clients.findIndex((client) => client.id === id)

  if (index === -1) return null

  // Mettre à jour le client
  clients[index] = {
    ...clients[index],
    ...clientData,
  }

  await writeClientsFile(clients)
  return clients[index]
}

// Fonction pour supprimer un client
export async function deleteClient(id: string): Promise<boolean> {
  try {
    console.log(`[deleteClient] Tentative de suppression du client avec l'ID: ${id}`)
    const clients = await getAllClients()
    console.log(`[deleteClient] ${clients.length} clients trouvés au total`)

    const clientToDelete = await getClientById(id)

    if (!clientToDelete) {
      console.error(`[deleteClient] Client non trouvé avec l'ID: ${id}`)
      return false
    }

    console.log(`[deleteClient] Client trouvé: ${clientToDelete.id} (${clientToDelete.name})`)

    // Supprimer également toutes les réservations associées à ce client
    if (clientToDelete.email) {
      console.log(`[deleteClient] Suppression des réservations pour l'email: ${clientToDelete.email}`)
      await deleteReservationsByEmail(clientToDelete.email)
    }

    // Filtrer le client à supprimer
    const updatedClients = clients.filter((client) => client.id !== clientToDelete.id)
    console.log(`[deleteClient] Nombre de clients après filtrage: ${updatedClients.length}`)

    await writeClientsFile(updatedClients)
    console.log(`[deleteClient] Client supprimé avec succès: ${clientToDelete.id}`)

    return true
  } catch (error) {
    console.error(`[deleteClient] Erreur lors de la suppression du client ${id}:`, error)
    return false
  }
}

// Fonction pour obtenir les statistiques des clients
export async function getClientStats() {
  const clients = await getAllClients()

  return {
    totalClients: clients.length,
    activeClients: clients.filter((client) => client.reservationCount > 0).length,
    newClients: clients.filter((client) => {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return new Date(client.createdAt) >= thirtyDaysAgo
    }).length,
  }
}
