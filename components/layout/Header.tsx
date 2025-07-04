"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle, RotateCcw, LogOut, SproutIcon as Seedling } from "lucide-react"
import { useDeviceDetection } from "@/hooks/useDeviceDetection"
import type { UserRole } from "@/types"

interface HeaderProps {
  currentUserRole: UserRole
  onChangeRole: () => void
  onLogout: () => void
}

export function Header({ currentUserRole, onChangeRole, onLogout }: HeaderProps) {
  const { isMobile, screenWidth } = useDeviceDetection()

  const getTitleSize = () => {
    if (isMobile && screenWidth < 400) {
      return "text-lg" // Extra small mobile
    } else if (isMobile) {
      return "text-xl" // Regular mobile
    } else {
      return "text-2xl" // Tablet
    }
  }

  const getButtonSize = () => {
    if (isMobile && screenWidth < 400) {
      return "w-8 h-8" // Extra small mobile
    } else {
      return "w-10 h-10" // Regular mobile and tablet
    }
  }

  const getIconSize = () => {
    if (isMobile && screenWidth < 400) {
      return "w-5 h-5" // Extra small mobile
    } else {
      return "w-6 h-6" // Regular mobile and tablet
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 safe-area-pt">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Seedling className="w-5 h-5 text-white" />
          </div>
          <h1 className={`${getTitleSize()} font-bold text-green-600`}>Tunai Tani</h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Role Badge - Hidden on very small screens */}
          {!(isMobile && screenWidth < 400) && (
            <div className="px-3 py-1 bg-green-100 rounded-full">
              <span className="text-xs font-medium text-green-700">
                {currentUserRole ? currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1) : "Guest"}
              </span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={`${getButtonSize()} p-0`}>
                <UserCircle className={getIconSize()} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                {currentUserRole ? currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1) : "Guest"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onChangeRole}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Ganti Role
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
