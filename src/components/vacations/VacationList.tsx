import React, { useState } from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useVacations } from '../../lib/hooks/useVacations';
import { useCourses } from '../../lib/hooks/useCourses';
import { formatDate } from '../../lib/utils/date';
import { LinkCourseModal } from './LinkCourseModal';
import { Vacation } from '../../types';

export const VacationList: React.FC = () => {
  const { vacations, removeVacation, linkCourse } = useVacations();
  const { courses, addCourse } = useCourses();
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  const handleLinkCourse = (data: { 
    title: string; 
    credits: number; 
    userEmail: string;
    userName: string;
  }) => {
    // Create a new course
    const newCourse = {
      title: data.title,
      provider: 'TBD',
      location: selectedVacation?.location || '',
      startDate: selectedVacation?.startDate || '',
      endDate: selectedVacation?.endDate || '',
      credits: data.credits,
      userEmail: data.userEmail,
      userName: data.userName
    };

    // Add the course and get its ID
    const courseId = addCourse(newCourse);

    // Link the course to the vacation
    if (selectedVacation) {
      linkCourse(selectedVacation.id, courseId);
    }

    setSelectedVacation(null);
  };

  return (
    <div className="space-y-4">
      {vacations.map((vacation) => {
        const linkedCourse = courses.find((c) => c.id === vacation.courseId);

        return (
          <div
            key={vacation.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">
                    {vacation.location}
                  </h3>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(new Date(vacation.startDate))} -{' '}
                      {formatDate(new Date(vacation.endDate))}
                    </span>
                  </div>
                </div>
                {vacation.notes && (
                  <p className="mt-2 text-sm text-gray-600">{vacation.notes}</p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {linkedCourse ? (
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Linked to: {linkedCourse.title} ({linkedCourse.credits} credits)
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedVacation(vacation)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Link to Course
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeVacation(vacation.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <LinkCourseModal
        isOpen={selectedVacation !== null}
        onClose={() => setSelectedVacation(null)}
        onSubmit={handleLinkCourse}
      />
    </div>
  );
};