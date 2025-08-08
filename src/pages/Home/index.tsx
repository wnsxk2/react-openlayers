import { css } from '@emotion/react';
import axios from 'axios';

export default function HomePage() {
  const handleButtonClick = async () => {
    const { data } = await axios.get('/api/users');
    console.log('data : ', data);
  };
  return (
    <div>
      <h1 css={test}>🏠 Home Page</h1>
      <button css={btn} onClick={handleButtonClick}>
        클릭하세요
      </button>
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
