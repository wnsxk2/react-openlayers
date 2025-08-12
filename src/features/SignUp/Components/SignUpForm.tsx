import { css } from "@emotion/react";
import { useState } from "react";
import { signUpApi } from "../Api/signUpApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [inputErrors, setInputErrors] = useState<{
    id?: string;
    password?: string;
    email?: string;
    username?: string;
    tel?: string;
  }>({});

  const [idCheckResult, setIdCheckResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const handleIdCheck = async () => {
    const inputErrors: { id?: string } = {};

    if (!id.trim()) {
      setIdCheckResult({
        available: false,
        message: "아이디를 입력해주세요.",
      });
      return;
    }
    setInputErrors(inputErrors);

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

  const handleSignUpCancelButton = () => {
    navigate("/");
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
            onChange={(e) => setPassword(e.target.value)}
            css={infoInputField}
            placeholder="비밀번호를 입력해주세요."
          ></input>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            css={infoCheckButton}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
        {/* {inputErrors.password && (
          <span css={errorMessage}>{inputErrors.password}</span>
        )} */}

        <div>
          <input
            type={showPasswordCheck ? "text" : "password"}
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            css={infoInputField}
            placeholder="비밀번호를 다시 입력해주세요."
          ></input>
          <button
            type="button"
            onClick={() => setShowPasswordCheck(!showPasswordCheck)}
            css={infoCheckButton}
          >
            {showPasswordCheck ? "숨기기" : "보기"}
          </button>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          css={infoInputField}
          placeholder="이메일를 입력해주세요."
        ></input>

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
          // onClick={handleSignUp}
          // disabled={loading}
          css={signUpButton}
        >
          가입
        </button>

        <Link to="/" css={signUpCancelText}>
          돌아가기
        </Link>
        {/* {error && <div css={serverErrorMessage}>{error}</div>} */}
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
  width: 70px;
  border-radius: 5px;
  margin: 12px auto;
`;

const signUpCancelText = css`
  text-align: center;
  font-size: 14px;
  color: #666666;
  margin: 5px 0 20px 0  ;
  text-decoration: underline;
  cursor: pointer;
`;
