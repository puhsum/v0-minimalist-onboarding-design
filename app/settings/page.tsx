"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Calendar, ChevronRight, CreditCard, LogOut, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const router = useRouter()

  // State for user preferences
  const [preferences, setPreferences] = useState({
    notifications: {
      workoutReminders: true,
      streakUpdates: true,
      missedWorkouts: false,
    },
    display: {
      calendarView: "monthly",
      darkMode: true,
    },
  })

  // Toggle notification preferences
  const toggleNotification = (key: keyof typeof preferences.notifications) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    })
  }

  // Update calendar view preference
  const setCalendarView = (value: string) => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        calendarView: value,
      },
    })
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setPreferences({
      ...preferences,
      display: {
        ...preferences.display,
        darkMode: !preferences.display.darkMode,
      },
    })
  }

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    alert("Logging out...")
    // Then redirect to login page
    // router.push("/login")
  }

  return (
    <div className="container mx-auto max-w-md p-4">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* User Profile Section */}
      <Card className="mb-6 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-lg font-medium">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@gmail.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 w-full justify-between"
            onClick={() => router.push("/settings/profile")}
          >
            Edit Profile
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Notification Preferences */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Notification Preferences</h2>
        </div>

        <Card>
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Workout Reminders</h3>
                <p className="text-sm text-muted-foreground">Get reminded about scheduled workouts</p>
              </div>
              <Switch
                checked={preferences.notifications.workoutReminders}
                onCheckedChange={() => toggleNotification("workoutReminders")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Streak Updates</h3>
                <p className="text-sm text-muted-foreground">Receive updates about your workout streaks</p>
              </div>
              <Switch
                checked={preferences.notifications.streakUpdates}
                onCheckedChange={() => toggleNotification("streakUpdates")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Missed Workout Alerts</h3>
                <p className="text-sm text-muted-foreground">Get alerted when you miss a scheduled workout</p>
              </div>
              <Switch
                checked={preferences.notifications.missedWorkouts}
                onCheckedChange={() => toggleNotification("missedWorkouts")}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Display Preferences */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Display Preferences</h2>
        </div>

        <Card>
          <div className="space-y-4 p-4">
            <div>
              <h3 className="mb-2 font-medium">Calendar View</h3>
              <RadioGroup
                value={preferences.display.calendarView}
                onValueChange={setCalendarView}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {preferences.display.darkMode ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                <h3 className="font-medium">Dark Mode</h3>
              </div>
              <Switch checked={preferences.display.darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </Card>
      </div>

      {/* Subscription Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Subscription</h2>
        </div>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-muted-foreground">Free Plan</p>
              </div>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Logout */}
      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}
