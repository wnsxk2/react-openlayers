import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';

export default function SignUpLayout() {
  return (
    <>
      <div css={SignUpContainer}>
        <Outlet />
      </div>
    </>
  );
}

const SignUpContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
