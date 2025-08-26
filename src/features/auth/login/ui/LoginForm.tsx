import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { memo, useCallback } from 'react';

interface LoginFormProps {
  id: string;
  password: string;
  inputErrors: {
    id?: string;
    password?: string;
  };
  loading: boolean;
  error: string | null;
  onIdChange: (id: string) => void;
  onPasswordChange: (password: string) => void;
  onLoginSubmit: (id: string, password: string) => void;
  onSignUp: () => void;
}

const LoginFormHeader = memo(() => (
  <>
    <p css={loginText}>로그인</p>
    <p css={loginSubText}>로그인하시고 나만의 즐겨찾기를 이용해보세요</p>
  </>
));

const LoginInputSection = memo(({
  id,
  password,
  inputErrors,
  loading,
  onIdChange,
  onPasswordChange,
  onSignUp,
}: {
  id: string;
  password: string;
  inputErrors: { id?: string; password?: string };
  loading: boolean;
  onIdChange: (id: string) => void;
  onPasswordChange: (password: string) => void;
  onSignUp: () => void;
}) => (
  <>
    <input
      type='text'
      value={id}
      onChange={(e) => onIdChange(e.target.value)}
      css={[infoInputField, inputErrors.id && errorField]}
      placeholder='아이디를 입력하세요.'
    />
    {inputErrors.id && <span css={errorMessage}>{inputErrors.id}</span>}

    <input
      type='password'
      value={password}
      onChange={(e) => onPasswordChange(e.target.value)}
      css={[infoInputField, inputErrors.password && errorField]}
      placeholder='비밀번호를 입력하세요.'
    />
    {inputErrors.password && (
      <span css={errorMessage}>{inputErrors.password}</span>
    )}

    <div css={loginButtonContainer}>
      <button type='submit' disabled={loading} css={loginButton}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
      <button
        type='button'
        onClick={onSignUp}
        disabled={loading}
        css={signUpButton}
      >
        회원가입
      </button>
    </div>
  </>
));

const BackLink = memo(() => (
  <Link to='/' css={loginCancelText}>
    돌아가기
  </Link>
));

const ServerError = memo(({ error }: { error: string | null }) => 
  error ? <div css={serverErrorMessage}>{error}</div> : null
);

export function LoginForm({
  id,
  password,
  inputErrors,
  loading,
  error,
  onIdChange,
  onPasswordChange,
  onLoginSubmit,
  onSignUp,
}: LoginFormProps) {
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onLoginSubmit(id, password);
  }, [id, password, onLoginSubmit]);

  return (
    <form onSubmit={onSubmit} css={formContainer}>
      <LoginFormHeader />
      
      <LoginInputSection
        id={id}
        password={password}
        inputErrors={inputErrors}
        loading={loading}
        onIdChange={onIdChange}
        onPasswordChange={onPasswordChange}
        onSignUp={onSignUp}
      />

      <BackLink />
      <ServerError error={error} />
    </form>
  );
}

const formContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 20px;
  width: 450px;
  padding-top: 30px;
`;

const loginText = css`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #555555;
`;

const loginSubText = css`
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin-bottom: 30px;
`;

const infoInputField = css`
  width: 80%;
  padding: 10px 14px;
  margin: 0 auto 12px auto;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  &::placeholder {
    color: #666666;
    opacity: 0.8;
  }
`;

const errorField = css`
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
`;

const errorMessage = css`
  color: #dc3545;
  font-size: 12px;
  margin: 0 auto 16px auto;
  width: 80%;
  text-align: left;
  padding-left: 4px;
`;

const loginButtonContainer = css`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const loginButton = css`
  margin-right: 25px;
  background-color: lightblue;
  border: 7px solid lightblue;
  width: 70px;
  border-radius: 5px;
`;

const signUpButton = css`
  background-color: lightpink;
  border: 7px solid lightpink;
  width: 70px;
  border-radius: 5px;
`;

const loginCancelText = css`
  text-align: center;
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
  text-decoration: underline;
  cursor: pointer;
`;

const serverErrorMessage = css`
  color: #721c24;
  text-align: center;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;
`;
