import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { LoginRequest, LoginErrorResponse } from '@/entities/login';
import { loginApi } from '../api/loginApi';

export function useLogin() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi.login(credentials),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      setTimeout(() => {
        navigate('/');
      }, 500);
    },
  });

  const getErrorMessage = () => {
    if (!loginMutation.error) return null;

    if (
      axios.isAxiosError(loginMutation.error) &&
      loginMutation.error.response
    ) {
      const errorData = loginMutation.error.response.data as LoginErrorResponse;
      return errorData.error.message;
    }
    return '로그인 중 오류가 발생했습니다.';
  };

  return {
    login: loginMutation.mutate,
    loading: loginMutation.isPending,
    error: getErrorMessage(),
  };
}
