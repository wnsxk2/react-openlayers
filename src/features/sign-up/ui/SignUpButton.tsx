import { css } from '@emotion/react';

interface SignUpButtonProps {
  loading: boolean;
  onClick: () => void;
}

export function SignUpButton({ loading, onClick }: SignUpButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={loading}
      css={signUpButton}
    >
      {loading ? '가입 중...' : '가입'}
    </button>
  );
}

const signUpButton = css`
  background-color: lightblue;
  border: 7px solid lightblue;
  min-width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  margin: 12px auto;
`;