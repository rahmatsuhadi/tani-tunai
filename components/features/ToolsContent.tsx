"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Coins, TrendingUp } from "lucide-react"
import { SimulasiContent } from "./SimulasiContent"
import { CrowdfarmingContent } from "./CrowdfarmingContent"
import { RekomendasiContent } from "./RekomendasiContent"
import type { UserRole, ToolsSubFeature } from "@/types"

interface ToolsContentProps {
  currentUserRole: UserRole
}

export function ToolsContent({ currentUserRole }: ToolsContentProps) {
  const [activeSubFeature, setActiveSubFeature] = useState<ToolsSubFeature>("simulasi")

  const toolsItems = [
    {
      id: "simulasi" as ToolsSubFeature,
      label: "Simulasi Modal",
      icon: Calculator,
      description: "Hitung balik modal tanam",
      roles: ["petani"],
      color: "bg-blue-500",
    },
    {
      id: "crowdfarming" as ToolsSubFeature,
      label: "Simulasi Investasi",
      icon: Coins,
      description: "Hitung potensi investasi",
      roles: ["konsumen"],
      color: "bg-yellow-500",
    },
    {
      id: "rekomendasi" as ToolsSubFeature,
      label: "Rekomendasi",
      icon: TrendingUp,
      description: "Komoditas terpopuler",
      roles: ["petani", "konsumen"],
      color: "bg-green-500",
    },
  ]

  const availableTools = toolsItems.filter((tool) => currentUserRole && tool.roles.includes(currentUserRole))

  const renderSubContent = () => {
    switch (activeSubFeature) {
      case "simulasi":
        return <SimulasiContent />
      case "crowdfarming":
        return <CrowdfarmingContent />
      case "rekomendasi":
        return <RekomendasiContent />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Alat Bantu</h2>
        <p className="text-gray-600">Pilih alat bantu yang Anda butuhkan</p>
      </div>

      {/* Sub Navigation */}
      <div className="grid grid-cols-1 gap-3">
        {availableTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeSubFeature === tool.id ? "ring-2 ring-green-500 bg-green-50" : ""
              }`}
              onClick={() => setActiveSubFeature(tool.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{tool.label}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                  {activeSubFeature === tool.id && <Badge className="bg-green-500">Aktif</Badge>}
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
