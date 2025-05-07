
import React, { useState } from 'react';
import { Home, Users, Calendar, Book, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardOverview from '../teacher/dashboard/DashboardOverview';
import StudentsList from '../teacher/students/StudentsList';
import ScheduleView from '../teacher/schedules/ScheduleView';
import SubjectsList from '../teacher/subjects/SubjectsList';
import GradingDashboard from '../teacher/grading/GradingDashboard';
import TeacherProfile from '../teacher/profile/TeacherProfile';
import { useToast } from '@/hooks/use-toast';

type TabType = 'home' | 'students' | 'schedules' | 'subjects' | 'grading' | 'profile';

const teacherTabs = [
  { id: 'home' as const, label: 'Home', icon: Home },
  { id: 'students' as const, label: 'Students', icon: Users },
  { id: 'schedules' as const, label: 'Schedules', icon: Calendar },
  { id: 'subjects' as const, label: 'Subjects', icon: Book },
  { id: 'grading' as const, label: 'Grading', icon: FileText },
  { id: 'profile' as const, label: 'Profile', icon: User }
];

const TeacherLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { toast } = useToast();
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    toast({
      title: `Switched to ${tab.charAt(0).toUpperCase() + tab.slice(1)}`,
      description: `You are now viewing the ${tab} section.`,
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
            <a href="/" className="block">
              <h1 className="font-bold text-lg text-edu-primary hover:text-edu-primary/90">SmartEdu Hub</h1>
            </a>
            <p className="text-sm text-gray-500">Teacher's Portal</p>
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
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
