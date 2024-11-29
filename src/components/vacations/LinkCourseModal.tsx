import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/auth';

interface LinkCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; credits: number; userEmail: string; userName: string }) => void;
}

interface FormData {
  title: string;
  credits: number;
}

export const LinkCourseModal: React.FC<LinkCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSubmit2 = (data: FormData) => {
    if (user) {
      onSubmit({
        ...data,
        userEmail: user.email,
        userName: user.name
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Link CME Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmit2)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              {...register('title', { required: 'Course title is required' })}
              placeholder="e.g., Advanced Cardiac Life Support"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-600 placeholder:text-gray-400"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CME Credits
            </label>
            <input
              type="number"
              {...register('credits', {
                required: 'Credits are required',
                min: { value: 0, message: 'Credits must be 0 or greater' },
              })}
              defaultValue={0}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.credits && (
              <p className="mt-1 text-sm text-red-600">{errors.credits.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Link Course
          </Button>
        </form>
      </div>
    </div>
  );
};