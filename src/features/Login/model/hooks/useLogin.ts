import { loginApi } from '../api/loginApi';
import { useState } from 'react';
import { type LoginRequest } from '../types';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 에러메시지 저장

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null); // 이전 에러메세지 지우기

      const response = await loginApi.login(credentials);

      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      //setLoading(false);
    }
  };

  return { login, loading, error };
}
