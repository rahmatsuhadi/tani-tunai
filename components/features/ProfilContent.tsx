"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Settings,
  HelpCircle,
  User,
  Bell,
  Lock,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  Star,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import { DanaCadanganContent } from "./DanaCadanganContent"
import type { UserRole, ProfilSubFeature, ReserveDataPetani, ReserveDataKonsumen } from "@/types"

interface ProfilContentProps {
  currentUserRole: UserRole
  dummyPetaniReserveData: ReserveDataPetani[]
  dummyKonsumenReserveData: ReserveDataKonsumen[]
  onChangeRole: () => void
  onLogout: () =>  void
}

export function ProfilContent({
  currentUserRole,
  dummyPetaniReserveData,
  dummyKonsumenReserveData,
  onChangeRole,
  onLogout,
}: ProfilContentProps) {
  const [activeSubFeature, setActiveSubFeature] = useState<ProfilSubFeature | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  })

  const profilItems = [
    {
      id: "dana-cadangan" as ProfilSubFeature,
      label: "Dana Cadangan",
      icon: Shield,
      description: "Kelola dana cadangan Anda",
      roles: ["petani", "konsumen"],
      color: "bg-cyan-500",
      badge: "Aktif",
    },
    {
      id: "pengaturan" as ProfilSubFeature,
      label: "Pengaturan",
      icon: Settings,
      description: "Atur preferensi aplikasi",
      roles: ["petani", "konsumen"],
      color: "bg-gray-500",
    },
    {
      id: "bantuan" as ProfilSubFeature,
      label: "Bantuan & FAQ",
      icon: HelpCircle,
      description: "Panduan dan dukungan",
      roles: ["petani", "konsumen"],
      color: "bg-blue-500",
    },
  ]

  const userStats = {
    petani: {
      totalProjects: 3,
      activeProjects: 2,
      totalFunding: 7000000,
      successRate: 85,
      rating: 4.8,
    },
    konsumen: {
      totalSupport: 5,
      activeSupport: 3,
      totalInvested: 850000,
      successfulHarvests: 4,
      rating: 4.9,
    },
  }

  const renderSubContent = () => {
    switch (activeSubFeature) {
      case "dana-cadangan":
        return (
          <DanaCadanganContent
            currentUserRole={currentUserRole}
            dummyPetaniReserveData={dummyPetaniReserveData}
            dummyKonsumenReserveData={dummyKonsumenReserveData}
          />
        )
      case "pengaturan":
        return <PengaturanContent notifications={notifications} setNotifications={setNotifications} />
      case "bantuan":
        return <BantuanContent />
      default:
        return null
    }
  }

  if (activeSubFeature) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setActiveSubFeature(null)} className="mb-4">
          ← Kembali ke Profil
        </Button>
        {renderSubContent()}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profil</h2>
        <p className="text-gray-600">Kelola akun dan pengaturan Anda</p>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {currentUserRole === "petani" ? "Bapak Farmer" : "Ibu Investor"}
              </h3>
              <p className="text-gray-600 capitalize">{currentUserRole}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  {currentUserRole === "petani" ? userStats.petani.rating : userStats.konsumen.rating}
                </span>
                <Badge variant="outline" className="text-xs">
                  Verified
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" defaultValue={currentUserRole === "petani" ? "Bapak Farmer" : "Ibu Investor"} />
                </div>
                <div>
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input id="phone" defaultValue="+62 812-3456-7890" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@tunaitani.com" />
              </div>
              <div>
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea id="alamat" defaultValue="Jl. Pertanian No. 123, Bogor, Jawa Barat" rows={2} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>user@tunaitani.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Jl. Pertanian No. 123, Bogor, Jawa Barat</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Statistik Anda
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentUserRole === "petani" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.petani.totalProjects}</div>
                <div className="text-sm text-gray-600">Total Proyek</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.petani.activeProjects}</div>
                <div className="text-sm text-gray-600">Proyek Aktif</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  Rp {(userStats.petani.totalFunding / 1000000).toFixed(1)}jt
                </div>
                <div className="text-sm text-gray-600">Total Pendanaan</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userStats.petani.successRate}%</div>
                <div className="text-sm text-gray-600">Tingkat Sukses</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.konsumen.totalSupport}</div>
                <div className="text-sm text-gray-600">Total Dukungan</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.konsumen.activeSupport}</div>
                <div className="text-sm text-gray-600">Dukungan Aktif</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  Rp {(userStats.konsumen.totalInvested / 1000).toFixed(0)}rb
                </div>
                <div className="text-sm text-gray-600">Total Investasi</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userStats.konsumen.successfulHarvests}</div>
                <div className="text-sm text-gray-600">Panen Sukses</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Menu */}
      <div className="space-y-3">
        {profilItems.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4" onClick={() => setActiveSubFeature(item.id)}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    {item.badge && (
                      <Badge variant="outline" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={onChangeRole}>
              <User className="w-4 h-4 mr-2" />
              Ganti Role
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 bg-transparent" onClick={onLogout}>
              <Lock className="w-4 h-4 mr-2" />
              Keluar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PengaturanContent({
  notifications,
  setNotifications,
}: {
  notifications: any
  setNotifications: any
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Pengaturan</h3>
        <p className="text-gray-600">Atur preferensi aplikasi Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notif">Push Notification</Label>
              <p className="text-sm text-gray-600">Terima notifikasi langsung di perangkat</p>
            </div>
            <Switch
              id="push-notif"
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notif">Email</Label>
              <p className="text-sm text-gray-600">Terima notifikasi via email</p>
            </div>
            <Switch
              id="email-notif"
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notif">SMS</Label>
              <p className="text-sm text-gray-600">Terima notifikasi via SMS</p>
            </div>
            <Switch
              id="sms-notif"
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            Aplikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Versi Aplikasi</span>
            <Badge variant="outline">v1.0.0</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Bahasa</span>
            <Badge variant="outline">Indonesia</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Tema</span>
            <Badge variant="outline">Terang</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BantuanContent() {
  const faqItems = [
    {
      question: "Bagaimana cara mendukung proyek petani?",
      answer: "Pilih proyek di menu Pre-order, masukkan jumlah dukungan minimal Rp 50.000, lalu lanjutkan pembayaran.",
    },
    {
      question: "Apa itu Dana Cadangan?",
      answer: "Dana Cadangan adalah 5% dari dukungan Anda yang dialokasikan untuk mitigasi risiko gagal panen.",
    },
    {
      question: "Bagaimana cara berkomunikasi dengan petani?",
      answer: "Gunakan fitur Chat di menu Layanan untuk berkomunikasi langsung dengan petani yang Anda dukung.",
    },
    {
      question: "Kapan saya akan menerima hasil panen?",
      answer: "Hasil panen akan dikirim sesuai estimasi yang tertera di setiap proyek, biasanya 30-90 hari.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Bantuan & FAQ</h3>
        <p className="text-gray-600">Temukan jawaban untuk pertanyaan umum</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">{item.question}</h4>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hubungi Kami</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>support@tunaitani.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>+62 21-1234-5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <span>Live Chat (08:00 - 17:00 WIB)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
