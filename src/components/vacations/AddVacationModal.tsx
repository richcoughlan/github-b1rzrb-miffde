import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { useVacations } from '../../lib/hooks/useVacations';

interface AddVacationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  location: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

export const AddVacationModal: React.FC<AddVacationModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { addVacation } = useVacations();

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    addVacation(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add Vacation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              placeholder="e.g., Maui, Hawaii"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-600 placeholder:text-gray-400"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                {...register('endDate', { required: 'End date is required' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Add any notes about your vacation plans..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Vacation
          </Button>
        </form>
      </div>
    </div>
  );
};