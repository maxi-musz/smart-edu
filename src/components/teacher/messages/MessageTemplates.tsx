
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface MessageTemplatesProps {
  onSelectTemplate: (subject: string, messageBody: string) => void;
}

const MessageTemplates = ({ onSelectTemplate }: MessageTemplatesProps) => {
  const templates = [
    {
      title: "Exam Reminder",
      description: "Reminder about upcoming exam dates and study materials.",
      subject: "Exam Reminder",
      message: "Dear students,\n\nThis is a reminder about the upcoming exam on [DATE]. Please ensure you have reviewed all study materials.\n\nBest regards,\nTeacher"
    },
    {
      title: "Assignment Feedback",
      description: "General feedback on recent assignments and areas for improvement.",
      subject: "Assignment Feedback",
      message: "Dear students,\n\nI have finished grading your recent assignments. Overall, I was impressed with [STRENGTHS], but many students struggled with [AREAS FOR IMPROVEMENT].\n\nBest regards,\nTeacher"
    },
    {
      title: "Class Announcement",
      description: "Important class announcements about schedule changes or events.",
      subject: "Important Class Announcement",
      message: "Dear students,\n\nI'm writing to inform you about an important change to our class schedule. [DETAILS OF ANNOUNCEMENT].\n\nPlease let me know if you have any questions.\n\nBest regards,\nTeacher"
    }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Message Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <BookOpen className="h-4 w-4 mr-2" /> {template.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto mt-2 text-xs"
                onClick={() => onSelectTemplate(template.subject, template.message)}
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageTemplates;
