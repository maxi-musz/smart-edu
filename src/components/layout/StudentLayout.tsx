import React, { useState } from 'react';
import { Home, Book, ListTodo, BarChart2, Award, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import StudentDashboard from '../student/StudentDashboard';
import StudentSubjectsView from '../student/StudentSubjectsView';
import StudentTasksView from '../student/StudentTasksView';
import StudentPerformanceView from '../student/StudentPerformanceView';
import StudentResultsView from '../student/StudentResultsView';
import StudentAIChat from '../student/StudentAIChat';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

type TabType = 'home' | 'subjects' | 'tasks' | 'performance' | 'results' | 'chat';

const studentTabs = [
  { id: 'home' as const, label: 'Home', icon: Home },
  { id: 'subjects' as const, label: 'Subjects', icon: Book },
  { id: 'tasks' as const, label: 'Tasks', icon: ListTodo },
  { id: 'performance' as const, label: 'Performance', icon: BarChart2 },
  { id: 'results' as const, label: 'Results', icon: Award },
  { id: 'chat' as const, label: 'AI Chat', icon: MessageSquare }
];

const StudentLayout = () => {
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
      case 'home':
        return <StudentDashboard />;
      case 'subjects':
        return <StudentSubjectsView />;
      case 'tasks':
        return <StudentTasksView />;
      case 'performance':
        return <StudentPerformanceView />;
      case 'results':
        return <StudentResultsView />;
      case 'chat':
        return <StudentAIChat />;
      default:
        return <StudentDashboard />;
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
          {studentTabs.map(({ id, label, icon: Icon }) => (
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
            <p className="text-sm text-gray-500">Student's Portal</p>
          </div>
          <nav className="p-4">
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

export default StudentLayout;