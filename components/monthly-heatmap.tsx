"use client"

import { useState, useEffect } from "react"
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, getDay, addDays } from "date-fns"
import { cn } from "@/lib/utils"

interface Workout {
  id: string
  date: Date
  exercises: string[]
}

interface MonthlyHeatmapProps {
  month: Date
  workouts: Workout[]
}

export function MonthlyHeatmap({ month, workouts }: MonthlyHeatmapProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([])

  useEffect(() => {
    // Get all days in the month
    const days = eachDayOfInterval({
      start: startOfMonth(month),
      end: endOfMonth(month),
    })

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = getDay(days[0])

    // Add empty days at the beginning to align with the correct day of the week
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => addDays(days[0], -(firstDayOfWeek - i)))

    setCalendarDays([...emptyDays, ...days])
  }, [month])

  // Function to determine workout intensity for a given day
  const getWorkoutIntensity = (day: Date) => {
    const workoutsOnDay = workouts.filter((workout) => isSameDay(workout.date, day))

    if (workoutsOnDay.length === 0) return 0

    // For demo purposes, we'll use the number of exercises as intensity
    // In a real app, you might use workout duration, volume, etc.
    const totalExercises = workoutsOnDay.reduce((sum, workout) => sum + workout.exercises.length, 0)

    if (totalExercises <= 3) return 1 // Light workout
    if (totalExercises <= 6) return 2 // Medium workout
    return 3 // Intense workout
  }

  // Get day names for the header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-2">
      {/* Day names header */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const intensity = getWorkoutIntensity(day)
          const isCurrentMonth = day.getMonth() === month.getMonth()
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={index}
              className={cn(
                "flex h-10 items-center justify-center rounded-md text-sm",
                !isCurrentMonth && "opacity-30",
                isToday && "border border-blue-600",
                intensity === 0 && "bg-muted",
                intensity === 1 && "bg-blue-200 dark:bg-blue-900/30",
                intensity === 2 && "bg-blue-300 dark:bg-blue-800/50",
                intensity === 3 && "bg-blue-500 dark:bg-blue-600",
                intensity > 0 && "text-blue-900 dark:text-blue-50",
              )}
            >
              {format(day, "d")}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end space-x-2 text-xs">
        <div className="flex items-center">
          <div className="mr-1 h-3 w-3 rounded-sm bg-muted"></div>
          <span>None</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-3 w-3 rounded-sm bg-blue-200 dark:bg-blue-900/30"></div>
          <span>Light</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-3 w-3 rounded-sm bg-blue-300 dark:bg-blue-800/50"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-3 w-3 rounded-sm bg-blue-500 dark:bg-blue-600"></div>
          <span>Intense</span>
        </div>
      </div>
    </div>
  )
}
