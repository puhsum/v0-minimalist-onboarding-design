"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Sample exercise data - in a real app, this would come from a database
const strengthExercises = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Pull-up",
  "Push-up",
  "Shoulder Press",
  "Bicep Curl",
  "Tricep Extension",
  "Lat Pulldown",
  "Leg Press",
]

const cardioExercises = [
  "Running",
  "Cycling",
  "Swimming",
  "Rowing",
  "Elliptical",
  "Stair Climber",
  "Jump Rope",
  "Hiking",
  "Walking",
]

interface ExerciseAutocompleteProps {
  onSelect: (exercise: string) => void
  type: "strength" | "cardio"
}

export function ExerciseAutocomplete({ onSelect, type }: ExerciseAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [customValue, setCustomValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const exercises = type === "strength" ? strengthExercises : cardioExercises

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setOpen(false)
    onSelect(currentValue)
    setValue("")
  }

  const handleCustomExercise = () => {
    if (customValue.trim()) {
      onSelect(customValue.trim())
      setCustomValue("")
      setOpen(false)
    }
  }

  useEffect(() => {
    if (!open) {
      setCustomValue("")
    }
  }, [open])

  return (
    <div className="flex flex-col space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
            {value ? value : "Select exercise..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search exercises..."
              ref={inputRef}
              value={customValue}
              onValueChange={setCustomValue}
            />
            <CommandList>
              <CommandEmpty>
                <div className="px-2 py-3 text-sm">
                  <p>No exercise found.</p>
                  <Button
                    variant="ghost"
                    className="mt-2 w-full justify-start text-blue-600"
                    onClick={handleCustomExercise}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add "{customValue}"
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {exercises.map((exercise) => (
                  <CommandItem key={exercise} value={exercise} onSelect={handleSelect}>
                    <Check className={cn("mr-2 h-4 w-4", value === exercise ? "opacity-100" : "opacity-0")} />
                    {exercise}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
