
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter, Plus, Search, SlidersHorizontal } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const TasksPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    highPriority: true,
    mediumPriority: true,
    lowPriority: true,
    completed: true
  });

  // Handle new task button click
  const handleNewTask = () => {
    toast({
      title: "Create Task",
      description: "New task creation would open here.",
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof typeof filterOptions) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle sort button click
  const handleSortClick = () => {
    toast({
      title: "Sort Tasks",
      description: "Sorting options would open here.",
    });
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage your tasks and stay on top of your schedule
            </p>
          </div>
          <Button 
            className="bg-realestate-700 hover:bg-realestate-800"
            onClick={handleNewTask}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-9" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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
            variant="outline"
            onClick={handleSortClick}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>

        <Card>
          <CardHeader className="p-6">
            <Tabs defaultValue="today" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <TaskList />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TasksPage;
