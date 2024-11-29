export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  location: string;
  startDate: string;
  endDate: string;
  credits: number;
  progress: number;
  userEmail: string;
  userName: string;
}

export interface Certificate {
  id: number;
  title: string;
  provider: string;
  completionDate: Date;
  credits: number;
}

export interface Vacation {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  notes?: string;
  courseId?: string;
}