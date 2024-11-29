import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatDate } from '../lib/utils/date';
import { useCourses } from '../lib/hooks/useCourses';
import { CertificateModal } from '../components/certificates/CertificateModal';
import { Course } from '../types';

export const Certificates: React.FC = () => {
  const { courses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const completedCourses = courses.filter(course => course.progress === 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CME Certificates</h1>
        <p className="mt-1 text-gray-600">Track and verify your continuing medical education credits</p>
      </div>

      <div className="space-y-4">
        {completedCourses.map((course) => (
          <div key={course.id} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Verified
                  </span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-x-6 text-sm text-gray-500">
                  <div>
                    <p>{course.provider}</p>
                    <p>{course.credits} credits</p>
                  </div>
                  <div>
                    <p>{formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}</p>
                    <p>{course.location}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Certificate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

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