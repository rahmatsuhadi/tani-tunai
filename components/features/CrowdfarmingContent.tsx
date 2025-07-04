"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Coins, PieChart, TrendingUp } from "lucide-react"
import { Pie } from "react-chartjs-2"
import { investmentProjects } from "@/lib/constants"

export function CrowdfarmingContent() {
  const [selectedProject, setSelectedProject] = useState("")
  const [jumlahDukungan, setJumlahDukungan] = useState("500000")
  const [hasilInvestasi, setHasilInvestasi] = useState<any>(null)

  const hitungInvestasi = () => {
    const project = investmentProjects.find((p) => p.id === selectedProject)
    const dukungan = Number.parseFloat(jumlahDukungan)

    if (!project || isNaN(dukungan) || dukungan <= 0) {
      alert("Mohon pilih proyek dan masukkan jumlah dukungan valid.")
      return
    }
  const persentaseDukungan = dukungan / project.targetAmount
  const estimasiHasilPanenKg = project.estimasiPanenKg * persentaseDukungan
  const estimasiPendapatan = estimasiHasilPanenKg * project.estimasiHarga
  const potensiPengembalian = estimasiPendapatan - dukungan

  

  setHasilInvestasi({
    project: project.name,
    persentaseDukungan: persentaseDukungan,
    estimasiHasilPanenKg: estimasiHasilPanenKg,
    estimasiPendapatan: estimasiPendapatan,
    potensiPengembalian: potensiPengembalian,
  })
  }

  const chartData = hasilInvestasi
    ? {
        labels: ["Dukungan Anda", "Dukungan Investor Lain", "Sisa Modal Dibutuhkan"],
        datasets: [
          {
            data: [
              hasilInvestasi.persentaseDukungan,
              (1 - hasilInvestasi.persentaseDukungan) * 100 * 0.8,
              100 - hasilInvestasi.persentaseDukungan - (1 - hasilInvestasi.persentaseDukungan) * 100 * 0.8,
            ],
            backgroundColor: ["#22c55e", "#3b82f6", "#fbbf24"],
            hoverOffset: 8,
          },
        ],
      }
    : null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Coins className="w-5 h-5 mr-2 text-yellow-600" />
          Simulasi Investasi Komoditas
        </h3>
        <p className="text-gray-600">Pilih proyek dan lihat potensi hasil dari investasi Anda.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="pilihProyek">Pilih Proyek *</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih proyek pre-order..." />
              </SelectTrigger>
              <SelectContent>
                {investmentProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                   {` ${project.name} (${project.farmer}) `}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jumlahDukungan">Jumlah Dukungan Anda (Rp) *</Label>
            <Input
              id="jumlahDukungan"
              type="number"
              value={jumlahDukungan}
              onChange={(e) => setJumlahDukungan(e.target.value)}
            />
          </div>
          <Button onClick={hitungInvestasi} className="w-full">
            <PieChart className="w-4 h-4 mr-2" />
            Hitung Simulasi Investasi
          </Button>

          {hasilInvestasi && (
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p>
                    <strong>Proyek:</strong> {hasilInvestasi.project}
                  </p>
                  <p>
                    <strong>Proporsi dukungan:</strong> {hasilInvestasi.persentaseDukungan.toFixed(2)}%
                  </p>
                  <p>
                    <strong>Estimasi bagian panen:</strong> {hasilInvestasi.estimasiHasilPanenKg.toFixed(2)} kg
                  </p>
                  <p>
                    <strong>Estimasi pendapatan:</strong> Rp {hasilInvestasi.estimasiPendapatan.toLocaleString("id-ID")}
                  </p>
                  <p>
                    <strong>Potensi keuntungan/kerugian:</strong>
                    <span className={hasilInvestasi.potensiPengembalian >= 0 ? "text-green-600" : "text-red-600"}>
                      {" "}
                      Rp {hasilInvestasi.potensiPengembalian.toLocaleString("id-ID")}
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
            <CardTitle>Alokasi Dana Proyek</CardTitle>
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
