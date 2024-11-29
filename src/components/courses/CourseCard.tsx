import React from 'react';
import { Eye, MapPin, Calendar, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Course } from '../../types';
import { formatDate } from '../../lib/utils/date';

interface CourseCardProps {
  course: Course;
  onViewCertificate?: (course: Course) => void;
  showUserInfo?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewCertificate,
  showUserInfo = true,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          {showUserInfo && (
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4 text-gray-400" />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {course.userName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({course.userEmail})
                </span>
              </div>
            </div>
          )}
          <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-600">
            {course.provider} • {course.credits} credits
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            course.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {course.progress === 100 ? 'Verified' : 'Pending'}
          </span>
          {course.progress === 100 && onViewCertificate && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => onViewCertificate(course)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Certificate
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center">
          <MapPin className="mr-1.5 h-4 w-4" />
          {course.location}
        </div>
        <div className="flex items-center">
          <Calendar className="mr-1.5 h-4 w-4" />
          {formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}
        </div>
      </div>
    </div>
  );
};