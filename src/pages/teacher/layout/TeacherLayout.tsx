
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, Book, FileText, User, ListTodo, BarChart2, Award, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardOverview from '../dashboard/DashboardOverview';
import StudentsList from '../students/StudentsList';
import ScheduleView from '../schedules/ScheduleView';
import SubjectsList from '../subjects/SubjectsList';
import GradingDashboard from '../grading/GradingDashboard';
import TeacherProfile from '../profile/TeacherProfile';
import StudentDashboard from '../../student/StudentDashboard';
import StudentSubjectsView from '../../student/StudentSubjectsView';
import StudentTasksView from '../../student/StudentTasksView'; 
import StudentPerformanceView from '../../student/StudentPerformanceView';
import StudentResultsView from '../../student/StudentResultsView';
import StudentAIChat from '../../student/StudentAIChat';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../../../components/ui/separator';

type TabType = 'dashboard' | 'students' | 'schedules' | 'subjects' | 'grading' | 'profile' |
               'student-dashboard' | 'student-subjects' | 'student-tasks' | 'student-performance' | 'student-results' | 'student-chat';

const teacherTabs = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
  { id: 'students' as const, label: 'Students', icon: Users },
  { id: 'schedules' as const, label: 'Schedules', icon: Calendar },
  { id: 'subjects' as const, label: 'Subjects', icon: Book },
  { id: 'grading' as const, label: 'Grading', icon: FileText },
  { id: 'student-chat' as const, label: 'AI Chat', icon: MessageSquare },
  { id: 'profile' as const, label: 'Profile', icon: User }
];

const studentTabs = [
  { id: 'student-dashboard' as const, label: 'Dashboard', icon: Home },
  { id: 'student-subjects' as const, label: 'Subjects', icon: Book },
  { id: 'student-tasks' as const, label: 'Tasks', icon: ListTodo },
  { id: 'student-performance' as const, label: 'Performance', icon: BarChart2 },
  { id: 'student-results' as const, label: 'Results', icon: Award },
  { id: 'student-chat' as const, label: 'AI Chat', icon: MessageSquare }
];

const TeacherLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleTabChange = (tab: TabType) => {
    const path = `/teacher/${tab}`;
    navigate(path);
    toast({
      title: `Switched to ${tab.replace('student-', '').charAt(0).toUpperCase() + tab.replace('student-', '').slice(1)}`,
      description: `You are now viewing the ${tab.replace('student-', '')} section.`,
      duration: 2000,
    });
  };
  
  const renderContent = () => {
    const currentPath = location.pathname.split('/').pop() || 'dashboard';
    switch (currentPath) {
      // Teacher views
      case 'dashboard':
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
      case 'student-dashboard':
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
    <div className="min-h-screen bg-background">
      {/* Sidebar for Desktop */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
        <div className="flex h-full flex-col">
          <div className="p-4 border-b">
            <a href="http://localhost:8080" className="block">
              <h1 className="font-bold text-lg text-edu-primary hover:text-edu-primary/90">SmartEdu Hub</h1>
            </a>
            <p className="text-sm text-gray-500">Teacher's Portal</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {teacherTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md",
                    location.pathname.includes(id)
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
                    location.pathname.includes(id)
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
      </aside>

      {/* Main Content */}
      <main className="min-h-screen pl-64 pt-0">
        <div className="p-6">
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
                location.pathname.includes(id)
                  ? "text-edu-primary font-medium" 
                  : "text-gray-500"
              )}
              onClick={() => handleTabChange(id)}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  location.pathname.includes(id) ? "text-edu-primary" : "text-gray-500"
                )} 
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TeacherLayout;
