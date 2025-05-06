
import React, { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockStudents, mockSubjects, GradeItem } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart2, 
  FileSpreadsheet, 
  Save, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  BookOpen,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const GradesEntryPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [assignmentName, setAssignmentName] = useState('Quiz 1');
  const [outOf, setOutOf] = useState(100);
  const [grades, setGrades] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredStudents = mockStudents.filter(student => 
    student.grade === selectedClass
  );

  const handleScoreChange = (studentId: string, score: string) => {
    const numberScore = parseInt(score, 10);
    if (!isNaN(numberScore) && numberScore >= 0 && numberScore <= outOf) {
      setGrades({
        ...grades,
        [studentId]: numberScore,
      });
    }
  };

  const handleOutOfChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setOutOf(numberValue);
      
      // Adjust existing grades if they exceed the new maximum
      const updatedGrades: Record<string, number> = {};
      Object.entries(grades).forEach(([studentId, grade]) => {
        updatedGrades[studentId] = Math.min(grade, numberValue);
      });
      setGrades(updatedGrades);
    }
  };

  const handleSubmitGrades = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Grades Saved",
        description: `${Object.keys(grades).length} grades for ${assignmentName} have been recorded.`,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const calculateClassAverage = () => {
    const scores = Object.values(grades);
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round((sum / scores.length) * 10) / 10; // Round to 1 decimal place
  };

  const calculateCompletionPercentage = () => {
    return Math.round((Object.keys(grades).length / filteredStudents.length) * 100);
  };

  return (
    <TeacherLayout>
      <div className="content-area p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Enter Grades</h1>
            <p className="text-gray-500">Record and manage student grades for assignments and assessments</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setGrades({})}>Clear All</Button>
            <Button 
              onClick={handleSubmitGrades} 
              disabled={Object.keys(grades).length === 0 || isSubmitting}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" /> 
              {isSubmitting ? "Saving..." : "Save Grades"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-9">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Grade Entry Sheet</CardTitle>
                    <CardDescription>
                      Enter grades for {assignmentName}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Classes</SelectLabel>
                          <SelectItem value="10A">Class 10A</SelectItem>
                          <SelectItem value="10B">Class 10B</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Subjects</SelectLabel>
                          {mockSubjects.map(subject => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Assignment Name</label>
                    <Input
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      placeholder="Enter assignment name"
                    />
                  </div>
                  <div className="w-full md:w-36">
                    <label className="text-sm font-medium mb-1 block">Out Of</label>
                    <Input
                      type="number"
                      min="1"
                      value={outOf}
                      onChange={(e) => handleOutOfChange(e.target.value)}
                    />
                  </div>
                </div>

                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="w-32 text-right">Score</TableHead>
                        <TableHead className="w-32 text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => {
                        const score = grades[student.id] || 0;
                        const percentage = outOf > 0 ? Math.round((score / outOf) * 100) : 0;
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium mr-3">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min="0"
                                max={outOf}
                                value={grades[student.id] || ''}
                                onChange={(e) => handleScoreChange(student.id, e.target.value)}
                                className="w-16 ml-auto text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant="outline"
                                className={
                                  percentage >= 90 ? "bg-green-100 text-green-800" :
                                  percentage >= 70 ? "bg-blue-100 text-blue-800" :
                                  percentage >= 50 ? "bg-yellow-100 text-yellow-800" :
                                  percentage > 0 ? "bg-red-100 text-red-800" : 
                                  "bg-gray-100 text-gray-800"
                                }
                              >
                                {percentage > 0 ? `${percentage}%` : "N/A"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredStudents.length} students from Class {selectedClass}
                  </p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center" size="sm">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Import From Spreadsheet
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Import Grades</DialogTitle>
                        <DialogDescription>
                          Upload a spreadsheet or CSV file with student grades
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="border-2 border-dashed rounded-md p-6 text-center">
                          <FileSpreadsheet className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">Drop your file here or click to browse</p>
                          <p className="mt-1 text-xs text-muted-foreground">Supports .xlsx, .csv files</p>
                          <Button size="sm" variant="secondary" className="mt-4">Browse Files</Button>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                          Your spreadsheet should have columns for Student ID and Score.
                        </p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Import</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" /> Grade Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Class Average</p>
                    <p className="text-2xl font-bold">
                      {calculateClassAverage()}
                      <span className="text-sm text-muted-foreground ml-1">/ {outOf}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {calculateClassAverage() > 0 ? 
                        `${Math.round((calculateClassAverage() / outOf) * 100)}%` : 
                        "No grades entered"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Students Graded</p>
                    <p className="text-2xl font-bold">
                      {Object.keys(grades).length}
                      <span className="text-sm text-muted-foreground ml-1">/ {filteredStudents.length}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {calculateCompletionPercentage()}% complete
                    </p>
                  </div>

                  {Object.keys(grades).length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mt-2">Grade Distribution</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">90-100%</span>
                          <span className="text-xs font-medium">
                            {Object.values(grades).filter(g => (g / outOf) * 100 >= 90).length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">70-89%</span>
                          <span className="text-xs font-medium">
                            {Object.values(grades).filter(g => (g / outOf) * 100 >= 70 && (g / outOf) * 100 < 90).length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">50-69%</span>
                          <span className="text-xs font-medium">
                            {Object.values(grades).filter(g => (g / outOf) * 100 >= 50 && (g / outOf) * 100 < 70).length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">0-49%</span>
                          <span className="text-xs font-medium">
                            {Object.values(grades).filter(g => (g / outOf) * 100 < 50).length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" /> Recent Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <h3 className="font-medium">Chapter Test</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">Mathematics</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Graded
                      </Badge>
                    </div>
                    <p className="text-xs mt-1">Class Average: 82%</p>
                  </div>
                  
                  <div className="bg-muted/20 p-3 rounded-md">
                    <h3 className="font-medium">Lab Report</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">Science</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> In Progress
                      </Badge>
                    </div>
                    <p className="text-xs mt-1">10/30 graded</p>
                  </div>
                </div>

                <Button variant="ghost" className="w-full mt-4 text-sm">
                  <Plus className="h-4 w-4 mr-1" /> New Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default GradesEntryPage;
