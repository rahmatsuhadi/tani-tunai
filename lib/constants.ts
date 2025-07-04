import { Home, SproutIcon as Seedling, Grid3X3, ShoppingBasket, User } from "lucide-react"
import type { NavigationItem, ReserveDataPetani, ReserveDataKonsumen, Project } from "@/types"

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Beranda", icon: Home, roles: ["petani", "konsumen"] },
  { id: "preorder", label: "Pre-order", icon: Seedling, roles: ["petani", "konsumen"] },
  { id: "layanan", label: "Layanan", icon: Grid3X3, roles: ["petani", "konsumen"] },
  { id: "keranjang", label: "Keranjang", icon: ShoppingBasket, roles: ["konsumen"] },
  { id: "profil", label: "Profil", icon: User, roles: ["petani", "konsumen"] },
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
