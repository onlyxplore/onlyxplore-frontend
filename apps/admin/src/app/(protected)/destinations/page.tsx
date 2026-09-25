"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { MapPin, TrendingUp, Users, Star } from "lucide-react"

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/destinations`)
        const data = await res.json()
        setDestinations(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalVisitors = destinations.reduce((sum, d) => sum + d.monthlyVisitors, 0)
  const trendingCount = destinations.filter(d => d.trending).length

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Destinations</h1>
        <p className="text-gray-500 mt-1">Monitor and manage tourism destinations across India</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl"><MapPin className="w-5 h-5 text-blue-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{destinations.length}</p><p className="text-xs text-gray-500 font-medium">Total Destinations</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl"><TrendingUp className="w-5 h-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{trendingCount}</p><p className="text-xs text-gray-500 font-medium">Trending</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-violet-50 p-3 rounded-xl"><Users className="w-5 h-5 text-violet-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{(totalVisitors / 1000).toFixed(0)}K</p><p className="text-xs text-gray-500 font-medium">Monthly Visitors</p></div>
        </div>
      </div>

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
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Destination</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">State</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Trips</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Monthly Visitors</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rating</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0A3D62]/10 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#0A3D62]" />
                        </div>
                        <span className="font-bold text-gray-900">{dest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{dest.state}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{dest.trips}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{dest.monthlyVisitors.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold text-gray-700">{dest.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {dest.trending ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                          <TrendingUp className="w-3 h-3" />Trending
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
