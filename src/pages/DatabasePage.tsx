
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchTableCounts = async () => {
  // Define tables as a typed array to ensure we're using valid table names
  const tables = ['clients', 'properties', 'tasks', 'appointments', 'profiles'] as const;
  
  const counts = await Promise.all(
    tables.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error(`Error fetching ${table} count:`, error);
        return { table, count: '?' };
      }
      
      return { table, count };
    })
  );
  
  return counts;
};

const DatabasePage: React.FC = () => {
  const { data: tableCounts, isLoading } = useQuery({
    queryKey: ['tableCounts'],
    queryFn: fetchTableCounts,
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-realestate-700">Database Management</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                tableCounts?.map(({ table, count }) => (
                  <Card key={table}>
                    <CardHeader className="pb-2">
                      <CardTitle className="capitalize">{table}</CardTitle>
                      <CardDescription>Total records</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-realestate-700">{count}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Database Information</CardTitle>
                <CardDescription>
                  Connection and configuration details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Project ID</div>
                    <div className="col-span-2">ohudeiqhtyzfybkdlrze</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Connection</div>
                    <div className="col-span-2 text-green-600">Connected</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Tables</div>
                    <div className="col-span-2">{tableCounts?.length || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>
                  View and manage your database tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>The following tables are available in your database:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>profiles</strong> - User profiles for agents</li>
                    <li><strong>clients</strong> - Client information and details</li>
                    <li><strong>tasks</strong> - Agent tasks and to-dos</li>
                    <li><strong>properties</strong> - Property listings and details</li>
                    <li><strong>appointments</strong> - Calendar appointments and showings</li>
                  </ul>
                  
                  <p className="mt-4 text-gray-600">
                    You can manage your database directly from the Supabase dashboard 
                    for more advanced operations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DatabasePage;
