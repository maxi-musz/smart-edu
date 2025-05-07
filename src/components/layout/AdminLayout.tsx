import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Book,
  DollarSign,
  Settings,
  MessageCircle,
  UserCog,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '../admin/AdminDashboard';
import TeachersManagement from '../admin/TeachersManagement';
import StudentsManagement from '../admin/StudentsManagement';
import FinanceOverview from '../admin/FinanceOverview';
import CoursesList from '../admin/CoursesList';
import AdminScheduleView from '../admin/AdminScheduleView';
import AdminMessages from '../admin/AdminMessages';
import AdminSettings from '../admin/AdminSettings';
import AdminProfile from '../admin/AdminProfile';

type TabType =
  | 'dashboard'
  | 'teachers'
  | 'students'
  | 'finance'
  | 'courses'
  | 'schedules'
  | 'messages'
  | 'settings'
  | 'profile';

const adminTabs = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
  { id: 'teachers' as const, label: 'Teachers', icon: UserCog },
  { id: 'students' as const, label: 'Students', icon: Users },
  { id: 'finance' as const, label: 'Finance', icon: DollarSign },
  { id: 'courses' as const, label: 'Courses', icon: Book },
  { id: 'schedules' as const, label: 'Schedules', icon: Calendar },
  { id: 'messages' as const, label: 'Messages', icon: MessageCircle },
  { id: 'settings' as const, label: 'Settings', icon: Settings },
  { id: 'profile' as const, label: 'Profile', icon: FileText },
];

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
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
      case 'dashboard':
        return <AdminDashboard />;
      case 'teachers':
        return <TeachersManagement />;
      case 'students':
        return <StudentsManagement />;
      case 'finance':
        return <FinanceOverview />;
      case 'courses':
        return <CoursesList />;
      case 'schedules':
        return <AdminScheduleView />;
      case 'messages':
        return <AdminMessages />;
      case 'settings':
        return <AdminSettings />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <AdminDashboard />;
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
        <div className="grid grid-cols-5 h-16">
          {adminTabs.slice(0, 5).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={cn(
                "flex flex-col items-center justify-center text-xs",
                id === activeTab ? "text-edu-primary font-medium" : "text-gray-500"
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
            <a href="http://localhost:8080" className="block">
              <h1 className="font-bold text-lg text-edu-primary hover:text-edu-primary/90">SmartEdu Hub</h1>
            </a>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
          <nav className="p-4">
            <div className="space-y-2">
              {adminTabs.map(({ id, label, icon: Icon }) => (
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

export default AdminLayout;
