"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Send, Eye, CheckCircle, XCircle, Clock, Camera } from "lucide-react"
import type { UserRole } from "@/types"

interface LaporanContentProps {
  currentUserRole: UserRole
}

export function LaporanContent({ currentUserRole }: LaporanContentProps) {
  const [selectedProject, setSelectedProject] = useState("")
  const [statusTanaman, setStatusTanaman] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmitReport = () => {
    if (!selectedProject || !statusTanaman) {
      alert("Mohon lengkapi semua field yang wajib diisi")
      return
    }

    alert("Laporan berhasil dikirim!")
    setSelectedProject("")
    setStatusTanaman("")
    setDeskripsi("")
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const petaniReports = [
    {
      id: "1",
      project: "Cabai Rawit",
      status: "Baik",
      date: "20 Mei 2024",
      description: "Tanaman tumbuh subur, tidak ada hama",
      hasPhoto: true,
      views: 12,
    },
    {
      id: "2",
      project: "Cabai Rawit",
      status: "Perlu Perhatian",
      date: "15 Mei 2024",
      description: "Ada sedikit kutu daun, sudah disemprot",
      hasPhoto: true,
      views: 8,
    },
  ]

  const konsumenReports = [
    {
      id: "1",
      project: "Cabai Rawit (Bpk. Budi)",
      status: "Baik",
      date: "20 Mei 2024",
      description: "Tanaman tumbuh subur, tidak ada hama",
      hasPhoto: true,
      farmer: "Bapak Budi",
    },
    {
      id: "2",
      project: "Bayam Merah (Ibu Siti)",
      status: "Kerusakan",
      date: "18 Mei 2024",
      description: "Terkena banjir, sebagian tanaman rusak",
      hasPhoto: true,
      farmer: "Ibu Siti",
    },
    {
      id: "3",
      project: "Timun (Bpk. Jaya)",
      status: "Belum Ada Kabar",
      date: "10 Mei 2024",
      description: "Laporan terakhir 10 hari yang lalu",
      hasPhoto: false,
      farmer: "Bapak Jaya",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Baik":
        return "bg-green-500"
      case "Perlu Perhatian":
        return "bg-yellow-500"
      case "Kerusakan":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Baik":
        return <CheckCircle className="h-4 w-4" />
      case "Kerusakan":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 mr-2 text-purple-600" />
          Laporan Tanam
        </h3>
        <p className="text-gray-600">
          {currentUserRole === "petani"
            ? "Buat dan kelola laporan perkembangan tanaman Anda"
            : "Pantau laporan dari proyek yang Anda dukung"}
        </p>
      </div>

      {currentUserRole === "petani" ? (
        <div className="space-y-6">
          {/* Form Buat Laporan */}
          <Card>
            <CardHeader>
              <CardTitle>Buat Laporan Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="selectProyek">Pilih Proyek *</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih proyek..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabai-rawit">Cabai Rawit (Proyek #123)</SelectItem>
                    <SelectItem value="bayam-merah">Bayam Merah (Proyek #124)</SelectItem>
                    <SelectItem value="timun">Timun (Proyek #125)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="statusTanaman">Status Tanaman *</Label>
                <Select value={statusTanaman} onValueChange={setStatusTanaman}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baik">🟢 Baik - Tanaman sehat</SelectItem>
                    <SelectItem value="perlu-perhatian">🟡 Perlu Perhatian - Ada masalah kecil</SelectItem>
                    <SelectItem value="kerusakan">🔴 Kerusakan - Masalah serius</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deskripsi">Deskripsi Detail</Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Jelaskan kondisi tanaman, cuaca, tindakan yang dilakukan, dll..."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="foto">Unggah Foto</Label>
                <div className="mt-2">
                  <Input id="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <Button variant="outline" onClick={() => document.getElementById("foto")?.click()} className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    {selectedFile ? selectedFile.name : "Pilih Foto (Opsional)"}
                  </Button>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">✓ Foto siap diunggah: {selectedFile.name}</p>
                )}
              </div>

              <Button onClick={handleSubmitReport} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Kirim Laporan
              </Button>
            </CardContent>
          </Card>

          {/* Riwayat Laporan Petani */}
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Laporan Anda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {petaniReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{report.project}</h4>
                        <p className="text-sm text-gray-600">{report.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{report.hasPhoto ? "📷 Dengan foto" : "📝 Tanpa foto"}</span>
                      <span>👁️ {report.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Laporan untuk Konsumen */}
          <Card>
            <CardHeader>
              <CardTitle>Laporan Proyek yang Anda Dukung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {konsumenReports.map((report) => (
                  <Alert
                    key={report.id}
                    className={`${
                      report.status === "Kerusakan"
                        ? "border-red-200 bg-red-50"
                        : report.status === "Baik"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {getStatusIcon(report.status)}
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <strong>{report.project}</strong>
                            <Badge className={getStatusColor(report.status)} variant="secondary">
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-1">{report.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>👨‍🌾 {report.farmer}</span>
                            <span>📅 {report.date}</span>
                            {report.hasPhoto && <span>📷 Ada foto</span>}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistik Laporan */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600">Proyek Sehat</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Perlu Perhatian</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">1</div>
                  <div className="text-sm text-gray-600">Belum Update</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips Laporan */}
      <Card>
        <CardHeader>
          <CardTitle>Tips Membuat Laporan Berkualitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">📷</span>
              </div>
              <p className="text-sm">Sertakan foto yang jelas menunjukkan kondisi tanaman</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">📝</span>
              </div>
              <p className="text-sm">Jelaskan detail kondisi: cuaca, hama, penyakit, pertumbuhan</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">⏰</span>
              </div>
              <p className="text-sm">Update laporan secara rutin minimal 1 minggu sekali</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">🎯</span>
              </div>
              <p className="text-sm">Sebutkan tindakan yang sudah atau akan dilakukan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
