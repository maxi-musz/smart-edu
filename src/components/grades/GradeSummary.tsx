
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart2, BookOpen, AlertTriangle, Check, Plus } from 'lucide-react';

interface GradeSummaryProps {
  grades: Record<string, number>;
  outOf: number;
  totalStudents: number;
}

const GradeSummary: React.FC<GradeSummaryProps> = ({ grades, outOf, totalStudents }) => {
  const calculateClassAverage = () => {
    const scores = Object.values(grades);
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return Math.round((sum / scores.length) * 10) / 10; // Round to 1 decimal place
  };

  const calculateCompletionPercentage = () => {
    return Math.round((Object.keys(grades).length / totalStudents) * 100);
  };

  return (
    <>
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
                <span className="text-sm text-muted-foreground ml-1">/ {totalStudents}</span>
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
    </>
  );
};

export default GradeSummary;
