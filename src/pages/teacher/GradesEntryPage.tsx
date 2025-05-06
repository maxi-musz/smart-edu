
import React, { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockStudents, mockSubjects } from '@/data/mockData';
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
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GradeEntryForm from '@/components/grades/GradeEntryForm';
import GradeSummary from '@/components/grades/GradeSummary';
import ImportGradesDialog from '@/components/grades/ImportGradesDialog';

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

  const handleOutOfChange = (value: number) => {
    if (value > 0) {
      setOutOf(value);
      
      // Adjust existing grades if they exceed the new maximum
      const updatedGrades: Record<string, number> = {};
      Object.entries(grades).forEach(([studentId, grade]) => {
        updatedGrades[studentId] = Math.min(grade, value);
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
                <GradeEntryForm
                  students={filteredStudents}
                  assignmentName={assignmentName}
                  setAssignmentName={setAssignmentName}
                  outOf={outOf}
                  setOutOf={handleOutOfChange}
                  grades={grades}
                  handleScoreChange={handleScoreChange}
                />
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredStudents.length} students from Class {selectedClass}
                  </p>
                </div>
                <div>
                  <ImportGradesDialog />
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-3">
            <GradeSummary 
              grades={grades} 
              outOf={outOf} 
              totalStudents={filteredStudents.length} 
            />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default GradesEntryPage;
