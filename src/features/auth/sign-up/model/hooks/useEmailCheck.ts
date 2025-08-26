import { useState } from 'react';

export function useEmailCheck() {
  const [emailCheckResult, setEmailCheckResult] = useState<{
    message: string;
  } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = (value: string) => {
    if (!value.trim()) {
      setEmailCheckResult(null);
      return;
    }

    if (!validateEmail(value.trim())) {
      setEmailCheckResult({
        message: '올바른 이메일 양식으로 작성해주세요.',
      });
    } else {
      setEmailCheckResult(null);
    }
  };

  return {
    emailCheckResult,
    setEmailCheckResult,
    validateEmail,
    handleEmailValidation,
  };
}
