"use client"

import { User, Shield, Bell } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your admin portal preferences</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#0A3D62]" />
            Admin Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Name</label>
              <input type="text" defaultValue="Tourism Admin" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email</label>
              <input type="email" defaultValue="admin@tourism.gov.in" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">Department</label>
              <input type="text" defaultValue="Ministry of Tourism" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#0A3D62]" />
            Notifications
          </h2>
          <div className="space-y-3">
            {["New host registrations", "Monthly report generation", "Scheme milestones", "Anomaly detection alerts"].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">{item}</span>
                <div className="w-11 h-6 bg-[#0A3D62] rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#0A3D62]" />
            Security
          </h2>
          <button className="px-5 py-3 bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white text-sm font-bold rounded-xl transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}
