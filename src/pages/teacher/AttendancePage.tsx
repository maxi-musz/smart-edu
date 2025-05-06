
import React from 'react';
import TeacherLayout from '@/components/layout/TeacherLayout';
import { mockStudents, mockSubjects } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const AttendancePage = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'present' | 'absent' | 'late' | undefined>>({});
  const { toast } = useToast();

  const filteredStudents = mockStudents.filter(student => 
    student.grade === selectedClass
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(selectedDate, 'PPP')} has been recorded.`,
    });
  };

  const subject = mockSubjects.find(s => s.id === selectedSubject);

  return (
    <TeacherLayout>
      <div className="content-area p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mark Attendance</h1>
            <p className="text-gray-500">Record student attendance for your classes</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                setSelectedDate(yesterday);
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Day
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setSelectedDate(tomorrow);
              }}
            >
              Next Day <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Attendance Sheet</CardTitle>
                  <Badge 
                    className="bg-blue-100 text-blue-800 hover:bg-blue-100" 
                    variant="outline"
                  >
                    {format(selectedDate, 'EEEE, MMM d, yyyy')}
                  </Badge>
                </div>
                <CardDescription>
                  Mark attendance for {subject?.name} - Class {selectedClass}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6 gap-4">
                  <Select 
                    value={selectedSubject}
                    onValueChange={(value) => setSelectedSubject(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
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

                  <Select
                    value={selectedClass}
                    onValueChange={(value) => setSelectedClass(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                        <SelectItem value="10A">Class 10A</SelectItem>
                        <SelectItem value="10B">Class 10B</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Student</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-gray-500">ID: {student.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              {attendanceStatus[student.id] === 'present' && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>
                              )}
                              {attendanceStatus[student.id] === 'absent' && (
                                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Absent</Badge>
                              )}
                              {attendanceStatus[student.id] === 'late' && (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Late</Badge>
                              )}
                              {!attendanceStatus[student.id] && (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Marked</Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`rounded-full p-0 w-8 h-8 ${attendanceStatus[student.id] === 'present' ? 'bg-green-100 text-green-800' : ''}`}
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`rounded-full p-0 w-8 h-8 ${attendanceStatus[student.id] === 'absent' ? 'bg-red-100 text-red-800' : ''}`}
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`rounded-full p-0 w-8 h-8 ${attendanceStatus[student.id] === 'late' ? 'bg-yellow-100 text-yellow-800' : ''}`}
                                onClick={() => handleAttendanceChange(student.id, 'late')}
                              >
                                <span className="text-xs font-bold">L</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <Button onClick={handleSaveAttendance}>Save Attendance</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border shadow-sm p-3 pointer-events-auto"
                />

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Attendance Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Present</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {Object.values(attendanceStatus).filter(s => s === 'present').length} / {filteredStudents.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Absent</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        {Object.values(attendanceStatus).filter(s => s === 'absent').length} / {filteredStudents.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Late</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {Object.values(attendanceStatus).filter(s => s === 'late').length} / {filteredStudents.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Not Marked</span>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {filteredStudents.length - Object.keys(attendanceStatus).length} / {filteredStudents.length}
                      </Badge>
                    </div>
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

export default AttendancePage;
