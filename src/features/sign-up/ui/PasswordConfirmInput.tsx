import { css } from '@emotion/react';

interface PasswordConfirmInputProps {
  passwordCheck: string;
  setPasswordCheck: (value: string) => void;
  showPasswordCheck: boolean;
  onPasswordConfirmToggle: () => void;
  passwordCheckConfirm: {
    message: string;
  } | null;
  setPasswordCheckConfirm: (value: { message: string } | null) => void;
}

export function PasswordConfirmInput({
  passwordCheck,
  setPasswordCheck,
  showPasswordCheck,
  onPasswordConfirmToggle,
  passwordCheckConfirm,
  setPasswordCheckConfirm,
}: PasswordConfirmInputProps) {
  return (
    <>
      <div>
        <input
          type={showPasswordCheck ? 'text' : 'password'}
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            if (passwordCheckConfirm) setPasswordCheckConfirm(null);
          }}
          css={infoInputField}
          placeholder='비밀번호를 다시 입력해주세요.'
        />
        <button
          type='button'
          onClick={onPasswordConfirmToggle}
          css={infoCheckButton}
        >
          {showPasswordCheck ? '숨기기' : '보기'}
        </button>
      </div>
      {passwordCheckConfirm && (
        <div css={inCorrectFieldMessage}>
          {passwordCheckConfirm.message}
        </div>
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