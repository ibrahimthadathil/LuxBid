import * as React from "react"
import {
  Layers3,
  User,
  LogOut,

  SquareTerminal,
  StickyNote,
} from "lucide-react"

import { NavMain } from "@/components/admin/nav-main"
import { TeamSwitcher } from "@/components/admin/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { title } from "process"

// This is sample data.
const data = {
 
  teams: [
   
    {
      name: "LogOut",
      logo: LogOut,
      
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/api/admin/LB/dashboard",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Users",
      url: "/api/admin/LB/users/Buyer",
      icon: User,
      items: [
        {
          title: "Organizer",
          url: "/api/admin/LB/users/Seller",
          // icon : 
        },
        {
          title: "Buyer",
          url: "/api/admin/LB/users/Buyer",
        },
        
      ],
    },
    {
      title : 'Category',
      url:'/api/admin/LB/category',
      icon :Layers3
    },
    {
      title : 'Posts',
      url:'/api/admin/LB/Posts',
      icon :StickyNote,
      items: [
            {
              title: "Approved",
              url: "#",
            },
            {
              title: "Requestes",
              url: "#",
            },
      ]
    }
  
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    // <SidebarProvider>
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
    // </SidebarProvider>
  )
}
