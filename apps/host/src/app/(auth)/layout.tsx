import { WebGLFluidGradient } from "@/components/ui/webgl-fluid-gradient";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="min-h-[100dvh] w-full flex bg-background">
      <div className="hidden lg:block relative w-1/2 p-3 lg:p-5">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 flex flex-col items-center justify-center p-10 lg:p-14 text-center">
          <WebGLFluidGradient theme="ocean" />
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[420px] mx-auto gap-8 text-[#0A3D62]">
            <Image 
              src={logoImg} 
              alt="OnlyXplore Logo" 
              className="w-auto h-20 sm:h-24 object-contain drop-shadow-md"
            />

            <p className="text-black text-lg leading-relaxed font-medium">
              Built for <span className={cn("text-2xl font-bold", caveat.className)}>creators, agencies, and operators</span>. 
              Create unique itineraries, manage group bookings, and host unforgettable events all in one seamless workspace.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <span className="px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-sm font-semibold border border-white/40 text-[#0A3D62] shadow-sm">
                Itineraries
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-sm font-semibold border border-white/40 text-[#0A3D62] shadow-sm">
                Bookings
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-sm font-semibold border border-white/40 text-[#0A3D62] shadow-sm">
                Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        {children}
      </div>
    </div>
   );
}
 
export default AuthLayout;
