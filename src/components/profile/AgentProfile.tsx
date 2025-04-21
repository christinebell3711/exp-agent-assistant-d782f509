
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
      const { data: profiles, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      if (checkError) {
        throw checkError;
      }
      if (!profiles || profiles.length === 0) {
        setProfile(defaultProfile);
      } else {
        setProfile(profiles[0]);
      }
    } catch (error: any) {
      setError('Failed to load profile data');
      toast({
        title: 'Error',
        description: 'Failed to load profile data. Using default profile.',
        variant: 'destructive',
      });
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
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-1.5 w-10" />
          </div>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="flex flex-col items-center justify-center p-2 space-y-1">
          <p className="text-xs text-center text-muted-foreground">{error || 'Could not load profile'}</p>
          <Button variant="outline" onClick={fetchProfile} size="sm" className="text-xs px-2 py-1">
            <UserCog className="h-4 w-4 mr-1" />
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
      <div className="flex items-center gap-2 min-w-0 w-full">
        <Avatar className="h-8 w-8 flex-shrink-0">
          {profile.photo_url ? (
            <AvatarImage src={profile.photo_url} alt={name} />
          ) : (
            <AvatarFallback className="text-xs bg-realestate-700 text-white">{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
            <span className="text-sm font-semibold truncate">{name || ''}</span>
            <Badge variant="secondary" className="text-[9px] py-0.5 px-1 ml-1 whitespace-nowrap">{profile.role || 'Agent'}</Badge>
          </div>
          <div className="mt-0.5 flex flex-col text-xs text-muted-foreground break-words min-w-0">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center hover:text-foreground truncate break-words"
              title={profile.email}
            >
              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{profile.email}</span>
            </a>
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center hover:text-foreground mt-0.5 truncate break-words"
                title={profile.phone}
              >
                <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{profile.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="border-sidebar-border bg-sidebar text-sidebar-foreground p-2 shadow-none max-w-[300px]">
        <CardHeader className="flex flex-row items-center justify-between p-2 pb-1">
          <CardTitle className="text-sm font-semibold">Agent</CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="h-7 w-7 text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/20 p-0"
              title="Refresh profile"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/20 p-0"
              title="Edit profile"
            >
              <PencilIcon className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2">
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

