
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

// Demo appointment data
const appointments = [
  {
    id: 1,
    title: 'Property Showing',
    clientName: 'Sarah Johnson',
    clientInitials: 'SJ',
    time: '10:30 AM',
    location: '123 Main St',
    isVideo: false,
  },
  {
    id: 2,
    title: 'Contract Review',
    clientName: 'Michael Brown',
    clientInitials: 'MB',
    time: '1:00 PM',
    location: 'Virtual Meeting',
    isVideo: true,
  },
  {
    id: 3,
    title: 'Listing Consultation',
    clientName: 'Jennifer Lee',
    clientInitials: 'JL',
    time: '3:30 PM',
    location: 'Office',
    isVideo: false,
  },
];

const UpcomingAppointments = () => {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-realestate-100 text-realestate-700">
                  {appointment.clientInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-sm">{appointment.title}</h4>
                <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-realestate-700">{appointment.time}</span>
          </div>
          
          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            {appointment.isVideo ? (
              <Video className="h-3 w-3 mr-1 flex-shrink-0" />
            ) : (
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            )}
            <span>{appointment.location}</span>
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              className="h-8 text-xs flex-1"
              size="sm"
            >
              Reschedule
            </Button>
            <Button
              className={cn(
                "h-8 text-xs flex-1",
                appointment.isVideo 
                  ? "bg-realestate-700 hover:bg-realestate-800" 
                  : "bg-realestate-700 hover:bg-realestate-800"
              )}
              size="sm"
            >
              {appointment.isVideo ? "Join" : "Directions"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingAppointments;
