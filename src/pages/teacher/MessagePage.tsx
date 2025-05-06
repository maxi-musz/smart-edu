
import React, { useState } from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockStudents } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import MessageComposer from '@/components/messages/MessageComposer';
import RecipientSelector from '@/components/messages/RecipientSelector';
import MessageTemplates from '@/components/messages/MessageTemplates';

const MessagePage = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  const filteredStudents = mockStudents.filter(student => 
    student.grade === selectedClass
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      setSelectAll(false);
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
      if (selectedStudents.length + 1 === filteredStudents.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSendMessage = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one student to send the message.",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Subject is required",
        description: "Please enter a subject for your message.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedStudents.length} student(s).`,
    });

    // Reset form
    setSubject('');
    setMessage('');
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleSelectTemplate = (templateSubject: string, templateMessage: string) => {
    setSubject(templateSubject);
    setMessage(templateMessage);
  };

  return (
    <TeacherLayout>
      <div className="content-area p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Message Students</h1>
          <p className="text-gray-500">Send messages to individual students or entire classes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <MessageComposer
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              subject={subject}
              setSubject={setSubject}
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
              selectedStudentsCount={selectedStudents.length}
            />
          </div>

          <div className="md:col-span-4">
            <RecipientSelector
              selectedClass={selectedClass}
              filteredStudents={filteredStudents}
              selectedStudents={selectedStudents}
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              handleSelectStudent={handleSelectStudent}
            />
          </div>
        </div>

        <MessageTemplates onSelectTemplate={handleSelectTemplate} />
      </div>
    </TeacherLayout>
  );
};

export default MessagePage;
