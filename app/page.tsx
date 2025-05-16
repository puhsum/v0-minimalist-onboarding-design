"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MonthlyCalendar } from "@/components/monthly-calendar"
import { StreakCounter } from "@/components/streak-counter"
import { WeeklySummary } from "@/components/weekly-summary"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { ExerciseList } from "@/components/exercise-list"

export default function Dashboard() {
  const [workoutDays, setWorkoutDays] = useState<Date[]>([
    new Date(2025, 4, 1),
    new Date(2025, 4, 3),
    new Date(2025, 4, 5),
    new Date(2025, 4, 8),
    new Date(2025, 4, 10),
    new Date(2025, 4, 12),
  ])

  const router = useRouter()

  const currentStreak = 3
  const weeklyGoal = 4
  const weeklyCompleted = 3

  const handleLogWorkout = () => {
    const today = new Date()
    // Check if today is already logged
    const alreadyLogged = workoutDays.some(
      (date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    )

    if (!alreadyLogged) {
      setWorkoutDays([...workoutDays, today])
    }

    // Navigate to the log workout page
    router.push("/log-workout")
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className="flex min-h-screen flex-col bg-black text-white">
        <main className="flex-1 space-y-4 p-4 pb-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Workout Tracker</h1>
            <Button variant="ghost" size="icon" className="rounded-full text-white">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Calendar Section */}
            <Card className="border-none bg-black p-4 shadow-none">
              <MonthlyCalendar workoutDays={workoutDays} currentDay={14} />
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <StreakCounter streak={currentStreak} />
              <WeeklySummary completed={weeklyCompleted} goal={weeklyGoal} />
            </div>

            {/* Exercises Section */}
            <Card className="border-none bg-zinc-800 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-medium">Your Exercises</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-500" onClick={() => router.push("/exercises")}>
                  View All
                </Button>
              </div>
              <ExerciseList />
            </Card>

            {/* Log Workout Button */}
            <Button
              onClick={handleLogWorkout}
              size="lg"
              className="mx-auto w-full max-w-xs bg-blue-600 py-6 text-lg font-medium hover:bg-blue-700"
            >
              Log Today's Workout
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    </ThemeProvider>
  )
}
