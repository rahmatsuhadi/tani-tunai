"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { BottomNavigation } from "@/components/layout/BottomNavigation"
import { RoleSelection } from "@/components/layout/RoleSelection"
import { DesktopWarning } from "@/components/layout/DesktopWarning"
import { HomeContent } from "@/components/features/HomeContent"
import { PreorderContent } from "@/components/features/PreorderContent"
import { LayananContent } from "@/components/features/LayananContent"
import { KeranjangContent } from "@/components/features/KeranjangContent"
import { ProfilContent } from "@/components/features/ProfilContent"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useDeviceDetection } from "@/hooks/useDeviceDetection"
import type { UserRole, ActiveFeature, CartItem } from "@/types"

export default function TunaiTaniApp() {
  const { isMobile } = useDeviceDetection()
  const [currentUserRole, setCurrentUserRole] = useLocalStorage<UserRole>("userRole", null)
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>("beranda")
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cartItems", [])

  // Show desktop warning if not mobile/tablet
  if (!isMobile) {
    return <DesktopWarning />
  }

  // Show role selection if no role is selected
  if (!currentUserRole || showRoleSelection) {
    return (
      <RoleSelection
        onSelectRole={(role) => {
          setCurrentUserRole(role)
          setShowRoleSelection(false)
          setActiveFeature("beranda")
        }}
      />
    )
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
        return <ProfilContent currentUserRole={currentUserRole} />
      default:
        return <HomeContent currentUserRole={currentUserRole} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header currentUserRole={currentUserRole} onRoleChange={() => setShowRoleSelection(true)} />

      {/* Main Content */}
      <main className="mobile-content">
        <div className="mobile-container">{renderContent()}</div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentUserRole={currentUserRole}
        activeFeature={activeFeature}
        onFeatureChange={setActiveFeature}
      />
    </div>
  )
}
