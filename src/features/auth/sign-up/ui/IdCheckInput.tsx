import { css } from '@emotion/react';

interface IdCheckInputProps {
  id: string;
  setId: (value: string) => void;
  onIdCheck: () => void;
  idCheckResult: {
    available: boolean;
    message: string;
  } | null;
}

export function IdCheckInput({ id, setId, onIdCheck, idCheckResult }: IdCheckInputProps) {
  return (
    <>
      <div>
        <input
          type='text'
          value={id}
          onChange={(e) => setId(e.target.value)}
          css={infoInputField}
          placeholder='아이디를 입력해주세요.'
        />
        <button
          type='button'
          onClick={onIdCheck}
          css={infoCheckButton}
        >
          아이디 확인
        </button>
      </div>
      {idCheckResult && (
        <div
          css={
            idCheckResult.available ? usableMessage : inCorrectFieldMessage
          }
        >
          {idCheckResult.message}
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

const usableMessage = css`
  color: #2db400;
  font-size: 14px;
  margin-left: 35px;
  margin-bottom: 10px;
`;