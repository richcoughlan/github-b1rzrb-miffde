import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../../types';

interface CourseState {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'progress'>) => string;
  updateCourseProgress: (courseId: string, progress: number) => void;
  removeCourse: (courseId: string) => void;
}

// Example courses that will be shown by default
const exampleCourses: Course[] = [
  {
    id: 'study-ufo-2024',
    title: 'Study of UFO and Aliens',
    provider: 'Area 51 Medical Center',
    location: 'Seattle, USA',
    startDate: '2024-12-14',
    endDate: '2024-12-20',
    credits: 5,
    progress: 0,
    userEmail: 'rich.coughlan@gmail.com',
    userName: 'Dr. Richard Coughlan'
  },
  {
    id: 'test-course-123',
    title: 'Test Course 123',
    provider: 'AMA Test CME Provider',
    location: 'Miami, FL',
    startDate: '2024-11-30',
    endDate: '2024-12-06',
    credits: 5,
    progress: 0,
    userEmail: 'rich.coughlan@gmail.com',
    userName: 'Dr. Richard Coughlan'
  }
];

export const useCourses = create<CourseState>()(
  persist(
    (set) => ({
      courses: exampleCourses,
      addCourse: (course) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          courses: [
            ...state.courses,
            {
              ...course,
              id,
              progress: 0,
            },
          ],
        }));
        return id;
      },
      updateCourseProgress: (courseId, progress) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId ? { ...course, progress } : course
          ),
        })),
      removeCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== courseId),
        })),
    }),
    {
      name: 'courses-storage',
    }
  )
);