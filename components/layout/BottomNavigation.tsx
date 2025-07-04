"use client"

import { navigationItems } from "@/lib/constants"
import type { UserRole, ActiveFeature } from "@/types"
import { useDeviceDetection } from "@/hooks/useDeviceDetection"

interface BottomNavigationProps {
  currentUserRole: UserRole
  activeFeature: ActiveFeature
  onFeatureChange: (feature: ActiveFeature) => void
}

export function BottomNavigation({ currentUserRole, activeFeature, onFeatureChange }: BottomNavigationProps) {
  const { screenWidth } = useDeviceDetection()
  const filteredItems = navigationItems.filter((item) => currentUserRole && item.roles.includes(currentUserRole))

  // Responsive classes based on screen width
  const getResponsiveClasses = () => {
    if (screenWidth <= 374) {
      return {
        container: "h-14",
        item: "p-1",
        icon: "w-4 h-4",
        text: "text-xs",
      }
    } else if (screenWidth <= 389) {
      return {
        container: "h-15",
        item: "p-2",
        icon: "w-4 h-4",
        text: "text-xs",
      }
    } else if (screenWidth <= 427) {
      return {
        container: "h-16",
        item: "p-2",
        icon: "w-5 h-5",
        text: "text-xs",
      }
    } else if (screenWidth <= 479) {
      return {
        container: "h-17",
        item: "p-3",
        icon: "w-5 h-5",
        text: "text-xs",
      }
    } else if (screenWidth <= 767) {
      return {
        container: "h-18",
        item: "p-3",
        icon: "w-6 h-6",
        text: "text-sm",
      }
    } else {
      return {
        container: "h-20",
        item: "p-4",
        icon: "w-6 h-6",
        text: "text-sm",
      }
    }
  }

  const classes = getResponsiveClasses()

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-pb ${classes.container}`}>
      <div className="flex h-full">
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = activeFeature === item.id

          return (
            <button
              key={item.id}
              onClick={() => onFeatureChange(item.id as ActiveFeature)}
              className={`flex-1 flex flex-col items-center justify-center ${classes.item} transition-all duration-200 ${
                isActive
                  ? "text-green-600 bg-green-50 border-t-2 border-green-600"
                  : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              <Icon className={`${classes.icon} mb-1 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className={`${classes.text} font-medium leading-tight text-center`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
