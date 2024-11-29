import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (email: string, password: string) => {
        // Simulated API call
        const isAdmin = email.toLowerCase() === 'admin@example.com';
        set({
          user: {
            id: '1',
            email,
            name: isAdmin ? 'Administrator' : 'Dr. Richard Coughlan',
            role: isAdmin ? 'admin' : 'user',
          },
          isAuthenticated: true,
        });
      },
      signUp: async (email: string, password: string, name: string) => {
        // Simulated API call
        set({
          user: {
            id: '1',
            email,
            name,
            role: 'user', // New users are always regular users
          },
          isAuthenticated: true,
        });
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);