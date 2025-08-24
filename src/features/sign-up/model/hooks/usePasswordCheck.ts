import { useState } from 'react';

export function usePasswordCheck() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState<{
    message: string;
  } | null>(null);

  const [passwordCheckConfirm, setPasswordCheckConfirm] = useState<{
    message: string;
  } | null>(null);

  const handlePasswordToggle = (password: string) => {
    if (!password.trim()) {
      setPasswordConfirm({
        message: '비밀번호를 입력해주세요.',
      });
      return;
    }
    setPasswordConfirm(null);
    setShowPassword(!showPassword);
  };

  const handlePasswordConfirmToggle = (passwordCheck: string) => {
    if (!passwordCheck.trim()) {
      setPasswordCheckConfirm({
        message: '비밀번호를 다시 입력해주세요.',
      });
      return;
    }
    setPasswordCheckConfirm(null);
    setShowPasswordCheck(!showPasswordCheck);
  };

  return {
    showPassword,
    setShowPassword,
    showPasswordCheck,
    setShowPasswordCheck,
    passwordConfirm,
    setPasswordConfirm,
    passwordCheckConfirm,
    setPasswordCheckConfirm,
    handlePasswordToggle,
    handlePasswordConfirmToggle,
  };
}
