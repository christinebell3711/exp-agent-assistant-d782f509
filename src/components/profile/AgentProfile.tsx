
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, User } from 'lucide-react';

interface AgentProfileProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  imageUrl?: string;
}

const AgentProfile = ({ name, role, email, phone, imageUrl }: AgentProfileProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Agent Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt={name} />
            ) : (
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge variant="secondary" className="mt-1">
                {role}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <a 
                href={`mailto:${email}`} 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {email}
              </a>
              <a 
                href={`tel:${phone}`} 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                {phone}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentProfile;
