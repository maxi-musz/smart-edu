
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessageComposerProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  handleSendMessage: () => void;
  selectedStudentsCount: number;
}

const MessageComposer = ({
  selectedClass,
  setSelectedClass,
  subject,
  setSubject,
  message,
  setMessage,
  handleSendMessage,
  selectedStudentsCount
}: MessageComposerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" /> Compose Message
        </CardTitle>
        <CardDescription>
          Compose a new message to send to students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="10B">Class 10B</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Subject</label>
            <Input 
              placeholder="Enter message subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Message</label>
            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[200px]"
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleSendMessage} className="flex items-center">
              <Send className="mr-2 h-4 w-4" /> Send Message
              {selectedStudentsCount > 0 && (
                <span className="ml-2 text-xs bg-primary-foreground text-primary rounded-full px-2 py-0.5">
                  {selectedStudentsCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageComposer;
