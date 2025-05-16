"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StrengthExercise } from "@/components/strength-exercise"
import { CardioExercise } from "@/components/cardio-exercise"
import { useRouter } from "next/navigation"

// Exercise type definition
type ExerciseType = "strength" | "cardio"

interface Exercise {
  id: string
  name: string
  type: ExerciseType
  sets?: {
    reps: string
    weight: string
  }[]
  duration?: string
  distance?: string
}

export default function LogWorkout() {
  const router = useRouter()
  const today = new Date()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExerciseName, setNewExerciseName] = useState("")
  const [exerciseType, setExerciseType] = useState<ExerciseType>("strength")

  const addExercise = () => {
    if (!newExerciseName.trim()) return

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      type: exerciseType,
      sets: exerciseType === "strength" ? [{ reps: "", weight: "" }] : undefined,
      duration: exerciseType === "cardio" ? "" : undefined,
      distance: exerciseType === "cardio" ? "" : undefined,
    }

    setExercises([...exercises, newExercise])
    setNewExerciseName("")
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id))
  }

  const updateExercise = (id: string, updatedExercise: Partial<Exercise>) => {
    setExercises(exercises.map((exercise) => (exercise.id === id ? { ...exercise, ...updatedExercise } : exercise)))
  }

  const handleCompleteWorkout = () => {
    console.log("Workout completed:", exercises)
    // Here you would save the workout data to your backend
    alert("Workout logged successfully!")
    router.push("/")
  }

  return (
    <div className="container mx-auto max-w-md space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Log Workout</h1>
          <p className="text-sm text-muted-foreground">{format(today, "EEEE, MMMM d, yyyy")}</p>
        </div>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="relative overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={() => removeExercise(exercise.id)}
            >
              <X className="h-4 w-4" />
            </Button>

            <CardContent className="p-4 pt-6">
              <div className="mb-3 font-medium">{exercise.name}</div>

              {exercise.type === "strength" && (
                <>
                  <div className="mb-2 text-sm text-muted-foreground">Total Sets: {exercise.sets?.length || 0}</div>
                  <StrengthExercise
                    sets={exercise.sets || []}
                    onChange={(sets) => updateExercise(exercise.id, { sets })}
                  />
                </>
              )}

              {exercise.type === "cardio" && (
                <CardioExercise
                  duration={exercise.duration || ""}
                  distance={exercise.distance || ""}
                  onChange={(data) => updateExercise(exercise.id, data)}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Exercise Section */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <Label htmlFor="exercise-name">Add Exercise</Label>
            <Input
              id="exercise-name"
              placeholder="Enter exercise name"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
            />

            <Tabs
              defaultValue="strength"
              className="w-full"
              onValueChange={(value) => setExerciseType(value as ExerciseType)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              onClick={addExercise}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!newExerciseName.trim()}
            >
              Add Exercise
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complete Workout Button */}
      <Button
        onClick={handleCompleteWorkout}
        className="w-full bg-blue-600 py-6 text-lg font-medium hover:bg-blue-700"
        disabled={exercises.length === 0}
      >
        Complete Workout
      </Button>
    </div>
  )
}
