"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react"

export default function MobileAdminMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Réservations", href: "/admin/reservations", icon: Calendar },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-6 py-6">
          <h2 className="text-lg font-semibold">Menu administrateur</h2>
          <div className="grid gap-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 text-gray-500" />
                  {item.name}
                </Link>
              )
            })}
          </div>
          <div className="border-t pt-4">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
