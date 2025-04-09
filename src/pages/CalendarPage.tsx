
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingAppointments from '@/components/calendar/UpcomingAppointments';
import { Calendar } from '@/components/ui/calendar';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and appointments
            </p>
          </div>
          <Button className="bg-realestate-700 hover:bg-realestate-800">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="mr-2">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">April 2025</h2>
                  <Button variant="outline" size="icon" className="ml-2">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Tabs defaultValue="month">
                  <TabsList>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Today's Appointments</h3>
              <UpcomingAppointments />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
