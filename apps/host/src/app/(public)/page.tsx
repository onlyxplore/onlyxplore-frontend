"use client";

import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { LoginButton } from "@/components/auth/login-button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { Button } from "@/components/ui/button";
import { Map, Users, Star, ArrowRight, Compass, ShieldCheck, CreditCard, MessageSquare, CheckCircle, BarChart3, Globe } from "lucide-react";
import { motion } from "framer-motion";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HostHome() {
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
        <span className="font-bold text-[#0A3D62] text-sm sm:text-base tracking-tight hidden sm:block">Creators</span>
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
        
        <div className="absolute top-0 inset-x-0 h-[400px] sm:h-[500px] bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />
        
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
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-500 text-emerald-500" />
            <span>Join 500+ top travel creators in India</span>
          </motion.div>
          
          <h1 className={cn("text-slate-900 text-5xl sm:text-7xl md:text-8xl tracking-tight font-medium drop-shadow-sm leading-tight sm:leading-none", caveat.className)}>
            Curate Unforgettable Experiences.
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto text-balance px-2">
            The all-in-one platform to manage your itineraries, collect secure payments, and grow your travel community.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <LoginButton>
              <Button className="rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white px-8 sm:px-10 py-3 sm:py-4 h-auto text-sm sm:text-base font-bold shadow-lg shadow-[#0A3D62]/20 transition-all hover:-translate-y-0.5">
                Start Hosting Today
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
            { icon: Globe, title: "Custom Itineraries", desc: "Build beautiful, detailed itineraries that travelers can explore." },
            { icon: CreditCard, title: "Seamless Payments", desc: "Accept secure UPI & card payments instantly." },
            { icon: BarChart3, title: "Business Analytics", desc: "Track revenue, bookings, and growth from a powerful dashboard." }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
              className="flex flex-col items-start gap-3 p-6 sm:p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all group"
            >
              <div className="p-3 sm:p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                <cat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{cat.title}</h3>
              <p className="text-sm sm:text-base font-medium text-slate-500">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Unified Workflow */}
      <section className="w-full bg-slate-50 py-20 sm:py-28 relative border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">Everything you need to host</h2>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl">Stop juggling WhatsApp groups, spreadsheets, and manual payments. OnlyXplore automates the boring stuff.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0" />
            
            {[
              { icon: Compass, title: "1. Create", desc: "Draft visually stunning trip pages in minutes." },
              { icon: ShieldCheck, title: "2. Publish", desc: "Share your trip link on Instagram or YouTube." },
              { icon: Users, title: "3. Manage", desc: "See real-time bookings and participant details." },
              { icon: MessageSquare, title: "4. Engage", desc: "Chat with your group directly on the platform." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-[6px] sm:border-8 border-slate-50 shadow-sm flex items-center justify-center mb-4 sm:mb-6 text-[#0A3D62] relative">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium px-2 sm:px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="bg-emerald-50/50 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 md:p-16 border border-emerald-100 flex flex-col lg:flex-row gap-10 md:gap-16 items-center overflow-hidden">
          <div className="flex-1 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              Creator Protection
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Focus on the journey, we handle the rest.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We know how stressful managing payments, cancellations, and disputes can be. OnlyXplore provides industry-leading protection for hosts.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Guaranteed payouts exactly on schedule.",
                "Automated cancellation & refund policies.",
                "Zero manual payment reconciliation.",
                "24/7 priority support for active hosts."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 relative w-full aspect-square max-w-[280px] sm:max-w-md mx-auto lg:max-w-none z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-full blur-2xl sm:blur-3xl opacity-60" />
            <div className="relative h-full w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center justify-center gap-6 overflow-hidden text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <CreditCard className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Payout Initiated</h3>
              <p className="text-slate-500 font-medium">₹1,24,500 successfully transferred to your linked bank account.</p>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="w-full h-full bg-emerald-500 rounded-full" />
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
                The ultimate platform for creators to curate, manage, and scale their group trips.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Creators</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Start Hosting</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Host Guidelines</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-100 text-center md:text-left">
            <span className="text-slate-400 text-xs sm:text-sm font-medium">© 2026 OnlyXplore. All rights reserved.</span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm font-medium">
              <a href="#" className="hover:text-[#0A3D62] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#0A3D62] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
