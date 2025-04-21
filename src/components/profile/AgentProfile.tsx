
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, PencilIcon, UserCog, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EditProfileForm } from './EditProfileForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileData {
  id?: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  role: string | null;
  photo_url: string | null;
}

const AgentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const defaultProfile: ProfileData = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@exp.com',
    phone: '(555) 123-4567',
    role: 'Agent',
    photo_url: null
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First check if the profiles table exists by fetching all profiles
      const { data: profiles, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (checkError) {
        // If there's an error, it might be that the table doesn't exist
        console.error('Error checking profiles:', checkError);
        throw checkError;
      }
      
      // If profiles array is empty, use default profile
      if (!profiles || profiles.length === 0) {
        console.log('No profiles found, using default profile');
        setProfile(defaultProfile);
      } else {
        // Get the first profile
        setProfile(profiles[0]);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile data');
      toast({
        title: 'Error',
        description: 'Failed to load profile data. Using default profile.',
        variant: 'destructive',
      });
      // Set fallback profile data if unable to fetch
      setProfile(defaultProfile);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRefresh = () => {
    fetchProfile();
    toast({
      title: 'Refreshing',
      description: 'Refreshing profile data...',
    });
  };

  const renderProfile = () => {
    if (isLoading) {
      return (
        <div className="flex items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="flex flex-col items-center justify-center p-4 space-y-2">
          <p className="text-sm text-center text-muted-foreground">{error || 'Could not load profile'}</p>
          <Button variant="outline" onClick={fetchProfile} size="sm">
            <UserCog className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    const name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    const initials = name
      ? name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
      : 'A';

    return (
      <div className="flex items-start space-x-4">
        <Avatar className="h-16 w-16">
          {profile.photo_url ? (
            <AvatarImage src={profile.photo_url} alt={name} />
          ) : (
            <AvatarFallback className="text-lg bg-realestate-700 text-white">{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{name || 'Agent'}</h3>
            <Badge variant="secondary" className="mt-1">
              {profile.role || 'Agent'}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <a 
              href={`mailto:${profile.email}`} 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              {profile.email}
            </a>
            {profile.phone && (
              <a 
                href={`tel:${profile.phone}`} 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                {profile.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="border-sidebar-border bg-sidebar text-sidebar-foreground">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Agent Profile</CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="h-8 w-8 text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/20"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh profile</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/20"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit profile</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {renderProfile()}
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <EditProfileForm
            initialData={profile}
            onClose={() => setIsEditing(false)}
            onSuccess={fetchProfile}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentProfile;
