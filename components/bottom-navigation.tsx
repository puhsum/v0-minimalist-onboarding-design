"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, Calendar, BarChart, Dumbbell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const items = [
    {
      label: "Home",
      icon: Home,
      path: "/",
      active: pathname === "/",
    },
    {
      label: "Calendar",
      icon: Calendar,
      path: "/calendar",
      active: pathname === "/calendar",
    },
    {
      label: "Exercises",
      icon: Dumbbell,
      path: "/exercises",
      active: pathname === "/exercises" || pathname.startsWith("/exercise/"),
    },
    {
      label: "Stats",
      icon: BarChart,
      path: "/stats",
      active: pathname === "/stats",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-800 bg-black">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(item.path)}
            className={cn(
              "group inline-flex flex-col items-center justify-center px-5",
              item.active ? "text-white" : "text-gray-500",
            )}
          >
            <item.icon className={cn("mb-1 h-5 w-5", item.active ? "text-white" : "text-gray-500")} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
