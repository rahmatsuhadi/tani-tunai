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
import Image from "next/image"

interface HeaderProps {
  currentUserRole: UserRole
  onChangeRole: () => void
  onLogout: () => void
}

export function Header({ currentUserRole, onChangeRole, onLogout }: HeaderProps) {
  const { screenWidth } = useDeviceDetection()

  // Responsive classes based on screen width
  const getResponsiveClasses = () => {
    if (screenWidth <= 374) {
      return {
        container: "h-14 px-3",
        logo: "w-6 h-6",
        title: "text-lg",
        badge: "text-xs px-2 py-1",
        button: "w-8 h-8",
        icon: "w-5 h-5",
      }
    } else if (screenWidth <= 389) {
      return {
        container: "h-15 px-4",
        logo: "w-7 h-7",
        title: "text-lg",
        badge: "text-xs px-2 py-1",
        button: "w-9 h-9",
        icon: "w-5 h-5",
      }
    } else if (screenWidth <= 427) {
      return {
        container: "h-16 px-4",
        logo: "w-8 h-8",
        title: "text-xl",
        badge: "text-xs px-2 py-1",
        button: "w-10 h-10",
        icon: "w-6 h-6",
      }
    } else if (screenWidth <= 479) {
      return {
        container: "h-17 px-5",
        logo: "w-8 h-8",
        title: "text-xl",
        badge: "text-sm px-3 py-1",
        button: "w-10 h-10",
        icon: "w-6 h-6",
      }
    } else if (screenWidth <= 767) {
      return {
        container: "h-18 px-6",
        logo: "w-9 h-9",
        title: "text-2xl",
        badge: "text-sm px-3 py-1",
        button: "w-11 h-11",
        icon: "w-6 h-6",
      }
    } else {
      return {
        container: "h-20 px-8",
        logo: "w-10 h-10",
        title: "text-2xl",
        badge: "text-sm px-4 py-2",
        button: "w-12 h-12",
        icon: "w-7 h-7",
      }
    }
  }

  const classes = getResponsiveClasses()

  return (
    <header className={`bg-white shadow-sm border-b sticky top-0 z-50 safe-area-pt ${classes.container}`}>
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center space-x-3">
          {/* <div className={`bg-green-600 rounded-full flex items-center justify-center ${classes.logo}`}> */}
            {/* <Seedling className="w-4 h-4 text-white" /> */}
            <Image src={"logo.png"} width={50} height={50} alt="brand"/>
          {/* </div> */}
          <h1 className={`${classes.title} font-bold text-green-600`}>Tunai Tani</h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Role Badge - Hidden on very small screens */}
          {screenWidth > 374 && (
            <div className={`px-3 py-1 bg-green-100 rounded-full ${classes.badge}`}>
              <span className="font-medium text-green-700">
                {currentUserRole ? currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1) : "Guest"}
              </span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={`${classes.button} p-0`}>
                <UserCircle className={classes.icon} />
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
