"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Info, Coins } from "lucide-react"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import type { UserRole, ReserveDataPetani, ReserveDataKonsumen } from "@/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

interface DanaCadanganContentProps {
  currentUserRole: UserRole
  dummyPetaniReserveData: ReserveDataPetani[]
  dummyKonsumenReserveData: ReserveDataKonsumen[]
}

export function DanaCadanganContent({
  currentUserRole,
  dummyPetaniReserveData,
  dummyKonsumenReserveData,
}: DanaCadanganContentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Shield className="w-6 h-6 mr-2 text-cyan-600" />
          Dana Cadangan
        </h2>
        <p className="text-gray-600">Mitigasi risiko gagal panen untuk keamanan investasi Anda.</p>
      </div>

      {currentUserRole === "petani" ? (
        <PetaniReserveContent dummyPetaniReserveData={dummyPetaniReserveData} />
      ) : (
        <KonsumenReserveContent dummyKonsumenReserveData={dummyKonsumenReserveData} />
      )}
    </div>
  )
}

function PetaniReserveContent({ dummyPetaniReserveData }: { dummyPetaniReserveData: ReserveDataPetani[] }) {
  const totalReserve = dummyPetaniReserveData.reduce((sum, item) => sum + item.reserveAmount, 0)

  const chartData = {
    labels: dummyPetaniReserveData.map((item) => item.projectName),
    datasets: [
      {
        label: "Dana Cadangan Terkumpul (Rp)",
        data: dummyPetaniReserveData.map((item) => item.reserveAmount),
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dana Cadangan Proyek Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Dari setiap dukungan pre-order pada proyek Anda, 5% akan dialokasikan ke Dana Cadangan. Dana ini dikelola
            oleh sistem untuk perlindungan konsumen jika terjadi gagal panen.
          </p>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Total Dana Cadangan Terkumpul dari Proyek Anda:{" "}
              <span className="font-bold">Rp {totalReserve.toLocaleString("id-ID")}</span>
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-semibold mb-3">Detail Dana Cadangan per Proyek</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">Proyek</th>
                    <th className="border border-gray-300 p-2 text-right">Dukungan Terkumpul</th>
                    <th className="border border-gray-300 p-2 text-right">Dana Cadangan</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyPetaniReserveData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{item.projectName}</td>
                      <td className="border border-gray-300 p-2 text-right">
                        Rp {item.totalContribution.toLocaleString("id-ID")}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        Rp {item.reserveAmount.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribusi Dana Cadangan (Total)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => "Rp " + Number(value).toLocaleString("id-ID"),
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KonsumenReserveContent({ dummyKonsumenReserveData }: { dummyKonsumenReserveData: ReserveDataKonsumen[] }) {
  const totalContribution = dummyKonsumenReserveData.reduce((sum, item) => sum + item.reserveAllocated, 0)
  const totalRefund = dummyKonsumenReserveData.reduce((sum, item) => sum + (item.refundAmount || 0), 0)
  const activeBalance = totalContribution - totalRefund

  const chartData = {
    labels: ["Dana Cadangan Aktif", "Dana Cadangan Dikembalikan"],
    datasets: [
      {
        data: [activeBalance, totalRefund],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dana Cadangan Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Dari setiap kontribusi pre-order Anda, 5% dari jumlah dukungan dialokasikan ke Dana Cadangan. Dana ini
            dikelola oleh sistem untuk pengembalian sebagian jika panen gagal total atau sebagian.
          </p>

          <Alert>
            <Coins className="h-4 w-4" />
            <AlertDescription>
              Total Kontribusi Dana Cadangan Anda:{" "}
              <span className="font-bold">Rp {totalContribution.toLocaleString("id-ID")}</span>
            </AlertDescription>
          </Alert>

          {totalRefund > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Total Pengembalian Dana Cadangan Diterima:{" "}
                <span className="font-bold text-green-600">Rp {totalRefund.toLocaleString("id-ID")}</span>
              </AlertDescription>
            </Alert>
          )}

          <div>
            <h4 className="font-semibold mb-3">Riwayat Kontribusi & Pengembalian Dana Cadangan</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">Tanggal</th>
                    <th className="border border-gray-300 p-2 text-left">Proyek</th>
                    <th className="border border-gray-300 p-2 text-right">Kontribusi DC</th>
                    <th className="border border-gray-300 p-2 text-right">Pengembalian</th>
                    <th className="border border-gray-300 p-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyKonsumenReserveData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{item.date}</td>
                      <td className="border border-gray-300 p-2">{item.projectName}</td>
                      <td className="border border-gray-300 p-2 text-right">
                        Rp {item.reserveAllocated.toLocaleString("id-ID")}
                      </td>
                      <td
                        className={`border border-gray-300 p-2 text-right ${item.refundAmount ? "text-green-600" : "text-gray-400"}`}
                      >
                        {item.refundAmount ? `Rp ${item.refundAmount.toLocaleString("id-ID")}` : "-"}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <Badge variant={item.status === "Aktif" ? "default" : "secondary"}>{item.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Komposisi Dana Cadangan Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom" as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || ""
                        const value = context.parsed
                        return `${label}: Rp ${value.toLocaleString("id-ID")}`
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
