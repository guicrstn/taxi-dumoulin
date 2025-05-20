"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TimePickerDemoProps {
  onTimeChange: (time: string) => void
}

export function TimePickerDemo({ onTimeChange }: TimePickerDemoProps) {
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)

  // Générer les heures de 0 à 23
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Générer les minutes par tranches de 15 (0, 15, 30, 45)
  const minutes = [0, 15, 30, 45]

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour)
    if (selectedMinute !== null) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = selectedMinute.toString().padStart(2, "0")
      onTimeChange(`${formattedHour}:${formattedMinute}`)
    }
  }

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute)
    if (selectedHour !== null) {
      const formattedHour = selectedHour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      onTimeChange(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label>Heure</Label>
        <div className="grid grid-cols-6 gap-2 max-h-[200px] overflow-y-auto">
          {hours.map((hour) => (
            <Button
              key={hour}
              type="button"
              variant={selectedHour === hour ? "default" : "outline"}
              className={cn("text-center", selectedHour === hour ? "bg-primary text-primary-foreground" : "")}
              onClick={() => handleHourSelect(hour)}
            >
              {hour.toString().padStart(2, "0")}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Minutes</Label>
        <div className="grid grid-cols-4 gap-2">
          {minutes.map((minute) => (
            <Button
              key={minute}
              type="button"
              variant={selectedMinute === minute ? "default" : "outline"}
              className={cn("text-center", selectedMinute === minute ? "bg-primary text-primary-foreground" : "")}
              onClick={() => handleMinuteSelect(minute)}
            >
              {minute.toString().padStart(2, "0")}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
