
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
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

const ImportGradesDialog: React.FC = () => {
  return (
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
  );
};

export default ImportGradesDialog;
