
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Home, Mail, MessageSquare, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

// Demo client activity data
const activities = [
  {
    id: 1,
    clientName: 'Sarah Johnson',
    clientInitials: 'SJ',
    activity: 'Called about listing at 123 Main St',
    time: '1 hour ago',
    type: 'call',
  },
  {
    id: 2,
    clientName: 'Michael Brown',
    clientInitials: 'MB',
    activity: 'Viewed property at 456 Park Ave',
    time: '3 hours ago',
    type: 'viewing',
  },
  {
    id: 3,
    clientName: 'Jennifer Lee',
    clientInitials: 'JL',
    activity: 'Requested information via email',
    time: 'Yesterday',
    type: 'email',
  },
  {
    id: 4,
    clientName: 'David Wilson',
    clientInitials: 'DW',
    activity: 'Scheduled showing for 789 Oak Dr',
    time: 'Yesterday',
    type: 'schedule',
  },
  {
    id: 5,
    clientName: 'Emily Davis',
    clientInitials: 'ED',
    activity: 'Sent follow-up message about closing',
    time: '2 days ago',
    type: 'message',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <Phone className="h-4 w-4 text-blue-500" />;
    case 'viewing':
      return <Home className="h-4 w-4 text-green-500" />;
    case 'email':
      return <Mail className="h-4 w-4 text-amber-500" />;
    case 'schedule':
      return <Calendar className="h-4 w-4 text-purple-500" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-pink-500" />;
    default:
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
  }
};

const ClientActivity = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <Avatar>
            <AvatarFallback className="bg-realestate-100 text-realestate-700">
              {activity.clientInitials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <h4 className="font-medium text-sm">{activity.clientName}</h4>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            
            <div className="flex items-center gap-1 mt-1">
              {getActivityIcon(activity.type)}
              <p className="text-sm text-muted-foreground truncate">{activity.activity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientActivity;
