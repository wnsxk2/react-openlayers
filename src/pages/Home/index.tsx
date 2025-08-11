import { css } from '@emotion/react';
import axios from 'axios';

export default function HomePage() {
  const handleSigninButtonClick = async () => {
    const { data } = await axios.post('/api/v1/auth/signup', {
      id: 'gb1234',
      password: '12341234',
      email: 'test@naver.com',
      username: '홍길동',
      tel: '010-1234-5678',
    });
    console.log('data : ', data);
  };
  const handleLoginButtonClick = async () => {
    const { data } = await axios.post('/api/v1/auth/login', {
      id: 'gb1234',
      password: '12341234',
    });
    console.log('data : ', data);
  };
  const handleIdCheckButtonClick = async () => {
    const { data } = await axios.post('/api/v1/auth/id', {
      id: 'gb1234',
    });
    console.log('data : ', data);
  };
  return (
    <div>
      <h1 css={test}>🏠 Home Page</h1>
      <div css={btnSection}>
        <button css={btn} onClick={handleLoginButtonClick}>
          로그인
        </button>
        <button css={btn} onClick={handleSigninButtonClick}>
          회원가입
        </button>
        <button css={btn} onClick={handleIdCheckButtonClick}>
          아이디 중복 확인
        </button>
      </div>
    </div>
  );
}

const test = css`
  font-size: 20;
  color: 'red';
`;

const btn = css`
  font-size: 16;
  &:hover {
    background-color: red;
  }
`;

const btnSection = css`
  display: flex;
  flex-direction: column;
  gap: 12;
`;
