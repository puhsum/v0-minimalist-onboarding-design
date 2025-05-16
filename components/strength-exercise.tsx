"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Set {
  reps: string
  weight: string
}

interface StrengthExerciseProps {
  sets: Set[]
  onChange: (sets: Set[]) => void
}

export function StrengthExercise({ sets, onChange }: StrengthExerciseProps) {
  const addSet = () => {
    onChange([...sets, { reps: "", weight: "" }])
  }

  const removeSet = (index: number) => {
    const newSets = [...sets]
    newSets.splice(index, 1)
    onChange(newSets)
  }

  const updateSet = (index: number, field: keyof Set, value: string) => {
    const newSets = [...sets]
    newSets[index] = { ...newSets[index], [field]: value }
    onChange(newSets)
  }

  // Calculate total volume (weight × reps) if both values are provided
  const calculateVolume = (set: Set) => {
    if (set.reps && set.weight) {
      return Number.parseInt(set.reps) * Number.parseInt(set.weight)
    }
    return null
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Reps</div>
        <div className="col-span-4">Weight</div>
        <div className="col-span-2">Vol</div>
        <div className="col-span-1"></div>
      </div>

      {sets.map((set, index) => {
        const volume = calculateVolume(set)

        return (
          <div key={index} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-1 text-sm font-medium">{index + 1}</div>
            <div className="col-span-4">
              <Input
                type="number"
                value={set.reps}
                onChange={(e) => updateSet(index, "reps", e.target.value)}
                className="h-9"
                placeholder="0"
              />
            </div>
            <div className="col-span-4">
              <Input
                type="number"
                value={set.weight}
                onChange={(e) => updateSet(index, "weight", e.target.value)}
                className="h-9"
                placeholder="0"
              />
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">{volume !== null ? volume : "-"}</div>
            <div className="col-span-1">
              {sets.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeSet(index)} className="h-7 w-7">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )
      })}

      <Button variant="outline" size="sm" onClick={addSet} className="mt-2 w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Set
      </Button>
    </div>
  )
}
