import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddCourseModal } from '../components/courses/AddCourseModal';
import { CertificateModal } from '../components/certificates/CertificateModal';
import { CourseCard } from '../components/courses/CourseCard';
import { useCourses } from '../lib/hooks/useCourses';
import { useAuth } from '../lib/auth';
import { Course } from '../types';

export const Courses: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses } = useCourses();
  const { user } = useAuth();

  // Filter courses to only show the current user's courses
  const userCourses = courses.filter(course => course.userEmail === user?.email);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My CME Courses</h1>
          <p className="mt-1 text-gray-600">Manage and track your CME courses</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <div className="space-y-4">
        {userCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewCertificate={setSelectedCourse}
            showUserInfo={false}
          />
        ))}
        {userCourses.length === 0 && (
          <p className="text-gray-600 italic">You haven't added any courses yet.</p>
        )}
      </div>

      <AddCourseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
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