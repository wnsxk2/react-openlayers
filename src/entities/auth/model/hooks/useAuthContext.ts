import type { Tokens } from '@/entities/auth/model/types';
import { createContext, useContext } from 'react';

interface AuthContextProps {
  id: string | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (id: string, tokens: Tokens) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
