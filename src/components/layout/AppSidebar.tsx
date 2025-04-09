
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarClock, CheckSquare, Users, Building, Menu } from 'lucide-react';
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
          <Building className="h-6 w-6 text-realestate-700" />
          <span className="text-xl font-bold text-realestate-900">eXp Assistant</span>
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
                    isActive ? "bg-realestate-50 text-realestate-700" : "text-gray-700 hover:bg-gray-100"
                  }>
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/tasks" className={({ isActive }) => 
                    isActive ? "bg-realestate-50 text-realestate-700" : "text-gray-700 hover:bg-gray-100"
                  }>
                    <CheckSquare className="h-5 w-5" />
                    <span>Tasks</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/calendar" className={({ isActive }) => 
                    isActive ? "bg-realestate-50 text-realestate-700" : "text-gray-700 hover:bg-gray-100"
                  }>
                    <CalendarClock className="h-5 w-5" />
                    <span>Calendar</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/clients" className={({ isActive }) => 
                    isActive ? "bg-realestate-50 text-realestate-700" : "text-gray-700 hover:bg-gray-100"
                  }>
                    <Users className="h-5 w-5" />
                    <span>Clients</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-6 py-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-realestate-100 flex items-center justify-center">
            <span className="font-medium text-realestate-700">JD</span>
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
