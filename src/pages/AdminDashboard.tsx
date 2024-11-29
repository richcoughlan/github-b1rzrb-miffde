import React from 'react';
import { CheckCircle, AlertCircle, User, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCourses } from '../lib/hooks/useCourses';
import { formatDate } from '../lib/utils/date';
import { useAuth } from '../lib/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, updateCourseProgress } = useCourses();

  // Redirect non-admin users
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const pendingCourses = courses.filter(course => course.progress < 100);
  const verifiedCourses = courses.filter(course => course.progress === 100);

  const handleVerify = (courseId: string) => {
    updateCourseProgress(courseId, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Manage and verify user CME courses</p>
      </div>

      {/* Pending Verifications Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
          Pending Verifications
        </h2>
        
        {pendingCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{course.userName}</h3>
                    <p className="text-sm text-gray-600">{course.userEmail}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">
                      Provider: {course.provider}
                    </p>
                    <p className="text-sm text-gray-600">
                      Credits: {course.credits}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      {course.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      {formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center text-yellow-600">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  <span>Pending Verification</span>
                </div>
                <Button
                  onClick={() => handleVerify(course.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Verify Course
                </Button>
              </div>
            </div>
          </div>
        ))}

        {pendingCourses.length === 0 && (
          <p className="text-gray-600 italic">No pending verifications</p>
        )}
      </div>

      {/* Verified Courses Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Verified Courses
        </h2>
        
        {verifiedCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{course.userName}</h3>
                    <p className="text-sm text-gray-600">{course.userEmail}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">
                      Provider: {course.provider}
                    </p>
                    <p className="text-sm text-gray-600">
                      Credits: {course.credits}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      {course.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      {formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        ))}

        {verifiedCourses.length === 0 && (
          <p className="text-gray-600 italic">No verified courses</p>
        )}
      </div>
    </div>
  );
};