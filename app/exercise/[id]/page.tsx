"use client"

import { useState } from "react"
import { format, subDays } from "date-fns"
import { ArrowLeft, Calendar, TrendingUp, Dumbbell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExerciseProgressChart } from "@/components/exercise-progress-chart"

// Sample data - in a real app, this would come from a database
const generateSampleData = () => {
  const workouts = []
  const today = new Date()

  // Generate 10 workouts over the past 60 days
  for (let i = 0; i < 10; i++) {
    const date = subDays(today, Math.floor(Math.random() * 60))
    const sets = []
    const numSets = Math.floor(Math.random() * 3) + 3 // 3-5 sets
    const baseWeight = 135 + i * 2.5 // Gradually increasing weight

    for (let j = 0; j < numSets; j++) {
      sets.push({
        reps: Math.floor(Math.random() * 4) + 8, // 8-12 reps
        weight: Math.round(baseWeight - j * 5), // Weight decreases slightly each set
      })
    }

    workouts.push({
      id: i.toString(),
      date,
      sets,
    })
  }

  // Sort by date, newest first
  return workouts.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export default function ExerciseProgress({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [workouts] = useState(generateSampleData())

  // For demo purposes, we'll use a fixed exercise name
  const exerciseName = "Bench Press"

  // Calculate metrics
  const last30Days = new Date()
  last30Days.setDate(last30Days.getDate() - 30)

  const workoutsLast30Days = workouts.filter((workout) => workout.date.getTime() > last30Days.getTime()).length

  const calculateMaxWeight = () => {
    let maxWeight = 0
    workouts.forEach((workout) => {
      workout.sets.forEach((set) => {
        if (set.weight > maxWeight) {
          maxWeight = set.weight
        }
      })
    })
    return maxWeight
  }

  const maxWeight = calculateMaxWeight()

  // Prepare data for the chart
  const chartData = workouts
    .map((workout) => {
      // Find the max weight for this workout
      const maxWorkoutWeight = Math.max(...workout.sets.map((set) => set.weight))

      return {
        date: workout.date,
        weight: maxWorkoutWeight,
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort by date, oldest first for the chart

  return (
    <div className="container mx-auto max-w-3xl p-4">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{exerciseName}</h1>
      </div>

      {/* Progress Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Weight Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ExerciseProgressChart data={chartData} />
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <Calendar className="mr-3 h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Last 30 Days</p>
              <p className="text-xl font-semibold">{workoutsLast30Days} workouts</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <TrendingUp className="mr-3 h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Max Weight</p>
              <p className="text-xl font-semibold">{maxWeight} lbs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Dumbbell className="mr-3 h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Volume</p>
              <p className="text-xl font-semibold">
                {workouts
                  .reduce((total, workout) => {
                    return (
                      total +
                      workout.sets.reduce((setTotal, set) => {
                        return setTotal + set.reps * set.weight
                      }, 0)
                    )
                  }, 0)
                  .toLocaleString()}{" "}
                lbs
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout History Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Workout History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Sets</TableHead>
                <TableHead>Reps</TableHead>
                <TableHead className="text-right">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workouts.map((workout, index) => (
                <TableRow key={workout.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{format(workout.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>{workout.sets.length}</TableCell>
                  <TableCell>{workout.sets.map((set) => set.reps).join(", ")}</TableCell>
                  <TableCell className="text-right">
                    {workout.sets.map((set) => `${set.weight} lbs`).join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
