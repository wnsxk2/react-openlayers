import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useIdCheck } from "../Hooks/useIdCheck.ts";
import { usePasswordCheck } from "../Hooks/usePasswordCheck.ts";
import { useEmailCheck } from "../Hooks/useEmailCheck.ts";
import { useSignUpFormCheck } from "../Hooks/useSignUpFormCheck.ts";

export default function SignUp() {
  const { idCheckResult, handleIdCheck } = useIdCheck();
  const {
    showPassword,
    showPasswordCheck,
    passwordConfirm,
    setPasswordConfirm,
    passwordCheckConfirm,
    setPasswordCheckConfirm,
    handlePasswordToggle,
    handlePasswordConfirmToggle,
  } = usePasswordCheck();
  const { emailCheckResult, handleEmailValidation } = useEmailCheck();
  const {
    id,
    setId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    email,
    setEmail,
    username,
    setUsername,
    tel,
    setTel,
    inputErrors,
    loading,
    serverError,
    handleSignUp,
  } = useSignUpFormCheck();

  return (
    <>
      <form css={formContainer}>
        <p css={signUpText}>회원가입</p>
        <p css={signUpSubText}>
          즐겨찾기를 통해 여러분만의 지도를 만들어보세요
        </p>
        <div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            css={infoInputField}
            placeholder="아이디를 입력해주세요."
          ></input>
          <button
            type="button"
            onClick={() => handleIdCheck(id)}
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

        <div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordConfirm) setPasswordConfirm(null);
            }}
            css={infoInputField}
            placeholder="비밀번호를 입력해주세요."
          ></input>
          <button
            type="button"
            onClick={() => handlePasswordToggle(password)}
            css={infoCheckButton}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
        {passwordConfirm && (
          <div css={inCorrectFieldMessage}>{passwordConfirm.message}</div>
        )}

        <div>
          <input
            type={showPasswordCheck ? "text" : "password"}
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
              if (passwordCheckConfirm) setPasswordCheckConfirm(null);
            }}
            css={infoInputField}
            placeholder="비밀번호를 다시 입력해주세요."
          ></input>
          <button
            type="button"
            onClick={() => handlePasswordConfirmToggle(passwordCheck)}
            css={infoCheckButton}
          >
            {showPasswordCheck ? "숨기기" : "보기"}
          </button>
        </div>
        {passwordCheckConfirm && (
          <div css={inCorrectFieldMessage}>{passwordCheckConfirm.message}</div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleEmailValidation(e.target.value)}
          css={infoInputField}
          placeholder="이메일를 입력해주세요."
        ></input>
        {emailCheckResult && (
          <div css={inCorrectFieldMessage}>{emailCheckResult.message}</div>
        )}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          css={infoInputField}
          placeholder="이름을 입력해주세요."
        ></input>

        <input
          type="text"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          css={infoInputField}
          placeholder="전화번호를 입력해주세요."
        ></input>

        <button
          type="button"
          onClick={() => handleSignUp(idCheckResult)}
          disabled={loading}
          css={signUpButton}
        >
          {loading ? "가입 중..." : "가입"}
        </button>

        <Link to="/" css={signUpCancelText}>
          돌아가기
        </Link>

        {serverError && <div css={inputErrorMessage}>{serverError}</div>}
        {!serverError && Object.keys(inputErrors).length > 0 && (
          <div css={inputErrorMessage}>{Object.values(inputErrors)[0]}</div>
        )}
      </form>
    </>
  );
}

const formContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 20px;
  width: 560px;
  padding-top: 30px;
`;

const signUpText = css`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #555555;
`;

const signUpSubText = css`
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin-bottom: 30px;
`;

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

const signUpButton = css`
  background-color: lightblue;
  border: 7px solid lightblue;
  min-width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  margin: 12px auto;
`;

const signUpCancelText = css`
  text-align: center;
  font-size: 14px;
  color: #666666;
  margin: 5px 0 20px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const inputErrorMessage = css`
  color: #721c24;
  font-size: 14px;
  margin: 0 auto 30px auto;
`;
