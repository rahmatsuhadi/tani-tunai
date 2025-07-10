"use client"

import { Button } from "@/components/ui/button"
import { User, Heart, SproutIcon as Seedling } from "lucide-react"
import type { UserRole } from "@/types"
import Image from "next/image"

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="space-y-4">
          <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-2xl flex items-center justify-center">
            <Image src="/logo.png" width={150} height={150} alt="brand"/>
          </div>
          <h1 className="text-4xl font-bold text-white">Order Tani</h1>
          <p className="text-green-100 text-lg leading-relaxed">
            Dukung pertanian lokal, panen masa depan bersama petani hebat.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onSelectRole("petani")}
            className="w-full h-14 text-lg bg-white text-green-700 hover:bg-green-50 shadow-lg"
            size="lg"
          >
            <User className="w-6 h-6 mr-3" />
            Saya Petani
          </Button>
          <Button
            onClick={() => onSelectRole("konsumen")}
            className="w-full h-14 text-lg bg-green-600 text-white hover:bg-green-700 shadow-lg"
            size="lg"
          >
            <Heart className="w-6 h-6 mr-3" />
            Saya Konsumen
          </Button>
        </div>
      </div>
    </div>
  )
}
