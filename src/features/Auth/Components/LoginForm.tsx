import { css } from "@emotion/react";

export default function LoginForm() {
  return (
    <>
      <form css={formContainer}>
        <p css={loginText}>로그인</p>
        <p css={loginSubText}>로그인하시고 나만의 즐겨찾기를 이용해보세요</p>
        <input
          type="text"
          css={idField}
          placeholder="아이디를 입력하세요."
        ></input>
        <input
          type="password"
          css={pwField}
          placeholder="비밀번호를 입력하세요."
        ></input>
        <div css={loginButtonContainer}>
          <button css={loginButton}>로그인</button>
          <button css={signUpButton}>회원가입</button>
        </div>
      </form>
    </>
  );
}

const formContainer = css`
  //   text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 20px;
  width: 450px;
  height: 400px;
`;

const loginText = css`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #555555;
`;

const loginSubText = css`
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin-bottom: 30px;
`;

const idField = css`
  width: 80%;
  padding: 10px 14px;
  margin: 0 auto 16px auto;
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

const pwField = css`
  width: 80%;
  padding: 10px 14px;
  margin: 0 auto 16px auto;
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

const loginButtonContainer = css`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const loginButton = css`
  margin-right: 15px;
  background-color: lightblue;
  border: 7px solid lightblue;
  width: 70px;
  border-radius: 5px;
`;

const signUpButton = css`
  background-color: lightpink;
  border: 7px solid lightpink;
  width: 70px;
  border-radius: 5px;
`;
