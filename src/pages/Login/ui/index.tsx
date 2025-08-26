import { css } from '@emotion/react';
import { useLoginForm } from '@/features/auth/login/model/hooks/useLoginForm';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';

export default function LoginPage() {
  const {
    id,
    password,
    inputErrors,
    loading,
    error,
    handleLoginSubmit,
    handleSignUp,
    handleIdChange,
    handlePasswordChange,
  } = useLoginForm();

  return (
    <div css={loginContainer}>
      <LoginForm
        id={id}
        password={password}
        inputErrors={inputErrors}
        loading={loading}
        error={error}
        onIdChange={handleIdChange}
        onPasswordChange={handlePasswordChange}
        onLoginSubmit={handleLoginSubmit}
        onSignUp={handleSignUp}
      />
    </div>
  );
}

const loginContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
