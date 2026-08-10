"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Globe, Briefcase, Compass, Activity, Link as LinkIcon, Building } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { hostProfileApi } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states (populated when editing)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const [destInput, setDestInput] = useState("");
  const [customExp, setCustomExp] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.accessToken) return;
      
      try {
        const profile = await hostProfileApi.getProfile(session.user.accessToken);
        if (!profile) {
          router.push("/onboarding");
          return;
        }
        setData(profile);
        setFormData(profile);
      } catch {
        router.push("/onboarding");
      } finally {
        setLoading(false);
      }
    }
    
    if (session?.user?.accessToken) {
      fetchProfile();
    }
  }, [session, router]);

  if (loading || status === "loading") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A3D62]"></div>
      </div>
    );
  }

  if (!data) return null;

  const isOrg = isEditing ? formData.hostCategory === "Organization" : data.hostCategory === "Organization";
  
  const displayName = isOrg 
    ? (isEditing ? formData.organizationName : data.organizationName)
    : (isEditing 
        ? `${formData.firstName || ""} ${formData.lastName || ""}`.trim() 
        : `${data.firstName || ""} ${data.lastName || ""}`.trim());
    
  const displayImage = isOrg 
    ? (isEditing ? formData.logo : data.logo) 
    : (isEditing ? formData.profilePhoto : data.profilePhoto);
    
  const displayBio = isOrg 
    ? (isEditing ? formData.orgDescription : data.orgDescription) 
    : (isEditing ? formData.bio : data.bio);
    
  const displayWebsite = isOrg 
    ? (isEditing ? formData.orgWebsite : data.orgWebsite) 
    : (isEditing ? formData.website : data.website);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateForm = (key: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => {
      const arr = prev[key] || [];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((i: string) => i !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm(isOrg ? 'logo' : 'profilePhoto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!session?.user?.accessToken) return;
    setIsSaving(true);
    try {
      await hostProfileApi.updateProfile(session.user.accessToken, formData);
      setData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setFormData(data); // Revert
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 pb-10 pt-4 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0A3D62]">Dashboard Profile</h1>
          <p className="text-slate-500 mt-1">
            Your complete host identity on OnlyXplore.
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={cancelEdit} disabled={isSaving}>
                Cancel
              </Button>
              <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button className="bg-[#0A3D62] hover:bg-[#0A3D62]/90" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Identity & Socials */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4" onClick={() => isEditing && fileInputRef.current?.click()}>
                <Avatar className={`h-32 w-32 shadow-lg ${isEditing ? 'opacity-80 group-hover:opacity-60 transition-opacity' : ''}`}>
                  <AvatarImage src={(displayImage as string) || ""} alt={displayName as string} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-[#0A3D62] text-white">
                    {(displayName as string)?.charAt(0)?.toUpperCase() || "H"}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">Change</span>
                  </div>
                )}
              </div>
              
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
              
              {isEditing ? (
                <div className="w-full space-y-3">
                  {isOrg ? (
                    <Input value={formData.organizationName || ""} onChange={(e) => updateForm('organizationName', e.target.value)} placeholder="Organization Name" className="text-center font-bold" />
                  ) : (
                    <div className="flex gap-2">
                      <Input value={formData.firstName || ""} onChange={(e) => updateForm('firstName', e.target.value)} placeholder="First Name" className="text-center font-bold" />
                      <Input value={formData.lastName || ""} onChange={(e) => updateForm('lastName', e.target.value)} placeholder="Last Name" className="text-center font-bold" />
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-slate-400 text-sm">@</span>
                    <Input value={formData.username || ""} onChange={(e) => updateForm('username', e.target.value)} placeholder="username" className="text-center h-8" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#0A3D62]">{displayName as string}</h2>
                  {data.username && (
                    <p className="text-slate-500 font-medium text-sm mt-1">
                      onlyxplore.in/@{data.username as string}
                    </p>
                  )}
                </>
              )}
              
              {!isEditing && (
                <Badge variant="outline" className="mt-3 bg-slate-50 text-[#0A3D62] border-[#0A3D62]/20">
                  {(data.hostCategory as string) || "Host"}
                </Badge>
              )}

              {isEditing ? (
                <textarea 
                  value={displayBio || ""}
                  onChange={(e) => updateForm(isOrg ? 'orgDescription' : 'bio', e.target.value)}
                  placeholder="Your bio..."
                  className="mt-6 w-full text-sm text-slate-600 leading-relaxed p-2 border rounded-md min-h-[80px]"
                />
              ) : (
                displayBio && (
                  <p className="text-sm text-slate-600 mt-6 leading-relaxed break-words w-full px-2">
                    {displayBio as string}
                  </p>
                )
              )}
            </CardContent>
          </Card>

          {/* Socials Card */}
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#0A3D62]">Social Presence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <FaInstagram className="h-5 w-5 text-pink-600" />
                {isEditing ? (
                  <Input value={formData.instagram || ""} onChange={(e) => updateForm('instagram', e.target.value)} placeholder="Instagram URL" className="h-8" />
                ) : (
                  <span className="text-slate-600 font-medium">{data.instagram as string || "Not provided"}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaYoutube className="h-5 w-5 text-red-600" />
                {isEditing ? (
                  <Input value={formData.youtube || ""} onChange={(e) => updateForm('youtube', e.target.value)} placeholder="YouTube URL" className="h-8" />
                ) : (
                  <span className="text-slate-600 font-medium">{data.youtube as string || "Not provided"}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaLinkedin className="h-5 w-5 text-blue-600" />
                {isEditing ? (
                  <Input value={formData.linkedin || ""} onChange={(e) => updateForm('linkedin', e.target.value)} placeholder="LinkedIn URL" className="h-8" />
                ) : (
                  <span className="text-slate-600 font-medium">{data.linkedin as string || "Not provided"}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <LinkIcon className="h-5 w-5 text-slate-500" />
                {isEditing ? (
                  <Input value={formData[isOrg ? 'orgWebsite' : 'website'] || ""} onChange={(e) => updateForm(isOrg ? 'orgWebsite' : 'website', e.target.value)} placeholder="Website URL" className="h-8" />
                ) : (
                  displayWebsite ? (
                    <Link href={displayWebsite as string} target="_blank" className="text-[#0A3D62] hover:underline font-medium break-all">
                      {(displayWebsite as string).replace(/^https?:\/\//, '')}
                    </Link>
                  ) : <span className="text-slate-600 font-medium">Not provided</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: DNA & Operations */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Host DNA */}
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#0A3D62] flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#0A3D62]/70" />
                Travel DNA
              </CardTitle>
              <CardDescription>The core style and vibe of trips hosted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Host Types</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? formData.hostTypes : data.hostTypes)?.map((type: string) => (
                    <Badge key={type} className={`bg-[#0A3D62]/10 text-[#0A3D62] hover:bg-[#0A3D62]/20 border-0 px-3 py-1 ${isEditing ? 'cursor-pointer' : ''}`} onClick={() => isEditing && toggleArrayItem('hostTypes', type)}>
                      {type} {isEditing && <span className="ml-1 text-xs opacity-50">×</span>}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Badge variant="outline" className="border-dashed px-3 py-1 bg-slate-50 text-slate-500 cursor-pointer" onClick={() => {
                      const t = prompt("Add host type:");
                      if (t) toggleArrayItem('hostTypes', t);
                    }}>+ Add</Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Experience Types</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? formData.experienceTypes : data.experienceTypes)?.map((type: string) => (
                    <Badge key={type} className={`bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-0 px-3 py-1 ${isEditing ? 'cursor-pointer' : ''}`} onClick={() => isEditing && toggleArrayItem('experienceTypes', type)}>
                      {type} {isEditing && <span className="ml-1 text-xs opacity-50">×</span>}
                    </Badge>
                  ))}
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input className="h-6 w-32 text-xs" placeholder="Add custom..." value={customExp} onChange={e => setCustomExp(e.target.value)} onKeyDown={e => {
                        if (e.key === 'Enter' && customExp) {
                          e.preventDefault();
                          toggleArrayItem('experienceTypes', customExp);
                          setCustomExp('');
                        }
                      }} />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Travel Vibes</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? formData.travelVibes : data.travelVibes)?.map((type: string) => (
                    <Badge key={type} className={`bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 border-0 px-3 py-1 ${isEditing ? 'cursor-pointer' : ''}`} onClick={() => isEditing && toggleArrayItem('travelVibes', type)}>
                      {type} {isEditing && <span className="ml-1 text-xs opacity-50">×</span>}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Badge variant="outline" className="border-dashed px-3 py-1 bg-slate-50 text-slate-500 cursor-pointer" onClick={() => {
                      const t = prompt("Add travel vibe:");
                      if (t) toggleArrayItem('travelVibes', t);
                    }}>+ Add</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locations & Reach */}
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#0A3D62] flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#0A3D62]/70" />
                Locations & Reach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Primary Region</h4>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <Input value={formData.primaryLocation || ""} onChange={(e) => updateForm('primaryLocation', e.target.value)} placeholder="E.g. Mumbai, India" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#0A3D62] font-medium text-lg">
                    <MapPin className="h-5 w-5 text-rose-500" />
                    {(data.primaryLocation as string) || "Not specified"}
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Destinations</h4>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? formData.destinations : data.destinations)?.map((dest: string) => (
                    <div key={dest} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200 shadow-sm">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {dest}
                      {isEditing && <span className="ml-1 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => toggleArrayItem('destinations', dest)}>×</span>}
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-50 border border-dashed border-slate-300">
                      <Input className="h-6 w-32 border-0 bg-transparent focus-visible:ring-0 px-1 text-sm" placeholder="Add dest..." value={destInput} onChange={e => setDestInput(e.target.value)} onKeyDown={e => {
                        if (e.key === 'Enter' && destInput) {
                          e.preventDefault();
                          toggleArrayItem('destinations', destInput);
                          setDestInput('');
                        }
                      }} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Stats */}
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#0A3D62] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0A3D62]/70" />
                Operations & Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Group Size</span>
                  </div>
                  {isEditing ? (
                    <Input value={formData.groupSize || ""} onChange={(e) => updateForm('groupSize', e.target.value)} className="h-8" />
                  ) : (
                    <p className="text-xl font-bold text-[#0A3D62]">{(data.groupSize as string) || "-"}</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Experience</span>
                  </div>
                  {isEditing ? (
                    <Input value={formData.yearsExperience || ""} onChange={(e) => updateForm('yearsExperience', e.target.value)} className="h-8" />
                  ) : (
                    <p className="text-xl font-bold text-[#0A3D62]">{(data.yearsExperience as string) || "-"}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Trips Hosted</span>
                  </div>
                  {isEditing ? (
                    <Input value={formData.tripsHosted || ""} onChange={(e) => updateForm('tripsHosted', e.target.value)} className="h-8" />
                  ) : (
                    <p className="text-xl font-bold text-[#0A3D62]">{(data.tripsHosted as string) || "-"}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Travelers</span>
                  </div>
                  {isEditing ? (
                    <Input value={formData.travelersHosted || ""} onChange={(e) => updateForm('travelersHosted', e.target.value)} className="h-8" />
                  ) : (
                    <p className="text-xl font-bold text-[#0A3D62]">{(data.travelersHosted as string) || "-"}</p>
                  )}
                </div>

                {(isOrg || formData.hostCategory === "Organization") && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Building className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Team Size</span>
                    </div>
                    {isEditing ? (
                      <Input value={formData.teamSize || ""} onChange={(e) => updateForm('teamSize', e.target.value)} className="h-8" />
                    ) : (
                      <p className="text-xl font-bold text-[#0A3D62]">{(data.teamSize as string) || "-"}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
