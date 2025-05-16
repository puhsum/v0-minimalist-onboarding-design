"use client"

import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartData {
  date: Date
  weight: number
}

interface ExerciseProgressChartProps {
  data: ChartData[]
}

export function ExerciseProgressChart({ data }: ExerciseProgressChartProps) {
  // Format data for the chart
  const formattedData = data.map((item) => ({
    date: format(item.date, "MMM d"),
    weight: item.weight,
    timestamp: item.date.getTime(), // For tooltip sorting
  }))

  // Calculate domain for Y axis (weight)
  const minWeight = Math.min(...data.map((d) => d.weight))
  const maxWeight = Math.max(...data.map((d) => d.weight))
  const padding = Math.ceil((maxWeight - minWeight) * 0.1) // 10% padding
  const yDomain = [Math.max(0, minWeight - padding), maxWeight + padding]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis
          domain={yDomain}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          tickCount={5}
          tickFormatter={(value) => `${value} lbs`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border p-2 shadow-sm">
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(payload[0].payload.timestamp), "MMMM d, yyyy")}
                  </div>
                  <div className="font-medium">{payload[0].value} lbs</div>
                </Card>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="#3b82f6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorWeight)"
          dot={{ r: 4, strokeWidth: 2, fill: "white" }}
          activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
