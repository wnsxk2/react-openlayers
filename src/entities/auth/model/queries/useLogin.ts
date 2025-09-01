import { postLogin } from '@/entities/auth/api/login';
import { useAuthContext } from '@/entities/auth/model/hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { login } = useAuthContext();
  const nav = useNavigate();
  const mutate = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      login(data.id, data.tokens);
      nav('/', { replace: true });
    },
  });
  return { ...mutate, errorMsg: mutate.error?.message };
};
