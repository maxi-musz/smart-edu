
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, UserCheck, Mail } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
}

interface RecipientSelectorProps {
  selectedClass: string;
  filteredStudents: Student[];
  selectedStudents: string[];
  selectAll: boolean;
  handleSelectAll: () => void;
  handleSelectStudent: (studentId: string) => void;
}

const RecipientSelector = ({
  selectedClass,
  filteredStudents,
  selectedStudents,
  selectAll,
  handleSelectAll,
  handleSelectStudent
}: RecipientSelectorProps) => {
  return (
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
  );
};

export default RecipientSelector;
