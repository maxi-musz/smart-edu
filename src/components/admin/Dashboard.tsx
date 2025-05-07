import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  // Demo data
  const financialOverview = {
    totalRevenue: 782000,
    revenueGrowth: 12,
    pendingFees: 245000,
    expenses: 325000,
    cashFlow: 457000
  };

  const teacherStats = {
    totalTeachers: 45,
    activeClasses: 32,
    subjectsOffered: 12,
    averageClassSize: 25
  };

  const studentStats = {
    totalStudents: 850,
    attendance: 92,
    performanceAvg: 76,
    activeClubs: 15
  };

  const subjectDistribution = [
    { name: 'Mathematics', value: 20 },
    { name: 'Sciences', value: 25 },
    { name: 'Languages', value: 20 },
    { name: 'Humanities', value: 15 },
    { name: 'Technical', value: 20 }
  ];

  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
          <Clock className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Financial Overview Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Financial Overview</h3>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold">NGN {financialOverview.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Fees</span>
                <span className="font-semibold text-yellow-600">NGN {financialOverview.pendingFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cash Flow</span>
                <span className="font-semibold text-green-600">NGN {financialOverview.cashFlow.toLocaleString()}</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 w-full justify-between" onClick={() => window.location.href = '/finance'}>
              View Details <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Teachers Overview Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Teachers Overview</h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Teachers</span>
                <span className="font-semibold">{teacherStats.totalTeachers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Classes</span>
                <span className="font-semibold">{teacherStats.activeClasses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subjects Offered</span>
                <span className="font-semibold">{teacherStats.subjectsOffered}</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 w-full justify-between" onClick={() => window.location.href = '/teachers'}>
              View Details <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Students Overview Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Students Overview</h3>
              <GraduationCap className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Students</span>
                <span className="font-semibold">{studentStats.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Attendance Rate</span>
                <span className="font-semibold">{studentStats.attendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Performance Avg</span>
                <span className="font-semibold">{studentStats.performanceAvg}%</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 w-full justify-between" onClick={() => window.location.href = '/students'}>
              View Details <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subject Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Subject Distribution</h3>
              <BookOpen className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Calendar className="h-5 w-5 text-rose-500" />
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">End of Term Exams</span>
                  <span className="text-sm text-gray-500">Dec 15</span>
                </div>
                <p className="text-sm text-gray-600">Final examinations for all classes</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Parents Meeting</span>
                  <span className="text-sm text-gray-500">Dec 20</span>
                </div>
                <p className="text-sm text-gray-600">Annual parents-teachers meeting</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Sports Day</span>
                  <span className="text-sm text-gray-500">Dec 22</span>
                </div>
                <p className="text-sm text-gray-600">Annual sports competition</p>
              </div>
            </div>
            <Button variant="link" className="mt-4 w-full justify-between" onClick={() => window.location.href = '/calendar'}>
              View Calendar <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;