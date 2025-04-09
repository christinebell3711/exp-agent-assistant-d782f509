
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Clock, Edit, Home, MoreHorizontal, Phone, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Demo task data
const tasks = [
  {
    id: 1,
    title: 'Call John Smith about listing appointment',
    type: 'call',
    priority: 'high',
    time: '10:00 AM',
    completed: false,
  },
  {
    id: 2,
    title: 'Prepare property evaluation for 123 Main St',
    type: 'document',
    priority: 'medium',
    time: '12:30 PM',
    completed: false,
  },
  {
    id: 3,
    title: 'Showing appointment at 456 Park Ave',
    type: 'showing',
    priority: 'high',
    time: '2:00 PM',
    completed: false,
  },
  {
    id: 4,
    title: 'Update listing photos for 789 Oak Dr',
    type: 'update',
    priority: 'low',
    time: '4:30 PM',
    completed: true,
  },
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <Phone className="h-4 w-4 text-blue-500" />;
    case 'showing':
      return <Home className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-amber-500" />;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Low</Badge>;
    default:
      return null;
  }
};

const TaskList = () => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "flex items-center justify-between p-4 border rounded-lg",
            task.completed ? "bg-gray-50" : "bg-white"
          )}
        >
          <div className="flex items-center gap-3">
            <Checkbox id={`task-${task.id}`} checked={task.completed} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {getTaskIcon(task.type)}
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "font-medium cursor-pointer",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </label>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{task.time}</span>
                {getPriorityBadge(task.priority)}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <X className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
