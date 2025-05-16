"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Sample exercise data with more details
const exerciseData = [
  {
    id: "1",
    name: "Bench Press",
    category: "Chest",
    lastWeight: "185 lbs",
    trend: "+5 lbs",
    trendDirection: "up",
    lastUsed: "2 days ago",
  },
  {
    id: "2",
    name: "Squat",
    category: "Legs",
    lastWeight: "225 lbs",
    trend: "+10 lbs",
    trendDirection: "up",
    lastUsed: "3 days ago",
  },
  {
    id: "3",
    name: "Deadlift",
    category: "Back",
    lastWeight: "275 lbs",
    trend: "+15 lbs",
    trendDirection: "up",
    lastUsed: "5 days ago",
  },
  {
    id: "4",
    name: "Shoulder Press",
    category: "Shoulders",
    lastWeight: "135 lbs",
    trend: "-5 lbs",
    trendDirection: "down",
    lastUsed: "1 week ago",
  },
  {
    id: "5",
    name: "Pull-ups",
    category: "Back",
    lastWeight: "Bodyweight",
    trend: "+2 reps",
    trendDirection: "up",
    lastUsed: "4 days ago",
  },
  {
    id: "6",
    name: "Bicep Curls",
    category: "Arms",
    lastWeight: "45 lbs",
    trend: "No change",
    trendDirection: "neutral",
    lastUsed: "2 days ago",
  },
]

export default function ExercisesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter exercises based on search query
  const filteredExercises = exerciseData.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto max-w-md p-4">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Exercises</h1>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search exercises..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.map((exercise) => (
          <Card
            key={exercise.id}
            className="cursor-pointer border-none bg-zinc-800 p-4 transition-colors hover:bg-zinc-700"
            onClick={() => router.push(`/exercise/${exercise.id}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{exercise.name}</h3>
                <p className="text-sm text-gray-400">
                  {exercise.category} • {exercise.lastUsed}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">{exercise.lastWeight}</div>
                <div className="flex items-center text-sm">
                  {getTrendIcon(exercise.trendDirection)}
                  <span
                    className={`ml-1 ${
                      exercise.trendDirection === "up"
                        ? "text-green-500"
                        : exercise.trendDirection === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {exercise.trend}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
