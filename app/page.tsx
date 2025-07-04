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
import type { UserRole, ActiveFeature, CartItem } from "@/types"
import { useDeviceDetection } from "@/hooks/useDeviceDetection"
import { DesktopWarning } from "@/components/layout/DesktopWarning"

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
        dummyKonsumenReserveData={[]} 
        dummyPetaniReserveData={[]} onChangeRole={() =>{}} onLogout={() =>{} } />
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
