
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, PencilIcon, UserCog } from 'lucide-react';
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
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setProfile(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data.',
        variant: 'destructive',
      });
      // Set fallback profile data if unable to fetch
      setProfile({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@exp.com',
        phone: '(555) 123-4567',
        role: 'Agent',
        photo_url: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
        <div className="flex items-center justify-center p-4">
          <Button variant="outline" onClick={fetchProfile}>
            <UserCog className="h-4 w-4 mr-2" />
            Load Profile
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
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Agent Profile</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8"
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
