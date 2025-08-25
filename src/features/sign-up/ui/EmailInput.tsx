import { css } from '@emotion/react';

interface EmailInputProps {
  email: string;
  setEmail: (value: string) => void;
  onEmailValidation: (value: string) => void;
  emailCheckResult: {
    message: string;
  } | null;
}

export function EmailInput({
  email,
  setEmail,
  onEmailValidation,
  emailCheckResult,
}: EmailInputProps) {
  return (
    <>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => onEmailValidation(e.target.value)}
        css={infoInputField}
        placeholder='이메일를 입력해주세요.'
      />
      {emailCheckResult && (
        <div css={inCorrectFieldMessage}>{emailCheckResult.message}</div>
      )}
    </>
  );
}

const infoInputField = css`
  width: 75%;
  padding: 10px 14px;
  margin: 0 auto 12px 25px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666666;
    opacity: 0.8;
  }
`;

const inCorrectFieldMessage = css`
  color: #721c24;
  font-size: 14px;
  margin-left: 35px;
  margin-bottom: 10px;
`;