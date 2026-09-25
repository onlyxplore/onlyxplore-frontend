"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import { Users, Search, ShieldCheck, ShieldX, MapPin, Star } from "lucide-react"

export default function HostsPage() {
  const [hosts, setHosts] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/admin/hosts`)
        const data = await res.json()
        setHosts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredHosts = hosts
    .filter(h => filter === "all" || (filter === "verified" ? h.verified : !h.verified))
    .filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Hosts & Stakeholders</h1>
        <p className="text-gray-500 mt-1">Manage all registered hosts and experience creators</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl"><Users className="w-5 h-5 text-blue-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{hosts.length}</p><p className="text-xs text-gray-500 font-medium">Total Hosts</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl"><ShieldCheck className="w-5 h-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{hosts.filter(h => h.verified).length}</p><p className="text-xs text-gray-500 font-medium">Verified</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl"><ShieldX className="w-5 h-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-gray-900">{hosts.filter(h => !h.verified).length}</p><p className="text-xs text-gray-500 font-medium">Pending Verification</p></div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search hosts..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]" 
          />
        </div>
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
          {["all", "verified", "unverified"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all capitalize ${filter === f ? 'bg-white shadow-sm text-[#0A3D62]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Hosts Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredHosts.map((host) => (
            <div key={host.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#0A3D62]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#0A3D62] font-bold">{host.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{host.name}</p>
                    <p className="text-xs text-gray-500">{host.email}</p>
                  </div>
                </div>
                {host.verified ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <ShieldX className="w-3 h-3" />Pending
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" /> {host.location}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{host.trips}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{host.bookings}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#0A3D62]">₹{(host.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Revenue</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-gray-700">{host.rating}</span>
                </div>
                <span className="text-xs text-gray-400">Joined {host.joinedAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
