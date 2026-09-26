import { AppSidebar } from "@/components/app-sidebar"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { hostProfileApi } from "@/lib/api"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ 
  children 
}: ProtectedLayoutProps) => {
  const session = await auth()

  if (session?.user?.accessToken) {
    try {
      const profile = await hostProfileApi.getProfile(session.user.accessToken)
      if (!profile) {
        redirect("/onboarding")
      }
    } catch {
      redirect("/onboarding")
    }
  }
  return ( 
    <SidebarProvider className="bg-[#0A3D62]">
      <AppSidebar />
      <SidebarInset className="bg-[#F7F7F2] md:m-2 md:ml-0 md:rounded-2xl overflow-hidden relative text-[#0A3D62] selection:bg-[#3C8DAD]/30">
        <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#3C8DAD_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none"></div>
        <div className="relative z-10 flex flex-1 flex-col h-full overflow-hidden">
          <header className="flex h-12 shrink-0 items-center gap-2 px-4 bg-white/50 backdrop-blur-sm border-b border-gray-100/50">
            <SidebarTrigger className="text-[#0A3D62]" />
          </header>
          <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
   );
}
 
export default ProtectedLayout;
