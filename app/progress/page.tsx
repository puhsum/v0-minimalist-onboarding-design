"use client"

import { useState } from "react"
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { ArrowLeft, Calendar, Award, Percent, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthlyHeatmap } from "@/components/monthly-heatmap"
import { WeeklyFrequencyChart } from "@/components/weekly-frequency-chart"
import { generateWorkoutData, getMotivationalMessage } from "@/lib/workout-data"

export default function ProgressPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Generate sample workout data
  const workoutData = generateWorkoutData()

  // Calculate current streak
  const currentStreak = 5 // For demo purposes

  // Calculate longest streak
  const longestStreak = 14 // For demo purposes

  // Calculate this month's consistency percentage
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const workoutsThisMonth = workoutData.filter(
    (workout) =>
      workout.date.getMonth() === currentMonth.getMonth() && workout.date.getFullYear() === currentMonth.getFullYear(),
  )

  const consistencyPercentage = Math.round((workoutsThisMonth.length / daysInMonth.length) * 100)

  // Determine most frequent exercise
  const mostFrequentExercise = "Bench Press" // For demo purposes

  // Get motivational message based on current streak
  const motivationalMessage = getMotivationalMessage(currentStreak)

  // Handle month navigation
  const previousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1))
  }

  const nextMonth = () => {
    const nextMonth = subMonths(new Date(), -1)
    if (currentMonth < nextMonth) {
      setCurrentMonth((prev) => subMonths(prev, -1))
    }
  }

  // Filter workout data for the current month
  const currentMonthWorkouts = workoutData.filter(
    (workout) =>
      workout.date.getMonth() === currentMonth.getMonth() && workout.date.getFullYear() === currentMonth.getFullYear(),
  )

  return (
    <div className="container mx-auto max-w-3xl p-4">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Consistency Progress</h1>
      </div>

      {/* Motivational Message */}
      <Card className="mb-6 border-l-4 border-l-blue-600">
        <CardContent className="p-4">
          <p className="text-lg font-medium">{motivationalMessage}</p>
        </CardContent>
      </Card>

      {/* Consistency Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-muted-foreground">Current</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-muted-foreground">Best</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{longestStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Percent className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{consistencyPercentage}%</p>
            <p className="text-sm text-muted-foreground">Consistency</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Dumbbell className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-muted-foreground">Top Exercise</span>
            </div>
            <p className="mt-2 text-base font-bold leading-tight">{mostFrequentExercise}</p>
            <p className="text-sm text-muted-foreground">Most Frequent</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Heatmap */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Workout Frequency</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              disabled={currentMonth.getMonth() === new Date().getMonth()}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <MonthlyHeatmap month={currentMonth} workouts={currentMonthWorkouts} />
        </CardContent>
      </Card>

      {/* Weekly Frequency Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weekly Workout Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <WeeklyFrequencyChart workouts={workoutData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
