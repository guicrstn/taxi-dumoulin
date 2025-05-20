"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, LayoutDashboard, LogOut, Settings, Users, Car } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo Taxi Dumoulin" width={120} height={40} className="h-8 w-auto" />
            <span className="font-bold text-lg">Admin</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <LayoutDashboard className="h-4 w-4 inline-block mr-1" />
            Tableau de bord
          </Link>
          <Link href="/admin/reservations" className="text-sm font-medium transition-colors hover:text-primary">
            <Calendar className="h-4 w-4 inline-block mr-1" />
            Réservations
          </Link>
          <Link href="/admin/clients" className="text-sm font-medium transition-colors hover:text-primary">
            <Users className="h-4 w-4 inline-block mr-1" />
            Clients
          </Link>
          <Link href="/admin/ride-requests" className="text-sm font-medium transition-colors hover:text-primary">
            <Car className="h-4 w-4 inline-block mr-1" />
            Demandes de course
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/diverse-group.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
