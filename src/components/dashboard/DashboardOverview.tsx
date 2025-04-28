
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, mockSchedule, mockGrades } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, BarChart, BookOpen, Clock, Bell } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const todaysClasses = mockSchedule.filter(item => 
    ['Monday', 'Today'].includes(item.day)
  ).slice(0, 3);
  
  const pendingGrades = mockGrades
    .filter(grade => grade.status === 'pending')
    .slice(0, 3);
  
  return (
    <div className="content-area">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">Today, {new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="stats-card">
          <CardContent className="p-4 flex flex-col items-center">
            <Users className="h-8 w-8 text-edu-primary mb-2" />
            <h3 className="text-2xl font-bold">{dashboardStats.studentCount}</h3>
            <p className="text-sm text-gray-500">Students</p>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-4 flex flex-col items-center">
            <Calendar className="h-8 w-8 text-edu-secondary mb-2" />
            <h3 className="text-2xl font-bold">{dashboardStats.averageAttendance}%</h3>
            <p className="text-sm text-gray-500">Attendance</p>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-4 flex flex-col items-center">
            <BarChart className="h-8 w-8 text-edu-accent mb-2" />
            <h3 className="text-2xl font-bold">{dashboardStats.averagePerformance}%</h3>
            <p className="text-sm text-gray-500">Performance</p>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-4 flex flex-col items-center">
            <BookOpen className="h-8 w-8 text-edu-success mb-2" />
            <h3 className="text-2xl font-bold">{dashboardStats.pendingGrades}</h3>
            <p className="text-sm text-gray-500">Pending Grades</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-edu-primary" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {todaysClasses.length > 0 ? (
              <ul className="divide-y">
                {todaysClasses.map((item) => (
                  <li key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {item.subject}
                        <span className="ml-2 text-xs text-gray-500">{item.subjectCode}</span>
                      </p>
                      <p className="text-sm text-gray-500">{item.startTime} - {item.endTime} • {item.room}</p>
                    </div>
                    <div 
                      className="w-3 h-12 rounded-md" 
                      style={{ backgroundColor: item.color }} 
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 py-4 text-center">No classes scheduled for today</p>
            )}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-edu-primary" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y">
              {dashboardStats.recentAnnouncements.map((announcement) => (
                <li key={announcement.id} className="py-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{announcement.title}</p>
                    <Badge variant="outline">{announcement.date}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Mobile Only */}
      <div className="mt-6 sm:hidden">
        <h2 className="section-title">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <ul className="divide-y">
              <li className="py-2">
                <p className="text-sm">
                  <span className="font-medium">Maria Garcia</span> submitted assignment
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </li>
              <li className="py-2">
                <p className="text-sm">
                  <span className="font-medium">Science Quiz</span> grades published
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </li>
              <li className="py-2">
                <p className="text-sm">
                  <span className="font-medium">Class Schedule</span> updated
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
