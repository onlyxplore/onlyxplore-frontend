"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Plus, MapPin, Users, Star, Calendar, 
  Eye, Edit, Trash2, Search
} from "lucide-react"

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/host/itineraries`)
        const data = await res.json()
        setItineraries(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredItineraries = itineraries
    .filter(it => filter === "all" || it.status === filter)
    .filter(it => it.title.toLowerCase().includes(search.toLowerCase()))

  const statusColor: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-gray-50 text-gray-600 border-gray-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">My Itineraries</h1>
          <p className="text-gray-500 mt-1">{itineraries.length} trips created</p>
        </div>
        <Link href="/itineraries/create">
          <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-xl px-6 py-5 font-bold shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search itineraries..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]" 
          />
        </div>
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
          {["all", "active", "draft", "completed"].map(f => (
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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredItineraries.map((it) => (
            <div key={it.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{it.title}</h3>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border capitalize ${statusColor[it.status]}`}>
                      {it.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{it.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{it.bookings}/{it.seats} booked</span>
                    {it.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" />{it.rating}</span>}
                    {it.startDate && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{it.startDate}</span>}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-[#0A3D62]">₹{it.price.toLocaleString()}<span className="text-sm font-normal text-gray-400">/person</span></p>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-[#0A3D62]">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-[#0A3D62]">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-500 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Booking progress bar */}
              <div className="hidden lg:flex flex-col items-center justify-center w-24 shrink-0">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke={it.status === 'completed' ? '#3b82f6' : '#0A3D62'}
                      strokeWidth="3"
                      strokeDasharray={`${(it.bookings / it.seats) * 100} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{Math.round((it.bookings / it.seats) * 100)}%</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 font-medium mt-1">Filled</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
