"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-location-assign-relative-destination */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoImg from "../../../../public/logo.png";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Heart, Star, Map, Grid, SlidersHorizontal, Clock, ShieldCheck, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const CATEGORIES = ["All", "Adventure", "Heritage", "Wellness", "Road Trips", "Camping", "Culinary"];

export default function ExplorePage() {
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState("All");
  const [scope, setScope] = useState<"local" | "global">("local");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [trips, setTrips] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const response = await fetch(`${apiUrl}/explore/trips?category=${activeCategory}&scope=${scope}`);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrips();
  }, [activeCategory, scope]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col w-full selection:bg-[#0A3D62]/10 pt-20">
      
      {/* Top Navigation - Fixed */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-[100] px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Image src={logoImg} alt="OnlyXplore" className="h-6 sm:h-8 w-auto" />
        </Link>
        
        {/* Compact Search Bar */}
        <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-full pl-2 pr-1.5 py-1.5 shadow-sm hover:shadow-md transition-all flex-1 max-w-xl mx-8">
          <div className="flex-1 px-4 border-r border-slate-100 flex flex-col justify-center h-full">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Where</p>
            <input type="text" placeholder="Search destinations" className="w-full bg-transparent border-none outline-none text-sm text-slate-600 font-medium placeholder:text-slate-400 placeholder:font-normal" />
          </div>
          <div className="flex-1 px-4 flex flex-col justify-center h-full">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">When</p>
            <input type="text" placeholder="Add dates" className="w-full bg-transparent border-none outline-none text-sm text-slate-600 font-medium placeholder:text-slate-400 placeholder:font-normal" />
          </div>
          <div className="pl-2">
            <Button className="rounded-full w-10 h-10 p-0 bg-[#0A3D62] hover:bg-[#0A3D62]/90 flex items-center justify-center shrink-0">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" className="hidden sm:flex text-slate-600 font-bold rounded-full hover:bg-slate-100">
            Become a host
          </Button>
          
          {session?.user ? (
            <div className="relative group">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A3D62]/10 overflow-hidden border-2 border-white shadow-sm transition-transform hover:scale-105">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#0A3D62] font-bold text-sm">{session.user.name?.charAt(0) || "U"}</span>
                )}
              </button>
              
              <div className="absolute right-0 mt-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 group-focus-within:translate-y-0 translate-y-2 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900 truncate">{session.user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => window.location.href = '/profile'} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 font-medium hover:text-[#0A3D62] hover:bg-slate-50 rounded-xl transition-colors">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button onClick={() => signOut()} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors mt-1">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoginButton>
              <Button className="rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white font-bold shadow-sm px-5 sm:px-6">
                Sign in
              </Button>
            </LoginButton>
          )}
        </div>
      </nav>

      {/* Filters & Categories Bar - Sticky */}
      <div className="sticky top-20 bg-white/95 backdrop-blur-xl border-b border-slate-200 z-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Categories Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-[#0A3D62] text-white shadow-md" 
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Filters */}
        <div className="flex items-center justify-between sm:justify-start gap-3 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => setScope("local")} 
              className={cn("px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all", scope === "local" ? "bg-white shadow-sm text-[#0A3D62]" : "text-slate-500 hover:text-slate-700")}
            >
              Local
            </button>
            <button 
              onClick={() => setScope("global")} 
              className={cn("px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all", scope === "global" ? "bg-white shadow-sm text-[#0A3D62]" : "text-slate-500 hover:text-slate-700")}
            >
              Global
            </button>
          </div>

          <Button variant="outline" className="hidden lg:flex rounded-full border-slate-200 text-slate-700 bg-white shadow-sm h-10 px-4 text-sm font-bold hover:bg-slate-50">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-2 rounded-full transition-all flex items-center justify-center", viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className={cn("p-2 rounded-full transition-all flex items-center justify-center", viewMode === "map" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700")}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        
        {viewMode === "grid" ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Explore {activeCategory === "All" ? (scope === "local" ? "India" : "the World") : activeCategory}</h1>
              <p className="text-slate-500 font-medium mt-2 text-base">Over 1,200 verified experiences matching your criteria</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20 w-full col-span-full">
                <div className="w-8 h-8 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {trips.map((trip: Record<string, any>, i: number) => (
                  <Link key={trip.id} href={`/itinerary/${trip.id}`} className="block group">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex flex-col cursor-pointer h-full"
                    >
                  <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 bg-slate-200 shadow-sm ring-1 ring-slate-200/50">
                    <Image src={trip.image} alt={trip.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all">
                      <Heart className="w-5 h-5 text-slate-600 hover:fill-red-500 hover:text-red-500 transition-colors" />
                    </button>

                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 border border-slate-100">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold text-slate-900">{trip.rating}</span>
                      <span className="text-xs text-slate-500 font-semibold">({trip.reviews})</span>
                    </div>
                  </div>

                  <div className="px-1 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2">{trip.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-4">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{trip.location}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{trip.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="text-sm text-slate-700 font-bold truncate">{trip.creator}</span>
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    </div>

                    <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">From</span>
                        <div className="text-lg font-bold text-slate-900">₹{trip.price.toLocaleString('en-IN')} <span className="text-sm font-medium text-slate-500 font-normal">/ person</span></div>
                      </div>
                    </div>
                  </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-16 flex justify-center pb-12">
              <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-slate-700 hover:bg-slate-100 border-slate-200 text-base shadow-sm">
                Show more experiences
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full h-[60vh] sm:h-[calc(100vh-180px)] bg-slate-100 rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative border border-slate-200 shadow-inner">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  defaultZoom={5}
                  defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                >
                  {trips.map((trip: Record<string, any>) => trip.lat && trip.lng && (
                    <AdvancedMarker 
                      key={trip.id} 
                      position={{ lat: trip.lat, lng: trip.lng }}
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <Pin background={'#0A3D62'} borderColor={'#ffffff'} glyphColor={'#ffffff'} />
                    </AdvancedMarker>
                  ))}

                  {selectedTrip && (
                    <InfoWindow
                      position={{ lat: selectedTrip.lat, lng: selectedTrip.lng }}
                      onCloseClick={() => setSelectedTrip(null)}
                      headerDisabled={true}
                    >
                      <div className="w-[240px] flex flex-col p-1 font-sans">
                        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-200">
                          <Image src={selectedTrip.image} alt={selectedTrip.title} fill className="object-cover" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight">{selectedTrip.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{selectedTrip.location}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-bold text-slate-900">{selectedTrip.rating}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">₹{selectedTrip.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </APIProvider>
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Map Key Missing</h3>
                <p className="text-slate-500 font-medium mb-6">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
