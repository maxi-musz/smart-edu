
import React, { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockSubjects } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FilePen, 
  Calendar as CalendarIcon, 
  AlertCircle, 
  BookOpen 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subjectId: z.string().min(1, "Please select a subject"),
  class: z.string().min(1, "Please select a class"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  dueDate: z.date({
    required_error: "Please select a due date",
  }),
  maxScore: z.coerce.number().min(1, "Max score must be at least 1"),
});

type FormData = z.infer<typeof formSchema>;

const AssignmentPage = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subjectId: mockSubjects[0].id,
      class: "10A",
      description: "",
      dueDate: new Date(),
      maxScore: 100,
    },
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Assignment Created",
      description: `${data.title} has been assigned to Class ${data.class} and is due on ${format(data.dueDate, 'PPP')}.`,
    });
    console.log("Assignment created:", data);
    form.reset();
  };

  return (
    <TeacherLayout>
      <div className="content-area p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Assignment</h1>
          <p className="text-gray-500">Create and assign homework, projects, and assessments to your classes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FilePen className="mr-2 h-5 w-5" /> Assignment Details
                </CardTitle>
                <CardDescription>
                  Fill in the details for the new assignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignment Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Chapter 5 Problems" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="subjectId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Subjects</SelectLabel>
                                  {mockSubjects.map(subject => (
                                    <SelectItem key={subject.id} value={subject.id}>
                                      {subject.name} ({subject.code})
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Classes</SelectLabel>
                                  <SelectItem value="10A">Class 10A</SelectItem>
                                  <SelectItem value="10B">Class 10B</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignment Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide detailed instructions for students..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date()
                                  }
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Score</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="mr-2">Create Assignment</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => form.reset()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assignment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Students will receive a notification when you create a new assignment.
                  </AlertDescription>
                </Alert>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm">Clear Instructions</h3>
                    <p className="text-sm text-muted-foreground">Be specific about what students need to deliver and in what format.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Reasonable Deadlines</h3>
                    <p className="text-sm text-muted-foreground">Consider students' schedules and existing workload.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Learning Objectives</h3>
                    <p className="text-sm text-muted-foreground">Ensure the assignment aligns with your teaching goals.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Recent Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <h3 className="font-medium">Mid-term Exam Practice</h3>
                    <p className="text-xs text-muted-foreground mb-1">Mathematics • Class 10A</p>
                    <p className="text-xs">Due: May 15, 2025</p>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md">
                    <h3 className="font-medium">Lab Report</h3>
                    <p className="text-xs text-muted-foreground mb-1">Science • Class 10A</p>
                    <p className="text-xs">Due: May 10, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default AssignmentPage;
