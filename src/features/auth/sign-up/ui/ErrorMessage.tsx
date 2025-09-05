import { css } from '@emotion/react';
import { colors } from '@/shared/styles';

interface ErrorMessageProps {
  serverError: string;
  inputErrors: {
    id?: string;
    password?: string;
    email?: string;
    username?: string;
    tel?: string;
  };
}

export function ErrorMessage({ serverError, inputErrors }: ErrorMessageProps) {
  if (!serverError && Object.keys(inputErrors).length === 0) {
    return null;
  }

  return (
    <div css={inputErrorMessage}>
      {serverError || Object.values(inputErrors)[0]}
    </div>
  );
}

const inputErrorMessage = css`
  color: ${colors.errorText};
  font-size: 14px;
  margin: 0 auto 30px auto;
`;