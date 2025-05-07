import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Brain,
  BarChart2,
  MessageSquare,
  School,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Index = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    setOpen(false);
    if (role === 'teacher') {
      navigate('/teacher');
    } else if (role === 'student') {
      navigate('/student');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">Continue as:</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Button onClick={() => handleRoleSelect('student')} variant="outline">
              Student
            </Button>
            <Button
              onClick={() => handleRoleSelect('teacher')}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Teacher
            </Button>
            <Button onClick={() => handleRoleSelect('admin')} variant="outline">
              Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative z-10 md:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Transform Education with
                <span className="text-indigo-600"> SmartEdu Hub</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Empowering African secondary schools with digital learning tools, AI-powered assistance, and comprehensive performance analytics.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button onClick={() => setOpen(true)} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </div>
            </div>
            <div className="relative lg:static xl:pl-10">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-10 blur-xl" />
                <div className="relative rounded-2xl bg-[#F8FAFC] p-6 shadow-xl shadow-gray-900/10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                      <BookOpen className="h-8 w-8 text-indigo-500" />
                      <div>
                        <p className="font-semibold text-gray-900">Digital Curriculum</p>
                        <p className="text-sm text-gray-500">Structured learning paths</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                      <Brain className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-semibold text-gray-900">AI Assistant</p>
                        <p className="text-sm text-gray-500">24/7 learning support</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                      <BarChart2 className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-semibold text-gray-900">Analytics</p>
                        <p className="text-sm text-gray-500">Track performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage education effectively
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A comprehensive suite of tools designed for teachers, students, and administrators.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 border-gray-100">
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Benefits */}
      <section className="bg-gradient-to-b from-white to-indigo-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Benefits for Everyone
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.title} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-5" />
                <CardContent className="relative p-6">
                  <role.icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{role.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {role.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-indigo-700/20 px-6 py-12 shadow-2xl rounded-3xl sm:px-24 xl:py-20">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay updated with SmartEdu Hub
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg text-indigo-100">
              Get the latest updates about features and releases.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              />
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Updates</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Tutorials</li>
                <li>Case Studies</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 SmartEdu Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: 'Curriculum Manager',
    description: 'Create and organize subjects, topics, and learning materials in a structured digital format.',
    icon: BookOpen,
  },
  {
    title: 'Performance Analytics',
    description: 'Track student progress, analyze results, and generate comprehensive reports.',
    icon: BarChart2,
  },
  {
    title: 'AI Learning Assistant',
    description: 'Get instant help with homework and personalized learning recommendations.',
    icon: Brain,
  },
  {
    title: 'Communication Hub',
    description: 'Enable seamless interaction between teachers, students, and administrators.',
    icon: MessageSquare,
  },
  {
    title: 'Student Portal',
    description: 'Access learning materials, submit assignments, and track progress in one place.',
    icon: Users,
  },
  {
    title: 'Admin Dashboard',
    description: 'Manage users, monitor school performance, and handle administrative tasks efficiently.',
    icon: School,
  },
];

const roles = [
  {
    title: 'For Teachers',
    icon: BookOpen,
    benefits: [
      'Create and manage digital curriculum',
      'Track student performance',
      'Automated grading assistance',
      'Easy communication tools',
      'Detailed analytics and reports',
    ],
  },
  {
    title: 'For Students',
    icon: Users,
    benefits: [
      'Structured learning materials',
      '24/7 AI homework assistance',
      'Progress tracking',
      'Interactive assignments',
      'Personalized feedback',
    ],
  },
  {
    title: 'For Administrators',
    icon: School,
    benefits: [
      'Centralized school management',
      'Performance monitoring',
      'Resource allocation',
      'Data-driven insights',
      'Streamlined operations',
    ],
  },
];

export default Index;
