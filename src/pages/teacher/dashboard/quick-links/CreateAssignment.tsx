import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CreateAssignment: React.FC = () => {
  return (
    <div className="content-area">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Assignment Title</label>
            <input type="text" id="title" name="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <Button>Create Assignment</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAssignment;