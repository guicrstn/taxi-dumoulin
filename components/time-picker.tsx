"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface TimePickerProps {
  onTimeChange: (time: string) => void
}

export function TimePickerDemo({ onTimeChange }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = React.useState<string | null>(null)
  const [selectedMinute, setSelectedMinute] = React.useState<string | null>(null)

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = ["00", "15", "30", "45"]

  const handleHourClick = (hour: string) => {
    setSelectedHour(hour)
  }

  const handleMinuteClick = (minute: string) => {
    setSelectedMinute(minute)

    if (selectedHour) {
      const time = `${selectedHour}h${minute}`
      onTimeChange(time)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <Label>Sélectionnez l'heure</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Heure</Label>
          <div className="grid grid-cols-4 gap-1 max-h-[200px] overflow-y-auto">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant={selectedHour === hour ? "default" : "outline"}
                className="h-8 w-10"
                onClick={() => handleHourClick(hour)}
                type="button"
              >
                {hour}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Minute</Label>
          <div className="grid grid-cols-2 gap-1">
            {minutes.map((minute) => (
              <Button
                key={minute}
                variant={selectedMinute === minute ? "default" : "outline"}
                className="h-8 w-10"
                onClick={() => handleMinuteClick(minute)}
                disabled={!selectedHour}
                type="button"
              >
                {minute}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {selectedHour && selectedMinute && (
        <div className="text-center font-medium">
          Heure sélectionnée: {selectedHour}h{selectedMinute}
        </div>
      )}
    </div>
  )
}
