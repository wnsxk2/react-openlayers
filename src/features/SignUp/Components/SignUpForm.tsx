import { css } from "@emotion/react";
import { useState } from "react";
import { signUpApi } from "../Api/signUpApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  type IdCheckRequest,
  type IdCheckResponse,
  type SignUpSuccessResponse,
  type SignUpRequest,
  type ApiErrorResponse,
} from "../Types/types";

export default function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [idCheckResult, setIdCheckResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState<{
    message: string;
  } | null>(null);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [passwordCheckConfirm, setPasswordCheckConfirm] = useState<{
    message: string;
  } | null>(null);
  const [emailCheckResult, setEmailCheckResult] = useState<{
    message: string;
  } | null>(null);
  const [inputErrors, setInputErrors] = useState<{
    id?: string;
    password?: string;
    email?: string;
    username?: string;
    tel?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const handleIdCheck = async () => {
    if (!id.trim()) {
      setIdCheckResult({
        available: false,
        message: "아이디를 입력해주세요.",
      });
      return;
    }

    if (id.trim().length < 4 || id.trim().length > 20) {
      setIdCheckResult({
        available: false,
        message: "아이디는 4자 이상 20자 이하여야 합니다.",
      });
      return;
    }

    try {
      const response = await signUpApi.idCheck({ id: id.trim() });

      setIdCheckResult({
        available: response.data.available,
        message: response.data.message,
      });
    } catch (error) {
      setIdCheckResult({
        available: false,
        message: "서버 내부 오류가 발생했습니다.",
      });
    }
  };

  const handlePasswordToggle = () => {
    if (!password.trim()) {
      setPasswordConfirm({
        message: "비밀번호를 입력해주세요.",
      });
      return;
    }
    setPasswordConfirm(null);
    setShowPassword(!showPassword);
  };

  const handlePasswordConfirmToggle = () => {
    if (!passwordCheck.trim()) {
      setPasswordCheckConfirm({
        message: "비밀번호를 다시 입력해주세요.",
      });
      return;
    }
    setPasswordCheckConfirm(null);
    setShowPasswordCheck(!showPasswordCheck);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = (value: string) => {
    if (!value.trim()) {
      setEmailCheckResult(null);
      return;
    }

    if (!validateEmail(value.trim())) {
      setEmailCheckResult({
        message: "올바른 이메일 양식으로 작성해주세요.",
      });
    } else {
      setEmailCheckResult(null); // 올바른 형식이면 메시지 제거
    }
  };

  const handleSignUp = async () => {
    setServerError(""); // 기존 에러 메시지 초기화
    setInputErrors({});

    const requiredFields = [
      { value: id.trim(), name: "아이디", field: "id" },
      { value: password.trim(), name: "비밀번호", field: "password" },
      { value: email.trim(), name: "이메일", field: "email" },
      { value: username.trim(), name: "이름", field: "username" },
      { value: tel.trim(), name: "전화번호", field: "tel" },
    ];

    // 첫 번째 빈 필드 찾기
    for (const field of requiredFields) {
      if (!field.value) {
        setInputErrors({ [field.field]: `${field.name}을(를) 입력해주세요.` });
        return;
      }
    }

    const validations = [
      {
        condition: !idCheckResult?.available,
        field: "id",
        message: "아이디 중복 확인을 해주세요.",
      },
      {
        condition: password.length < 8 || password.length > 20,
        field: "password",
        message: "비밀번호는 8자 이상 20자 이하여야 합니다.",
      },
      {
        condition: password !== passwordCheck,
        field: "password",
        message: "비밀번호가 일치하지 않습니다.",
      },
      {
        condition: !validateEmail(email.trim()),
        field: "email",
        message: "올바른 이메일 양식으로 작성해주세요.",
      },
      {
        condition: username.trim().length < 2 || username.trim().length > 10,
        field: "username",
        message: "사용자명은 2자 이상 10자 이하여야 합니다.",
      },
      {
        condition: !/^01[0-9]-?\d{3,4}-?\d{4}$/.test(tel.trim()),
        field: "tel",
        message: "올바른 전화번호 형식이 아닙니다.",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setInputErrors({ [validation.field]: validation.message });
        return;
      }
    }

    // 모든 검증 통과 시 API 호출
    try {
      setLoading(true);

      const signUpRequest: SignUpRequest = {
        id: id.trim(),
        password: password,
        email: email.trim(),
        username: username.trim(),
        tel: tel.trim(),
      };

      const response = await signUpApi.signUp(signUpRequest);

      alert(`${response.data.username}님, 회원가입이 완료되었습니다!`);
      navigate("/login");
    } catch (error: any) {
      if (error.success === false) {
        setServerError(error.error.message);
      } else {
        setServerError("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <button type="button" onClick={handleIdCheck} css={infoCheckButton}>
            아이디 확인
          </button>
        </div>
        {/* {inputErrors.id && <span css={errorMessage}>{inputErrors.id}</span>}  */}
        {idCheckResult && (
          <div css={idCheckResult.available ? usableMessage : existedMessage}>
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
            onClick={handlePasswordToggle}
            css={infoCheckButton}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
        {passwordConfirm && (
          <div css={existedMessage}>{passwordConfirm.message}</div>
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
            onClick={handlePasswordConfirmToggle}
            css={infoCheckButton}
          >
            {showPasswordCheck ? "숨기기" : "보기"}
          </button>
        </div>
        {passwordCheckConfirm && (
          <div css={existedMessage}>{passwordCheckConfirm.message}</div>
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
          <div css={existedMessage}>{emailCheckResult.message}</div>
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
          onClick={handleSignUp}
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

const existedMessage = css`
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
