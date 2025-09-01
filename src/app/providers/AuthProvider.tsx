import { useAuth } from '@/entities/auth/model/hooks/useAuth';
import { AuthContext } from '@/entities/auth/model/hooks/useAuthContext';
import { type PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const data = useAuth();
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
