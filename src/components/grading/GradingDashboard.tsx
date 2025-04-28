
import React, { useState } from 'react';
import { mockGrades, mockSubjects, mockStudents } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  PenLine,
  Check,
  Clock,
  AlertCircle,
  Plus,
  ChevronDown,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GradeStatus = 'all' | 'graded' | 'pending' | 'draft';
type AssignmentType = 'all' | 'exam' | 'lab-report' | 'essay' | 'book-report' | 'homework' | 'quiz';

const classList = [
  'All Classes',
  'SS1A',
  'SS1B',
  'SS2A',
  'SS2B',
  'SS3A',
  'SS3B',
];

const assignmentTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'exam', label: 'Exam' },
  { id: 'lab-report', label: 'Lab Report' },
  { id: 'essay', label: 'Essay' },
  { id: 'book-report', label: 'Book Report' },
  { id: 'homework', label: 'Homework' },
  { id: 'quiz', label: 'Quiz' },
];

interface ExtendedGradeItem {
  id: string;
  studentName: string;
  assignment: string;
  subject: string;
  score?: number;
  outOf: number;
  status: string;
  date: string;
  type?: string;
  class?: string;
}

const GradingDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<GradeStatus>('all');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [assignmentTypeFilter, setAssignmentTypeFilter] = useState<AssignmentType>('all');

  const extendedGrades = mockGrades as ExtendedGradeItem[];

  const filteredGrades = extendedGrades
    .filter(grade => 
      (activeTab === 'all' || grade.status === activeTab) &&
      (assignmentTypeFilter === 'all' || grade.type === assignmentTypeFilter) &&
      (searchTerm === '' || 
        grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (subjectFilter === 'all' || grade.subject === subjectFilter) &&
      (classFilter === 'All Classes' || grade.class === classFilter)
    );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'graded':
        return <Check className="h-4 w-4 text-edu-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-edu-accent" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-edu-danger" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'graded':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Graded</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'draft':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="content-area">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grading</h1>
          <p className="text-gray-500 text-sm">Manage assignments and grades</p>
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
            New Assignment
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search assignments or students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={assignmentTypeFilter} onValueChange={(value) => setAssignmentTypeFilter(value as AssignmentType)}>
          <SelectTrigger className="w-40 md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Assignment Type" />
          </SelectTrigger>
          <SelectContent>
            {assignmentTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {mockSubjects.map(subject => (
              <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as GradeStatus)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <GradesList 
                grades={filteredGrades} 
                getStatusIcon={getStatusIcon} 
                getStatusBadge={getStatusBadge}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              <GradesList 
                grades={filteredGrades} 
                getStatusIcon={getStatusIcon} 
                getStatusBadge={getStatusBadge}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="graded">
          <Card>
            <CardContent className="p-0">
              <GradesList 
                grades={filteredGrades} 
                getStatusIcon={getStatusIcon} 
                getStatusBadge={getStatusBadge}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardContent className="p-0">
              <GradesList 
                grades={filteredGrades} 
                getStatusIcon={getStatusIcon} 
                getStatusBadge={getStatusBadge}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface GradesListProps {
  grades: any[];
  getStatusIcon: (status: string) => JSX.Element | null;
  getStatusBadge: (status: string) => JSX.Element | null;
}

const GradesList: React.FC<GradesListProps> = ({ grades, getStatusIcon, getStatusBadge }) => {
  if (grades.length === 0) {
    return (
      <div className="text-center py-12">
        <PenLine className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">No grades found</h3>
        <p className="text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {grades.map((grade) => (
        <div key={grade.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{grade.assignment}</h3>
                {grade.type && (
                  <Badge variant="outline" className="ml-2 bg-gray-100">
                    {grade.type.replace('-', ' ').charAt(0).toUpperCase() + grade.type.replace('-', ' ').slice(1)}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{grade.subject}</p>
              <div className="flex items-center mt-1">
                <div className="h-6 w-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center">
                  {grade.studentName.charAt(0)}
                </div>
                <p className="text-sm">{grade.studentName}</p>
                {grade.class && (
                  <Badge variant="outline" className="ml-2 bg-gray-100 text-xs">
                    {grade.class}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                {getStatusBadge(grade.status)}
              </div>
              <div className="text-sm font-medium">
                {grade.status === 'graded' ? `${grade.score}/${grade.outOf}` : '-'}
              </div>
              <div className="text-xs text-gray-500">{grade.date}</div>
            </div>
          </div>
          
          <div className="flex justify-end mt-3 sm:hidden">
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button variant="default" size="sm" className="ml-2 bg-edu-primary hover:bg-edu-primary/90">
              <PenLine className="h-4 w-4 mr-1" />
              Grade
            </Button>
          </div>
          
          <div className="hidden sm:flex justify-end mt-3">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="default" size="sm" className="ml-2 bg-edu-primary hover:bg-edu-primary/90">
              <PenLine className="h-4 w-4 mr-1" />
              {grade.status === 'graded' ? 'Edit Grade' : 'Grade Assignment'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradingDashboard;
