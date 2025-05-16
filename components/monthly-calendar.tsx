"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MonthlyCalendarProps {
  workoutDays: Date[]
  currentDay?: number
}

export function MonthlyCalendar({ workoutDays, currentDay = new Date().getDate() }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)) // May 2025 to match screenshot

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isWorkoutDay = (day: number) => {
    return workoutDays.some(
      (date) =>
        date.getDate() === day &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear(),
    )
  }

  const isToday = (day: number) => {
    return day === currentDay
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())

  const monthName = currentDate.toLocaleString("default", { month: "long" })
  const year = currentDate.getFullYear()

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Create array for calendar days including empty cells for proper alignment
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth} className="text-white">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous month</span>
        </Button>

        <h2 className="text-xl font-medium text-white">
          {monthName} {year}
        </h2>

        <Button variant="ghost" size="icon" onClick={nextMonth} className="text-white">
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map((day) => (
          <div key={day} className="py-1 text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative flex h-12 items-center justify-center rounded-lg text-lg",
              day === null ? "invisible" : "bg-zinc-800",
              isToday(day as number) && "border border-white",
            )}
          >
            {day}
            {isWorkoutDay(day as number) && <div className="absolute bottom-2 h-1 w-1 rounded-full bg-white"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}
