
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BuildingIcon,
  HomeIcon, 
  MailIcon, 
  MapPinIcon, 
  MoreHorizontal, 
  PhoneIcon, 
  PlusIcon, 
  SearchIcon, 
  UserIcon 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Demo client data
const clients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    type: 'Buyer',
    location: 'Chicago, IL',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Brown',
    initials: 'MB',
    email: 'michael.b@example.com',
    phone: '(555) 987-6543',
    type: 'Seller',
    location: 'Chicago, IL',
    status: 'active',
  },
  {
    id: 3,
    name: 'Jennifer Lee',
    initials: 'JL',
    email: 'jennifer.l@example.com',
    phone: '(555) 456-7890',
    type: 'Buyer/Seller',
    location: 'Evanston, IL',
    status: 'active',
  },
  {
    id: 4,
    name: 'David Wilson',
    initials: 'DW',
    email: 'david.w@example.com',
    phone: '(555) 234-5678',
    type: 'Buyer',
    location: 'Oak Park, IL',
    status: 'dormant',
  },
  {
    id: 5,
    name: 'Emily Davis',
    initials: 'ED',
    email: 'emily.d@example.com',
    phone: '(555) 876-5432',
    type: 'Seller',
    location: 'Chicago, IL',
    status: 'active',
  },
];

const getClientTypeBadge = (type: string) => {
  switch (type) {
    case 'Buyer':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Buyer</Badge>;
    case 'Seller':
      return <Badge variant="outline" className="bg-green-50 text-green-700">Seller</Badge>;
    case 'Buyer/Seller':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700">Buyer/Seller</Badge>;
    default:
      return null;
  }
};

const ClientsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">
              Manage your client relationships
            </p>
          </div>
          <Button className="bg-realestate-700 hover:bg-realestate-800">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-9" 
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Client Directory</CardTitle>
            <CardDescription>Manage and track your client relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-realestate-100 text-realestate-700">
                        {client.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        {client.name}
                        {getClientTypeBadge(client.type)}
                      </h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>{client.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <PhoneIcon className="h-3 w-3" />
                      <span className="hidden md:inline">Call</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <MailIcon className="h-3 w-3" />
                      <span className="hidden md:inline">Email</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <HomeIcon className="h-3 w-3" />
                      <span className="hidden md:inline">Properties</span>
                    </Button>
                    
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
                          <UserIcon className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BuildingIcon className="h-4 w-4 mr-2" />
                          View Properties
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Archive Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ClientsPage;
