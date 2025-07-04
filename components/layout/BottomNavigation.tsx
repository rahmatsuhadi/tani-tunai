"use client"

import { navigationItems } from "@/lib/constants"
import type { UserRole, ActiveFeature } from "@/types"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  currentUserRole: UserRole
  activeFeature: ActiveFeature
  onFeatureChange: (feature: ActiveFeature) => void
}

export function BottomNavigation({ currentUserRole, activeFeature, onFeatureChange }: BottomNavigationProps) {
  const filteredItems = navigationItems.filter((item) => item.roles.includes(currentUserRole!))

  return (
    <nav className="mobile-nav">
      <div className="flex h-full">
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = activeFeature === item.id

          return (
            <button
              key={item.id}
              onClick={() => onFeatureChange(item.id as ActiveFeature)}
              className={cn(
                "mobile-nav-item",
                isActive ? "text-green-600 bg-green-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              )}
              aria-label={item.label}
            >
              <Icon className={cn("mobile-nav-icon", isActive ? "text-green-600" : "text-gray-500")} />
              <span className={cn("mobile-nav-label", isActive ? "text-green-600 font-semibold" : "text-gray-500")}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
