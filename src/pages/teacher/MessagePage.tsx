
import React, { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockStudents, mockSubjects } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageSquare, 
  Send, 
  Users, 
  UserCheck, 
  Mail,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const MessagePage = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  const filteredStudents = mockStudents.filter(student => 
    student.grade === selectedClass
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      setSelectAll(false);
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
      if (selectedStudents.length + 1 === filteredStudents.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSendMessage = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one student to send the message.",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Subject is required",
        description: "Please enter a subject for your message.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    const recipientNames = selectedStudents.map(id => {
      const student = mockStudents.find(s => s.id === id);
      return student?.name;
    }).join(', ');

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedStudents.length} student(s).`,
    });

    // Reset form
    setSubject('');
    setMessage('');
    setSelectedStudents([]);
    setSelectAll(false);
  };

  return (
    <TeacherLayout>
      <div className="content-area p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Message Students</h1>
          <p className="text-gray-500">Send messages to individual students or entire classes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
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
                      {selectedStudents.length > 0 && (
                        <span className="ml-2 text-xs bg-primary-foreground text-primary rounded-full px-2 py-0.5">
                          {selectedStudents.length}
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-4 w-4" /> Recipients
                  </CardTitle>
                  <div className="flex items-center">
                    <Checkbox 
                      id="selectAll" 
                      checked={selectAll} 
                      onCheckedChange={handleSelectAll}
                    />
                    <label htmlFor="selectAll" className="ml-2 text-xs">
                      Select All
                    </label>
                  </div>
                </div>
                <CardDescription>
                  {selectedClass} students ({filteredStudents.length})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2">
                    {filteredStudents.map((student) => (
                      <div 
                        key={student.id} 
                        className={`p-2 rounded-lg flex items-center ${
                          selectedStudents.includes(student.id) 
                            ? 'bg-primary-foreground/10' 
                            : ''
                        }`}
                      >
                        <Checkbox 
                          id={student.id} 
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => handleSelectStudent(student.id)}
                          className="mr-3"
                        />
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-primary/20">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <label htmlFor={student.id} className="flex-grow cursor-pointer">
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.grade}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-6">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">
                        <span className="font-medium">{selectedStudents.length}</span> of {filteredStudents.length} students selected
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">
                        Message will be sent via the student portal and email
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Message Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Exam Reminder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reminder about upcoming exam dates and study materials.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-xs" 
                  onClick={() => {
                    setSubject("Exam Reminder");
                    setMessage("Dear students,\n\nThis is a reminder about the upcoming exam on [DATE]. Please ensure you have reviewed all study materials.\n\nBest regards,\nTeacher");
                  }}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Assignment Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">General feedback on recent assignments and areas for improvement.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-xs"
                  onClick={() => {
                    setSubject("Assignment Feedback");
                    setMessage("Dear students,\n\nI have finished grading your recent assignments. Overall, I was impressed with [STRENGTHS], but many students struggled with [AREAS FOR IMPROVEMENT].\n\nBest regards,\nTeacher");
                  }}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Class Announcement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Important class announcements about schedule changes or events.</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-xs"
                  onClick={() => {
                    setSubject("Important Class Announcement");
                    setMessage("Dear students,\n\nI'm writing to inform you about an important change to our class schedule. [DETAILS OF ANNOUNCEMENT].\n\nPlease let me know if you have any questions.\n\nBest regards,\nTeacher");
                  }}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default MessagePage;
