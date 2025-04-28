
import React, { useState } from 'react';
import { mockStudents } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  ArrowUpDown, 
  Users,
  ChevronDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const classList = [
  'All Classes',
  'SS1A',
  'SS1B',
  'SS2A',
  'SS2B',
  'SS3A',
  'SS3B',
];

// Extend the Student type to include the class property
interface ExtendedStudent {
  id: string;
  name: string;
  grade: string;
  performance: number;
  attendance: number;
  avatar?: string;
  class?: string;
}

const StudentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [classFilter, setClassFilter] = useState('All Classes');

  // Convert mockStudents to use our extended type
  const extendedStudents = mockStudents as ExtendedStudent[];

  // Filter and sort students
  const filteredStudents = extendedStudents
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (gradeFilter === 'all' || student.grade === gradeFilter) &&
      (classFilter === 'All Classes' || student.class === classFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'performance') {
        return b.performance - a.performance;
      } else if (sortBy === 'attendance') {
        return b.attendance - a.attendance;
      }
      return 0;
    });

  // Get unique grades for filter
  const grades = Array.from(new Set(mockStudents.map(student => student.grade)));

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'bg-edu-success';
    if (performance >= 70) return 'bg-edu-accent';
    return 'bg-edu-danger';
  };

  const handleViewStudent = (studentId: string) => {
    console.log(`Viewing student with ID: ${studentId}`);
    // Implement view student functionality
  };

  return (
    <div className="content-area">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-500 text-sm">Manage your student roster</p>
        </div>
        <div className="flex gap-2">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-32 md:w-40 bg-white">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classList.map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-edu-primary hover:bg-edu-primary/90">
            <Plus className="h-4 w-4 mr-1" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-24 md:w-32">
              <Filter className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {grades.map(grade => (
                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 md:w-40">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student List */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="overflow-hidden card-hover">
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
                    onClick={() => handleViewStudent(student.id)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No students found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
