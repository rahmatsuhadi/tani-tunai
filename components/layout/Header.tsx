"use client"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User } from "lucide-react"
import type { UserRole } from "@/types"

interface HeaderProps {
  currentUserRole: UserRole
  onRoleChange: () => void
}

export function Header({ currentUserRole, onRoleChange }: HeaderProps) {
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "petani":
        return "Petani"
      case "konsumen":
        return "Konsumen"
      case "investor":
        return "Investor"
      default:
        return "User"
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "petani":
        return "bg-green-100 text-green-800"
      case "konsumen":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <header className="mobile-header">
      <div className="flex items-center justify-between h-full">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <img src="/placeholder-logo.png" alt="Tunai Tani" className="w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h1 className="text-responsive-lg font-bold text-green-700">Tunai Tani</h1>
            <Badge className={cn("text-xs hidden sm:inline-flex", getRoleColor(currentUserRole))}>
              {getRoleLabel(currentUserRole)}
            </Badge>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{getRoleLabel(currentUserRole)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil Saya
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRoleChange}>
                <LogOut className="w-4 h-4 mr-2" />
                Ganti Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
