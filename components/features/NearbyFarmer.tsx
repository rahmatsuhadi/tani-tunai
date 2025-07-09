
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"
import React, { useState } from "react" // Import React

// Define a type for a Farmer for better type safety
interface Farmer {
  id: string;
  name: string;
  distance: number;
  location: string;
  products: string[];
  avatar: string;
  bio: string;
}

interface NearbyFarmersProps {
  // Anda bisa menambahkan prop lain jika perlu, misalnya lokasi konsumen
  // untuk filtering yang lebih dinamis di masa depan.
}

export function NearbyFarmers({}: NearbyFarmersProps) {

  // Data Petani (Simulasi Lokasi)
   const [selectedFarmerProfile, setSelectedFarmerProfile] = useState<Farmer | null>(null);

  const allFarmers:Farmer[] = [
    {
      id: "farmer-1",
      name: "Bapak Budi",
      location: "Sleman, Yogyakarta",
      products: ["Cabai", "Bawang Merah"],
      avatar: "👨‍🌾",
      bio: "Petani cabai dan bawang merah berpengalaman dari Sleman.",
      distance: 5 // Simulasi jarak dalam km
    },
    {
      id: "farmer-2",
      name: "Ibu Siti",
      location: "Bantul, Yogyakarta",
      products: ["Padi", "Jagung"],
      avatar: "👩‍🌾",
      bio: "Mengelola sawah padi organik di Bantul.",
      distance: 12 // Simulasi jarak dalam km
    },
    {
      id: "farmer-3",
      name: "Pak Rahman",
      location: "Kulon Progo, Yogyakarta",
      products: ["Tomat", "Timun"],
      avatar: "👨‍🌾",
      bio: "Spesialis sayuran segar dari Kulon Progo.",
      distance: 25 // Simulasi jarak dalam km
    },
    {
        id: "farmer-4",
        name: "Bu Lestari",
        location: "Gunungkidul, Yogyakarta",
        products: ["Singkong", "Ubi Jalar"],
        avatar: "👩‍🌾",
        bio: "Membudidayakan tanaman pangan di area perbukitan Gunungkidul.",
        distance: 40 // Simulasi jarak dalam km
    },
  ];

  // Fungsi untuk menampilkan detail profil petani
  const viewFarmerProfile = (farmer: Farmer) => {
    setSelectedFarmerProfile(farmer);
  };

  // Fungsi untuk menutup detail profil petani
  const closeFarmerProfile = () => {
    setSelectedFarmerProfile(null);
  };



  // Di sini Anda bisa menambahkan logika filter petani terdekat
  // Berdasarkan lokasi konsumen, dll. Untuk demo, kita tampilkan semua.
  const nearbyFarmers = allFarmers; // Saat ini, semua dianggap "terdekat"

  return (
    <div className="space-y-6 p-4"> {/* Tambahkan padding untuk halaman */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <MapPin className="w-6 h-6 mr-2 text-green-600" />
          Petani Terdekat
        </h3>
        <p className="text-gray-600">Temukan petani di sekitar Anda dan jelajahi produk mereka.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Daftar Petani
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allFarmers.length > 0 ? (
              allFarmers.map((farmer) => (
                <div key={farmer.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-2xl">{farmer.avatar}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold">{farmer.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" /> {farmer.location}
                      {farmer.distance !== undefined && <span className="ml-2 text-xs text-gray-500">({farmer.distance} km)</span>}
                    </p>
                    <p className="text-xs text-gray-500">{farmer.products.join(", ")}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => viewFarmerProfile(farmer)}>
                    Lihat Profil
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada petani terdekat yang ditemukan saat ini.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tampilan Detail Profil Petani (Modal Sederhana) */}
      {selectedFarmerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl flex items-center">
                {selectedFarmerProfile.avatar} {selectedFarmerProfile.name}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={closeFarmerProfile}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" /> {selectedFarmerProfile.location}
                {selectedFarmerProfile.distance !== undefined && <span className="ml-2 text-xs text-gray-500">({selectedFarmerProfile.distance} km)</span>}
              </p>
              <p className="text-sm text-gray-700 font-medium">Produk Unggulan:</p>
              <p className="text-base text-gray-800">{selectedFarmerProfile.products.join(", ")}</p>
              <p className="text-sm text-gray-700 font-medium">Bio:</p>
              <p className="text-base text-gray-800">{selectedFarmerProfile.bio}</p>
              {/* <Button className="w-full mt-4">Mulai Chat</Button> */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}