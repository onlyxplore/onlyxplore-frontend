"use client";

import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { LoginButton } from "@/components/auth/login-button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Users, Star, ArrowRight, Search, Heart, ShieldCheck, CreditCard, MessageSquare, CheckCircle, Map, Mountain, Tent, Camera, Coffee, Info } from "lucide-react";
import { motion } from "framer-motion";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
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
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LoginButton>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-[1.5px] border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62] hover:text-white font-semibold text-xs sm:text-sm cursor-pointer transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md">
              Log in
            </span>
          </LoginButton>
          <a href="http://localhost:3001" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0A3D62] border-[1.5px] border-[#0A3D62] text-white hover:bg-[#0A3D62]/90 font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap hidden sm:block shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Become a host
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-multiply">
          <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
        </div>
        
        <div className="absolute top-0 inset-x-0 h-[400px] sm:h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
        
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
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
            <span>Join 10,000+ travelers exploring India differently</span>
          </motion.div>
          
          <h1 className={cn("text-slate-900 text-5xl sm:text-7xl md:text-8xl tracking-tight font-medium drop-shadow-sm leading-tight sm:leading-none", caveat.className)}>
            Built for Travelers.
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto text-balance px-2">
            Discover and book verified journeys curated by local experts, travel creators, and communities across India.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 sm:mt-12 bg-white/95 backdrop-blur-xl p-1.5 rounded-3xl sm:rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/80 flex flex-col md:flex-row items-center gap-1 max-w-5xl mx-auto relative z-20 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] focus-within:ring-2 focus-within:ring-[#0A3D62]/20 w-[95%] sm:w-full"
          >
            <div className="flex-[1.5] flex items-center px-4 sm:px-6 py-2.5 sm:py-3 w-full border-b md:border-b-0 md:border-r border-slate-100 group">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mr-2 sm:mr-3 group-focus-within:text-[#0A3D62] transition-colors shrink-0" />
              <input type="text" placeholder="Where do you want to go?" className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm sm:text-base font-medium truncate" />
            </div>
            <div className="flex-1 flex items-center px-4 sm:px-6 py-2.5 sm:py-3 w-full group border-b md:border-b-0 md:border-r border-slate-100">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mr-2 sm:mr-3 group-focus-within:text-[#0A3D62] transition-colors shrink-0" />
              <input type="text" placeholder="Interest (e.g. Trekking)" className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm sm:text-base font-medium truncate" />
            </div>
            <Button className="w-full md:w-auto rounded-xl sm:rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white px-8 sm:px-10 py-3 sm:py-4 h-auto text-sm sm:text-base font-bold shadow-lg shadow-[#0A3D62]/20 transition-all hover:-translate-y-0.5 m-0 sm:m-0.5 shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 shrink-0" />
              Search
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Explore by Interest Categories */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-10 sm:-mt-16 mb-16 sm:mb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {[
            { icon: Mountain, label: "Adventure" },
            { icon: Camera, label: "Heritage" },
            { icon: Tent, label: "Camping" },
            { icon: Coffee, label: "Wellness" },
            { icon: Map, label: "Road Trips" },
            { icon: Users, label: "Group Tours" }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-[#0A3D62]/30 hover:text-[#0A3D62] transition-all group"
            >
              <div className="p-2 sm:p-3 bg-slate-50 rounded-xl group-hover:bg-[#0A3D62]/5 transition-colors">
                <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-[#0A3D62]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 group-hover:text-[#0A3D62]">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Trending Destinations</h2>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium">Explore the most popular spots curated by top creators.</p>
          </div>
          <Button variant="ghost" className="text-[#0A3D62] hover:text-[#0A3D62]/80 hover:bg-slate-100 rounded-full font-semibold text-sm sm:text-base transition-all">
            View all <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { title: "Kerala Backwaters", creator: "@wanderlust_india", rating: 4.9, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop" },
            { title: "Leh Ladakh Expedition", creator: "@mountain_tales", rating: 5.0, image: "https://images.unsplash.com/photo-1581793707572-18451842eb12?q=80&w=600&auto=format&fit=crop" },
            { title: "Goa Hidden Beaches", creator: "@sunsets_goa", rating: 4.8, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
            { title: "Rajasthan Royal Tour", creator: "@heritage_walks", rating: 4.7, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-3xl sm:rounded-[2rem] overflow-hidden mb-4 sm:mb-5 shadow-sm ring-1 ring-slate-200/50">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:fill-red-500 hover:text-red-500 transition-colors" />
                </div>
                
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg sm:text-xl truncate tracking-tight">{item.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-white/90">By {item.creator}</span>
                    <div className="flex items-center text-[10px] sm:text-xs font-bold bg-white/20 backdrop-blur-md text-white px-2 sm:px-2.5 py-1 rounded-lg">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current mr-1" />
                      {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="w-full bg-white py-16 sm:py-24 relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3 sm:mb-4">Travel with the best</h2>
              <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium">Join trips hosted by verified experts, passionate creators, and local guides.</p>
            </div>
            <Button variant="outline" className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 text-sm sm:text-base">
              Explore creators
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: "Rahul Singh", niche: "Himalayan Treks", followers: "124K", trips: 42, image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop" },
              { name: "Anita Desai", niche: "Heritage Walks", followers: "89K", trips: 156, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
              { name: "Vikram & Maya", niche: "Backpacking", followers: "210K", trips: 34, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" },
              { name: "Chef Kabir", niche: "Culinary Tours", followers: "45K", trips: 89, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" }
            ].map((creator, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0A3D62]/20 transition-all text-center flex flex-col items-center group cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-5 ring-4 ring-white shadow-sm relative group-hover:scale-105 transition-transform duration-300">
                  <Image src={creator.image} alt={creator.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">{creator.name}</h3>
                <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full mb-5">{creator.niche}</span>
                <div className="flex items-center justify-center gap-4 sm:gap-6 w-full pt-4 sm:pt-5 border-t border-slate-200/60 mt-auto">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Followers</p>
                    <p className="text-sm sm:text-base font-bold text-slate-700">{creator.followers}</p>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-slate-200" />
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Trips</p>
                    <p className="text-sm sm:text-base font-bold text-slate-700">{creator.trips}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Unified Workflow / How it works */}
      <section className="w-full bg-slate-50 py-20 sm:py-28 relative border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">One seamless trip workflow</h2>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl">No more jumping between Instagram, WhatsApp, and Google Forms. We&apos;ve connected the dots so you can focus entirely on the experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0" />
            
            {[
              { icon: Compass, title: "1. Discover", desc: "Explore trips by map, interest, or your favorite creator." },
              { icon: ShieldCheck, title: "2. Verify", desc: "View verified host details, genuine reviews, and itineraries." },
              { icon: CreditCard, title: "3. Register", desc: "Pay with confidence using secure UPI and instant confirmations." },
              { icon: MessageSquare, title: "4. Join", desc: "Receive trip updates instantly and join the community group." }
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

      {/* Trust & Safety Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="bg-blue-50/50 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 md:p-16 border border-blue-100 flex flex-col lg:flex-row gap-10 md:gap-16 items-center overflow-hidden">
          <div className="flex-1 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              Trust & Safety
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Say goodbye to scattered information and uncertainty.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We know how frustrating it is to deal with unverified hosts, hidden pricing, and disjointed updates across multiple apps. OnlyXplore brings everything into a single, trusted environment.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Verified creator profiles & authentic reviews.",
                "Transparent itineraries with exact meeting points.",
                "Secure, integrated payments with buyer protection.",
                "Centralized communication—no more lost messages."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 relative w-full aspect-square max-w-[280px] sm:max-w-md mx-auto lg:max-w-none z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-sky-100 rounded-full blur-2xl sm:blur-3xl opacity-60" />
            <div className="relative h-full w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                   <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" width={64} height={64} alt="Creator" className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-1">Aisha Sharma</h4>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Verified Trek Leader</p>
                </div>
              </div>
              
              <div className="space-y-2.5 sm:space-y-3">
                <div className="h-3 sm:h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-3 sm:h-4 bg-slate-100 rounded w-full" />
                <div className="h-3 sm:h-4 bg-slate-100 rounded w-5/6" />
              </div>
              
              <div className="mt-auto bg-green-50 p-3 sm:p-4 rounded-xl border border-green-100 flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-green-800 font-bold text-sm sm:text-base">Booking Confirmed</p>
                  <p className="text-green-600/80 text-xs sm:text-sm font-medium">Payment secured via UPI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-slate-900 py-20 sm:py-32 relative overflow-hidden my-8 sm:my-12">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl md:bg-gradient-to-l from-[#0A3D62]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-tr md:bg-gradient-to-r from-sky-900/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-20 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Don&apos;t just take our word for it</h2>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto">Hear from thousands of travelers who found their perfect journey and trusted community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { text: "Finding authentic local experiences used to take hours of research. With OnlyXplore, I booked a guided heritage tour in Jaipur in minutes, and the host was phenomenal.", author: "Sneha P.", role: "Solo Traveler" },
              { text: "The transparent pricing and verified host profiles gave me the confidence to book a 5-day Himalayan trek. The pre-trip communication through the platform was seamless.", author: "Karan M.", role: "Adventure Enthusiast" },
              { text: "We joined a group trip to Meghalaya curated by our favorite travel vlogger. Everything from payments to daily itineraries was handled flawlessly in one place.", author: "Riya & Dev", role: "Couple Travelers" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 sm:p-10 rounded-[2rem] hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex gap-1 mb-5 sm:mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">{review.author}</h4>
                    <span className="text-xs sm:text-sm text-slate-400">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-base sm:text-lg font-medium">Everything you need to know about booking with OnlyXplore.</p>
        </div>
        
        <div className="space-y-4 sm:space-y-5">
          {[
            { q: "How are hosts verified?", a: "Every host undergoes a stringent verification process, including identity checks, past experience verification, and peer reviews before listing." },
            { q: "Is my payment secure?", a: "Absolutely. We use bank-level encryption and secure UPI integrations. Your money is held safely and processed securely." },
            { q: "What if a trip is cancelled?", a: "If a host cancels, you receive a full 100% refund immediately. If you cancel, refunds depend on the itinerary's specific policy." },
            { q: "How do I communicate with the host?", a: "Upon registering, you access a trip dashboard and community chat to talk directly with the host and fellow travelers." }
          ].map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 relative z-10 flex justify-center">
        <div className="w-full max-w-6xl bg-gradient-to-br from-[#0A3D62] to-[#052238] rounded-3xl sm:rounded-[3rem] p-8 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-sky-400/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">Ready for your next adventure?</h2>
            <p className="text-sky-100/80 text-lg sm:text-xl md:text-2xl font-medium px-2">Join thousands of travelers who are discovering the world in a completely new way.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6 sm:pt-8 w-full px-4 sm:px-0">
              <LoginButton>
                <Button className="bg-white text-[#0A3D62] hover:bg-slate-50 rounded-full px-8 sm:px-10 py-3 sm:py-4 h-auto text-base font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  Create free account
                </Button>
              </LoginButton>
              <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-full px-8 sm:px-10 py-3 sm:py-4 h-auto text-base font-bold transition-all duration-300 w-full sm:w-auto backdrop-blur-md">
                Explore itineraries
              </Button>
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
                The ultimate platform for travelers to discover, plan, and book unforgettable experiences created by local experts and hosts.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Travelers</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Discover</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-500 font-medium">
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#0A3D62] transition-colors">Contact</a></li>
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
