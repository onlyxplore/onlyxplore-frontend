import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoImg from "../../../public/logo.png";
import { LoginButton } from "@/components/auth/login-button";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-start pt-32 sm:pt-40 md:pt-48 overflow-hidden w-full">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between gap-4 px-6 py-2.5 bg-white/80 border border-[#0A3D62]/15 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(10,61,98,0.1)] w-[max-content]">
        <Image 
          src={logoImg} 
          alt="OnlyXplore Logo" 
          className="w-auto h-7 sm:h-8 object-contain"
        />
        <div className="w-[1.5px] h-6 bg-[#0A3D62]/20 rounded-full" />
        <div className="flex items-center gap-2 sm:gap-3">
          <LoginButton>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-[1.5px] border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62] hover:text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors whitespace-nowrap">
              Join as traveler
            </span>
          </LoginButton>
          <a href="http://localhost:3001" className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0A3D62] border-[1.5px] border-[#0A3D62] text-white hover:bg-[#0A3D62]/90 font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
            Become a host
          </a>
        </div>
      </nav>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
      </div>
      <div className="space-y-6 sm:space-y-8 text-center z-10 relative px-4 pb-16 sm:pb-20 mt-8 md:mt-0">
        <div className="max-w-xl mx-auto px-2 flex flex-col items-center">
          <p className={cn("text-[#0A3D62] text-5xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 tracking-tight font-medium drop-shadow-sm", caveat.className)}>
            Built for Every Journey.
          </p>
          <p className="text-[#0A3D62]/80 text-lg sm:text-xl leading-relaxed font-medium">
            India&apos;s creator-led travel platform where travel creators, communities, and agencies create itineraries, share experiences, and connect with travelers.
          </p>
        </div>
      </div>
    </main>
  );
}
