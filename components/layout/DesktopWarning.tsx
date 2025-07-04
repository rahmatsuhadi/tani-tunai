"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Tablet } from "lucide-react"

export function DesktopWarning() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Smartphone className="w-12 h-12 text-green-600" />
            <Tablet className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Tunai Tani</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Aplikasi ini dioptimalkan untuk perangkat mobile dan tablet.</p>
          <p className="text-sm text-gray-500">
            Silakan buka menggunakan smartphone atau tablet Anda untuk pengalaman terbaik.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
