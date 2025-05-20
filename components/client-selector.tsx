"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Client {
  id: string
  name: string
  email: string
  phone: string
}

interface ClientSelectorProps {
  onSelect: (client: Client | null) => void
  initialClientEmail?: string
  disabled?: boolean
}

export function ClientSelector({ onSelect, initialClientEmail, disabled = false }: ClientSelectorProps) {
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/clients")
        if (!response.ok) throw new Error("Erreur lors de la récupération des clients")
        const data = await response.json()
        setClients(data.clients || [])

        // Si un email initial est fourni, sélectionner le client correspondant
        if (initialClientEmail) {
          const client = data.clients.find((c: Client) => c.email === initialClientEmail)
          if (client) {
            setSelectedClient(client)
            onSelect(client)
          }
        }
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [initialClientEmail, onSelect])

  const filteredClients = searchQuery
    ? clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone.includes(searchQuery),
      )
    : clients

  return (
    <div className="flex flex-col space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
            disabled={disabled}
          >
            {selectedClient ? (
              <span className="flex items-center">
                {selectedClient.name}
                <Badge variant="outline" className="ml-2">
                  {selectedClient.phone}
                </Badge>
              </span>
            ) : loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement des clients...
              </span>
            ) : (
              "Sélectionner un client"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start" sideOffset={5}>
          <Command>
            <CommandInput placeholder="Rechercher un client..." onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center">
                  <p className="text-sm text-gray-500">Aucun client trouvé</p>
                  <Link href="/admin/clients/new">
                    <Button variant="outline" size="sm" className="mt-2">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Créer un nouveau client
                    </Button>
                  </Link>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => {
                      setSelectedClient(client)
                      onSelect(client)
                      setOpen(false)
                    }}
                    className="flex justify-between"
                  >
                    <div>
                      <span>{client.name}</span>
                      <span className="ml-2 text-gray-500 text-sm">{client.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {client.phone}
                      </Badge>
                      {selectedClient?.id === client.id && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedClient && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedClient(null)
              onSelect(null)
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            disabled={disabled}
          >
            Effacer la sélection
          </Button>
        </div>
      )}
    </div>
  )
}
