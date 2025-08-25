import { css } from '@emotion/react';

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  onPasswordToggle: () => void;
  passwordConfirm: {
    message: string;
  } | null;
  setPasswordConfirm: (value: { message: string } | null) => void;
}

export function PasswordInput({
  password,
  setPassword,
  showPassword,
  onPasswordToggle,
  passwordConfirm,
  setPasswordConfirm,
}: PasswordInputProps) {
  return (
    <>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordConfirm) setPasswordConfirm(null);
          }}
          css={infoInputField}
          placeholder='비밀번호를 입력해주세요.'
        />
        <button
          type='button'
          onClick={onPasswordToggle}
          css={infoCheckButton}
        >
          {showPassword ? '숨기기' : '보기'}
        </button>
      </div>
      {passwordConfirm && (
        <div css={inCorrectFieldMessage}>{passwordConfirm.message}</div>
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

const infoCheckButton = css`
  margin-left: 15px;
  background-color: #f4a460;
  border: 7px solid #f4a460;
  width: 70px;
  font-size: 12px;
  border-radius: 5px;
`;

const inCorrectFieldMessage = css`
  color: #721c24;
  font-size: 14px;
  margin-left: 35px;
  margin-bottom: 10px;
`;