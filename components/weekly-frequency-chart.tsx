"use client"

import { useMemo } from "react"
import { format, startOfWeek, subMonths } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface Workout {
  id: string
  date: Date
  exercises: string[]
}

interface WeeklyFrequencyChartProps {
  workouts: Workout[]
}

export function WeeklyFrequencyChart({ workouts }: WeeklyFrequencyChartProps) {
  // Prepare data for the chart
  const chartData = useMemo(() => {
    const months = [subMonths(new Date(), 2), subMonths(new Date(), 1), new Date()]

    return months.map((month) => {
      // Get workouts for this month
      const monthWorkouts = workouts.filter(
        (workout) => workout.date.getMonth() === month.getMonth() && workout.date.getFullYear() === month.getFullYear(),
      )

      // Count workouts per week
      const weeks: { [key: string]: number } = {}

      // Initialize weeks
      for (let weekNum = 1; weekNum <= 5; weekNum++) {
        weeks[`Week ${weekNum}`] = 0
      }

      // Count workouts per week
      monthWorkouts.forEach((workout) => {
        const date = workout.date
        const weekStart = startOfWeek(date)
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)

        // Calculate which week of the month this is
        const weekNumber = Math.ceil((weekStart.getDate() + (monthStart.getDay() % 7)) / 7)
        const weekKey = `Week ${weekNumber}`

        if (weeks[weekKey] !== undefined) {
          weeks[weekKey]++
        }
      })

      return {
        month: format(month, "MMM"),
        ...weeks,
      }
    })
  }, [workouts])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-md border bg-background p-2 shadow-sm">
                  <p className="font-medium">{label}</p>
                  {payload.map((entry, index) => (
                    <p key={index} className="text-sm">
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      {entry.name}: {entry.value} workouts
                    </p>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="Week 1" fill="#93c5fd" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Week 2" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Week 3" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Week 4" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Week 5" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
