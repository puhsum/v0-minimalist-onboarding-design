"use client"

import { useRouter } from "next/navigation"
import { TrendingUp } from "lucide-react"

// Sample exercise data
const exercises = [
  { id: "1", name: "Bench Press", lastWeight: "185 lbs", trend: "+5 lbs" },
  { id: "2", name: "Squat", lastWeight: "225 lbs", trend: "+10 lbs" },
  { id: "3", name: "Deadlift", lastWeight: "275 lbs", trend: "+15 lbs" },
]

export function ExerciseList() {
  const router = useRouter()

  return (
    <div className="space-y-2">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex cursor-pointer items-center justify-between rounded-md bg-zinc-900 p-3 transition-colors hover:bg-zinc-800"
          onClick={() => router.push(`/exercise/${exercise.id}`)}
        >
          <div>
            <h3 className="font-medium">{exercise.name}</h3>
            <p className="text-sm text-gray-400">Last: {exercise.lastWeight}</p>
          </div>
          <div className="flex items-center text-green-500">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="text-sm">{exercise.trend}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
