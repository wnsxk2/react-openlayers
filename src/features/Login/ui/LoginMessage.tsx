import { css } from '@emotion/react';

interface LoginMessageProps {
  message: string;
}

export function LoginMessage({ message }: LoginMessageProps) {
  return <div css={serverErrorMessage}>{message}</div>;
}

const serverErrorMessage = css`
  color: #721c24;
  text-align: center;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 35px;
`;
