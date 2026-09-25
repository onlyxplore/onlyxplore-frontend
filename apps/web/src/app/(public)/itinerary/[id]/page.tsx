"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-location-assign-relative-destination */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { Home, MapPin, Star, Clock, ShieldCheck, Hotel, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const MapRoute = ({ points }: { points: { lat: number; lng: number }[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0 || !(window as Record<string, any>).google) return;
    
    const path = new (window as Record<string, any>).google.maps.Polyline({
      path: points,
      geodesic: true,
      strokeColor: '#0A3D62',
      strokeOpacity: 0.8,
      strokeWeight: 4
    });
    
    path.setMap(map);
    
    const bounds = new (window as Record<string, any>).google.maps.LatLngBounds();
    points.forEach(p => bounds.extend(p));
    map.fitBounds(bounds, 50);
    
    return () => {
      path.setMap(null);
    };
  }, [map, points]);
  return null;
}

export default function ItineraryDetailsPage() {
  const { data: session } = useSession();
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [trip, setTrip] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (!id) return;
    const fetchTrip = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${apiUrl}/explore/trips/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTrip(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0A3D62] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Trip not found</h2>
        <Button onClick={() => router.push('/explore')} className="bg-[#0A3D62] rounded-full">Back to Explore</Button>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Plan Overview" },
    ...(trip.days || []).map((d: Record<string, any>) => ({ id: `day-${d.day}`, label: `Day ${d.day}: ${d.title}` })),
    { id: "agency", label: "Agency" },
    { id: "hotels", label: "Hotels" },
  ];

  // Map state based on selected tab
  let mapCenter = { lat: trip.lat, lng: trip.lng };
  let markers = trip.days || [];
  let zoom = 8;

  if (activeTab.startsWith("day-")) {
    const dayNum = parseInt(activeTab.split("-")[1]);
    const dayData = trip.days.find((d: Record<string, any>) => d.day === dayNum);
    if (dayData && dayData.lat && dayData.lng) {
      mapCenter = { lat: dayData.lat, lng: dayData.lng };
      markers = [dayData];
      zoom = 12;
    }
  } else if (activeTab === "hotels" || activeTab === "agency") {
    markers = [{ lat: trip.lat, lng: trip.lng, title: activeTab }];
    zoom = 10;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col w-full selection:bg-[#0A3D62]/10 pt-16">
      
      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-slate-200 z-[100] px-3 sm:px-6 flex items-center justify-between shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex items-center overflow-hidden flex-1">
          <button onClick={() => router.push('/explore')} className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors mr-3 sm:mr-4 text-slate-700 shrink-0">
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <h1 className="text-base sm:text-xl font-bold text-slate-900 line-clamp-1">{trip.title}</h1>
        </div>
        
        <div className="flex items-center ml-4 shrink-0">
          {session?.user ? (
            <div className="relative group">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A3D62]/10 overflow-hidden border-2 border-[#0A3D62]/20 transition-transform hover:scale-105">
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
              <Button size="sm" className="rounded-full bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white font-bold shadow-sm px-4">
                Sign in
              </Button>
            </LoginButton>
          )}
        </div>
      </header>

      {/* Tabs Menu */}
      <div className="sticky top-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 z-50 px-2 sm:px-6 flex items-end overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold whitespace-nowrap border-b-4 transition-all duration-300",
              activeTab === tab.id 
                ? "border-[#0A3D62] text-[#0A3D62]" 
                : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Map Section */}
      <div className="w-full h-[35vh] sm:h-[45vh] md:h-[55vh] bg-slate-100 relative shadow-inner overflow-hidden">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapId="ITINERARY_MAP_ID"
              center={mapCenter}
              zoom={zoom}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              zoomControl={true}
            >
              {markers.map((m: Record<string, any>, i: number) => m.lat && m.lng && (
                <AdvancedMarker key={i} position={{ lat: m.lat, lng: m.lng }}>
                  <Pin background={'#0A3D62'} borderColor={'#ffffff'} glyphColor={'#ffffff'} />
                </AdvancedMarker>
              ))}
              {activeTab === "overview" && trip.days && (
                <MapRoute points={trip.days.filter((d: Record<string, any>) => d.lat && d.lng).map((d: Record<string, any>) => ({ lat: d.lat, lng: d.lng }))} />
              )}
            </GoogleMap>
          </APIProvider>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <MapPin className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-slate-500 font-bold">Map Key Missing in .env</p>
          </div>
        )}
      </div>

      {/* Details Content Section */}
      <div className="flex-1 w-full max-w-4xl mx-auto p-5 sm:p-10 md:p-12">
        
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">Plan Overview</h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-medium">{trip.overview}</p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2.5 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-bold text-slate-700">{trip.duration}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="font-bold text-slate-700">{trip.location}</span>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Itinerary at a glance</h3>
              {trip.days.map((d: Record<string, any>) => (
                <div key={d.day} className="flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-[#0A3D62]/30 hover:shadow-md transition-all group" onClick={() => setActiveTab(`day-${d.day}`)}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 group-hover:bg-[#0A3D62] rounded-2xl flex items-center justify-center shrink-0 transition-colors">
                    <span className="font-black text-slate-600 group-hover:text-white text-base sm:text-lg">D{d.day}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{d.title}</h4>
                    <p className="text-slate-500 font-medium line-clamp-1">{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab.startsWith("day-") && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {(() => {
              const dayNum = parseInt(activeTab.split("-")[1]);
              const d = trip.days.find((d: Record<string, any>) => d.day === dayNum);
              if (!d) return null;
              return (
                <>
                  <div className="inline-block px-4 py-1.5 bg-[#0A3D62]/10 text-[#0A3D62] font-black tracking-widest uppercase text-sm rounded-lg mb-2">Day {d.day}</div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{d.title}</h2>
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 mt-6">
                    <p className="text-slate-700 leading-relaxed text-lg font-medium">{d.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold mt-4 px-2">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    Location Coordinates: {d.lat.toFixed(4)}, {d.lng.toFixed(4)}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {activeTab === "agency" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Agency & Host</h2>
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{trip.agency.name}</h3>
                  <ShieldCheck className="w-7 h-7 text-blue-500" />
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-6">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-slate-900 text-lg">{trip.agency.rating}</span>
                  <span className="text-slate-400 mx-1">•</span>
                  <span className="text-slate-500 font-bold">Verified Host</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">{trip.agency.description}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hotels" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Accommodations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trip.hotels.map((hotel: Record<string, any>, idx: number) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5 bg-white hover:border-slate-300 transition-colors">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-[#0A3D62]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-slate-700">{hotel.rating} Stars</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-slate-500 font-bold">{hotel.nights} Nights</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
