export type UserRole = "petani" | "konsumen" | null

export type ActiveFeature = "home" | "preorder" | "layanan" | "keranjang" | "profil" | "beranda"

export type LayananSubFeature = "simulasi" | "crowdfarming" | "rekomendasi" | "konsultasi" | "chat" | "laporan" | "petani-terdekat"
export type ProfilSubFeature = "dana-cadangan" | "pengaturan" | "bantuan"

export interface CartItem {
  id: string
  name: string
  petani: string
  amount: number
  reserveFund: number
}

export interface ReserveDataPetani {
  projectId: string
  projectName: string
  totalContribution: number
  reserveAmount: number
}

export interface ReserveDataKonsumen {
  orderId: string
  projectName: string
  contributionAmount: number
  reserveAllocated: number
  status: string
  date: string
  refundAmount?: number
}

export interface NavigationItem {
  id: string
  label: string
  icon: any
  roles: string[]
}

export interface Project {
  value: string
  label: string
  modal: number
  estimasiPanenKg: number
  estimasiHarga: number
}

export interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: string
  type: "sent" | "received"
}

export interface Expert {
  id: string
  name: string
  specialty: string
  icon: any
  available: boolean
}
