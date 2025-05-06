
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeEntryFormProps {
  students: any[];
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  outOf: number;
  setOutOf: (value: number) => void;
  grades: Record<string, number>;
  handleScoreChange: (studentId: string, score: string) => void;
}

const GradeEntryForm: React.FC<GradeEntryFormProps> = ({
  students,
  assignmentName,
  setAssignmentName,
  outOf,
  setOutOf,
  grades,
  handleScoreChange
}) => {
  return (
    <>
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
            onChange={(e) => {
              const numberValue = parseInt(e.target.value, 10);
              if (!isNaN(numberValue) && numberValue > 0) {
                setOutOf(numberValue);
              }
            }}
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
            {students.map(student => {
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
    </>
  );
};

export default GradeEntryForm;
