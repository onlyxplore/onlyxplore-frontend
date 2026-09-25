"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { CheckCircle, Clock, XCircle, CheckCheck, User } from "lucide-react"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/host/bookings`)
        const data = await res.json()
        setBookings(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredBookings = bookings.filter(b => filter === "all" || b.status === filter)

  const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
    confirmed: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
    pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
    cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-50 border-red-200" },
    completed: { icon: CheckCheck, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  }

  const totals = {
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
    completed: bookings.filter(b => b.status === "completed").length,
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Bookings</h1>
        <p className="text-gray-500 mt-1">Manage your traveler registrations</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(totals).map(([status, count]) => {
          const config = statusConfig[status]
          const Icon = config.icon
          return (
            <button
              key={status}
              onClick={() => setFilter(filter === status ? "all" : status)}
              className={`p-4 rounded-2xl border transition-all text-left ${filter === status ? 'ring-2 ring-[#0A3D62]/30 border-[#0A3D62]/30' : 'border-gray-100 hover:border-gray-200'} bg-white shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 capitalize">{status}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </button>
          )
        })}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Traveler</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Trip</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Seats</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const config = statusConfig[booking.status]
                  const Icon = config.icon
                  return (
                    <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#0A3D62]/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-[#0A3D62]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{booking.traveler}</p>
                            <p className="text-xs text-gray-500">{booking.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-700 max-w-[180px] truncate">{booking.trip}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{booking.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{booking.seats}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#0A3D62]">₹{booking.amount.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border capitalize ${config.bg} ${config.color}`}>
                          <Icon className="w-3 h-3" />
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
