import { Home, ShoppingCart, Wrench, User, SproutIcon as Seedling } from "lucide-react"
import type { NavigationItem, Project, ReserveDataPetani, ReserveDataKonsumen } from "@/types"

export const navigationItems: NavigationItem[] = [
  {
    id: "beranda",
    label: "Beranda",
    icon: Home,
    roles: ["petani", "konsumen", "investor"],
  },
  {
    id: "preorder",
    label: "Pre-order",
    icon: Seedling,
    roles: ["petani", "konsumen", "investor"],
  },
  {
    id: "layanan",
    label: "Layanan",
    icon: Wrench,
    roles: ["petani", "konsumen", "investor"],
  },
  {
    id: "keranjang",
    label: "Keranjang",
    icon: ShoppingCart,
    roles: ["konsumen"],
  },
  {
    id: "profil",
    label: "Profil",
    icon: User,
    roles: ["petani", "konsumen", "investor"],
  },
]

export const investmentProjects: Project[] = [
  {
    value: "cabai-rawit",
    label: "Cabai Rawit (Bapak Budi)",
    modal: 8000000,
    estimasiPanenKg: 400,
    estimasiHarga: 20000,
  },
  {
    value: "bayam-merah",
    label: "Bayam Merah (Ibu Siti)",
    modal: 2000000,
    estimasiPanenKg: 100,
    estimasiHarga: 25000,
  },
  {
    value: "wortel-organik",
    label: "Wortel Organik (Bapak Joni)",
    modal: 5000000,
    estimasiPanenKg: 250,
    estimasiHarga: 22000,
  },
]

export const dummyPetaniReserveData: ReserveDataPetani[] = [
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

export const dummyKonsumenReserveData: ReserveDataKonsumen[] = [
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

export const komoditasData = [
  { name: "Padi", trend: "naik", price: "Rp 6.500/kg", change: "+5%" },
  { name: "Jagung", trend: "turun", price: "Rp 4.200/kg", change: "-2%" },
  { name: "Kedelai", trend: "naik", price: "Rp 8.500/kg", change: "+8%" },
  { name: "Cabai", trend: "naik", price: "Rp 35.000/kg", change: "+15%" },
  { name: "Bawang Merah", trend: "turun", price: "Rp 28.000/kg", change: "-3%" },
]

export const pakarData = [
  {
    id: 1,
    name: "Dr. Siti Nurhaliza",
    specialty: "Ahli Tanaman Pangan",
    rating: 4.8,
    experience: "15 tahun",
    avatar: "/placeholder-user.jpg",
    status: "online",
  },
  {
    id: 2,
    name: "Prof. Budi Santoso",
    specialty: "Ahli Hama & Penyakit",
    rating: 4.9,
    experience: "20 tahun",
    avatar: "/placeholder-user.jpg",
    status: "online",
  },
  {
    id: 3,
    name: "Dr. Maya Sari",
    specialty: "Ahli Nutrisi Tanaman",
    rating: 4.7,
    experience: "12 tahun",
    avatar: "/placeholder-user.jpg",
    status: "offline",
  },
]
