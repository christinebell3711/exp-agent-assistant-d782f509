
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarClock, CheckSquare, Users, Menu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/3992c810-a229-4a61-a818-d470ed42313d.png" 
            alt="eXp Realty Logo" 
            className="h-7 w-auto" 
          />
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className={({ isActive }) => 
                    isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                  }>
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/tasks" className={({ isActive }) => 
                    isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                  }>
                    <CheckSquare className="h-5 w-5" />
                    <span>Tasks</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/calendar" className={({ isActive }) => 
                    isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                  }>
                    <CalendarClock className="h-5 w-5" />
                    <span>Calendar</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/clients" className={({ isActive }) => 
                    isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                  }>
                    <Users className="h-5 w-5" />
                    <span>Clients</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/database" className={({ isActive }) => 
                    isActive ? "bg-realestate-700 text-white" : "text-gray-200 hover:bg-gray-700 hover:bg-opacity-50"
                  }>
                    <Database className="h-5 w-5" />
                    <span>Database</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-6 py-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-realestate-700 flex items-center justify-center">
            <span className="font-medium text-white">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">John Doe</span>
            <span className="text-xs text-muted-foreground">eXp Realty</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
