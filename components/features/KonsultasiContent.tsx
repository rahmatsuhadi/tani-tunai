"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bug, Beaker, Leaf, Send, Clock } from "lucide-react"

export function KonsultasiContent() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)
  const [consultationMessage, setConsultationMessage] = useState("")

  const experts = [
    {
      id: "1",
      name: "Dr. Agr. Surya Wijaya",
      specialty: "Hama & Penyakit",
      icon: Bug,
      available: true,
      rating: 4.8,
      experience: "15 tahun",
      consultations: 234,
      description: "Spesialis pengendalian hama dan penyakit tanaman hortikultura",
    },
    {
      id: "2",
      name: "Ir. Lestari Indah",
      specialty: "Nutrisi Tanaman",
      icon: Beaker,
      available: true,
      rating: 4.9,
      experience: "12 tahun",
      consultations: 189,
      description: "Ahli nutrisi dan pemupukan tanaman sayuran",
    },
    {
      id: "3",
      name: "Prof. Dr. Bambang Sutrisno",
      specialty: "Budidaya Organik",
      icon: Leaf,
      available: false,
      rating: 4.7,
      experience: "20 tahun",
      consultations: 312,
      description: "Pakar budidaya organik dan sustainable farming",
    },
  ]

  const handleStartConsultation = (expertId: string) => {
    setSelectedExpert(expertId)
  }

  const handleSendConsultation = () => {
    if (!consultationMessage.trim()) {
      alert("Mohon tulis pertanyaan Anda")
      return
    }

    alert("Konsultasi berhasil dikirim! Pakar akan merespons dalam 15-30 menit.")
    setConsultationMessage("")
    setSelectedExpert(null)
  }

  if (selectedExpert) {
    const expert = experts.find((e) => e.id === selectedExpert)
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Konsultasi dengan {expert?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  {expert?.icon && <expert.icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h4 className="font-semibold">{expert?.name}</h4>
                  <p className="text-sm text-gray-600">{expert?.specialty}</p>
                  <Badge className="bg-green-500 text-xs">Online</Badge>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pertanyaan Anda</label>
              <Textarea
                placeholder="Jelaskan masalah atau pertanyaan Anda secara detail..."
                value={consultationMessage}
                onChange={(e) => setConsultationMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSendConsultation} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Kirim Konsultasi
              </Button>
              <Button variant="outline" onClick={() => setSelectedExpert(null)}>
                Kembali
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">💡 Pakar akan merespons dalam 15-30 menit</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Konsultasi Pakar Tanaman
        </h3>
        <p className="text-gray-600">Dapatkan bimbingan langsung dari ahli pertanian.</p>
      </div>

      <div className="space-y-4">
        {experts.map((expert) => {
          const Icon = expert.icon
          return (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{expert.name}</h4>
                      {expert.available ? (
                        <Badge className="bg-green-500 text-xs">Online</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Offline
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-1">{expert.specialty}</p>
                    <p className="text-sm text-gray-600 mb-2">{expert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span>⭐ {expert.rating}</span>
                      <span>📅 {expert.experience}</span>
                      <span>💬 {expert.consultations} konsultasi</span>
                    </div>
                    <Button
                      size="sm"
                      disabled={!expert.available}
                      onClick={() => handleStartConsultation(expert.id)}
                      className="w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {expert.available ? "Mulai Konsultasi" : "Sedang Offline"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips Konsultasi Efektif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <p className="text-sm">Jelaskan masalah secara detail dengan foto jika memungkinkan</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">2</span>
              </div>
              <p className="text-sm">Sebutkan jenis tanaman, umur, dan kondisi lingkungan</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-sm font-bold">3</span>
              </div>
              <p className="text-sm">Tanyakan solusi praktis yang bisa diterapkan</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
