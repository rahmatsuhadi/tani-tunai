import {
  Home,
  SproutIcon as Seedling,
  Wrench,
  ShoppingBasket,
  User,
  Calculator,
  Coins,
  TrendingUp,
  MessageSquare,
  ClipboardList,
} from "lucide-react"

export const navigationItems = [
  { id: "beranda", label: "Beranda", icon: Home, roles: ["petani", "konsumen", "investor"] },
  { id: "preorder", label: "Pre-order", icon: Seedling, roles: ["petani", "konsumen"] },
  { id: "layanan", label: "Layanan", icon: Wrench, roles: ["petani", "konsumen"] },
  { id: "keranjang", label: "Keranjang", icon: ShoppingBasket, roles: ["konsumen"] },
  { id: "profil", label: "Profil", icon: User, roles: ["petani", "konsumen", "investor"] },
]

export const toolsItems = [
  { id: "simulasi", label: "Simulasi", icon: Calculator, roles: ["petani"] },
  { id: "investasi", label: "Investasi", icon: Coins, roles: ["konsumen"] },
  { id: "rekomendasi", label: "Rekomendasi", icon: TrendingUp, roles: ["petani"] },
]

export const communicationItems = [
  { id: "konsultasi", label: "Konsultasi", icon: MessageSquare, roles: ["petani"] },
  { id: "chat", label: "Chat", icon: MessageSquare, roles: ["petani", "konsumen"] },
  { id: "laporan", label: "Laporan", icon: ClipboardList, roles: ["petani", "konsumen"] },
]

export const investmentProjects = [
  {
    id: "1",
    name: "Cabai Rawit Organik",
    farmer: "Bpk. Budi Santoso",
    location: "Malang, Jawa Timur",
    targetAmount: 8000000,
    currentAmount: 4500000,
    minInvestment: 100000,
    expectedReturn: 15,
    duration: "4 bulan",
    riskLevel: "Sedang",
    description: "Budidaya cabai rawit organik dengan sistem hidroponik modern",
    image: "/placeholder.svg?height=200&width=300",
    estimasiPanenKg: 1000,      // Total panen cabai rawit (kg)
    estimasiHarga: 20000        // Harga jual per kg (Rp)
  },
  {
    id: "2",
    name: "Bayam Merah Premium",
    farmer: "Ibu Siti Aminah",
    location: "Bandung, Jawa Barat",
    targetAmount: 3000000,
    currentAmount: 1800000,
    minInvestment: 50000,
    expectedReturn: 12,
    duration: "2 bulan",
    riskLevel: "Rendah",
    description: "Budidaya bayam merah premium untuk pasar ekspor",
    image: "/placeholder.svg?height=200&width=300",
    estimasiPanenKg: 500,       // Total panen bayam merah (kg)
    estimasiHarga: 10000        // Harga jual per kg (Rp)
  },
]

export const preorderProjects = [
  {
    id: "1",
    name: "Cabai Rawit",
    farmer: "Bpk. Budi",
    location: "Malang",
    pricePerKg: 25000,
    estimatedHarvest: "2024-08-15",
    minOrder: 5,
    maxOrder: 50,
    description: "Cabai rawit segar langsung dari petani",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Bayam Merah",
    farmer: "Ibu Siti",
    location: "Bandung",
    pricePerKg: 15000,
    estimatedHarvest: "2024-07-20",
    minOrder: 3,
    maxOrder: 30,
    description: "Bayam merah organik berkualitas tinggi",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Timun Hibrida",
    farmer: "Bpk. Joko",
    location: "Yogyakarta",
    pricePerKg: 12000,
    estimatedHarvest: "2024-07-30",
    minOrder: 10,
    maxOrder: 100,
    description: "Timun hibrida renyah dan segar",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const dummyPetaniReserveData = [
  {
    projectId: "1",
    projectName: "Cabai Rawit",
    totalContribution: 4000000,
    reserveAmount: 200000,
  },
  {
    projectId: "3",
    projectName: "Timun Hibrida",
    totalContribution: 3000000,
    reserveAmount: 150000,
  },
]

export const dummyKonsumenReserveData = [
  {
    orderId: "ORD001",
    projectName: "Cabai Rawit (Bpk. Budi)",
    contributionAmount: 100000,
    reserveAllocated: 5000,
    status: "Aktif",
    date: "2024-05-15",
  },
  {
    orderId: "ORD002",
    projectName: "Bayam Merah (Ibu Siti)",
    contributionAmount: 200000,
    reserveAllocated: 10000,
    status: "Aktif",
    date: "2024-05-20",
  },
  {
    orderId: "ORD003",
    projectName: "Tomat Organik (Bpk. Joko)",
    contributionAmount: 50000,
    reserveAllocated: 2500,
    status: "Pengembalian Dana",
    refundAmount: 2500,
    date: "2024-06-01",
  },
]
