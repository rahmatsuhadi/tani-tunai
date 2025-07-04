"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Tablet, Monitor } from "lucide-react"

export function DesktopWarning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center space-x-4 mb-6">
            <Smartphone className="w-12 h-12 text-green-600" />
            <Tablet className="w-12 h-12 text-blue-600" />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Tunai Tani Mobile</h1>

            <p className="text-gray-600 leading-relaxed">
              Aplikasi ini dioptimalkan untuk perangkat mobile dan tablet. Silakan akses menggunakan smartphone atau
              tablet Anda untuk pengalaman terbaik.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Monitor className="w-5 h-5" />
              <span className="text-sm">Desktop tidak didukung</span>
            </div>
          </div>

          <div className="text-xs text-gray-400">Untuk akses desktop, silakan hubungi tim pengembang</div>
        </CardContent>
      </Card>
    </div>
  )
}
