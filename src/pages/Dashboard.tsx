import React, { useState } from 'react';
import { Plus, Plane } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddCourseModal } from '../components/courses/AddCourseModal';
import { AddVacationModal } from '../components/vacations/AddVacationModal';
import { VacationList } from '../components/vacations/VacationList';
import { CertificateModal } from '../components/certificates/CertificateModal';
import { CourseCard } from '../components/courses/CourseCard';
import { useCourses } from '../lib/hooks/useCourses';
import { useAuth } from '../lib/auth';
import { Link } from 'react-router-dom';
import { Course } from '../types';

export const Dashboard: React.FC = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses } = useCourses();
  const { isAuthenticated, user } = useAuth();

  // Filter courses to only show the current user's courses
  const userCourses = courses.filter(course => course.userEmail === user?.email);

  // Calculate verified credits (only from courses with progress === 100)
  const verifiedCredits = userCourses
    .filter(course => course.progress === 100)
    .reduce((sum, course) => sum + Number(course.credits), 0);

  // Calculate pending credits (from courses with progress < 100)
  const pendingCredits = userCourses
    .filter(course => course.progress < 100)
    .reduce((sum, course) => sum + Number(course.credits), 0);

  const pendingCourses = userCourses.filter(course => course.progress < 100);
  const upcomingCourses = userCourses.filter(course => new Date(course.startDate) > new Date());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAuthenticated ? `Welcome back, ${user?.name}` : 'Welcome to Concierge CME'}
          </h1>
          <p className="mt-1 text-gray-600">Track and manage your CME credits</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => setIsVacationModalOpen(true)} className="flex items-center">
            <Plane className="mr-2 h-4 w-4" />
            Add Vacation
          </Button>
          <Button onClick={() => setIsCourseModalOpen(true)} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8.5 11.5L9.91421 10.0858L12 12.1716L16.0858 8.08579L17.5 9.5L12 15Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Credits</p>
              <p className="text-2xl font-bold text-gray-900">{verifiedCredits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-yellow-50 p-2">
              <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Credits</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCredits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-purple-50 p-2">
              <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Courses</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Planned Vacations</h2>
          <VacationList />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium">Recent CME Courses</h2>
            <Link to="/courses" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {userCourses.map((course) => (
              <div key={course.id} className="px-6 py-4">
                <CourseCard
                  course={course}
                  onViewCertificate={setSelectedCourse}
                  showUserInfo={false}
                />
              </div>
            ))}
            {userCourses.length === 0 && (
              <p className="px-6 py-4 text-gray-600 italic">You haven't added any courses yet.</p>
            )}
          </div>
        </div>
      </div>

      <AddCourseModal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} />
      <AddVacationModal isOpen={isVacationModalOpen} onClose={() => setIsVacationModalOpen(false)} />
      {selectedCourse && (
        <CertificateModal
          course={selectedCourse}
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};