"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { Doughnut } from "react-chartjs-2"

export function RekomendasiContent() {
  const chartData = {
    labels: ["Timun (35%)", "Bayam (28%)", "Bawang Merah (20%)", "Tomat (10%)", "Terong (7%)"],
    datasets: [
      {
        data: [35, 28, 20, 10, 7],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(147, 51, 234, 0.8)",
        ],
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  }

  const recommendations = [
    {
      name: "Timun",
      emoji: "🥒",
      percentage: 35,
      trend: "Naik",
      reason: "Permintaan tinggi untuk salad dan jus",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      badgeColor: "bg-blue-600",
    },
    {
      name: "Bayam",
      emoji: "🥬",
      percentage: 28,
      trend: "Stabil",
      reason: "Konsumsi rutin keluarga Indonesia",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      badgeColor: "bg-cyan-600",
    },
    {
      name: "Bawang Merah",
      emoji: "🧅",
      percentage: 20,
      trend: "Naik",
      reason: "Bumbu dapur wajib, harga stabil",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      badgeColor: "bg-gray-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Rekomendasi Komoditas
        </h3>
        <p className="text-gray-600">Tanam komoditas dengan permintaan tertinggi di pasar pre-order.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tren Permintaan Pre-order Bulan Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((item, index) => (
              <div key={index} className={`p-4 ${item.bgColor} rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={item.badgeColor}>{item.percentage}%</Badge>
                    <p className="text-xs text-gray-500 mt-1">Trend: {item.trend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribusi Permintaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom" as const,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips Penanaman</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">💡 Musim Tanam Optimal</h4>
              <p className="text-sm text-blue-600">
                Timun dan bayam cocok ditanam di musim kemarau dengan irigasi yang baik.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">🌱 Rotasi Tanaman</h4>
              <p className="text-sm text-green-600">
                Setelah panen bayam, lanjutkan dengan bawang merah untuk menjaga kesuburan tanah.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">📈 Strategi Pasar</h4>
              <p className="text-sm text-yellow-600">
                Diversifikasi tanaman sesuai permintaan untuk meminimalkan risiko.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
