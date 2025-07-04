"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, ClipboardList } from "lucide-react"
import { KonsultasiContent } from "./KonsultasiContent"
import { ChatContent } from "./ChatContent"
import { LaporanContent } from "./LaporanContent"
import type { UserRole, CommunicationSubFeature } from "@/types"

interface CommunicationContentProps {
  currentUserRole: UserRole
}

export function CommunicationContent({ currentUserRole }: CommunicationContentProps) {
  const [activeSubFeature, setActiveSubFeature] = useState<CommunicationSubFeature>("konsultasi")

  const communicationItems = [
    {
      id: "konsultasi" as CommunicationSubFeature,
      label: "Konsultasi Pakar",
      icon: Users,
      description: "Chat dengan ahli pertanian",
      roles: ["petani", "konsumen"],
      color: "bg-blue-500",
      badge: "2 Pakar Online",
    },
    {
      id: "chat" as CommunicationSubFeature,
      label: "Chat & Notifikasi",
      icon: MessageSquare,
      description: "Komunikasi dengan mitra",
      roles: ["petani", "konsumen"],
      color: "bg-green-500",
      badge: "3 Pesan Baru",
    },
    {
      id: "laporan" as CommunicationSubFeature,
      label: "Laporan Tanam",
      icon: ClipboardList,
      description: "Update progress proyek",
      roles: ["petani", "konsumen"],
      color: "bg-purple-500",
      badge: "5 Laporan",
    },
  ]

  const availableItems = communicationItems.filter((item) => currentUserRole && item.roles.includes(currentUserRole))

  const renderSubContent = () => {
    switch (activeSubFeature) {
      case "konsultasi":
        return <KonsultasiContent />
      case "chat":
        return <ChatContent />
      case "laporan":
        return <LaporanContent currentUserRole={currentUserRole} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Komunikasi</h2>
        <p className="text-gray-600">Berkomunikasi dengan pakar dan mitra</p>
      </div>

      {/* Sub Navigation */}
      <div className="grid grid-cols-1 gap-3">
        {availableItems.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeSubFeature === item.id ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => setActiveSubFeature(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    {activeSubFeature === item.id && <Badge className="bg-green-500 mb-1">Aktif</Badge>}
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sub Content */}
      <div className="mt-6">{renderSubContent()}</div>
    </div>
  )
}
