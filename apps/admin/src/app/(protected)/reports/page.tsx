"use client"

import { FileText, Download, Calendar, TrendingUp, IndianRupee, Users } from "lucide-react"

const reports = [
  { id: 1, title: "Monthly Tourism Report - September 2026", type: "Monthly", date: "2026-09-30", icon: Calendar, status: "ready" },
  { id: 2, title: "Host Verification Audit Q3", type: "Quarterly", date: "2026-09-15", icon: Users, status: "ready" },
  { id: 3, title: "Destination Performance Analysis", type: "Analytics", date: "2026-09-10", icon: TrendingUp, status: "ready" },
  { id: 4, title: "Revenue & Tax Summary - August", type: "Financial", date: "2026-08-31", icon: IndianRupee, status: "ready" },
  { id: 5, title: "Swadesh Darshan 2.0 Impact Report", type: "Scheme", date: "2026-08-20", icon: FileText, status: "ready" },
  { id: 6, title: "PRASHAD Scheme Utilization", type: "Scheme", date: "2026-08-15", icon: FileText, status: "ready" },
  { id: 7, title: "Tourist Safety & Compliance Audit", type: "Compliance", date: "2026-07-30", icon: Users, status: "ready" },
  { id: 8, title: "Dekho Apna Desh Campaign Metrics", type: "Campaign", date: "2026-07-25", icon: TrendingUp, status: "ready" },
]

const typeColors: Record<string, string> = {
  Monthly: "bg-blue-50 text-blue-700 border-blue-200",
  Quarterly: "bg-violet-50 text-violet-700 border-violet-200",
  Analytics: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Financial: "bg-amber-50 text-amber-700 border-amber-200",
  Scheme: "bg-teal-50 text-teal-700 border-teal-200",
  Compliance: "bg-rose-50 text-rose-700 border-rose-200",
  Campaign: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A3D62] tracking-tight">Reports</h1>
        <p className="text-gray-500 mt-1">Download and review tourism reports</p>
      </div>

      <div className="grid gap-3">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <div key={report.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-[#0A3D62]/10 p-3 rounded-xl shrink-0">
                <Icon className="w-5 h-5 text-[#0A3D62]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{report.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${typeColors[report.type]}`}>{report.type}</span>
                  <span className="text-xs text-gray-400">{report.date}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white text-sm font-bold rounded-xl transition-colors shrink-0">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
