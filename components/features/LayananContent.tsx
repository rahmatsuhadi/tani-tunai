"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Coins, TrendingUp, Users, MessageSquare, ClipboardList, UsersRound } from "lucide-react"
import { SimulasiContent } from "./SimulasiContent"
import { CrowdfarmingContent } from "./CrowdfarmingContent"
import { RekomendasiContent } from "./RekomendasiContent"
import { KonsultasiContent } from "./KonsultasiContent"
import { ChatContent } from "./ChatContent"
import { LaporanContent } from "./LaporanContent"
import type { UserRole, LayananSubFeature } from "@/types"
import { NearbyFarmers } from "./NearbyFarmer"

interface LayananContentProps {
  currentUserRole: UserRole
}

export function LayananContent({ currentUserRole }: LayananContentProps) {
  const [activeSubFeature, setActiveSubFeature] = useState<LayananSubFeature>("simulasi")

  const layananItems = [
    {
      id: "simulasi" as LayananSubFeature,
      label: "Simulasi Modal",
      icon: Calculator,
      description: "Hitung balik modal tanam",
      roles: ["petani"],
      color: "bg-blue-500",
      category: "Alat Bantu",
    },
    {
      id: "crowdfarming" as LayananSubFeature,
      label: "Simulasi Investasi",
      icon: Coins,
      description: "Hitung potensi investasi",
      roles: ["konsumen"],
      color: "bg-yellow-500",
      category: "Alat Bantu",
    },
    {
      id: "rekomendasi" as LayananSubFeature,
      label: "Rekomendasi",
      icon: TrendingUp,
      description: "Komoditas terpopuler",
      roles: ["petani", "konsumen"],
      color: "bg-green-500",
      category: "Alat Bantu",
    },
    {
      id: "konsultasi" as LayananSubFeature,
      label: "Konsultasi Pakar",
      icon: Users,
      description: "Chat dengan ahli pertanian",
      roles: ["petani"],
      color: "bg-purple-500",
      category: "Komunikasi",
      badge: "2 Pakar Online",
    },
    {
      id: "chat" as LayananSubFeature,
      label: "Chat & Notifikasi",
      icon: MessageSquare,
      description: "Komunikasi dengan mitra",
      roles: ["petani", "konsumen"],
      color: "bg-indigo-500",
      category: "Komunikasi",
      badge: "3 Pesan Baru",
    },
    {
      id: "laporan" as LayananSubFeature,
      label: "Laporan Tanam",
      icon: ClipboardList,
      description: "Update progress proyek",
      roles: ["petani", "konsumen"],
      color: "bg-pink-500",
      category: "Komunikasi",
      badge: "5 Laporan",
    },
    {
      id: "petani-terdekat" as LayananSubFeature,      
      label: "Petani Terdekat",
      icon: UsersRound,
      description: "Petani terdekat untuk Konsumen",
      roles: ["konsumen"],
      color: "bg-yellow-500",
      category: "Alat Bantu",
    }
  ]

  const availableServices = layananItems.filter((service) => currentUserRole && service.roles.includes(currentUserRole))

  // Group services by category
  const groupedServices = availableServices.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, typeof availableServices>,
  )

  const renderSubContent = () => {
    switch (activeSubFeature) {
      case "simulasi":
        return <SimulasiContent />
      case "crowdfarming":
        return <CrowdfarmingContent />
      case "rekomendasi":
        return <RekomendasiContent />
      case "konsultasi":
        return <KonsultasiContent />
      case "chat":
        return <ChatContent currentUserRole={currentUserRole} />
      case "laporan":
        return <LaporanContent currentUserRole={currentUserRole} />
      case "petani-terdekat":
        return <NearbyFarmers />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Layanan</h2>
        <p className="text-gray-600">Pilih layanan yang Anda butuhkan</p>
      </div>

      {/* Service Categories */}
      <div className="space-y-6">
        {Object.entries(groupedServices).map(([category, services]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {category}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      activeSubFeature === service.id ? "ring-2 ring-green-500 bg-green-50" : ""
                    }`}
                    onClick={() => setActiveSubFeature(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{service.label}</h4>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                        <div className="text-right">
                          {activeSubFeature === service.id && <Badge className="bg-green-500 mb-1">Aktif</Badge>}
                          {service.badge && (
                            <Badge variant="outline" className="text-xs">
                              {service.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sub Content */}
      <div className="mt-6">{renderSubContent()}</div>
    </div>
  )
}
