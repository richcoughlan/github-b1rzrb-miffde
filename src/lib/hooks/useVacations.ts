import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vacation } from '../../types';

interface VacationState {
  vacations: Vacation[];
  addVacation: (vacation: Omit<Vacation, 'id'>) => void;
  updateVacation: (id: string, vacation: Partial<Vacation>) => void;
  removeVacation: (id: string) => void;
  linkCourse: (vacationId: string, courseId: string) => void;
}

export const useVacations = create<VacationState>()(
  persist(
    (set) => ({
      vacations: [],
      addVacation: (vacation) =>
        set((state) => ({
          vacations: [
            ...state.vacations,
            {
              ...vacation,
              id: Math.random().toString(36).substring(7),
            },
          ],
        })),
      updateVacation: (id, vacation) =>
        set((state) => ({
          vacations: state.vacations.map((v) =>
            v.id === id ? { ...v, ...vacation } : v
          ),
        })),
      removeVacation: (id) =>
        set((state) => ({
          vacations: state.vacations.filter((v) => v.id !== id),
        })),
      linkCourse: (vacationId, courseId) =>
        set((state) => ({
          vacations: state.vacations.map((v) =>
            v.id === vacationId ? { ...v, courseId } : v
          ),
        })),
    }),
    {
      name: 'vacations-storage',
    }
  )
);