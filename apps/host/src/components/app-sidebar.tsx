"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import {
  Map,
  Calendar,
  PieChart,
  Settings2,
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
      title: "Itineraries",
      url: "#",
      icon: Map,
      isActive: true,
      items: [
        {
          title: "All Itineraries",
          url: "#",
        },
        {
          title: "Drafts",
          url: "#",
        },
      ],
    },
    {
      title: "Bookings",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Upcoming",
          url: "#",
        },
        {
          title: "Past",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Revenue",
          url: "#",
        },
        {
          title: "Audience",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
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
