
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";

const results = [
  {
    id: 1,
    subject: 'Mathematics',
    type: 'Final Exam',
    score: 92,
    grade: 'A',
    date: '2024-04-15',
    feedback: 'Excellent understanding of calculus concepts.'
  },
  {
    id: 2,
    subject: 'Physics',
    type: 'Midterm',
    score: 85,
    grade: 'B+',
    date: '2024-03-20',
    feedback: 'Good grasp of mechanics, needs improvement in thermodynamics.'
  },
  {
    id: 3,
    subject: 'Chemistry',
    type: 'Quiz',
    score: 95,
    grade: 'A+',
    date: '2024-04-01',
    feedback: 'Outstanding performance in organic chemistry.'
  }
];

const getGradeColor = (grade: string) => {
  if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
  if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
  if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const StudentResultsView = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academic Results</h1>
          <p className="text-muted-foreground">View your academic performance and download certificates</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download All Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall GPA
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8/4.0</div>
            <p className="text-xs text-muted-foreground">Academic Year 2023-24</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Courses
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Out of 15 courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Achievement Points
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
            <p className="text-xs text-muted-foreground">Top 10% of class</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{result.subject}</h3>
                    <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.type}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Score: {result.score}%</Badge>
                    <Badge variant="outline">Date: {result.date}</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-4">{result.feedback}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentResultsView;
