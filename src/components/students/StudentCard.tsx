
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    grade: string;
    performance: number;
    attendance: number;
    avatar?: string;
    class?: string;
  };
  onView: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onView }) => {
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'bg-edu-success';
    if (performance >= 70) return 'bg-edu-accent';
    return 'bg-edu-danger';
  };

  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-4">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 rounded-full flex-shrink-0">
            {student.avatar ? (
              <AvatarImage src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
            ) : (
              <AvatarFallback className="bg-edu-primary text-white text-xl">
                {student.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4 flex-grow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{student.name}</h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline">{student.grade}</Badge>
                  <Badge variant="outline" className="bg-gray-100">{student.class || 'SS1A'}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Performance</span>
                <span className="text-xs font-medium">{student.performance}%</span>
              </div>
              <Progress
                value={student.performance}
                className="h-1.5"
                indicatorClassName={getPerformanceColor(student.performance)}
              />
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Attendance</span>
                <span className="text-xs font-medium">{student.attendance}%</span>
              </div>
              <Progress
                value={student.attendance}
                className="h-1.5"
                indicatorClassName={
                  student.attendance >= 90 ? 'bg-edu-success' : 
                  student.attendance >= 75 ? 'bg-edu-accent' : 'bg-edu-danger'
                }
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 hover:bg-gray-100"
            onClick={() => onView(student.id)}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
