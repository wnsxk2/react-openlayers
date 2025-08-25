import { css } from '@emotion/react';
import { SignUpForm } from 'widgets/sign-up';

export default function SignUpPage() {
  return (
    <div css={SignUpContainer}>
      <SignUpForm />
    </div>
  );
}

const SignUpContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
