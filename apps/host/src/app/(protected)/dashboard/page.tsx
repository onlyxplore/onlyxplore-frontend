"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { 
  Map, Users, IndianRupee, Star, CalendarDays,
  ArrowUpRight, ArrowDownRight, Eye, BarChart3
} from "lucide-react"

export default function HostDashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/host/dashboard/stats`)
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

  const statCards = [
    { label: "Active Trips", value: stats.activeTrips, total: stats.totalTrips, icon: Map, color: "bg-blue-500", bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { label: "Total Bookings", value: stats.totalBookings, growth: stats.bookingGrowth, icon: CalendarDays, color: "bg-emerald-500", bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { label: "Monthly Revenue", value: `₹${(stats.monthlyRevenue / 1000).toFixed(1)}K`, growth: stats.revenueGrowth, icon: IndianRupee, color: "bg-amber-500", bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { label: "Avg Rating", value: stats.avgRating, sub: `${stats.totalReviews} reviews`, icon: Star, color: "bg-violet-500", bgColor: "bg-violet-50", textColor: "text-violet-600" },
  ]

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className={`${card.bgColor} p-2.5 rounded-xl`}>
                <card.icon className={`w-5 h-5 ${card.textColor}`} />
              </div>
              {card.growth && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${card.growth > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {card.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(card.growth)}%
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                {card.label}
                {card.total && <span className="text-gray-400"> / {card.total} total</span>}
                {card.sub && <span className="text-gray-400"> · {card.sub}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0A3D62]" />
              Revenue Trend
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Monthly revenue performance</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#0A3D62]">₹{(stats.totalRevenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500">Total Revenue</p>
          </div>
        </div>
        
        <div className="flex items-end gap-3 h-48">
          {stats.revenueChart.map((item: Record<string, any>, i: number) => {
            const maxRevenue = Math.max(...stats.revenueChart.map((r: Record<string, any>) => r.revenue))
            const height = (item.revenue / maxRevenue) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-600">₹{(item.revenue / 1000).toFixed(0)}K</span>
                <div className="w-full relative group">
                  <div
                    className="w-full bg-gradient-to-t from-[#0A3D62] to-[#0A3D62]/70 rounded-xl transition-all duration-500 hover:from-[#0A3D62] hover:to-[#0A3D62]/90"
                    style={{ height: `${height * 1.6}px` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{item.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#0A3D62]" />
            Travelers Overview
          </h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-3xl font-bold text-[#0A3D62]">{stats.totalTravelers}</p>
              <p className="text-sm text-gray-500 mt-1">Total travelers served</p>
            </div>
            <div className="h-16 w-16 bg-[#0A3D62]/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-[#0A3D62]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-[#0A3D62]" />
            Pending Actions
          </h3>
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
            <div>
              <p className="text-3xl font-bold text-amber-600">{stats.pendingBookings}</p>
              <p className="text-sm text-gray-500 mt-1">Bookings awaiting confirmation</p>
            </div>
            <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
              <CalendarDays className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
