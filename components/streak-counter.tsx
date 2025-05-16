import { Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StreakCounterProps {
  streak: number
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <Card className="border-none bg-zinc-800">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-900/20 text-orange-500">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Current Streak</p>
          <p className="text-xl font-semibold text-white">{streak} days</p>
        </div>
      </CardContent>
    </Card>
  )
}
