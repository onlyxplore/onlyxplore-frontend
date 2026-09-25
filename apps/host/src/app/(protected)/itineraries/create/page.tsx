"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, Users, Mountain, Baby, Heart, 
  VenetianMask, Globe, Flower2, Landmark, Tent,
  ChevronLeft, Sparkles, MapPin, Map, Plane
} from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "solo", name: "Solo", icon: User, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "strangers", name: "Strangers", icon: Users, color: "bg-purple-100 text-purple-600 border-purple-200" },
  { id: "trekking", name: "Trekking", icon: Mountain, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { id: "family", name: "Family", icon: Baby, color: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: "couple", name: "Couple", icon: Heart, color: "bg-rose-100 text-rose-600 border-rose-200" },
  { id: "blind-date", name: "Blind Date", icon: VenetianMask, color: "bg-pink-100 text-pink-600 border-pink-200" },
  { id: "international", name: "International", icon: Globe, color: "bg-indigo-100 text-indigo-600 border-indigo-200", requiresInput: "Specify Country" },
  { id: "spiritual", name: "Spiritual", icon: Flower2, color: "bg-violet-100 text-violet-600 border-violet-200" },
  { id: "temples", name: "Temples", icon: Landmark, color: "bg-orange-100 text-orange-600 border-orange-200" },
  { id: "camping", name: "Camping", icon: Tent, color: "bg-green-100 text-green-600 border-green-200" },
]

