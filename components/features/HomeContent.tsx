import { Card, CardContent } from "@/components/ui/card"
import { SproutIcon as Seedling, Handshake, BarChart3, Shield, Lightbulb } from "lucide-react"
import type { UserRole } from "@/types"

interface HomeContentProps {
  currentUserRole: UserRole
}

export function HomeContent({ currentUserRole }: HomeContentProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <Seedling className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Halo, {currentUserRole ? currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1) : "Pengguna"}!
          </h2>
          <p className="text-green-100">Selamat datang di Tunai Tani, platform yang mendukung pertanian Indonesia.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Handshake className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Dukung Pre-order</h3>
            <p className="text-sm text-gray-600">Dana untuk petani, panen untuk Anda.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Rekomendasi Akurat</h3>
            <p className="text-sm text-gray-600">Tanam sesuai kebutuhan pasar.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Dana Cadangan</h3>
            <p className="text-sm text-gray-600">Mitigasi risiko gagal panen.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Edukasi & Info</h3>
            <p className="text-sm text-gray-600">Tips dan informasi terbaru pertanian.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
