
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AttendancePage from "./pages/teacher/AttendancePage";
import AssignmentPage from "./pages/teacher/AssignmentPage";
import MessagePage from "./pages/teacher/MessagePage";
import GradesEntryPage from "./pages/teacher/GradesEntryPage";
import TeacherLayout from "./components/layout/TeacherLayout";
import StudentLayout from "./components/layout/StudentLayout";
import AdminLayout from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/teacher/*" element={<TeacherLayout />} />
          <Route path="/student/*" element={<StudentLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          <Route path="/teacher/attendance" element={<AttendancePage />} />
          <Route path="/teacher/assignment" element={<AssignmentPage />} />
          <Route path="/teacher/message" element={<MessagePage />} />
          <Route path="/teacher/grades" element={<GradesEntryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
