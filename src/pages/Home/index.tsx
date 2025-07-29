import { css } from '@emotion/react';

export default function HomePage() {
  return <h1 css={test}>🏠 Home Page</h1>;
}

const test = css`
  font-size: 20;
  color: 'red';
`;
