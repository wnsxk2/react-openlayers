import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import { LoginMessage } from './LoginMessage';
import { useLogin } from '../model/hooks/useLogin';

export function LoginForm() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState<{
    id?: string;
    password?: string;
  }>({});

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputErrors: { id?: string; password?: string } = {};

    if (!id.trim()) {
      inputErrors.id = '아이디를 입력해주세요.';
    }
    if (!password.trim()) {
      inputErrors.password = '비밀번호를 입력해주세요.';
    }

    setInputErrors(inputErrors);

    if (Object.keys(inputErrors).length === 0) {
      await login({ id: id.trim(), password });
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div css={loginContainer}>
      <form onSubmit={handleLoginSubmit} css={formContainer}>
        <p css={loginText}>로그인</p>
        <p css={loginSubText}>로그인하시고 나만의 즐겨찾기를 이용해보세요</p>

        <LoginInput
          type='text'
          value={id}
          onChange={setId}
          placeholder='아이디를 입력하세요.'
          error={inputErrors.id}
        />

        <LoginInput
          type='password'
          value={password}
          onChange={setPassword}
          placeholder='비밀번호를 입력하세요.'
          error={inputErrors.password}
        />

        <div css={loginButtonContainer}>
          <LoginButton type='submit' variant='login' disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </LoginButton>
          <LoginButton
            type='button'
            variant='signup'
            disabled={loading}
            onClick={handleSignUp}
          >
            회원가입
          </LoginButton>
        </div>

        <Link to='/' css={loginCancelText}>
          돌아가기
        </Link>

        {error && <LoginMessage message={error} />}
      </form>
    </div>
  );
}

const loginContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

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

const loginButtonContainer = css`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const loginCancelText = css`
  text-align: center;
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
  text-decoration: underline;
  cursor: pointer;
`;
