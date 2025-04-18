
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, PencilIcon } from 'lucide-react';
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
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setProfile(profile);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profile data.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return null;
  }

  const name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

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
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              {profile.photo_url ? (
                <AvatarImage src={profile.photo_url} alt={name} />
              ) : (
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
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
