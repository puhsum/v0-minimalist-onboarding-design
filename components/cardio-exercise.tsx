"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CardioExerciseProps {
  duration: string
  distance: string
  onChange: (data: { duration?: string; distance?: string }) => void
}

export function CardioExercise({ duration, distance, onChange }: CardioExerciseProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="duration">Duration (min)</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => onChange({ duration: e.target.value })}
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="distance">Distance (km)</Label>
        <Input
          id="distance"
          type="number"
          value={distance}
          onChange={(e) => onChange({ distance: e.target.value })}
          placeholder="0"
        />
      </div>
    </div>
  )
}
