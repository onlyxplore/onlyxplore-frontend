"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { 
  Map, Users, IndianRupee, TrendingUp, ShieldCheck, 
  BarChart3, Globe, Building2
} from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/dashboard/stats`)
        const data = await res.json()
        setStats(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!stats) return null

  const cards = [
    { label: "Total Trips", value: stats.totalTrips, icon: Map, color: "bg-blue-50 text-blue-600" },
    { label: "Active Hosts", value: stats.totalHosts, sub: `${stats.verifiedHosts} verified`, icon: Users, color: "bg-emerald-50 text-emerald-600" },
    { label: "Total Bookings", value: stats.totalBookings.toLocaleString(), icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
    { label: "Total Revenue", value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, icon: IndianRupee, color: "bg-violet-50 text-violet-600" },
    { label: "Active Travelers", value: stats.activeTravelers.toLocaleString(), icon: Globe, color: "bg-rose-50 text-rose-600" },
    { label: "Verified Hosts", value: `${Math.round((stats.verifiedHosts / stats.totalHosts) * 100)}%`, icon: ShieldCheck, color: "bg-teal-50 text-teal-600" },
  ]

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Tourism Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time insights across India&apos;s tourism ecosystem</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
            <div className={`${card.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {card.label}
              {card.sub && <span className="text-gray-400 block">{card.sub}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Growth Chart + Top States */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Growth Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-[#0A3D62]" />
            Platform Growth
          </h2>
          <div className="flex items-end gap-2 h-44">
            {stats.monthlyGrowth.map((item: Record<string, any>, i: number) => {
              const maxBookings = Math.max(...stats.monthlyGrowth.map((r: Record<string, any>) => r.bookings))
              const height = (item.bookings / maxBookings) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-500">{item.bookings}</span>
                  <div className="w-full flex flex-col gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-[#0A3D62] to-[#0A3D62]/60 rounded-lg transition-all duration-500"
                      style={{ height: `${height * 1.5}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">{item.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top States */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#0A3D62]" />
            Top States
          </h2>
          <div className="space-y-3">
            {stats.topStates.map((state: Record<string, any>, i: number) => {
              const maxBookings = stats.topStates[0].bookings
              const width = (state.bookings / maxBookings) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{state.state}</span>
                    <span className="text-xs text-gray-500">{state.bookings} bookings</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0A3D62] to-[#0A3D62]/60 rounded-full transition-all duration-700"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Trip Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.categoryDistribution.map((cat: Record<string, any>, i: number) => {
            const colors = [
              "bg-blue-50 text-blue-700 border-blue-100",
              "bg-amber-50 text-amber-700 border-amber-100",
              "bg-emerald-50 text-emerald-700 border-emerald-100",
              "bg-violet-50 text-violet-700 border-violet-100",
              "bg-rose-50 text-rose-700 border-rose-100",
              "bg-teal-50 text-teal-700 border-teal-100",
            ]
            return (
              <div key={i} className={`p-4 rounded-xl border text-center ${colors[i % colors.length]}`}>
                <p className="text-2xl font-bold">{cat.count}</p>
                <p className="text-xs font-semibold mt-1">{cat.category}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
