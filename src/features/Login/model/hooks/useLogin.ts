import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { LoginRequest, LoginErrorResponse } from '@/entities/login';
import { loginApi } from '../api/loginApi';

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginApi.login(credentials);

      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data as LoginErrorResponse;
        setError(errorData.error.message);
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
