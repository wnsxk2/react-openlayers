import { css } from '@emotion/react';

interface LoginInputProps {
  type: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}

export function LoginInput({
  type,
  value,
  onChange,
  placeholder,
  error,
}: LoginInputProps) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        css={[infoInputField, error && errorField]}
        placeholder={placeholder}
      />
      {error && <span css={errorMessage}>{error}</span>}
    </>
  );
}

const infoInputField = css`
  width: 80%;
  padding: 10px 14px;
  margin: 0 auto 12px auto;
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

const errorField = css`
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
`;

const errorMessage = css`
  color: #dc3545;
  font-size: 12px;
  margin: 0 auto 16px auto;
  width: 80%;
  text-align: left;
  padding-left: 4px;
`;
