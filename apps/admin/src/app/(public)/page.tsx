"use client";

import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { LoginButton } from "@/components/auth/login-button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { Button } from "@/components/ui/button";
import { Map, Users, Star, ArrowRight, Compass, ShieldCheck, CreditCard, MessageSquare, CheckCircle, BarChart3, Globe, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminHome() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden w-full bg-slate-50 selection:bg-[#0A3D62]/10">
      {/* Navigation */}
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 bg-white/80 border border-slate-200/60 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-[95%] sm:w-[max-content] transition-all duration-300">
        <Image 
          src={logoImg} 
          alt="OnlyXplore Logo" 
          className="w-auto h-6 sm:h-8 object-contain shrink-0"
        />
        <div className="w-[1.5px] h-5 sm:h-6 bg-slate-200 rounded-full shrink-0" />
        <span className="font-bold text-[#0A3D62] text-sm sm:text-base tracking-tight hidden sm:block">Gov Portal</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 sm:ml-4">
          <LoginButton>
            <Button className="rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white px-6 py-1.5 h-auto text-sm font-semibold shadow-sm hover:-translate-y-0.5 transition-all">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-multiply">
          <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
        </div>
        
        <div className="absolute top-0 inset-x-0 h-[400px] sm:h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8 text-center z-10 relative px-4 max-w-5xl mx-auto mt-8 sm:mt-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-700 text-xs sm:text-sm font-medium mb-2 sm:mb-4 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
            <span>Official Tourism Board & Administration Portal</span>
          </motion.div>
          
          <h1 className={cn("text-slate-900 text-5xl sm:text-7xl md:text-8xl tracking-tight font-medium drop-shadow-sm leading-tight sm:leading-none", caveat.className)}>
            Monitor, Govern, Empower.
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto text-balance px-2">
            The central command center for overseeing travel trends, managing destination policies, and supporting creators across the OnlyXplore ecosystem.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <LoginButton>
              <Button className="rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white px-8 sm:px-10 py-3 sm:py-4 h-auto text-sm sm:text-base font-bold shadow-lg shadow-[#0A3D62]/20 transition-all hover:-translate-y-0.5">
                Access Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </LoginButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-10 sm:-mt-16 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Globe, title: "Destination Oversight", desc: "Monitor tourism influx across key regions and manage capacity." },
            { icon: Users, title: "Creator Governance", desc: "Review and verify new travel hosts joining the platform." },
            { icon: LineChart, title: "Macro Analytics", desc: "View global platform metrics, revenue trends, and user growth." }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
              className="flex flex-col items-start gap-3 p-6 sm:p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all group"
            >
              <div className="p-3 sm:p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                <cat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{cat.title}</h3>
              <p className="text-sm sm:text-base font-medium text-slate-500">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="bg-indigo-50/50 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 md:p-16 border border-indigo-100 flex flex-col lg:flex-row gap-10 md:gap-16 items-center overflow-hidden">
          <div className="flex-1 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              Administrative Control
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Maintain platform integrity seamlessly.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Equip your governance team with the tools needed to enforce safety standards, verify authentic creators, and resolve critical disputes.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Real-time fraud detection and risk monitoring.",
                "Automated KYC and identity verification checks.",
                "Direct communication lines with top-tier hosts.",
                "Comprehensive audit logs and compliance reporting."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 relative w-full aspect-square max-w-[280px] sm:max-w-md mx-auto lg:max-w-none z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-sky-100 rounded-full blur-2xl sm:blur-3xl opacity-60" />
            <div className="relative h-full w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center justify-center gap-6 overflow-hidden text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <ShieldCheck className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Host Verified</h3>
              <p className="text-slate-500 font-medium">Identity and tax documents successfully verified by the compliance engine.</p>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="w-full h-full bg-indigo-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <Image src={logoImg} alt="Logo" className="h-7 sm:h-8 w-auto mb-4 sm:mb-6" />
              <p className="text-slate-500 max-w-sm text-sm sm:text-base leading-relaxed font-medium">
                The administrative portal for governing and managing the OnlyXplore ecosystem.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Internal</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Admin Login</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Compliance Hub</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">System Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Admin Docs</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">IT Support</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-100 text-center md:text-left">
            <span className="text-slate-400 text-xs sm:text-sm font-medium">© 2026 OnlyXplore. All rights reserved.</span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm font-medium">
              <a href="#" className="hover:text-[#0A3D62] transition-colors">Internal Privacy Policy</a>
              <a href="#" className="hover:text-[#0A3D62] transition-colors">Data Processing Addendum</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
