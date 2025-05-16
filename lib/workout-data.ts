import { subDays, addDays } from "date-fns"

// Generate sample workout data for the past 90 days
export function generateWorkoutData() {
  const workouts = []
  const today = new Date()
  const startDate = subDays(today, 90)

  // Common exercises
  const exercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Pull-ups",
    "Push-ups",
    "Shoulder Press",
    "Bicep Curls",
    "Tricep Extensions",
    "Leg Press",
    "Lat Pulldown",
  ]

  // Generate workouts with some randomness but also patterns
  // to simulate realistic workout behavior
  let currentDate = new Date(startDate)
  let currentStreak = 0

  while (currentDate <= today) {
    // Simulate a workout pattern with some randomness
    // More likely to work out on weekdays
    const dayOfWeek = currentDate.getDay() // 0 = Sunday, 6 = Saturday
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5

    // Higher probability of workout on weekdays
    const workoutProbability = isWeekday ? 0.7 : 0.4

    // If in a streak, higher probability to continue
    const streakBonus = Math.min(currentStreak * 0.05, 0.2)

    // Determine if there's a workout today
    if (Math.random() < workoutProbability + streakBonus) {
      // Create a workout with random exercises
      const numExercises = Math.floor(Math.random() * 5) + 2 // 2-6 exercises
      const workoutExercises = []

      for (let i = 0; i < numExercises; i++) {
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)]
        if (!workoutExercises.includes(randomExercise)) {
          workoutExercises.push(randomExercise)
        }
      }

      workouts.push({
        id: currentDate.toISOString(),
        date: new Date(currentDate),
        exercises: workoutExercises,
      })

      currentStreak++
    } else {
      currentStreak = 0
    }

    // Move to next day
    currentDate = addDays(currentDate, 1)
  }

  return workouts
}

// Get motivational message based on current streak
export function getMotivationalMessage(streak: number) {
  if (streak === 0) {
    return "Ready to start your fitness journey? Let's get moving today!"
  } else if (streak === 1) {
    return "Great job on your first workout! The journey of a thousand miles begins with a single step."
  } else if (streak <= 3) {
    return "You're building momentum! Keep showing up and watch your consistency grow."
  } else if (streak <= 7) {
    return `Impressive ${streak}-day streak! You're creating a powerful habit.`
  } else if (streak <= 14) {
    return `${streak} days strong! Your dedication is inspiring. Keep pushing your limits!`
  } else if (streak <= 30) {
    return `Incredible ${streak}-day streak! You're in the top tier of consistency.`
  } else {
    return `${streak} days of excellence! You're unstoppable. This isn't just a habit anymore—it's part of who you are.`
  }
}
