"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimePickerDemoProps {
  onTimeChange: (time: string) => void
}

export function TimePickerDemo({ onTimeChange }: TimePickerDemoProps) {
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = React.useState<number | null>(null)
  const [showMinutes, setShowMinutes] = React.useState(false)

  // Générer les heures (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Générer les minutes par tranches de 15 (0, 15, 30, 45)
  const minutes = [0, 15, 30, 45]

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour)
    setShowMinutes(true)
  }

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute)

    if (selectedHour !== null) {
      const formattedHour = selectedHour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      onTimeChange(`${formattedHour}:${formattedMinute}`)
    }

    setShowMinutes(false)
  }

  const handleBackClick = () => {
    setShowMinutes(false)
  }

  return (
    <div className="w-full max-w-sm">
      {!showMinutes ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Sélectionnez l'heure</h3>
            <Clock className="h-4 w-4 opacity-50" />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant="outline"
                className={`text-center ${selectedHour === hour ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => handleHourClick(hour)}
              >
                {hour.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              ← Retour
            </Button>
            <h3 className="text-sm font-medium">
              {selectedHour !== null ? `${selectedHour.toString().padStart(2, "0")}:` : ""}
              Sélectionnez les minutes
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {minutes.map((minute) => (
              <Button
                key={minute}
                variant="outline"
                className={`text-center ${selectedMinute === minute ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => handleMinuteClick(minute)}
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
