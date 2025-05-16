import { BarChart2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface WeeklySummaryProps {
  completed: number
  goal: number
}

export function WeeklySummary({ completed, goal }: WeeklySummaryProps) {
  const percentage = Math.round((completed / goal) * 100)

  return (
    <Card className="border-none bg-zinc-800">
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/20 text-blue-500">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Weekly Progress</p>
            <p className="text-xl font-semibold text-white">
              {completed}/{goal} days
            </p>
          </div>
        </div>
        <Progress value={percentage} className="h-2 bg-zinc-700" indicatorClassName="bg-blue-500" />
      </CardContent>
    </Card>
  )
}