export default function CreateItineraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [country, setCountry] = useState("")
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/itineraries">
          <Button variant="outline" size="icon" className="rounded-xl">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0A3D62]">Create New Trip</h1>
          <p className="text-muted-foreground mt-1">Design your next unforgettable experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          {/* Step 1: Theme Selection */}
          {step === 1 && (
            <Card className="border border-gray-200 bg-transparent backdrop-blur-lg transition-all duration-300 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                      Trip Theme
                    </h2>
                    <p className="text-gray-500 mt-1">What kind of experience are you hosting?</p>
                  </div>
                  <div className="bg-[#0A3D62]/10 text-[#0A3D62] font-semibold px-3 py-1 rounded-full text-sm">Step 1 of 4</div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 border ${
                        selectedCategory === cat.id 
                          ? 'border-[#0A3D62] bg-[#0A3D62]/5' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-4 rounded-xl mb-3 ${cat.color}`}>
                        <cat.icon className="h-8 w-8" />
                      </div>
                      <span className={`font-semibold text-sm ${selectedCategory === cat.id ? 'text-[#0A3D62]' : 'text-gray-700'}`}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedCategory === "international" && (
                  <div className="mt-6 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Label htmlFor="country" className="text-indigo-900 font-semibold mb-2 block">Which Country?</Label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                      <Input 
                        id="country" 
                        placeholder="e.g. Japan, Italy, Brazil..." 
                        className="pl-10 rounded-xl border-indigo-200 focus-visible:ring-indigo-500 py-6"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end border-t pt-6">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!selectedCategory || (selectedCategory === "international" && !country)}
                    className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Title */}
          {step === 2 && (
             <Card className="border border-gray-200 bg-transparent backdrop-blur-lg transition-all duration-300 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
             <CardContent className="p-8">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                     <MapPin className="h-6 w-6 text-red-500" />
                     Give it a name
                   </h2>
                   <p className="text-gray-500 mt-1">What&apos;s the catchy title for this trip?</p>
                 </div>
                 <div className="bg-[#0A3D62]/10 text-[#0A3D62] font-semibold px-3 py-1 rounded-full text-sm">Step 2 of 4</div>
               </div>
 
               <div className="space-y-6 mt-8">
                 <div className="space-y-4">
                   <Input autoFocus id="title" placeholder="e.g. Mystical Peaks of the Himalayas" className="rounded-xl py-8 text-xl" />
                 </div>
               </div>
 
               <div className="mt-12 flex justify-between border-t pt-6">
                 <Button variant="ghost" onClick={() => setStep(1)} className="rounded-xl px-6 py-6 text-base">Back</Button>
                 <Button 
                   onClick={() => setStep(3)} 
                   className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all"
                 >
                   Continue
                 </Button>
               </div>
             </CardContent>
           </Card>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
             <Card className="border border-gray-200 bg-transparent backdrop-blur-lg transition-all duration-300 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
             <CardContent className="p-8">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                     <Sparkles className="h-6 w-6 text-blue-500" />
                     Describe the experience
                   </h2>
                   <p className="text-gray-500 mt-1">What makes this trip special and why should they join?</p>
                 </div>
                 <div className="bg-[#0A3D62]/10 text-[#0A3D62] font-semibold px-3 py-1 rounded-full text-sm">Step 3 of 4</div>
               </div>
 
               <div className="space-y-6 mt-8">
                 <div className="space-y-4">
                   <Textarea 
                     autoFocus
                     id="description" 
                     placeholder="Write a compelling description..." 
                     className="rounded-xl min-h-[160px] resize-none text-lg p-5"
                   />
                 </div>
               </div>
 
               <div className="mt-12 flex justify-between border-t pt-6">
                 <Button variant="ghost" onClick={() => setStep(2)} className="rounded-xl px-6 py-6 text-base">Back</Button>
                 <Button 
                   onClick={() => setStep(4)} 
                   className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all"
                 >
                   Continue
                 </Button>
               </div>
             </CardContent>
           </Card>
          )}

          {/* Step 4: Ready */}
          {step === 4 && (
             <Card className="border border-gray-200 bg-transparent backdrop-blur-lg transition-all duration-300 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
             <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
               <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                 <Map className="h-12 w-12 text-green-600" />
               </div>
               <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to build the daily plan?</h2>
               <p className="text-gray-500 text-lg max-w-md mb-10">
                 The next step will take you to our interactive itinerary builder where you can add day-by-day activities.
               </p>
               
               <div className="flex gap-4 w-full justify-center">
                 <Button variant="outline" onClick={() => setStep(3)} className="rounded-xl px-8 py-6 text-lg">Back</Button>
                 <Button 
                   className="bg-[#0A3D62] hover:bg-[#0A3D62]/90 text-white rounded-xl px-10 py-6 text-lg font-bold transition-all"
                 >
                   Save & Go to Builder
                 </Button>
               </div>
             </CardContent>
           </Card>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="md:col-span-4">
          <div className="sticky top-6">
            <Card className="rounded-2xl border-gray-100 shadow-sm overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
              <div className="h-32 bg-[#0A3D62]/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0A3D62] via-transparent to-transparent mix-blend-overlay"></div>
              </div>
              <CardContent className="p-6 -mt-12 relative z-10">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
                  {selectedCategory ? (
                    <>
                      {(() => {
                        const cat = categories.find(c => c.id === selectedCategory)
                        if (!cat) return null
                        const Icon = cat.icon
                        return (
                          <>
                            <div className={`p-3 rounded-xl ${cat.color}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Selected Theme</p>
                              <p className="font-bold text-gray-900">{cat.name} {cat.id === "international" && country ? `(${country})` : ''}</p>
                            </div>
                          </>
                        )
                      })()}
                    </>
                  ) : (
                    <div className="text-center w-full py-2">
                      <p className="text-sm text-gray-500 font-medium">No theme selected yet</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 1 ? 'bg-[#0A3D62] text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                    <span className={step >= 1 ? 'text-gray-900 font-semibold text-base' : 'text-gray-500'}>Choose Theme</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 2 ? 'bg-[#0A3D62] text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    <span className={step >= 2 ? 'text-gray-900 font-semibold text-base' : 'text-gray-500'}>Trip Title</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 3 ? 'bg-[#0A3D62] text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
                    <span className={step >= 3 ? 'text-gray-900 font-semibold text-base' : 'text-gray-500'}>Description</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 4 ? 'bg-[#0A3D62] text-white' : 'bg-gray-100 text-gray-400'}`}>4</div>
                    <span className={step >= 4 ? 'text-gray-900 font-semibold text-base' : 'text-gray-500'}>Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
