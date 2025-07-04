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
  const { isMobile, screenWidth } = useDeviceDetection()
  const filteredItems = navigationItems.filter((item) => currentUserRole && item.roles.includes(currentUserRole))

  // Responsive grid based on screen size and number of items
  const getGridCols = () => {
    const itemCount = filteredItems.length
    if (isMobile) {
      // Mobile: 5 items in a row, but adjust for smaller screens
      return itemCount <= 3 ? `grid-cols-${itemCount}` : itemCount <= 5 ? "grid-cols-5" : "grid-cols-3"
    } else {
      // Tablet: can fit 5 items comfortably
      return `grid-cols-${Math.min(itemCount, 5)}`
    }
  }

  // Responsive text and icon sizes
  const getItemClasses = () => {
    if (isMobile && screenWidth < 400) {
      return "p-2 min-w-0" // Extra small mobile
    } else if (isMobile) {
      return "p-3 min-w-0" // Regular mobile
    } else {
      return "p-4 min-w-0" // Tablet
    }
  }

  const getIconSize = () => {
    if (isMobile && screenWidth < 400) {
      return "w-4 h-4" // Extra small mobile
    } else if (isMobile) {
      return "w-5 h-5" // Regular mobile
    } else {
      return "w-6 h-6" // Tablet
    }
  }

  const getTextSize = () => {
    if (isMobile && screenWidth < 400) {
      return "text-xs" // Extra small mobile
    } else if (isMobile) {
      return "text-xs" // Regular mobile
    } else {
      return "text-sm" // Tablet
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-pb">
      <div className={`grid ${getGridCols()} divide-x divide-gray-200`}>
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = activeFeature === item.id

          return (
            <button
              key={item.id}
              onClick={() => onFeatureChange(item.id as ActiveFeature)}
              className={`flex flex-col items-center justify-center ${getItemClasses()} transition-all duration-200 ${
                isActive
                  ? "text-green-600 bg-green-50 border-t-2 border-green-600"
                  : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
              }`}
            >
              <Icon className={`${getIconSize()} mb-1 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className={`${getTextSize()} font-medium leading-tight text-center`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
