import { css } from '@emotion/react';

interface LoginButtonProps {
  type: 'submit' | 'button';
  variant: 'login' | 'signup';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function LoginButton({
  type,
  variant,
  disabled,
  onClick,
  children,
}: LoginButtonProps) {
  const buttonStyle = variant === 'login' ? loginButton : signUpButton;

  return (
    <button type={type} disabled={disabled} onClick={onClick} css={buttonStyle}>
      {children}
    </button>
  );
}

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
