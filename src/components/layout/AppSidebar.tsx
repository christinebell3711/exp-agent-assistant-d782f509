import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, CalendarClock, CheckSquare, Users, Menu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgentProfile from '@/components/profile/AgentProfile';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const location = useLocation();
  
  // Navigation items with their paths
  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/calendar", icon: CalendarClock, label: "Calendar" },
    { path: "/clients", icon: Users, label: "Clients" },
    { path: "/database", icon: Database, label: "Database" }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <NavLink to="/">
            <img 
              src="/lovable-uploads/3992c810-a229-4a61-a818-d470ed42313d.png" 
              alt="eXp Realty Logo" 
              className="h-7 w-auto" 
            />
          </NavLink>
          <span className="text-xl font-bold text-realestate-700">Assistant</span>
        </div>
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => 
                        isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-6 py-4 border-t">
        <AgentProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
