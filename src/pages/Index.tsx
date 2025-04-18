
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  CalendarClock,
  ChevronRight,
  Clock,
  Filter,
  Home,
  Users,
  Star,
  Plus,
  CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardStats from '@/components/dashboard/DashboardStats';
import TaskList from '@/components/tasks/TaskList';
import UpcomingAppointments from '@/components/calendar/UpcomingAppointments';
import ClientActivity from '@/components/clients/ClientActivity';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState({
    highPriority: true,
    mediumPriority: true,
    lowPriority: true,
    completed: false
  });

  // Handle new task button click
  const handleNewTask = () => {
    toast({
      title: "Create Task",
      description: "New task creation would open here.",
    });
  };

  // Handle filter change
  const handleFilterChange = (key: keyof typeof filterOptions) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Filter Applied",
      description: `Tasks filtered by ${key} option.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={filterOptions.highPriority}
                  onCheckedChange={() => handleFilterChange('highPriority')}
                >
                  High Priority
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filterOptions.mediumPriority}
                  onCheckedChange={() => handleFilterChange('mediumPriority')}
                >
                  Medium Priority
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={filterOptions.lowPriority}
                  onCheckedChange={() => handleFilterChange('lowPriority')}
                >
                  Low Priority
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={filterOptions.completed}
                  onCheckedChange={() => handleFilterChange('completed')}
                >
                  Completed
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              className="bg-realestate-700 hover:bg-realestate-800"
              onClick={handleNewTask}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Manage your daily tasks and activities</CardDescription>
              </div>
              <Tabs defaultValue="today">
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TaskList />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Client Activity</CardTitle>
                <CardDescription>Recent client interactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ClientActivity />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
              <CardDescription>Track your performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">New Listings</span>
                  <span className="text-sm text-muted-foreground">2/3</span>
                </div>
                <Progress value={66} className="h-2 bg-realestate-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Client Calls</span>
                  <span className="text-sm text-muted-foreground">15/20</span>
                </div>
                <Progress value={75} className="h-2 bg-realestate-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Property Showings</span>
                  <span className="text-sm text-muted-foreground">8/10</span>
                </div>
                <Progress value={80} className="h-2 bg-realestate-100" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
