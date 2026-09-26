"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { 
  LayoutDashboard, Users, MapPin, BarChart3, FileText, Settings, 
  LogOut, Menu, X
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Hosts", href: "/hosts", icon: Users },
  { label: "Destinations", href: "/destinations", icon: MapPin },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
]

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F7F7F2] overflow-hidden text-[#0A3D62] selection:bg-[#3C8DAD]/30 relative">
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#3C8DAD_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none"></div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-[#0A3D62] text-white flex flex-col transition-transform md:transition-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">OX</span>
            </div>
            <span className="font-bold text-lg tracking-tight">OnlyXplore</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-2 mt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 mb-2">Government Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-sm font-bold">{session?.user?.name?.charAt(0) || "A"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{session?.user?.name || "Admin"}</p>
              <p className="text-xs text-white/50 truncate">{session?.user?.email || "admin@gov.in"}</p>
            </div>
            <button onClick={() => signOut()} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="h-16 bg-white/50 backdrop-blur-sm border-b border-gray-100/50 flex items-center px-4 md:px-6 shrink-0 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-xl mr-3">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-bold text-[#0A3D62] capitalize">
            {navItems.find(n => pathname?.startsWith(n.href))?.label || "Dashboard"}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
