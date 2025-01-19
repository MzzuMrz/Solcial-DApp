import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const useAuth = create<AuthState>((set: (arg0: { user: any; isAuthenticated: boolean; }) => void) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: any) => set({ user, isAuthenticated: !!user }),
  login: async (email: any, password: any) => {
    try {
      // Aquí implementarías la lógica de login con tu backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) throw new Error('Error en login');
      
      const user = await response.json();
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },
  register: async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Error en registro');
      
      const user = await response.json();
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));