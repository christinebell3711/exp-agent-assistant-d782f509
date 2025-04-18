
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Home, Users } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-realestate-50 flex items-center justify-center">
              <Home className="h-6 w-6 text-realestate-700" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center">
            <span className="font-medium">↑ 4%</span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-realestate-50 flex items-center justify-center">
              <Users className="h-6 w-6 text-realestate-700" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4 flex items-center">
            <span className="font-medium">↑ 12%</span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Appointments</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-realestate-50 flex items-center justify-center">
              <CalendarDays className="h-6 w-6 text-realestate-700" />
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-4 flex items-center">
            <span className="font-medium">● Today</span>
            <span className="ml-1 text-muted-foreground">3 upcoming</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;

