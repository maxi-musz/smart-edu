import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Pencil, Trash2, Mail, Phone, User, Users, BookOpen, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  admissionNumber: string;
  guardianName: string;
  guardianPhone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'suspended';
  image?: string;
}

const availableClasses = ['JS1', 'JS2', 'JS3', 'SS1', 'SS2', 'SS3'];

const StudentsManagement = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Lateef Saani',
      email: 'Sanni.Lateef@student.smartedu.com',
      phone: '+234 801 234 5678',
      class: 'SS2',
      admissionNumber: 'SMT2023001',
      guardianName: 'Mr. Sanni',
      guardianPhone: '+234 802 345 6789',
      dateOfBirth: '2006-05-15',
      gender: 'male',
      status: 'active',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Emmanuel Taiwo',
      email: 'taiwo.emma@student.smartedu.com',
      phone: '+234 803 456 7890',
      class: 'JS3',
      admissionNumber: 'SMT2023002',
      guardianName: 'Mr. Taiwo',
      guardianPhone: '+234 804 567 8901',
      dateOfBirth: '2007-08-22',
      gender: 'female',
      status: 'active',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Oladele Segun',
      email: 'segunkingsley@student.smartedu.com',
      phone: '+234 805 678 9012',
      class: 'SS1',
      admissionNumber: 'SMT2023003',
      guardianName: 'Mr. Segun',
      guardianPhone: '+234 806 789 0123',
      dateOfBirth: '2006-12-03',
      gender: 'male',
      status: 'inactive',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Abubakar Lawal',
      email: 'lawal.abbu@student.smartedu.com',
      phone: '+234 807 890 1234',
      class: 'JS1',
      admissionNumber: 'SMT2023004',
      guardianName: 'Mr. Lawal',
      guardianPhone: '+234 808 901 2345',
      dateOfBirth: '2008-04-18',
      gender: 'female',
      status: 'suspended',
      image: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'David Johnson',
      email: 'david.b@student.smartedu.com',
      phone: '+234 809 012 3456',
      class: 'SS3',
      admissionNumber: 'SMT2023005',
      guardianName: 'Mr. David',
      guardianPhone: '+234 810 123 4567',
      dateOfBirth: '2005-09-30',
      gender: 'male',
      status: 'active',
      image: '/placeholder.svg'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    class: '',
    admissionNumber: '',
    guardianName: '',
    guardianPhone: '',
    dateOfBirth: '',
    gender: 'male',
    status: 'active',
    image: '/placeholder.svg'
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.admissionNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const student: Student = {
      id: Date.now().toString(),
      ...newStudent as Student,
    };
    setStudents([...students, student]);
    setIsAddModalOpen(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      class: '',
      admissionNumber: '',
      guardianName: '',
      guardianPhone: '',
      dateOfBirth: '',
      gender: 'male',
      status: 'active',
      image: '/placeholder.svg'
    });
  };

  const handleEditStudent = () => {
    if (!editingStudent) return;
    
    const updatedStudents = students.map((s) =>
      s.id === editingStudent.id ? editingStudent : s
    );
    setStudents(updatedStudents);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Count students by status
  const activeStudents = students.filter(s => s.status === 'active').length;
  const inactiveStudents = students.filter(s => s.status === 'inactive').length;
  const suspendedStudents = students.filter(s => s.status === 'suspended').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Students Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <Search className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the student's information below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admissionNumber">Admission Number*</Label>
                    <Input
                      id="admissionNumber"
                      value={newStudent.admissionNumber}
                      onChange={(e) => setNewStudent({ ...newStudent, admissionNumber: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={newStudent.class}
                      onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableClasses.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newStudent.dateOfBirth}
                      onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guardianName">Guardian Name</Label>
                    <Input
                      id="guardianName"
                      value={newStudent.guardianName}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianPhone">Guardian Phone</Label>
                    <Input
                      id="guardianPhone"
                      value={newStudent.guardianPhone}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Gender</Label>
                    <Select
                      value={newStudent.gender}
                      onValueChange={(value: 'male' | 'female' | 'other') =>
                        setNewStudent({ ...newStudent, gender: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={newStudent.status}
                      onValueChange={(value: 'active' | 'inactive' | 'suspended') =>
                        setNewStudent({ ...newStudent, status: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{students.length}</h3>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Active Students</p>
                <h3 className="text-2xl font-bold text-green-600">{activeStudents}</h3>
              </div>
              <User className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Inactive Students</p>
                <h3 className="text-2xl font-bold text-red-600">{inactiveStudents}</h3>
              </div>
              <User className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Suspended Students</p>
                <h3 className="text-2xl font-bold text-yellow-600">{suspendedStudents}</h3>
              </div>
              <User className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Menu */}
      {isFilterMenuOpen && (
        <Card className="mt-4">
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {availableClasses.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.admissionNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{student.guardianName}</div>
                      <div className="text-sm text-gray-500">{student.guardianPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === 'active' ? 'default' :
                        student.status === 'inactive' ? 'destructive' :
                        'destructive'
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Student</DialogTitle>
                          </DialogHeader>
                          {/* Add edit form fields similar to add form */}
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Student</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this student? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsManagement;
  