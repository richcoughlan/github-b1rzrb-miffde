import { create } from 'zustand';

export interface Course {
  id: string;
  title: string;
  provider: string;
  location: string;
  startDate: string;
  endDate: string;
  credits: number;
  progress: number;
}

interface CourseState {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'progress'>) => void;
}

export const useCourses = create<CourseState>((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({
      courses: [
        ...state.courses,
        {
          ...course,
          id: Math.random().toString(36).substring(7),
          progress: 0,
        },
      ],
    })),
}));