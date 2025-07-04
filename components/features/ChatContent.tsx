"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Bell, User } from "lucide-react"
import type { ChatMessage } from "@/types"

export function ChatContent() {
  const [newMessage, setNewMessage] = useState("")
  const [activeChat, setActiveChat] = useState<string | null>(null)

  const chatRooms = [
    {
      id: "1",
      name: "Bapak Budi (Petani)",
      lastMessage: "Tanaman sehat, hujan bagus minggu ini.",
      timestamp: "2 jam lalu",
      unread: 2,
      avatar: "👨‍🌾",
      status: "online",
    },
    {
      id: "2",
      name: "Ibu Siti (Petani)",
      lastMessage: "Terima kasih atas dukungannya!",
      timestamp: "1 hari lalu",
      unread: 0,
      avatar: "👩‍🌾",
      status: "offline",
    },
    {
      id: "3",
      name: "Tim Support Tunai Tani",
      lastMessage: "Ada yang bisa kami bantu?",
      timestamp: "3 hari lalu",
      unread: 1,
      avatar: "🛠️",
      status: "online",
    },
  ]

  const messages: ChatMessage[] = [
    {
      id: "1",
      sender: "Bapak Budi",
      message: "Selamat pagi! Update terbaru dari kebun cabai saya.",
      timestamp: "08:30",
      type: "received",
    },
    {
      id: "2",
      sender: "Bapak Budi",
      message: "Tanaman tumbuh dengan baik, cuaca mendukung minggu ini.",
      timestamp: "08:31",
      type: "received",
    },
    {
      id: "3",
      sender: "Anda",
      message: "Alhamdulillah, senang mendengarnya Pak!",
      timestamp: "08:45",
      type: "sent",
    },
    {
      id: "4",
      sender: "Anda",
      message: "Kapan perkiraan panen Pak?",
      timestamp: "08:45",
      type: "sent",
    },
    {
      id: "5",
      sender: "Bapak Budi",
      message: "Insya Allah sekitar 3 minggu lagi. Akan saya update terus.",
      timestamp: "09:15",
      type: "received",
    },
  ]

  const notifications = [
    {
      id: "1",
      title: "Laporan Baru",
      message: "Bapak Budi mengirim laporan perkembangan tanaman",
      timestamp: "1 jam lalu",
      type: "report",
    },
    {
      id: "2",
      title: "Pembayaran Berhasil",
      message: "Dukungan Anda untuk proyek Bayam Merah telah diproses",
      timestamp: "2 jam lalu",
      type: "payment",
    },
    {
      id: "3",
      title: "Proyek Baru",
      message: "Ada proyek baru: Tomat Cherry oleh Ibu Ani",
      timestamp: "1 hari lalu",
      type: "project",
    },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Simulate sending message
    alert(`Pesan "${newMessage}" terkirim!`)
    setNewMessage("")
  }

  if (activeChat) {
    const chatRoom = chatRooms.find((room) => room.id === activeChat)
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{chatRoom?.avatar}</span>
                <div>
                  <CardTitle className="text-lg">{chatRoom?.name}</CardTitle>
                  <p className="text-sm text-gray-500">{chatRoom?.status === "online" ? "🟢 Online" : "⚫ Offline"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveChat(null)}>
                Kembali
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.type === "sent" ? "bg-green-500 text-white ml-auto" : "bg-gray-100 text-gray-800 mr-auto"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Tulis pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Chat & Notifikasi
        </h3>
        <p className="text-gray-600">Komunikasi dengan petani dan tim support</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifikasi Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notif.title}</h4>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Rooms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Pesan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setActiveChat(room.id)}
              >
                <span className="text-2xl">{room.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{room.name}</h4>
                    <div className="flex items-center space-x-2">
                      {room.unread > 0 && <Badge className="bg-red-500 text-xs">{room.unread}</Badge>}
                      <span className="text-xs text-gray-400">{room.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs">Hubungi Support</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Bell className="w-6 h-6 mb-1" />
              <span className="text-xs">Atur Notifikasi</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
