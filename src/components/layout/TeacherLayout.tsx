
import React, { useState } from 'react';
import { Home, Users, Calendar, Book, FileText, User, ListTodo, BarChart2, Award, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardOverview from '../dashboard/DashboardOverview';
import StudentsList from '../students/StudentsList';
import ScheduleView from '../schedules/ScheduleView';
import SubjectsList from '../subjects/SubjectsList';
import GradingDashboard from '../grading/GradingDashboard';
import TeacherProfile from '../profile/TeacherProfile';
import StudentDashboard from '../student/StudentDashboard';
import StudentSubjectsView from '../student/StudentSubjectsView';
import StudentTasksView from '../student/StudentTasksView'; 
import StudentPerformanceView from '../student/StudentPerformanceView';
import StudentResultsView from '../student/StudentResultsView';
import StudentAIChat from '../student/StudentAIChat';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

type TabType = 'home' | 'students' | 'schedules' | 'subjects' | 'grading' | 'profile' |
               'student-home' | 'student-subjects' | 'student-tasks' | 'student-performance' | 'student-results' | 'student-chat';

const teacherTabs = [
  { id: 'home' as const, label: 'Home', icon: Home },
  { id: 'students' as const, label: 'Students', icon: Users },
  { id: 'schedules' as const, label: 'Schedules', icon: Calendar },
  { id: 'subjects' as const, label: 'Subjects', icon: Book },
  { id: 'grading' as const, label: 'Grading', icon: FileText },
  { id: 'profile' as const, label: 'Profile', icon: User }
];

const studentTabs = [
  { id: 'student-home' as const, label: 'Home', icon: Home },
  { id: 'student-subjects' as const, label: 'Subjects', icon: Book },
  { id: 'student-tasks' as const, label: 'Tasks', icon: ListTodo },
  { id: 'student-performance' as const, label: 'Performance', icon: BarChart2 },
  { id: 'student-results' as const, label: 'Results', icon: Award },
  { id: 'student-chat' as const, label: 'AI Chat', icon: MessageSquare }
];

const TeacherLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { toast } = useToast();
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    toast({
      title: `Switched to ${tab.replace('student-', '').charAt(0).toUpperCase() + tab.replace('student-', '').slice(1)}`,
      description: `You are now viewing the ${tab.replace('student-', '')} section.`,
      duration: 2000,
    });
  };
  
  const renderContent = () => {
    switch (activeTab) {
      // Teacher views
      case 'home':
        return <DashboardOverview />;
      case 'students':
        return <StudentsList />;
      case 'schedules':
        return <ScheduleView />;
      case 'subjects':
        return <SubjectsList />;
      case 'grading':
        return <GradingDashboard />;
      case 'profile':
        return <TeacherProfile />;
      // Student views
      case 'student-home':
        return <StudentDashboard />;
      case 'student-subjects':
        return <StudentSubjectsView />;
      case 'student-tasks':
        return <StudentTasksView />;
      case 'student-performance':
        return <StudentPerformanceView />;
      case 'student-results':
        return <StudentResultsView />;
      case 'student-chat':
        return <StudentAIChat />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow overflow-y-auto pb-16 sm:pb-0 sm:mb-0 sm:ml-64 pt-2 sm:pt-0">
        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden z-10">
        <div className="grid grid-cols-6 h-16">
          {teacherTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={cn(
                "flex flex-col items-center justify-center text-xs",
                id === activeTab 
                  ? "text-edu-primary font-medium" 
                  : "text-gray-500"
              )}
              onClick={() => handleTabChange(id)}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  id === activeTab ? "text-edu-primary" : "text-gray-500"
                )} 
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Sidebar for Desktop */}
      <div className="hidden sm:flex fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
        <div className="w-full">
          <div className="p-4 border-b">
            <h1 className="font-bold text-lg text-edu-primary">EduTeach LMS</h1>
            <p className="text-sm text-gray-500">Teacher Portal</p>
          </div>
          <nav className="p-4">
            <div className="space-y-2">
              {teacherTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md",
                    id === activeTab 
                      ? "bg-edu-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => handleTabChange(id)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <Separator className="my-4" />
            
            <p className="text-sm font-medium text-gray-500 mb-2 px-2">Student View</p>
            <div className="space-y-2">
              {studentTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md",
                    id === activeTab 
                      ? "bg-edu-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => handleTabChange(id)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
