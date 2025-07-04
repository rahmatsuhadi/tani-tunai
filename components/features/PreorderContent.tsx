"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, ShoppingBasket, SproutIcon as Seedling, Info } from "lucide-react"
import type { UserRole, CartItem } from "@/types"
import Image from "next/image"

interface PreorderContentProps {
  currentUserRole: UserRole
  onAddToCart: (item: Omit<CartItem, "reserveFund"> & { amount: number }) => void
}

export function PreorderContent({ currentUserRole, onAddToCart }: PreorderContentProps) {
  const [dukunganAmounts, setDukunganAmounts] = useState<{ [key: string]: string }>({})

  const handleDukunganChange = (projectId: string, value: string) => {
    setDukunganAmounts((prev) => ({ ...prev, [projectId]: value }))
  }

  const handleAddToCart = (projectId: string, projectName: string, petani: string) => {
    const amount = Number.parseFloat(dukunganAmounts[projectId] || "0")
    if (amount < 50000) {
      alert("Mohon masukkan jumlah dukungan minimal Rp 50.000.")
      return
    }

    onAddToCart({
      id: projectId,
      name: projectName,
      petani: petani,
      amount: amount,
    })

    alert(`${projectName} (Rp ${amount.toLocaleString("id-ID")}) telah ditambahkan ke keranjang!`)
    setDukunganAmounts((prev) => ({ ...prev, [projectId]: "" }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          {/* <Seedling className="w-6 h-6 mr-2 text-green-600" /> */}
          <Image src="/logo.png" width={50} height={50} alt="brand"/>
          Pre-order Panen
        </h2>
      </div>

      {currentUserRole === "petani" ? (
        <PetaniPreorderView />
      ) : (
        <KonsumenPreorderView
          dukunganAmounts={dukunganAmounts}
          onDukunganChange={handleDukunganChange}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  )
}

function PetaniPreorderView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proyek Baru Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="namaKomoditas">Komoditas *</Label>
            <Input id="namaKomoditas" placeholder="Contoh: Cabai Rawit" />
          </div>
          <div>
            <Label htmlFor="luasLahan">Luas Lahan (m²) *</Label>
            <Input id="luasLahan" type="number" placeholder="Contoh: 500" />
          </div>
          <div>
            <Label htmlFor="modalDibutuhkan">Modal Dibutuhkan (Rp) *</Label>
            <Input id="modalDibutuhkan" type="number" placeholder="Contoh: 8000000" />
          </div>
          <div>
            <Label htmlFor="estimasiPanen">Estimasi Panen (hari) *</Label>
            <Input id="estimasiPanen" type="number" placeholder="Contoh: 75" />
          </div>
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Daftarkan Proyek
          </Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Proyek Aktif Anda</h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold">Cabai Rawit</h4>
              <Badge variant="secondary">Pending</Badge>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-3">
              <p>🏞️ Lahan: 500 m² | 📅 Panen: 75 hari</p>
              <p>
                💰 Modal: <span className="font-semibold">Rp 8.000.000</span>
              </p>
              <p>
                💵 Terkumpul: <span className="font-semibold text-green-600">Rp 4.000.000</span> (50%)
              </p>
            </div>
            <Progress value={50} className="mb-3" />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface KonsumenPreorderViewProps {
  dukunganAmounts: { [key: string]: string }
  onDukunganChange: (projectId: string, value: string) => void
  onAddToCart: (projectId: string, projectName: string, petani: string) => void
}

function KonsumenPreorderView({ dukunganAmounts, onDukunganChange, onAddToCart }: KonsumenPreorderViewProps) {
  return (
    <div className="space-y-4">
      <p className="text-center text-gray-600">Dukung proyek tanam petani favoritmu.</p>

      <div className="grid gap-4">
        <ProjectCard
          id="1"
          name="Cabai Rawit"
          petani="Bapak Budi"
          emoji="🌶️"
          image="assets/cabai.jpg"
          // bgColor="from-red-100 to-red-200"
          // textColor="text-red-600"
          lahan="500 m²"
          panen="75 hari"
          modal="Rp 8.000.000"
          terkumpul="Rp 4.000.000"
          progress={50}
          dukunganAmount={dukunganAmounts["1"] || ""}
          onDukunganChange={(value) => onDukunganChange("1", value)}
          onAddToCart={() => onAddToCart("1", "Cabai Rawit", "Bapak Budi")}
        />

        <ProjectCard
          id="2"
          name="Bayam Merah"
          petani="Ibu Siti"
          emoji="🥬"
          image="assets/bayam.jpg"
          // bgColor="from-green-100 to-green-200"
          // textColor="text-green-600"
          lahan="200 m²"
          panen="30 hari"
          modal="Rp 2.000.000"
          terkumpul="Rp 1.800.000"
          progress={90}
          dukunganAmount={dukunganAmounts["2"] || ""}
          onDukunganChange={(value) => onDukunganChange("2", value)}
          onAddToCart={() => onAddToCart("2", "Bayam Merah", "Ibu Siti")}
        />
      </div>
    </div>
  )
}

interface ProjectCardProps {
  id: string
  name: string
  petani: string
  emoji: string
  // bgColor: string
  // textColor: string
  image:string
  lahan: string
  panen: string
  modal: string
  terkumpul: string
  progress: number
  dukunganAmount: string
  onDukunganChange: (value: string) => void
  onAddToCart: () => void
}

function ProjectCard({
  id,
  name,
  petani,
  image,
  lahan,
  panen,
  modal,
  terkumpul,
  progress,
  dukunganAmount,
  onDukunganChange,
  onAddToCart,
}: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* <div className={`aspect-video bg-gradient-to-r ${bgColor} rounded-lg mb-3 flex items-center justify-center`}>
          <span className={`${textColor} font-semibold`}>
            {emoji} {name}
          </span>
        </div> */}
        <div className="aspect-video" style={{
          background: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {/* <Image src={"assets/bayam.jpg"} alt={`alt-${name}`} width={100} height={100} /> */}
        </div>
        <h4 className="font-semibold mb-1">{name}</h4>
        <p className="text-sm text-gray-600 mb-2">👨‍🌾 {petani}</p>
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p>
            🏞️ Lahan: {lahan} | 📅 Panen: {panen}
          </p>
          <p>
            💰 Modal: <span className="font-semibold">{modal}</span>
          </p>
          <p>
            💵 Terkumpul: <span className="font-semibold text-green-600">{terkumpul}</span> ({progress}%)
          </p>
        </div>
        <Progress value={progress} className="mb-3" />
        <Alert className="mb-3">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">5% Dana Cadangan</AlertDescription>
        </Alert>
        <div className="space-y-2">
          <Label htmlFor={`dukungan${id}`}>Dukung (Rp)</Label>
          <Input
            id={`dukungan${id}`}
            type="number"
            placeholder="Min Rp 50.000"
            value={dukunganAmount}
            onChange={(e) => onDukunganChange(e.target.value)}
          />
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onAddToCart}>
            <ShoppingBasket className="w-4 h-4 mr-2" />
            Dukung
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
