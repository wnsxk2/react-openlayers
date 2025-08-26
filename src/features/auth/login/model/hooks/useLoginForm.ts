import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';

export function useLoginForm() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState<{
    id?: string;
    password?: string;
  }>({});

  const handleLoginSubmit = useCallback((id: string, password: string) => {
    const errors: { id?: string; password?: string } = {};

    if (!id.trim()) {
      errors.id = '아이디를 입력해주세요.';
    }
    if (!password.trim()) {
      errors.password = '비밀번호를 입력해주세요.';
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      login({ id: id.trim(), password: password });
    }
  }, [login]);

  const handleSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleIdChange = useCallback((value: string) => {
    setId(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return {
    id,
    password,
    inputErrors,
    loading,
    error,
    handleLoginSubmit,
    handleSignUp,
    handleIdChange,
    handlePasswordChange,
  };
}
