"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import {
  Map,
  Calendar,
  PieChart,
  Settings2,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import logoImg from "../../public/logo.png"
import logoCircleImg from "../../public/logo-circle.png"

const data = {
  user: {
    name: "Host User",
    email: "host@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Itineraries",
      url: "/itineraries",
      icon: Map,
      items: [
        {
          title: "All Itineraries",
          url: "/itineraries",
        },
        {
          title: "Create New",
          url: "/itineraries/create",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: Calendar,
      items: [
        {
          title: "All Bookings",
          url: "/bookings",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: PieChart,
      items: [
        {
          title: "Overview",
          url: "/analytics",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name || "Host User",
    email: session?.user?.email || "host@example.com",
    avatar: session?.user?.image || "",
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/dashboard" className="flex items-center justify-center py-4 w-full">
              <Image 
                src={logoImg} 
                alt="OnlyXplore" 
                className="h-8 w-auto object-contain invert transition-all group-data-[collapsible=icon]:hidden" 
              />
              <Image 
                src={logoCircleImg} 
                alt="OnlyXplore" 
                className="hidden h-8 w-8 object-contain invert transition-all group-data-[collapsible=icon]:block" 
              />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
