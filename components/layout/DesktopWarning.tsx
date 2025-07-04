"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Tablet, Monitor } from "lucide-react"

export function DesktopWarning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
            <Monitor className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Tunai Tani</h1>
            <p className="text-gray-600 leading-relaxed">
              Aplikasi ini dioptimalkan untuk perangkat mobile dan tablet. Silakan akses menggunakan smartphone atau
              tablet Anda untuk pengalaman terbaik.
            </p>
          </div>

          <div className="flex justify-center space-x-8 pt-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Mobile</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Tablet className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Tablet</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">Ukuran layar saat ini terlalu besar untuk aplikasi mobile ini.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
