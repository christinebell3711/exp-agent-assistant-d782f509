import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BuildingIcon,
  HomeIcon, 
  LinkIcon,
  MailIcon, 
  MapPinIcon, 
  MoreHorizontal, 
  PhoneIcon, 
  PlusIcon, 
  SearchIcon, 
  UserIcon,
  X
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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
    propertyLinks: [
      { id: 1, title: 'Dream Home', url: 'https://example.com/listing/1234' }
    ]
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
    propertyLinks: []
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
    propertyLinks: [
      { id: 1, title: 'Current Home', url: 'https://example.com/listing/5678' },
      { id: 2, title: 'Potential Buy', url: 'https://example.com/listing/9101' }
    ]
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
    propertyLinks: []
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
    propertyLinks: [
      { id: 1, title: 'Listing', url: 'https://example.com/listing/1122' }
    ]
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
  const [searchQuery, setSearchQuery] = useState('');
  const [clientType, setClientType] = useState('all');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isPropertyLinksOpen, setIsPropertyLinksOpen] = useState(false);
  const [newPropertyLink, setNewPropertyLink] = useState({ title: '', url: '' });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = clientType === 'all' || 
                       (clientType === 'buyers' && client.type.includes('Buyer')) ||
                       (clientType === 'sellers' && client.type.includes('Seller'));
    
    return matchesSearch && matchesType;
  });

  const handleAddClient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Client added successfully");
    setIsAddClientOpen(false);
  };

  const handleOpenPropertyLinks = (client: any) => {
    setSelectedClient(client);
    setIsPropertyLinksOpen(true);
  };

  const handleAddPropertyLink = () => {
    if (!newPropertyLink.title || !newPropertyLink.url) {
      toast.error("Please provide both a title and URL for the property link");
      return;
    }

    if (selectedClient) {
      const newLink = {
        id: Date.now(),
        ...newPropertyLink
      };
      
      const clientIndex = clients.findIndex(c => c.id === selectedClient.id);
      if (clientIndex >= 0) {
        clients[clientIndex].propertyLinks = [
          ...clients[clientIndex].propertyLinks,
          newLink
        ];
      }

      toast.success("Property link added successfully");
      setNewPropertyLink({ title: '', url: '' });
    }
  };

  const handleDeletePropertyLink = (linkId: number) => {
    if (selectedClient) {
      const clientIndex = clients.findIndex(c => c.id === selectedClient.id);
      if (clientIndex >= 0) {
        clients[clientIndex].propertyLinks = clients[clientIndex].propertyLinks.filter(
          link => link.id !== linkId
        );
        
        setSelectedClient({
          ...selectedClient,
          propertyLinks: clients[clientIndex].propertyLinks
        });
      }
      
      toast.success("Property link removed");
    }
  };

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
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-realestate-700 hover:bg-realestate-800">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the client information below to add them to your system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddClient}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="(555) 123-4567" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientType">Client Type</Label>
                      <Select defaultValue="buyer">
                        <SelectTrigger id="clientType">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buyer">Buyer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="buyer-seller">Buyer/Seller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Chicago, IL" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-realestate-700 hover:bg-realestate-800">Add Client</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={clientType} 
            onValueChange={setClientType}
            className="w-full sm:w-auto"
          >
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
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-1"
                        onClick={() => handleOpenPropertyLinks(client)}
                      >
                        <LinkIcon className="h-3 w-3" />
                        <span className="hidden md:inline">Property Links</span>
                        {client.propertyLinks.length > 0 && (
                          <Badge variant="secondary" className="ml-1 h-4 px-1">
                            {client.propertyLinks.length}
                          </Badge>
                        )}
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
                          <DropdownMenuItem onClick={() => handleOpenPropertyLinks(client)}>
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Property Links
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
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No clients found matching your criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPropertyLinksOpen} onOpenChange={setIsPropertyLinksOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Property Links for {selectedClient?.name}</DialogTitle>
            <DialogDescription>
              Manage property links for this client. Add URLs to property listings or relevant real estate websites.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="linkTitle">Link Title</Label>
              <Input 
                id="linkTitle" 
                placeholder="e.g., Dream Home or MLS Listing #123" 
                value={newPropertyLink.title}
                onChange={(e) => setNewPropertyLink({...newPropertyLink, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="linkUrl">URL</Label>
              <Input 
                id="linkUrl" 
                placeholder="https://example.com/listing/123" 
                value={newPropertyLink.url}
                onChange={(e) => setNewPropertyLink({...newPropertyLink, url: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleAddPropertyLink} 
              className="bg-realestate-700 hover:bg-realestate-800 mt-2"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-2">Existing Property Links</h3>
            {selectedClient && selectedClient.propertyLinks.length > 0 ? (
              <div className="space-y-2">
                {selectedClient.propertyLinks.map((link: any) => (
                  <div key={link.id} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                    <div>
                      <p className="font-medium text-sm">{link.title}</p>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {link.url.length > 40 ? `${link.url.substring(0, 40)}...` : link.url}
                        <LinkIcon className="h-3 w-3" />
                      </a>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-gray-500 hover:text-red-600"
                      onClick={() => handleDeletePropertyLink(link.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No property links yet.</p>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ClientsPage;
