"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebGLFluidGradient } from "@/components/ui/webgl-fluid-gradient";
import { hostProfileApi } from "@/lib/api";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [customHost, setCustomHost] = useState("");
  const [customExp, setCustomExp] = useState("");
  const [destInput, setDestInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const orgLogoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profilePhoto: "",
    username: "",
    bio: "",
    hostCategory: "", // "Individual" | "Organization"
    hostTypes: [] as string[],
    experienceTypes: [] as string[],
    primaryLocation: "",
    destinations: [] as string[],
    travelVibes: [] as string[],
    groupSize: "",
    yearsExperience: "",
    tripsHosted: "",
    travelersHosted: "",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    website: "https://www.",
    linkedin: "https://www.linkedin.com/",
    organizationName: "",
    logo: "",
    orgWebsite: "",
    orgDescription: "",
    teamSize: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchExistingProfile() {
      if (!session?.user?.accessToken) return;
      
      try {
        const profile = await hostProfileApi.getProfile(session.user.accessToken) as Record<string, unknown>;
        if (profile && profile.id) {
          setIsEditing(true);
          setFormData(prev => ({
            ...prev,
            firstName: profile.firstName as string || prev.firstName,
            lastName: profile.lastName as string || prev.lastName,
            profilePhoto: profile.profilePhoto as string || prev.profilePhoto,
            username: profile.username as string || prev.username,
            bio: profile.bio as string || prev.bio,
            hostCategory: profile.hostCategory as string || prev.hostCategory,
            hostTypes: profile.hostTypes as string[] || prev.hostTypes,
            experienceTypes: profile.experienceTypes as string[] || prev.experienceTypes,
            primaryLocation: profile.primaryLocation as string || prev.primaryLocation,
            destinations: profile.destinations as string[] || prev.destinations,
            travelVibes: profile.travelVibes as string[] || prev.travelVibes,
            groupSize: profile.groupSize as string || prev.groupSize,
            yearsExperience: profile.yearsExperience as string || prev.yearsExperience,
            tripsHosted: profile.tripsHosted as string || prev.tripsHosted,
            travelersHosted: profile.travelersHosted as string || prev.travelersHosted,
            instagram: profile.instagram as string || prev.instagram,
            youtube: profile.youtube as string || prev.youtube,
            website: profile.website as string || prev.website,
            linkedin: profile.linkedin as string || prev.linkedin,
            organizationName: profile.organizationName as string || prev.organizationName,
            logo: profile.logo as string || prev.logo,
            orgWebsite: profile.orgWebsite as string || prev.orgWebsite,
            orgDescription: profile.orgDescription as string || prev.orgDescription,
            teamSize: profile.teamSize as string || prev.teamSize,
          }));
        }
      } catch {
        // No existing profile, fallback to session defaults
        setFormData(prev => {
          let updated = false;
          const newForm = { ...prev };
          
          if (session.user?.name && !prev.firstName && !prev.lastName) {
            const parts = session.user.name.split(' ');
            newForm.firstName = parts[0] || "";
            newForm.lastName = parts.slice(1).join(' ') || "";
            updated = true;
          }
          
          if (session.user?.image && !prev.profilePhoto) {
            newForm.profilePhoto = session.user.image;
            updated = true;
          }
  
          return updated ? newForm : prev;
        });
      }
    }
    
    fetchExistingProfile();
  }, [session?.user]);

  const updateForm = (key: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'hostTypes' | 'experienceTypes' | 'travelVibes' | 'destinations', value: string) => {
    setFormData(prev => {
      const arr = prev[key];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(i => i !== value) };
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
        updateForm('profilePhoto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateForm('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDestination = () => {
    const val = destInput.trim();
    if (val && !formData.destinations.includes(val)) {
      toggleArrayItem('destinations', val);
    }
    setDestInput('');
  };

  const nextStep = () => {
    if (step === 5) {
      submitData();
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => s - 1);

  const submitData = async () => {
    if (!session?.user?.accessToken) return;
    setIsLoading(true);
    try {
      await hostProfileApi.updateProfile(session.user.accessToken, formData);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  const isNextDisabled = () => {
    if (isLoading) return true;
    if (step === 2 && !formData.hostCategory) return true; // Must select a category
    if (step === 2 && formData.hostTypes.length === 0) return true; // Must select at least one sub-type
    if (step === 4 && formData.travelVibes.length < 3) return true;
    return false;
  };

  const individualTypes = ['Travel creator', 'Trip organizer', 'Trek leader', 'Solo travel host', 'Individual community builder', 'Other'];
  const orgTypes = ['Travel agency', 'Travel company', 'Community operating as organization', 'Travel brand', 'Other'];
  
  const currentHostTypes = formData.hostCategory === 'Individual' ? individualTypes : formData.hostCategory === 'Organization' ? orgTypes : [];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="absolute inset-0 z-0">
        <WebGLFluidGradient theme="ocean" />
      </div>
      
      <div className="z-10 w-full max-w-2xl">
        <Card className="border border-white/20 shadow-2xl bg-white/10 backdrop-blur-2xl">
          <CardHeader>
            <div className="flex items-center justify-center mb-2">
              <span className="text-sm font-medium text-[#0A3D62]/70">Step {step} of 5</span>
            </div>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {/* STEP 1: USER PROFILE */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#0A3D62]">User Profile</CardTitle>
                  <CardDescription className="text-[#0A3D62]/70">Let&apos;s start with your basic information.</CardDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First name</Label>
                    <Input value={formData.firstName} onChange={e => updateForm('firstName', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Last name</Label>
                    <Input value={formData.lastName} onChange={e => updateForm('lastName', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <div className="flex items-center rounded-md border border-white/40 pl-3 bg-white/20">
                    <span className="text-[#0A3D62]/70 text-sm">onlyxplore.in/@</span>
                    <Input className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
                           value={formData.username} onChange={e => updateForm('username', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Profile photo</Label>
                  <div className="flex items-center gap-4">
                    {formData.profilePhoto && (
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-white/40">
                        <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handlePhotoUpload}
                      className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0A3D62]/10 file:text-[#0A3D62] hover:file:bg-[#0A3D62]/20 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <textarea 
                    value={formData.bio} 
                    onChange={e => updateForm('bio', e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-white/40 bg-white/20 px-3 py-2 text-sm shadow-sm placeholder:text-[#0A3D62]/50 focus-visible:outline-none focus-visible:border-white/80 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. Travel creator & weekend trek organizer from Mumbai." 
                  />
                </div>
              </div>
            )}

            {/* STEP 2: HOST TYPE */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#0A3D62]">Host Type</CardTitle>
                  <CardDescription className="text-[#0A3D62]/70">How do you operate your trips?</CardDescription>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      updateForm('hostCategory', 'Individual');
                      updateForm('hostTypes', []);
                    }} 
                    className={`p-4 rounded-xl border-2 text-left transition-all ${formData.hostCategory === 'Individual' ? 'border-[#0A3D62] bg-[#0A3D62]/5' : 'border-white/40 bg-white/5 hover:bg-white/10'}`}
                  >
                    <h3 className="font-bold text-lg mb-1 text-[#0A3D62]">Individual</h3>
                    <p className="text-sm text-[#0A3D62]/70">I operate as an individual host or creator, and may have a small team.</p>
                  </button>
                  <button 
                    onClick={() => {
                      updateForm('hostCategory', 'Organization');
                      updateForm('hostTypes', []);
                    }} 
                    className={`p-4 rounded-xl border-2 text-left transition-all ${formData.hostCategory === 'Organization' ? 'border-[#0A3D62] bg-[#0A3D62]/5' : 'border-white/40 bg-white/5 hover:bg-white/10'}`}
                  >
                    <h3 className="font-bold text-lg mb-1 text-[#0A3D62]">Organization</h3>
                    <p className="text-sm text-[#0A3D62]/70">We operate as an agency, company, or brand.</p>
                  </button>
                </div>

                {formData.hostCategory && (
                  <div className="space-y-3 pt-4 border-t animate-in fade-in slide-in-from-top-4">
                    <Label className="text-base font-semibold">Which of these best describes you? (Select all that apply)</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentHostTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => toggleArrayItem('hostTypes', type)}
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${
                            formData.hostTypes.includes(type) 
                              ? 'bg-[#0A3D62] text-white border-[#0A3D62]' 
                              : 'bg-white text-slate-700 hover:border-[#0A3D62]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {formData.hostTypes.includes('Other') && (
                      <div className="flex w-full max-w-sm gap-2 mt-4 animate-in fade-in slide-in-from-top-2">
                        <Input placeholder="Enter your host type" value={customHost} onChange={e => setCustomHost(e.target.value)} />
                        <Button type="button" onClick={() => {
                          if (customHost && !formData.hostTypes.includes(customHost)) {
                            updateForm('hostTypes', [...formData.hostTypes.filter(t => t !== 'Other'), customHost]);
                            setCustomHost('');
                          }
                        }} className="bg-[#0A3D62]">Add</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: PROFILE SETUP (Branching) */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                {formData.hostCategory === 'Individual' ? (
                  <>
                    <div>
                      <CardTitle className="text-2xl font-bold text-[#0A3D62]">Creator Profile</CardTitle>
                      <CardDescription className="text-[#0A3D62]/70">Tell travelers about your experience and social presence.</CardDescription>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <Label>How long have you been organizing trips?</Label>
                        <select 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-white/40 bg-white/20 px-3 py-2 text-sm"
                          value={formData.yearsExperience} onChange={e => updateForm('yearsExperience', e.target.value)}
                        >
                          <option value="" disabled>Select option</option>
                          <option value="Just starting">Just starting</option>
                          <option value="Less than 1 year">Less than 1 year</option>
                          <option value="1-3 years">1-3 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>How many trips have you hosted?</Label>
                        <select 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-white/40 bg-white/20 px-3 py-2 text-sm"
                          value={formData.tripsHosted} onChange={e => updateForm('tripsHosted', e.target.value)}
                        >
                          <option value="" disabled>Select option</option>
                          <option value="0">0</option>
                          <option value="1-5">1-5</option>
                          <option value="6-20">6-20</option>
                          <option value="21-50">21-50</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <Label className="text-base font-semibold">Social Presence</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Instagram URL</Label>
                          <Input value={formData.instagram} onChange={e => updateForm('instagram', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>YouTube URL</Label>
                          <Input value={formData.youtube} onChange={e => updateForm('youtube', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input value={formData.website} onChange={e => updateForm('website', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>LinkedIn URL</Label>
                          <Input value={formData.linkedin} onChange={e => updateForm('linkedin', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <CardTitle className="text-2xl font-bold text-[#0A3D62]">Organization Profile</CardTitle>
                      <CardDescription className="text-[#0A3D62]/70">Tell us about your organization.</CardDescription>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Organization name</Label>
                          <Input value={formData.organizationName} onChange={e => updateForm('organizationName', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Team size</Label>
                          <select 
                            className="flex h-10 w-full items-center justify-between rounded-md border border-white/40 bg-white/20 px-3 py-2 text-sm"
                            value={formData.teamSize} onChange={e => updateForm('teamSize', e.target.value)}
                          >
                            <option value="" disabled>Select option</option>
                            <option value="1">Just me</option>
                            <option value="2-10">2-10</option>
                            <option value="11-50">11-50</option>
                            <option value="50+">50+</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-4">
                          {formData.logo && (
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border">
                              <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            ref={orgLogoInputRef} 
                            onChange={handleLogoUpload}
                            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0A3D62]/10 file:text-[#0A3D62] hover:file:bg-[#0A3D62]/20 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Organization Website</Label>
                        <Input value={formData.orgWebsite} onChange={e => updateForm('orgWebsite', e.target.value)} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Short description</Label>
                        <textarea 
                          value={formData.orgDescription} 
                          onChange={e => updateForm('orgDescription', e.target.value)}
                          className="flex min-h-[80px] w-full rounded-md border border-white/40 bg-white/20 px-3 py-2 text-sm shadow-sm placeholder:text-[#0A3D62]/50 focus-visible:outline-none focus-visible:border-white/80 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="e.g. A premier travel agency organizing luxury retreats." 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 4: TRAVEL PROFILE */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#0A3D62]">Travel Profile</CardTitle>
                  <CardDescription className="text-[#0A3D62]/70">Tell us about the trips you organize.</CardDescription>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">What kind of experiences do you organize?</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Treks', 'Backpacking', 'Road Trips', 'Weekend Getaways', 'Group Tours', 'Solo Travel', 'Camping', 'Workations', 'Adventure', 'Luxury', 'Cultural', 'Wellness / Retreats', 'Photography Trips', 'Other'].map(type => (
                      <button
                        key={type}
                        onClick={() => toggleArrayItem('experienceTypes', type)}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                          formData.experienceTypes.includes(type) 
                            ? 'bg-[#0A3D62] text-white border-[#0A3D62]' 
                            : 'bg-white text-slate-700 hover:border-[#0A3D62]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {formData.experienceTypes.includes('Other') && (
                    <div className="flex w-full max-w-sm gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
                      <Input placeholder="Enter experience type" value={customExp} onChange={e => setCustomExp(e.target.value)} />
                      <Button type="button" onClick={() => {
                        if (customExp && !formData.experienceTypes.includes(customExp)) {
                          updateForm('experienceTypes', [...formData.experienceTypes.filter(t => t !== 'Other'), customExp]);
                          setCustomExp('');
                        }
                      }} className="bg-[#0A3D62]">Add</Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between items-end">
                    <Label className="text-base font-semibold">What&apos;s your travel vibe? (Select 3-5)</Label>
                    <span className="text-xs text-[#0A3D62]/70 font-medium">
                      {formData.travelVibes.length} / 5 selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Adventure', 'Backpacking', 'Slow Travel', 'Luxury', 'Nature', 'Culture', 'Social', 'Budget', 'Wellness', 'Photography'].map(vibe => (
                      <button
                        key={vibe}
                        onClick={() => {
                          if (!formData.travelVibes.includes(vibe) && formData.travelVibes.length >= 5) return;
                          toggleArrayItem('travelVibes', vibe);
                        }}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                          formData.travelVibes.includes(vibe) 
                            ? 'bg-[#0A3D62] text-white border-[#0A3D62]' 
                            : 'bg-white text-slate-700 hover:border-[#0A3D62]'
                        }`}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                  {formData.travelVibes.length > 0 && formData.travelVibes.length < 3 && (
                     <p className="text-xs text-red-500 mt-1">Please select at least {3 - formData.travelVibes.length} more.</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5: OPERATIONS & LOCATIONS */}
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-[#0A3D62]">Locations & Operations</CardTitle>
                  <CardDescription className="text-[#0A3D62]/70">Where do you operate and what are your group sizes?</CardDescription>
                </div>

                <div className="space-y-4">
                   <Label className="text-base font-semibold">Locations</Label>
                   <div className="space-y-2">
                    <Label>Primary Operating Region</Label>
                    <Input value={formData.primaryLocation} onChange={e => updateForm('primaryLocation', e.target.value)} placeholder="e.g. Mumbai, India" />
                  </div>
                  <div className="space-y-2">
                    <Label>Where do you usually take people?</Label>
                    <span className="block text-xs text-[#0A3D62]/70 mb-2">Type a destination and click Add</span>
                    <div className="flex gap-2 mb-2">
                      <Input 
                        value={destInput}
                        onChange={e => setDestInput(e.target.value)}
                        placeholder="Add destination (e.g. Himalayas)" 
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addDestination();
                          }
                        }} 
                      />
                      <Button type="button" onClick={addDestination} className="bg-[#0A3D62] px-6">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.destinations.map(d => (
                        <span key={d} className="px-3 py-1.5 bg-slate-100 rounded-full text-sm flex items-center gap-2">
                          {d}
                          <button onClick={() => toggleArrayItem('destinations', d)} className="text-slate-400 hover:text-red-500 hover:bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-base font-semibold">What&apos;s your typical group size?</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Solo', '2-5', '6-15', '16-30', '30+'].map(size => (
                      <button
                        key={size}
                        onClick={() => updateForm('groupSize', size)}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                          formData.groupSize === size 
                            ? 'bg-[#0A3D62] text-white border-[#0A3D62]' 
                            : 'bg-white text-slate-700 hover:border-[#0A3D62]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-between border-t border-white/20 pt-6 rounded-b-xl z-20">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            <Button className="bg-[#0A3D62]" onClick={nextStep} disabled={isNextDisabled()}>
              {isLoading ? "Saving..." : step === 5 ? (isEditing ? "Save Changes" : "Complete Setup") : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
