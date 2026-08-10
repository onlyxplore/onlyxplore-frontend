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
      <SidebarInset className="bg-[#F7F7F2] md:m-2 md:ml-0 md:rounded-2xl overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 px-4 bg-white border-b border-gray-100">
          <SidebarTrigger className="text-[#0A3D62]" />
        </header>
        <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
   );
}
 
export default ProtectedLayout;
