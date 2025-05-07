import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EnterGrades: React.FC = () => {
  return (
    <div className="content-area">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enter Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">Select Class</label>
            <select id="class" name="class" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">Select Student</label>
            <select id="student" name="student" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>Student 1</option>
              <option>Student 2</option>
              <option>Student 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Enter Grade</label>
            <input type="text" id="grade" name="grade" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <Button>Submit Grade</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterGrades;