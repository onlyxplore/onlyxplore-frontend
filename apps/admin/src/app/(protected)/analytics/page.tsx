"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { Users, IndianRupee, TrendingUp, Landmark } from "lucide-react"

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/analytics`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Analytics & Trends</h1>
        <p className="text-gray-500 mt-1">Tourism insights and campaign performance</p>
      </div>

      {/* Tourist Flow Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-[#0A3D62]" />
          Tourist Flow
        </h2>
        <p className="text-sm text-gray-500 mb-6">Domestic vs International monthly visitors</p>
        <div className="flex items-end gap-3 h-48">
          {data.touristFlow.map((item: Record<string, any>, i: number) => {
            const maxVal = Math.max(...data.touristFlow.map((r: Record<string, any>) => r.domestic))
            const dH = (item.domestic / maxVal) * 100
            const iH = (item.international / maxVal) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-1 w-full justify-center" style={{ height: '160px' }}>
                  <div 
                    className="w-[40%] bg-gradient-to-t from-[#0A3D62] to-[#0A3D62]/60 rounded-t-lg" 
                    style={{ height: `${dH * 1.5}px` }}
                    title={`Domestic: ${(item.domestic / 1000).toFixed(0)}K`}
                  />
                  <div 
                    className="w-[40%] bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg" 
                    style={{ height: `${iH * 1.5}px` }}
                    title={`International: ${(item.international / 1000).toFixed(0)}K`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{item.month}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0A3D62] rounded-sm"></div><span className="text-xs text-gray-600 font-medium">Domestic</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div><span className="text-xs text-gray-600 font-medium">International</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue by State */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <IndianRupee className="w-5 h-5 text-[#0A3D62]" />
            Revenue by State
          </h2>
          <div className="space-y-3">
            {data.revenueByState.map((item: Record<string, any>, i: number) => {
              const maxRev = data.revenueByState[0].revenue
              const width = (item.revenue / maxRev) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{item.state}</span>
                    <span className="text-xs font-bold text-[#0A3D62]">₹{(item.revenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0A3D62] to-[#0A3D62]/50 rounded-full transition-all duration-700"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Host Growth */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#0A3D62]" />
            Host Growth
          </h2>
          <div className="space-y-3">
            {data.hostGrowth.map((item: Record<string, any>, i: number) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-bold text-gray-500 w-10">{item.month}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{item.hosts} total</span>
                    <span className="text-xs font-bold text-emerald-600">{item.verified} verified</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(item.verified / item.hosts) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheme Performance */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Landmark className="w-5 h-5 text-[#0A3D62]" />
          Government Scheme Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.schemePerformance.map((scheme: Record<string, any>, i: number) => {
            const utilization = (scheme.utilized / scheme.allocated) * 100
            return (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">{scheme.scheme}</h3>
                <p className="text-xs text-gray-500 mb-4">{scheme.beneficiaries.toLocaleString()} beneficiaries</p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Budget Utilization</span>
                  <span className="font-bold text-[#0A3D62]">{utilization.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${utilization > 80 ? 'bg-emerald-500' : utilization > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${utilization}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>₹{(scheme.utilized / 100000).toFixed(1)}L used</span>
                  <span>₹{(scheme.allocated / 100000).toFixed(1)}L allocated</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
