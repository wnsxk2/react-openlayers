import type { Tokens } from '@/entities/auth/model/types';
import { useCallback, useState } from 'react';

const DEFAULT_TOKENS = { accessToken: null, refreshToken: null };

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Tokens>(DEFAULT_TOKENS);

  const login = (id: string, tokens: Tokens) => {
    setId(id);
    setTokens(tokens);
    setIsLoggedIn(true);

    localStorage.setItem('accessToken', tokens.accessToken!);
    localStorage.setItem('refreshToken', tokens.refreshToken!);
  };

  const logout = useCallback(() => {
    setId(null);
    setTokens(DEFAULT_TOKENS);
    setIsLoggedIn(false);

    // localStorage에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  return {
    id,
    isLoggedIn,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    login,
    logout,
  };
};
