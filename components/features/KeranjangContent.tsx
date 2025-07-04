"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBasket, Trash2, DollarSign } from "lucide-react"
import type { CartItem } from "@/types"

interface KeranjangContentProps {
  cartItems: CartItem[]
  onRemoveFromCart: (index: number) => void
}

export function KeranjangContent({ cartItems, onRemoveFromCart }: KeranjangContentProps) {
  const total = cartItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <ShoppingBasket className="w-6 h-6 mr-2 text-orange-600" />
          Keranjang Pre-order
        </h2>
        <p className="text-gray-600">Daftar proyek yang akan Anda dukung.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Keranjang Anda kosong. Yuk, dukung petani!</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">
                      {item.name} <span className="text-sm text-gray-500">({item.petani})</span>
                    </h4>
                    <p className="text-sm text-green-600">
                      Dukungan: <span className="font-semibold">Rp {item.amount.toLocaleString("id-ID")}</span>
                    </p>
                    <p className="text-sm text-blue-600">
                      Alokasi Dana Cadangan:{" "}
                      <span className="font-semibold">Rp {item.reserveFund.toLocaleString("id-ID")}</span>
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => onRemoveFromCart(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Ringkasan Dukungan:</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">Total: Rp {total.toLocaleString("id-ID")}</p>
                <p className="text-sm text-gray-600 mb-4">Termasuk 5% alokasi ke Dana Cadangan.</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Lanjutkan Pembayaran
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
