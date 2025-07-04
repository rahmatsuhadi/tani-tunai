"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Play, CheckCircle } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function SimulasiContent() {
  const [modalTanam, setModalTanam] = useState("8000000")
  const [hargaJualKg, setHargaJualKg] = useState("20000")
  const [hasilSimulasi, setHasilSimulasi] = useState<any>(null)

  const hitungSimulasi = () => {
    const modal = Number.parseFloat(modalTanam)
    const harga = Number.parseFloat(hargaJualKg)

    if (isNaN(modal) || isNaN(harga) || modal <= 0 || harga <= 0) {
      alert("Mohon masukkan nilai yang valid.")
      return
    }

    const hasilPanenMinimal = modal / harga
    const targetPanenOptimal = hasilPanenMinimal * 1.25
    const estimasiMarginOptimal = targetPanenOptimal * harga - modal

    setHasilSimulasi({
      hasilPanenMinimal,
      targetPanenOptimal,
      estimasiMarginOptimal,
      modal,
      harga,
    })
  }

  const chartData = hasilSimulasi
    ? {
        labels: ["80% BEP", "90% BEP", "100% BEP", "110% BEP", "120% BEP"],
        datasets: [
          {
            label: "Pendapatan (Rp)",
            data: [
              hasilSimulasi.hasilPanenMinimal * 0.8 * hasilSimulasi.harga,
              hasilSimulasi.hasilPanenMinimal * 0.9 * hasilSimulasi.harga,
              hasilSimulasi.hasilPanenMinimal * 1.0 * hasilSimulasi.harga,
              hasilSimulasi.hasilPanenMinimal * 1.1 * hasilSimulasi.harga,
              hasilSimulasi.hasilPanenMinimal * 1.2 * hasilSimulasi.harga,
            ],
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Modal Tanam (Rp)",
            data: Array(5).fill(hasilSimulasi.modal),
            borderColor: "rgb(59, 130, 246)",
            borderDash: [5, 5],
            tension: 0.1,
            fill: false,
          },
        ],
      }
    : null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Calculator className="w-6 h-6 mr-2 text-blue-600" />
          Simulasi Balik Modal
        </h2>
        <p className="text-gray-600">Hitung estimasi hasil panen minimal agar Anda tidak rugi.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="modalTanam">Modal Tanam (Rp) *</Label>
            <Input id="modalTanam" type="number" value={modalTanam} onChange={(e) => setModalTanam(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="hargaJualKg">Harga Jual per Kg (Rp) *</Label>
            <Input
              id="hargaJualKg"
              type="number"
              value={hargaJualKg}
              onChange={(e) => setHargaJualKg(e.target.value)}
            />
          </div>
          <Button onClick={hitungSimulasi} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Hitung Simulasi
          </Button>

          {hasilSimulasi && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p>
                    <strong>Panen minimal (BEP):</strong> {hasilSimulasi.hasilPanenMinimal.toFixed(2)} kg
                  </p>
                  <p>
                    <strong>Target panen optimal (25% profit):</strong> {hasilSimulasi.targetPanenOptimal.toFixed(2)} kg
                  </p>
                  <p>
                    <strong>Estimasi margin:</strong>
                    <span className={hasilSimulasi.estimasiMarginOptimal >= 0 ? "text-green-600" : "text-red-600"}>
                      {" "}
                      Rp {hasilSimulasi.estimasiMarginOptimal.toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {chartData && (
        <Card>
          <CardHeader>
            <CardTitle>Grafik Potensi Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => "Rp " + (Number(value) / 1000000).toFixed(0) + "jt",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
