"use client"

import { useState } from "react"
import { RoleSelection } from "@/components/layout/RoleSelection"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { HomeContent } from "@/components/features/HomeContent"
import { PreorderContent } from "@/components/features/PreorderContent"
import { LayananContent } from "@/components/features/LayananContent"
import { KeranjangContent } from "@/components/features/KeranjangContent"
import { ProfilContent } from "@/components/features/ProfilContent"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { UserRole, ActiveFeature, CartItem, ReserveDataPetani, ReserveDataKonsumen } from "@/types"
import { useDeviceDetection } from "@/hooks/useDeviceDetection"
import { DesktopWarning } from "@/components/layout/DesktopWarning"
import { dummyKonsumenReserveData, dummyPetaniReserveData } from "@/lib/constants"


export const reserveDataPetani: ReserveDataPetani[] = [
  {
    projectId: "PROJ-001",
    projectName: "Cabai Merah Organik",
    totalContribution: 15000000, // Total kontribusi dalam Rupiah
    reserveAmount: 2500000,      // Jumlah yang dialokasikan sebagai cadangan
  },
  {
    projectId: "PROJ-002",
    projectName: "Tomat Cherry Unggul",
    totalContribution: 8000000,
    reserveAmount: 1000000,
  },
  {
    projectId: "PROJ-003",
    projectName: "Bawang Merah Panen Raya",
    totalContribution: 22000000,
    reserveAmount: 3500000,
  },
  {
    projectId: "PROJ-004",
    projectName: "Kangkung Hidroponik",
    totalContribution: 3000000,
    reserveAmount: 500000,
  },
];

export const reserveDataKonsumen: ReserveDataKonsumen[] = [
  {
    orderId: "ORD-K001-CBM",
    projectName: "Cabai Merah Organik",
    contributionAmount: 500000,
    reserveAllocated: 50000,
    status: "Active",
    date: "2024-03-10",
  },
  {
    orderId: "ORD-K002-TCU",
    projectName: "Tomat Cherry Unggul",
    contributionAmount: 200000,
    reserveAllocated: 20000,
    status: "Completed",
    date: "2024-04-20",
  },
  {
    orderId: "ORD-K003-BMR",
    projectName: "Bawang Merah Panen Raya",
    contributionAmount: 1000000,
    reserveAllocated: 100000,
    status: "Active",
    date: "2024-05-01",
  },
  {
    orderId: "ORD-K004-KNG",
    projectName: "Kangkung Hidroponik",
    contributionAmount: 150000,
    reserveAllocated: 0, // Contoh tanpa alokasi cadangan
    status: "Refunded",
    date: "2024-06-15",
    refundAmount: 150000, // Ada pengembalian dana
  },
  {
    orderId: "ORD-K005-CBM",
    projectName: "Cabai Merah Organik",
    contributionAmount: 750000,
    reserveAllocated: 75000,
    status: "Pending",
    date: "2025-07-01", // Tanggal di masa depan (setelah tanggal hari ini)
  },
];


export default function TunaiTaniApp() {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(null)
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>("beranda")
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("tunaiTaniCart", [])
  const [showRoleSelection, setShowRoleSelection] = useState(true)

  const { isMobileOrTablet } = useDeviceDetection()

  // Show desktop warning if not mobile or tablet
  if (!isMobileOrTablet) {
    return <DesktopWarning />
  }

  const selectRole = (role: UserRole) => {
    setCurrentUserRole(role)
    setShowRoleSelection(false)
    setActiveFeature("beranda")
  }

  const changeRole = () => {
    setCurrentUserRole(null)
    setShowRoleSelection(true)
    setCartItems([])
  }

  const logout = () => {
    setCurrentUserRole(null)
    setShowRoleSelection(true)
    setCartItems([])
  }

  const addToCart = (item: Omit<CartItem, "reserveFund"> & { amount: number }) => {
    const reserveFund = item.amount * 0.05
    const newItem: CartItem = { ...item, reserveFund }

    const existingIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id)
    let updatedCart: CartItem[]

    if (existingIndex > -1) {
      updatedCart = [...cartItems]
      updatedCart[existingIndex].amount += item.amount
      updatedCart[existingIndex].reserveFund += reserveFund
    } else {
      updatedCart = [...cartItems, newItem]
    }

    setCartItems(updatedCart)
  }

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedCart)
  }

  if (showRoleSelection) {
    return <RoleSelection onSelectRole={selectRole} />
  }

  const renderContent = () => {
    switch (activeFeature) {
      case "beranda":
        return <HomeContent currentUserRole={currentUserRole} />
      case "preorder":
        return <PreorderContent currentUserRole={currentUserRole} onAddToCart={addToCart} />
      case "layanan":
        return <LayananContent currentUserRole={currentUserRole} />
      case "keranjang":
        return <KeranjangContent cartItems={cartItems} onRemoveFromCart={removeFromCart} />
      case "profil":
        return <ProfilContent
        currentUserRole={currentUserRole}
        // currentUserRole={currentUserRole} }
        dummyKonsumenReserveData={dummyKonsumenReserveData} 
        dummyPetaniReserveData={dummyPetaniReserveData} 
        
        onChangeRole={() =>{}} onLogout={() =>{} } />
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Fitur tidak ditemukan.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      <Header currentUserRole={currentUserRole} onChangeRole={changeRole} onLogout={logout} />

      <main className="flex-1 p-3 sm:p-4 pb-20 sm:pb-24 overflow-x-hidden">{renderContent()}</main>

      <BottomNavigation
        currentUserRole={currentUserRole}
        activeFeature={activeFeature}
        onFeatureChange={setActiveFeature}
      />
    </div>
  )
}
